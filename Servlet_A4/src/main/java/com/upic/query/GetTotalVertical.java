package com.upic.query;

import com.google.gson.Gson;
import com.mongodb.client.AggregateIterable;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;
import redis.clients.jedis.Jedis;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

import static com.upic.query.GetDayVertical.getTotalVerticalString;
import static com.upic.validator.Params.*;

/**
 * GetTotalVertical class. It gets the total vertical for the skier for specified seasons at the
 * specified resort. If no season is specified, return all seasons. e.g. Key:
 * skiers:{skierID}:vertical, Value: int or Key: skiers:{skierID}:season:{seasonID}:vertical, Value:
 * int. Call incrBy(key, increment) to initializes the value to a key to 0 if the key does not
 * exist, otherwise increment the existing value by the amount passed as argument. API:
 * /skiers/{skierID}/vertical?resort=x or /skiers/{skierID}/vertical?resort=x?season=x
 */
public class GetTotalVertical extends Query {

  private final String urlPath;
  private int seasonID;
  private int skierID;
  private int resortID;

  public GetTotalVertical(Gson gson, String urlPath) {
    super(gson);
    this.urlPath = urlPath;
    this.seasonID = -1;
    this.skierID = -1;
    this.resortID = -1;
  }

  @Override
  public boolean validate() {
    String[] parts = urlPath.split("/");
    // ["", {skierID}, vertical, resort, resortID] or ["", {skierID}, "vertical", resort, resortID, "season", {seasonID}]
    if (parts.length != 5 && parts.length != 7) {
      return false;
    }

    try {
      this.skierID = Integer.parseInt(parts[1]);
      this.resortID = Integer.parseInt(parts[4]);
      if (parts.length == 5) {
        return skierID >= SKIER_ID_LOWER_BOUND.getInt()
                && skierID <= SKIER_ID_UPPER_BOUND.getInt()
                && resortID >= RESORT_ID_LOWER_BOUND.getInt()
                && resortID <= RESORT_ID_UPPER_BOUND.getInt();
      }

      // optional param: seasonID
      this.seasonID = Integer.parseInt(parts[6]);
      return skierID >= SKIER_ID_LOWER_BOUND.getInt()
              && skierID <= SKIER_ID_UPPER_BOUND.getInt()
              && resortID >= RESORT_ID_LOWER_BOUND.getInt()
              && resortID <= RESORT_ID_UPPER_BOUND.getInt()
              && seasonID >= SEASON_ID_LOWER_BOUND.getInt()
              && seasonID <= SEASON_ID_UPPER_BOUND.getInt();

    } catch (NumberFormatException e) {
      System.err.println(e.getMessage());
      return false;
    }
  }

  @Override
  public String getRedisKey() {
    if (seasonID == -1) {
      return "skier:" + skierID + ":vertical";
    }
    return "skier:" + skierID + ":season:" + seasonID + ":vertical";
  }

  @Override
  public String queryRedisString(Jedis jedis, String key) {
    if (jedis == null) {
      return null;
    }
    if (jedis.exists(key)) {
      return gson.toJson(jedis.get(key));
    }
    return null;
  }

  @Override
  public Map<String, Object> getQueryMap() {
    Map<String, Object> queryMap = new HashMap<>();
    if (seasonID != -1) {
      queryMap.put("seasonID", seasonID);
    }
    queryMap.put("skierID", skierID);
    queryMap.put("resortID", resortID);
    return queryMap;
  }

  @Override
  public String queryMongoDBString(MongoDatabase mongoDB, String collectionName, Map<String, Object> queryMap) {
    return getTotalVerticalString(mongoDB, collectionName, queryMap);
  }

}
