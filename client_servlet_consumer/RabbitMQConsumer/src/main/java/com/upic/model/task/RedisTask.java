package com.upic.model.task;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.upic.model.redisPool.RedisPool;
import java.nio.charset.StandardCharsets;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.ConcurrentLinkedQueue;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.Semaphore;
import java.util.concurrent.atomic.AtomicInteger;
import org.bson.Document;
import org.slf4j.Logger;
import redis.clients.jedis.Jedis;
import redis.clients.jedis.Pipeline;

/**
 * RedisTask class. It represents a processing task that parse and cache skier's lift ride
 * information to a Redis instance. It uses pipeline to batch-write to Redis instance.
 */
public class RedisTask implements Runnable {

  private static final String REDIS_WRITE_ERROR = "failed to write to Redis";
  private static final long VERTICAL_COEFFICIENT = 10L;
  private final Gson gson;
  private final Logger globalLogger;
  private final int batchSize;
  private final CountDownLatch redisLatch;
  private final ConcurrentLinkedQueue<byte[]> messageBuffer;
  private final Semaphore semaphore;
  private final RedisPool redisPool;
  private final BlockingQueue<Document> mongoQueue;
  private final AtomicInteger messageCounter;

  /**
   * Constructor for RedisTask class.
   *
   * @param gson                the Gson instance used to parse JSON formatted data.
   * @param globalLogger        global logger used to log various information
   * @param batchSize           the number of messages processed in each task
   * @param latch               the latch used to synchronize all worker threads
   * @param semaphore           the semaphore used to synchronize producer (callback handler) and
   *                            consumer (worker thread)
   * @param messageBuffer       the message buffer used to cache byte data for further processing
   * @param redisPool           the connection pool used to write to Redis instance
   * @param redisMessageCounter the counter that keeps track of the total number of processed
   *                            messages
   */
  public RedisTask(Gson gson, Logger globalLogger, int batchSize, CountDownLatch latch,
      Semaphore semaphore, ConcurrentLinkedQueue<byte[]> messageBuffer, RedisPool redisPool,
      BlockingQueue<Document> mongoQueue,
      AtomicInteger redisMessageCounter) {
    this.gson = gson;
    this.globalLogger = globalLogger;
    this.batchSize = batchSize;
    this.redisLatch = latch;
    this.messageBuffer = messageBuffer;
    this.semaphore = semaphore;
    this.redisPool = redisPool;
    this.mongoQueue = mongoQueue;
    this.messageCounter = redisMessageCounter;
  }

  /**
   * Caches the number of days each skier has skied for a given season.
   *
   * @param pipeline a Jedis connection pipeline
   */
  private void insertDaysBySkierSeason(Pipeline pipeline, String skierID, String seasonID,
      String dayID) {
    String key = "skier:" + skierID + ":season:" + seasonID + ":days";
    pipeline.sadd(key, dayID);
  }

  /**
   * Caches the vertical totals for a given skier for each ski day at a specified resort. Related
   * API: GET /skiers/{resortID}/seasons/{seasonID}/days/{dayID}/skiers/{skierID}
   *
   * @param pipeline a Jedis connection pipeline
   */
  private void insertVerticalBySkierSeasonDay(Pipeline pipeline, String skierID, String resortID,
      String seasonID, String dayID, long vertical) {
    String key =
        "skier:" + skierID + ":resort:" + resortID + ":season:" + seasonID + ":day:" + dayID
            + ":vertical";
    pipeline.hincrBy(key, "vertical", vertical);
  }

  /**
   * Caches the vertical totals for a given skier at a specified resort. Related API: GET
   * /skiers/{skierID}/vertical?resort=?
   *
   * @param pipeline a Jedis connection pipeline
   */
  private void insertVerticalBySkier(Pipeline pipeline, String skierID, String resortID,
      long vertical) {
    String key = "skier:" + skierID + ":resort:" + resortID + ":vertical";
    pipeline.hincrBy(key, "vertical", vertical);
  }

