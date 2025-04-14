package com.upic.query;

import static com.mongodb.client.model.Accumulators.sum;
import static com.mongodb.client.model.Aggregates.group;
import static com.mongodb.client.model.Aggregates.match;
import static com.mongodb.client.model.Filters.and;
import static com.mongodb.client.model.Filters.eq;
import static com.upic.validator.Params.SEASON_ID_LOWER_BOUND;
import static com.upic.validator.Params.SEASON_ID_UPPER_BOUND;
import static com.upic.validator.Params.SKIER_ID_LOWER_BOUND;
import static com.upic.validator.Params.SKIER_ID_UPPER_BOUND;

import com.google.gson.Gson;
import com.mongodb.client.AggregateIterable;
import com.mongodb.client.MongoCollection;
import com.upic.redisPool.RedisPool;
import java.util.Arrays;
import java.util.List;
import org.bson.Document;
import org.bson.conversions.Bson;
import redis.clients.jedis.Jedis;

/**
 * GetTotalVertical class. It gets the total vertical for the skier for specified seasons at the
 * specified resort. If no season is specified, return all seasons. e.g. Key:
 * skiers:{skierID}:vertical, Value: int or Key: skiers:{skierID}:season:{seasonID}:vertical, Value:
 * int. Call incrBy(key, increment) to initializes the value to a key to 0 if the key does not
 * exist, otherwise increment the existing value by the amount passed as argument. API:
 * /skiers/{skierID}/vertical or /skiers/{skierID}/vertical?season=x
 */
public class GetTotalVertical extends Query {

  private final String urlPath;
  private int seasonID;
  private int skierID;

  /**
   * Constructor of GetTotalVertical.
   * @param gson        gson object
   * @param urlPath     the url path of GET request
   * @param redisPool   the redis channel pool
   * @param collection  the mongodb collection reference
   */
  public GetTotalVertical(Gson gson, String urlPath, RedisPool redisPool, MongoCollection<Document> collection) {
    super(gson, redisPool, collection);
    this.urlPath = urlPath;
    this.seasonID = -1;
    this.skierID = -1;
  }

  @Override
  public boolean validate() {
    String[] parts = urlPath.split("/");
    // ["", {skierID}, vertical] or ["", {skierID}, "vertical", "season", {seasonID}]
    if (parts.length != 3 && parts.length != 5) {
      return false;
    }
    this.skierID = Integer.parseInt(parts[1]);
    if (parts.length == 3) {
      return skierID >= SKIER_ID_LOWER_BOUND.getInt() && skierID <= SKIER_ID_UPPER_BOUND.getInt();
    }
    this.seasonID = Integer.parseInt(parts[4]);
    return skierID >= SKIER_ID_LOWER_BOUND.getInt() && skierID <= SKIER_ID_UPPER_BOUND.getInt()
        && seasonID >= SEASON_ID_LOWER_BOUND.getInt() && seasonID <= SEASON_ID_UPPER_BOUND.getInt();
  }

  /**
   * Helper method. Get the redis key.
   * @return the redis key
   */
  private String getRedisKey() {
    if (seasonID == -1) {
      return "skier:" + skierID + ":vertical";
    }
    return "skier:" + skierID + ":season:" + seasonID + ":vertical";
  }

  @Override
  public String queryRedis() {
    String key = getRedisKey();
    try(Jedis jedis = RedisPool.getInstance().borrowChannel()) {
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
      List<Bson> pipeline;
      if (seasonID == -1) {
       pipeline = Arrays.asList(
            match(and(
                eq("skierID", skierID)
            )),
            group(null, sum("totalVertical", "$vertical"))
        );
      } else {
        pipeline = Arrays.asList(
            match(and(
                eq("skierID", skierID),
                eq("seasonID", seasonID)
            )),
            group(null, sum("totalVertical", "$vertical"))
        );
      }
      AggregateIterable<Document> result = collection.aggregate(pipeline);
      Document doc = result.first();
      if (doc == null) {
        return null;
      }
      // writes to Redis
      long value = doc.getInteger("totalVertical");
      try (Jedis jedis = redisPool.borrowChannel()) {
        String key = getRedisKey();
        jedis.hincrBy(key, "vertical", value);
      } catch (Exception e) {
        System.out.println("failed to cache data read from MongoDB");
      }
      return String.valueOf(value);
    } catch (Exception e) {
      System.out.println("exception: " + e);
      return null;
    }
  }

}
