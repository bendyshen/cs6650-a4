package com.upic.model.consumer;

import com.google.gson.Gson;
import com.upic.model.mongoPool.MongoPool;
import com.upic.model.rabbitmqPool.RabbitmqPool;
import com.upic.model.redisPool.RedisPool;
import com.upic.model.task.MongoTask;
import com.upic.model.task.RedisTask;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.ConcurrentLinkedQueue;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.LinkedBlockingQueue;
import java.util.concurrent.Semaphore;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicInteger;
import org.bson.Document;
import org.slf4j.Logger;

/**
 * RabbitmqConsumers class. It contains a number of competing consumers who are bound to the same
 * queue and share the same worker thread pool.
 */
public class RabbitmqConsumers {

  private static final int THREAD_POOL_TIME_OUT = 1; // minute
  private final Semaphore semaphore;
  private final Gson gson;
  private final Logger globalLogger;
  private final ConcurrentLinkedQueue<byte[]> messageBuffer;
  private final RabbitmqPool rabbitmqPool;
  private final List<Consumer> consumers;
  private final RedisPool redisPool;
  private final MongoPool mongoPool;
  private final ExecutorService redisWorkerPool;
  private final BlockingQueue<Document> mongoQueue;
  private final ExecutorService mongoWorkerPool;
  private final int redisBatchCount;
  private final int redisBatchSize;
  private final int mongoBatchCount;
  private final int mongoBatchSize;
  private final CountDownLatch redisLatch;
  private final CountDownLatch mongoLatch;
  private final AtomicInteger redisMessageCounter;
  private final AtomicInteger mongoMessageCounter;

  /**
   * Constructor for RabbitmqConsumers class.
   *
   * @param globalLogger          global logger used to log various information
   * @param rabbitmqUriString     the RabbitMQ URI used set up connection
   * @param rabbitmqExchangeName  the RabbitMQ exchange name
   * @param rabbitmqQueueName     the RabbitMQ queue name
   * @param rabbitmqRoutingKey    the RabbitMQ routing key
   * @param rabbitmqConsumerCount the number of competing consumers for RabbitMQ
   * @param rabbitmqPrefetchCount the prefetch count for RabbitMQ consumers
   * @param redisChannelPoolSize  the number of Jedis channels in the Redis channel pool
   * @param redisHost             the redis host address
   * @param redisPort             the redis host port
   * @param mongoConnectionString the mongoDB connection string
   * @param mongoDatabaseName     the mongoDB database name
   * @param mongoCollectionName   the mongoDB collection name
   * @param mongoMaxConnections   the mongoDB max connection count
   * @param mongoMinIdle          the mongoDB min idle connection count
   * @param redisWorkerPoolSize   the redis worker thread pool size
   * @param redisBatchCount       the number of tasks submitted to the redis worker thread pool
   * @param redisBatchSize        the number of messages processed in each task by redis worker
   *                              thread
   * @param mongoWorkerPoolSize   the mongodb worker thread pool size
   * @param mongoBatchCount       the number of tasks submitted to the mongodb worker thread pool
   * @param mongoBatchSize        the number of messages processed in each task by mongodb worker
   *                              thread
   */
  public RabbitmqConsumers(Logger globalLogger, String rabbitmqUriString,
      String rabbitmqExchangeName, String rabbitmqQueueName, String rabbitmqRoutingKey,
      int rabbitmqConsumerCount, int rabbitmqPrefetchCount, int redisChannelPoolSize,
      String redisHost, int redisPort, String mongoConnectionString, String mongoDatabaseName,
      String mongoCollectionName, int mongoMaxConnections, int mongoMinIdle,
      int redisWorkerPoolSize, int redisBatchCount, int redisBatchSize, int mongoWorkerPoolSize,
      int mongoBatchCount, int mongoBatchSize) {
    this.semaphore = new Semaphore(Runtime.getRuntime().availableProcessors() * 4);
    this.gson = new Gson();
    this.globalLogger = globalLogger;
    this.messageBuffer = new ConcurrentLinkedQueue<>();
    this.rabbitmqPool = new RabbitmqPool(rabbitmqUriString, rabbitmqExchangeName, rabbitmqQueueName,
        rabbitmqRoutingKey, rabbitmqConsumerCount, globalLogger);
    try {
      this.consumers = createConsumers(rabbitmqConsumerCount, rabbitmqQueueName,
          rabbitmqPrefetchCount);
    } catch (Exception e) {
      throw new RuntimeException(e);
    }
    this.redisPool = new RedisPool(globalLogger, redisChannelPoolSize, redisHost, redisPort);
    this.mongoPool = new MongoPool(mongoConnectionString, mongoDatabaseName, mongoCollectionName,
        mongoMaxConnections, mongoMinIdle);
    this.redisWorkerPool = Executors.newFixedThreadPool(redisWorkerPoolSize);
    this.mongoQueue = new LinkedBlockingQueue<>();
    this.mongoWorkerPool = Executors.newFixedThreadPool(mongoWorkerPoolSize);
    this.redisBatchCount = redisBatchCount;
    this.redisBatchSize = redisBatchSize;
    this.mongoBatchCount = mongoBatchCount;
    this.mongoBatchSize = mongoBatchSize;
    this.redisLatch = new CountDownLatch(redisBatchCount * redisBatchSize);
    this.mongoLatch = new CountDownLatch(mongoBatchCount * mongoBatchSize);
    this.redisMessageCounter = new AtomicInteger(0);
    this.mongoMessageCounter = new AtomicInteger(0);
  }

