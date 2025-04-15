package com.upic.query;

import com.google.gson.Gson;
import com.mongodb.client.MongoCollection;
import com.upic.cacheWriter.CacheWriter;
import com.upic.redisPool.RedisPool;
import org.bson.Document;

public abstract class Query {

  protected final Gson gson;
  protected final RedisPool redisPool;
  protected final MongoCollection<Document> collection;
  protected final CacheWriter cacheWriter;

  public Query(Gson gson, RedisPool redisPool, MongoCollection<Document> collection, CacheWriter cacheWriter) {
    this.gson = gson;
    this.redisPool = redisPool;
    this.collection = collection;
    this.cacheWriter = cacheWriter;
  }

  public boolean validate() {
    return false;
  }

  public String queryRedis() {
    return null;
  }

  public String queryMongoDB() {
    return null;
  }

}