  /**
   * Caches the vertical totals for a given skier of a given season at a specified resort. Related
   * API: GET  /skiers/{skierID}/vertical?resort=?&season=?
   *
   * @param pipeline a Jedis connection pipeline
   */
  private void insertVerticalBySkierSeason(Pipeline pipeline, String skierID, String resortID,
      String seasonID, long vertical) {
    String key = "skier:" + skierID + ":resort:" + resortID + ":season:" + seasonID + ":vertical";
    pipeline.hincrBy(key, "vertical", vertical);
  }

  /**
   * Caches the lifts a given skier rode on each ski day.
   *
   * @param pipeline a Jedis connection
   */
  private void insertLiftBySkierSeasonDay(Pipeline pipeline, String skierID, String seasonID,
      String dayID, String liftID) {
    String key = "skier:" + skierID + ":season:" + seasonID + ":day:" + dayID + ":lifts";
    pipeline.rpush(key, liftID);
  }

  /**
   * Caches the number of unique skiers visited a given resort on a given day. Related API: GET
   * /resorts/{resortID}/seasons/{seasonID}/day/{dayID}/skiers
   *
   * @param pipeline a Jedis connection
   */
  private void insertSkierByResortSeasonDay(Pipeline pipeline, String skierID, String seasonID,
      String dayID, String resortID) {
    String key = "resort:" + resortID + ":season:" + seasonID + ":day:" + dayID + ":skiers";
    pipeline.sadd(key, skierID);
  }

  @Override
  public void run() {
    int batchSize = this.batchSize;
    while (batchSize > 0) {
      try (Jedis jedis = redisPool.borrowChannel()) {
        Pipeline pipeline = jedis.pipelined();
        semaphore.acquire();
        byte[] body = messageBuffer.poll();
        if (body != null) {
          String message = new String(body, StandardCharsets.UTF_8);
          // cache key query resort
          JsonObject messageJson = gson.fromJson(message, JsonObject.class);
          String skierID = messageJson.get("skierID").getAsString();
          String resortID = messageJson.get("resortID").getAsString();
          String seasonID = messageJson.get("seasonID").getAsString();
          String dayID = messageJson.get("dayID").getAsString();
          String liftID = messageJson.get("liftRide").getAsJsonObject().get("liftID").getAsString();
          String time = messageJson.get("liftRide").getAsJsonObject().get("time").getAsString();
          long vertical = Integer.parseInt(liftID) * VERTICAL_COEFFICIENT;
          // "For skier N, how many days have they skied this season?"
          insertDaysBySkierSeason(pipeline, skierID, seasonID, dayID);
          // "For skier N, what are the vertical totals for each ski day?" (calculate vertical as liftID*10)
          insertVerticalBySkierSeasonDay(pipeline, skierID, resortID, seasonID, dayID, vertical);
          // "For skier N, show me the lifts they rode on each ski day"
          insertLiftBySkierSeasonDay(pipeline, skierID, seasonID, dayID, liftID);
          // "How many unique skiers visited resort X on day N?"
          insertSkierByResortSeasonDay(pipeline, skierID, seasonID, dayID, resortID);
          // Cache skier vertical
          insertVerticalBySkier(pipeline, skierID, resortID, vertical);
          // Cache skier vertical by season
          insertVerticalBySkierSeason(pipeline, skierID, resortID, seasonID, vertical);
          pipeline.sync();
          // queue for mongo writing
          mongoQueue.add(new Document("resortID", Integer.parseInt(resortID))
              .append("seasonID", Integer.parseInt(seasonID))
              .append("dayID", Integer.parseInt(dayID))
              .append("skierID", Integer.parseInt(skierID))
              .append("time", Integer.parseInt(time))
              .append("liftID", Integer.parseInt(liftID))
              .append("vertical", vertical));
          // increment counter
          messageCounter.getAndIncrement();
          // decrement latch
          redisLatch.countDown();
          // decrement loop variable
          batchSize--;
        }
      } catch (InterruptedException e) {
        Thread.currentThread().interrupt();
      } catch (Exception e) {
        globalLogger.error("[{}] {}", REDIS_WRITE_ERROR, e.getMessage());
      }
    }
  }
}
