package com.upic.query;

import static com.upic.validator.Params.DAY_ID_LOWER_BOUND;
import static com.upic.validator.Params.DAY_ID_UPPER_BOUND;
import static com.upic.validator.Params.RESORT_ID_LOWER_BOUND;
import static com.upic.validator.Params.RESORT_ID_UPPER_BOUND;
import static com.upic.validator.Params.SEASON_ID_LOWER_BOUND;
import static com.upic.validator.Params.SEASON_ID_UPPER_BOUND;

import com.google.gson.Gson;
import com.mongodb.client.DistinctIterable;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;

import java.util.*;
import java.util.stream.Collectors;

import com.mongodb.client.model.Filters;
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
  public Map<String, Object> getQueryMap() {
    Map<String, Object> queryMap = new HashMap<>();
    queryMap.put("resortID", resortID);
    queryMap.put("seasonID", seasonID);
    queryMap.put("dayID", dayID);
    return queryMap;
  }

  @Override
  public String queryMongoDBString(MongoDatabase mongoDB, String collectionName, Map<String, Object> conditions) {
    // TODO: check data model for method definition
    try {
      MongoCollection<Document> collection = mongoDB.getCollection(collectionName);
      List<Bson> filters = conditions.entrySet().stream()
              .map(entry -> Filters.eq(entry.getKey(), entry.getValue()))
              .toList();

      Bson combinedFilter = Filters.and(filters);
      DistinctIterable<Integer> uniqueSkierIDs = collection.distinct("skierID", combinedFilter, Integer.class);
      List<Integer> list = uniqueSkierIDs.into(new ArrayList<>());
      if (list.isEmpty()) {
        return "0";
      }
      return String.valueOf(list.size());
    } catch (Exception e) {
      System.out.println("exception: " + e);
      return null;
    }
  }

}
