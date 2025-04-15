package com.upic.cacheWriter;

import com.upic.redisPool.RedisPool;
import java.util.List;
import redis.clients.jedis.Jedis;
import redis.clients.jedis.Pipeline;

public class SaddTask implements Runnable{

  private final RedisPool redisPool;
  private final String key;
  private final List<String> data;

  public SaddTask(RedisPool redisPool, String key, List<String> data) {
    this.redisPool = redisPool;
    this.key = key;
    this.data = data;
  }

  @Override
  public void run() {
    try (Jedis jedis = redisPool.borrowChannel()) {
      Pipeline pipe = jedis.pipelined();
      for (String s: data) {
        pipe.sadd(key, s);
      }
      pipe.sync();
    } catch (Exception e) {
      System.out.println("failed to cache data read from MongoDB");
    }
  }
}
