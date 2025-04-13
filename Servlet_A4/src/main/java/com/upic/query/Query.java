package com.upic.query;

import com.google.gson.Gson;
import com.mongodb.client.MongoDatabase;
import java.util.List;
import redis.clients.jedis.Jedis;

public abstract class Query {

  protected final Gson gson;

  public Query(Gson gson) {
    this.gson = gson;
  }

  public boolean validate() {
    return false;
  }

  public String getRedisKey() {
    return null;
  }

  public String getMongoKey() {
    return null;
  }

  public String queryRedisString(Jedis jedis, String key) {
    return null;
  }

  public List<String> queryRedisList(Jedis jedis, String key) {
    return null;
  }

  public String queryMongoDBString(MongoDatabase mongoDB, String collection, String key) {
    return null;
  }

  public List<Integer> queryMongoDBList(MongoDatabase mongoDB, String collection, String key) {
    return null;
  }
}
