package com.upic.query;

import static com.upic.validator.Params.SEASON_ID_LOWER_BOUND;
import static com.upic.validator.Params.SEASON_ID_UPPER_BOUND;
import static com.upic.validator.Params.SKIER_ID_LOWER_BOUND;
import static com.upic.validator.Params.SKIER_ID_UPPER_BOUND;

import com.google.gson.Gson;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;
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

  public GetTotalVertical(Gson gson, String urlPath) {
    super(gson);
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
  public String getMongoKey() {
    if (seasonID == -1) {
      return "skier:" + skierID + ":vertical";
    }
    return "skier:" + skierID + ":season:" + seasonID + ":vertical";
  }

  @Override
  public String queryMongoDBString(MongoDatabase mongoDB, String collection, String key) {
    try {
      System.out.println("MongoDB key: " + key);
      Document result = mongoDB.getCollection(collection).find(new Document("_id", key)).first();
      if (result == null) {
        System.out.println("result is null");
        return null;
      }
      return String.valueOf(result.getInteger("vertical"));
    } catch (Exception e) {
      System.out.println("exception: " + e);
      return null;
    }
  }

}
