package com.upic.query;

import com.google.gson.Gson;
import com.mongodb.client.MongoCollection;
import com.upic.cacheWriter.CacheWriter;
import com.upic.redisPool.RedisPool;
import org.bson.Document;

/**
 * Query abstract class. It represents a query to the cache or the database.
 */
public abstract class Query {

  protected final Gson gson;
  protected final RedisPool redisPool;
  protected final MongoCollection<Document> collection;
  protected final CacheWriter cacheWriter;

  /**
   * Constructor for Query class.
   *
   * @param gson        the Gson instance.
   * @param redisPool   the redis connection pool.
   * @param collection  the collection reference in mongodb
   * @param cacheWriter the CachWriter instance
   */
  public Query(Gson gson, RedisPool redisPool, MongoCollection<Document> collection,
      CacheWriter cacheWriter) {
    this.gson = gson;
    this.redisPool = redisPool;
    this.collection = collection;
    this.cacheWriter = cacheWriter;
  }

  /**
   * Validates the query.
   *
   * @return true if the query is valid, false otherwise
   */
  public boolean validate() {
    return false;
  }

  /**
   * Queries the redis cache for result.
   *
   * @return the result string
   */
  public String queryRedis() {
    return null;
  }

  /**
   * Queries the mongodb for result.
   *
   * @return the result string
   */
  public String queryMongoDB() {
    return null;
  }

}
