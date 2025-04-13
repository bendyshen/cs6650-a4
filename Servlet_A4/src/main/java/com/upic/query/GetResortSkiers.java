package com.upic.query;

import static com.upic.validator.Params.DAY_ID_LOWER_BOUND;
import static com.upic.validator.Params.DAY_ID_UPPER_BOUND;
import static com.upic.validator.Params.RESORT_ID_LOWER_BOUND;
import static com.upic.validator.Params.RESORT_ID_UPPER_BOUND;
import static com.upic.validator.Params.SEASON_ID_LOWER_BOUND;
import static com.upic.validator.Params.SEASON_ID_UPPER_BOUND;

import com.google.gson.Gson;
import com.mongodb.client.MongoDatabase;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import org.bson.Document;
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

  public GetResortSkiers(Gson gson, String urlPath) {
    super(gson);
    this.urlPath = urlPath;
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

  @Override
  public String getRedisKey() {
    return "resort:" + resortID + ":season:" + seasonID + ":day:" + dayID + ":skiers";
  }

  @Override
  public List<String> queryRedisList(Jedis jedis, String key) {
    if (jedis == null) {
      return null;
    }
    if (jedis.exists(key)) {
      Set<String> uniqueSkiers = jedis.smembers(key);
      List<String> list = new ArrayList<>(uniqueSkiers.size());
      list.addAll(uniqueSkiers);
      return list;
    }
    return null;
  }

  @Override
  public String getMongoKey() {
    return "resort:" + resortID + ":season:" + seasonID + ":day:" + dayID + ":skiers";
  }

  @Override
  public List<Integer> queryMongoDBList(MongoDatabase mongoDB, String collection, String key) {
    // TODO: check data model for method definition
    try {
      System.out.println("MongoDB key: " + key);
      Document result = mongoDB.getCollection(collection).find(new Document("_id", key)).first();
      if (result == null) {
        System.out.println("result is null");
        return null;
      }
      return result.getList("skierIds", Integer.class);
    } catch (Exception e) {
      System.out.println("exception: " + e);
      return null;
    }
  }

}
