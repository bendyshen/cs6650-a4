package com.upic.query;

import static com.upic.validator.Params.DAY_ID_LOWER_BOUND;
import static com.upic.validator.Params.DAY_ID_UPPER_BOUND;
import static com.upic.validator.Params.RESORT_ID_LOWER_BOUND;
import static com.upic.validator.Params.RESORT_ID_UPPER_BOUND;
import static com.upic.validator.Params.SEASON_ID_LOWER_BOUND;
import static com.upic.validator.Params.SEASON_ID_UPPER_BOUND;
import static com.upic.validator.Params.SKIER_ID_LOWER_BOUND;
import static com.upic.validator.Params.SKIER_ID_UPPER_BOUND;

import com.google.gson.Gson;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;
import redis.clients.jedis.Jedis;

/**
 * GetDayVertical class. It gets the get the total vertical for the skier for the specified ski day.
 * e.g. Key: "season:{seasonID}:day:{dayID}:skier:{skierID}:vertical", Value: int. Call incrBy(key,
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

  public GetDayVertical(Gson gson, String urlPath) {
    super(gson);
    this.urlPath = urlPath;
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

  @Override
  public String getRedisKey() {
    return "season:" + seasonID + ":day:" + dayID + ":skier:" + skierID + ":vertical";
  }


  @Override
  public String getMongoKey() {
    return "season:" + seasonID + ":day:" + dayID + ":skier:" + skierID + ":vertical";
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