  /**
   * Helper method. Creates the competing consumers.
   *
   * @param consumerCount the number of consumers.
   * @param queueName     the name of the queue to which the consumers are bound
   * @param prefetchCount the prefetch count
   * @return a list of Consumer instances
   * @throws Exception exception
   */
  private List<Consumer> createConsumers(int consumerCount, String queueName, int prefetchCount)
      throws Exception {
    List<Consumer> consumers = new ArrayList<>(consumerCount);
    for (int i = 0; i < consumerCount; i++) {
      consumers.add(
          new Consumer(globalLogger, queueName, rabbitmqPool.borrowChannel(), prefetchCount,
              messageBuffer, semaphore));
    }
    return consumers;
  }

  /**
   * Initializes the worker thread pool for message processing.
   */
  public void init() {
    // initialize all Redis worker thread tasks
    for (int i = 0; i < redisBatchCount; i++) {
      redisWorkerPool.submit(
          new RedisTask(gson, globalLogger, redisBatchSize, redisLatch, semaphore, messageBuffer,
              redisPool, mongoQueue, redisMessageCounter));
    }
    globalLogger.info("redis worker pools started, ready to write messages");
    for (int i = 0; i < mongoBatchCount; i++) {
      mongoWorkerPool.submit(
          new MongoTask(globalLogger, mongoBatchSize, mongoLatch, mongoPool.getCollection(),
              mongoQueue, mongoMessageCounter));
    }
    globalLogger.info("mongo worker pools started, ready to write messages");
  }

  /**
   * Waits for all worker threads to complete.
   */
  public void awaitCompletion() {
    try {
      redisLatch.await();
      mongoLatch.await();
    } catch (InterruptedException e) {
      Thread.currentThread().interrupt();
    }
    globalLogger.info("all messages processed");
  }

  /**
   * Closes the channel pool.
   */
  public void closeChannelPool() {
    for (Consumer consumer : consumers) {
      rabbitmqPool.returnChannel(consumer.getChannel());
    }
    rabbitmqPool.close();
    globalLogger.info("rabbitmq channel pool closed");
    redisPool.close();
    globalLogger.info("redis channel pool closed");
    mongoPool.close();
    globalLogger.info("mongodb connection pool closed");
  }

  /**
   * Shuts down the worker thread pool.
   */
  public void shutdownWorkerPool() {
    redisWorkerPool.shutdown();
    mongoWorkerPool.shutdown();
    try {
      if (!redisWorkerPool.awaitTermination(THREAD_POOL_TIME_OUT, TimeUnit.MINUTES)) {
        redisWorkerPool.shutdownNow();
      }
      if (!mongoWorkerPool.awaitTermination(THREAD_POOL_TIME_OUT, TimeUnit.MINUTES)) {
        mongoWorkerPool.shutdownNow();
      }
    } catch (InterruptedException e) {
      Thread.currentThread().interrupt();
    }
    globalLogger.info("worker pool shut down");
  }

  /**
   * Prints simulation statistics.
   */
  public void showStatistics() {
    globalLogger.info("-------------------------Simulation Summary-------------------------");
    globalLogger.info("[REDIS TOTAL WRITE]       {}", redisMessageCounter.get());
    globalLogger.info("[MONGO TOTAL WRITE]       {}", mongoMessageCounter.get());
  }
}
