package com.upic.query;

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

import com.google.gson.Gson;
import com.mongodb.ReadPreference;
import com.mongodb.client.AggregateIterable;
import com.mongodb.client.MongoCollection;
import com.upic.cacheWriter.CacheWriter;
import com.upic.cacheWriter.SaddTask;
import com.upic.redisPool.RedisPool;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import org.bson.Document;
import org.bson.conversions.Bson;
import redis.clients.jedis.Jedis;

/**
 * GetResortSkiers class. It gets the number of unique skiers at resort/season/day. e.g. Key:
 * resort:{resortID}:season:{seasonID}:day:{dayID}:skiers, Value: Set<int> Call scard(key) to get
 * the cardinality of the set. API: /resorts/{resortID}/seasons/{seasonID}/day/{dayID}/skiers
 */
public class GetResortSkiers extends Query {

  private final String urlPath;
  private int resortID;
  private int seasonID;
  private int dayID;

  /**
   * Constructor of GetResortSkier.
   *
   * @param gson       gson object
   * @param urlPath    the url path of GET request
   * @param redisPool  the redis channel pool
   * @param collection the mongodb collection reference
   */
  public GetResortSkiers(Gson gson, String urlPath, RedisPool redisPool,
      MongoCollection<Document> collection, CacheWriter cacheWriter) {
    super(gson, redisPool, collection, cacheWriter);
    this.urlPath = urlPath;
    this.resortID = -1;
    this.seasonID = -1;
    this.dayID = -1;
  }

  @Override
  public boolean validate() {
    String[] parts = urlPath.split("/");
    // ["", {resortID}, "seasons", {seasonID}, "day", {dayID}, "skiers"]
    //   0      1          2           3         4       5         6
    if (parts.length != 7) {
      return false;
    }
    this.resortID = Integer.parseInt(parts[1]);
    this.seasonID = Integer.parseInt(parts[3]);
    this.dayID = Integer.parseInt(parts[5]);
    return resortID >= RESORT_ID_LOWER_BOUND.getInt() && resortID <= RESORT_ID_UPPER_BOUND.getInt()
        && seasonID >= SEASON_ID_LOWER_BOUND.getInt() && seasonID <= SEASON_ID_UPPER_BOUND.getInt()
        && dayID >= DAY_ID_LOWER_BOUND.getInt() && dayID <= DAY_ID_UPPER_BOUND.getInt();
  }

  /**
   * Helper method. Get the redis key.
   *
   * @return the redis key
   */
  private String getRedisKey() {
    return "resort:" + resortID + ":season:" + seasonID + ":day:" + dayID + ":skiers";
  }

  @Override
  public String queryRedis() {
    String key = getRedisKey();
    try (Jedis jedis = RedisPool.getInstance().borrowChannel()) {
      if (jedis.exists(key)) {
        return String.valueOf(jedis.scard(key));
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
              eq("resortID", resortID),
              eq("seasonID", seasonID),
              eq("dayID", dayID)
          )),
          group("$skierID")
      );
      AggregateIterable<Document> result = collection.withReadPreference(
          ReadPreference.secondaryPreferred()).aggregate(pipeline);
      List<String> uniqueSkiers = new ArrayList<>();
      for (Document doc : result) {
        uniqueSkiers.add(doc.get("_id").toString());
      }
      cacheWriter.writeToCache(new SaddTask(redisPool, getRedisKey(), uniqueSkiers));
      return String.valueOf(uniqueSkiers.size());
    } catch (Exception e) {
      System.out.println("exception: " + e);
      return null;
    }
  }

}
