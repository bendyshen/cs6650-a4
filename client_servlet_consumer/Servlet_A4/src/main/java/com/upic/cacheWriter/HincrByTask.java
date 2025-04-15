package com.upic.cacheWriter;

import com.upic.redisPool.RedisPool;
import redis.clients.jedis.Jedis;

public class HincrByTask implements Runnable{
  private final RedisPool redisPool;
  private final String key;
  private final long data;

  public HincrByTask(RedisPool redisPool, String key, long data) {
    this.redisPool = redisPool;
    this.key = key;
    this.data = data;
  }
  @Override
  public void run() {
    try (Jedis jedis = redisPool.borrowChannel()) {
      jedis.hincrBy(key, "vertical", data);
    } catch (Exception e) {
      System.out.println("failed to cache data read from MongoDB");
    }
  }
}
