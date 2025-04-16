package com.upic.query;

import static com.mongodb.client.model.Accumulators.sum;
import static com.mongodb.client.model.Aggregates.group;
import static com.mongodb.client.model.Aggregates.match;
import static com.mongodb.client.model.Filters.and;
import static com.mongodb.client.model.Filters.eq;
import static com.upic.validator.Params.DAY_ID_LOWER_BOUND;
import static com.upic.validator.Params.DAY_ID_UPPER_BOUND;
import static com.upic.validator.Params.RESORT_ID_LOWER_BOUND;
import static com.upic.validator.Params.RESORT_ID_UPPER_BOUND;
import static com.upic.validator.Params.SEASON_ID_LOWER_BOUND;
import static com.upic.validator.Params.SEASON_ID_UPPER_BOUND;
import static com.upic.validator.Params.SKIER_ID_LOWER_BOUND;
import static com.upic.validator.Params.SKIER_ID_UPPER_BOUND;

import com.google.gson.Gson;
import com.mongodb.ReadPreference;
import com.mongodb.client.AggregateIterable;
import com.mongodb.client.MongoCollection;
import com.upic.cacheWriter.CacheWriter;
import com.upic.cacheWriter.HincrByTask;
import com.upic.redisPool.RedisPool;
import java.util.Arrays;
import java.util.List;
import org.bson.Document;
import org.bson.conversions.Bson;
import redis.clients.jedis.Jedis;

/**
 * GetDayVertical class. It gets the total vertical for the skier for the specified ski day. e.g.
 * Key: "season:{seasonID}:day:{dayID}:skier:{skierID}:vertical", Value: int. Call incrBy(key,
 * increment) to initializes the value to a key to 0 if the key does not exist, otherwise increment
 * the existing value by the amount passed as argument. API:
 * /skiers/{resortID}/seasons/{seasonID}/days/{dayID}/skiers/{skierID}
 */
public class GetDayVertical extends Query {

  private final String urlPath;
  private int resortID;
  private int seasonID;
  private int dayID;
  private int skierID;

  /**
   * Constructor of GetDayVertical.
   *
   * @param gson       gson object
   * @param urlPath    the url path of GET request
   * @param redisPool  the redis channel pool
   * @param collection the mongodb collection reference
   */
  public GetDayVertical(Gson gson, String urlPath, RedisPool redisPool,
      MongoCollection<Document> collection, CacheWriter cacheWriter) {
    super(gson, redisPool, collection, cacheWriter);
    this.urlPath = urlPath;
    this.resortID = -1;
    this.seasonID = -1;
    this.dayID = -1;
    this.skierID = -1;
  }

  @Override
  public boolean validate() {
    String[] parts = urlPath.split("/");
    // ["", {resortID}, "seasons", {seasonID}, "days", {dayID}, "skiers", {skierID}]
    //  0       1           2           3         4       5         6         7
    if (parts.length != 8) {
      return false;
    }
    this.resortID = Integer.parseInt(parts[1]);
    this.seasonID = Integer.parseInt(parts[3]);
    this.dayID = Integer.parseInt(parts[5]);
    this.skierID = Integer.parseInt(parts[7]);
    return resortID >= RESORT_ID_LOWER_BOUND.getInt() && resortID <= RESORT_ID_UPPER_BOUND.getInt()
        && seasonID >= SEASON_ID_LOWER_BOUND.getInt() && seasonID <= SEASON_ID_UPPER_BOUND.getInt()
        && dayID >= DAY_ID_LOWER_BOUND.getInt() && dayID <= DAY_ID_UPPER_BOUND.getInt()
        && skierID >= SKIER_ID_LOWER_BOUND.getInt() && skierID <= SKIER_ID_UPPER_BOUND.getInt();
  }

  /**
   * Helper method. Get the redis key.
   *
   * @return the redis key
   */
  private String getRedisKey() {
    return "skier:" + skierID + ":resort:" + resortID + ":season:" + seasonID + ":day:" + dayID
        + ":vertical";
  }

  @Override
  public String queryRedis() {
    String key = getRedisKey();
    try (Jedis jedis = RedisPool.getInstance().borrowChannel()) {
      if (jedis.exists(key)) {
        return gson.toJson(jedis.hget(key, "vertical"));
      }
    } catch (Exception e) {
      System.out.println("failed to query redis");
      return null;
    }
    return null;
  }

  @Override
  public String queryMongoDB() {
    try {
      List<Bson> pipeline = Arrays.asList(
          match(and(
              eq("skierID", skierID),
              eq("seasonID", seasonID),
              eq("dayID", dayID)
          )),
          group(null, sum("totalVertical", "$vertical"))
      );
      AggregateIterable<Document> result = collection.withReadPreference(
          ReadPreference.secondaryPreferred()).aggregate(pipeline);
      Document doc = result.first();
      if (doc == null) {
        return null;
      }
      long value = doc.getInteger("totalVertical");
      cacheWriter.writeToCache(new HincrByTask(redisPool, getRedisKey(), value));
      return String.valueOf(value);
    } catch (Exception e) {
      System.out.println("exception: " + e);
      return null;
    }
  }
}
