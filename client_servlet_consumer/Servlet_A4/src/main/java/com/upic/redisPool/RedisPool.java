package com.upic.redisPool;

import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;
import redis.clients.jedis.JedisPoolConfig;

/**
 * RedisPool class. It provides a Jedis channel pool that contains a number of channels specified by
 * the user.
 */
public class RedisPool {
  private static final String REDIS_HOST = "35.91.207.184";   // TODO: check before run
  private static final int REDIS_PORT = 6379;             // TODO: check before run
  private static final int REDIS_POOL_SIZE = 32;
  private static final int MIN_IDLE = 1;
  private static final Boolean IS_TEST_ON = true;
  private final JedisPool jedisPool;
  private static RedisPool instance;

  /**
   * Constructor for RedisPool class.
   *
   * @param jedisPoolSize the Jedis pool size.
   * @param redisHost     the redis host address.
   * @param redisPort     the redis host port.
   */
  private RedisPool(int jedisPoolSize, String redisHost, int redisPort) {
    JedisPoolConfig config = createJedisPoolConfig(jedisPoolSize);
    jedisPool = new JedisPool(config, redisHost, redisPort);
  }

  /**
   * Singleton pattern to get RedisPool instance.
   * @return the RedisPool instance
   */
  public static RedisPool getInstance() {
     if (instance == null) {
       instance = new RedisPool(REDIS_POOL_SIZE, REDIS_HOST, REDIS_PORT);
     }
     return instance;
  }

  /**
   * Helper method. Creates a JedisPoolConfig instance, which is used to create the JedisPool
   * instance.
   *
   * @param jedisPoolSize the size of the jedis pool.
   * @return a JedisPoolConfig instance.
   */
  private JedisPoolConfig createJedisPoolConfig(int jedisPoolSize) {
    JedisPoolConfig jedisPoolConfig = new JedisPoolConfig();
    jedisPoolConfig.setMaxTotal(jedisPoolSize);
    jedisPoolConfig.setMaxIdle(jedisPoolSize);
    jedisPoolConfig.setMinIdle(MIN_IDLE);
    jedisPoolConfig.setTestOnBorrow(IS_TEST_ON);
    return jedisPoolConfig;
  }

  /**
   * Flushes the Redis cache. Only used for testing to make sure Redis cache is empty before each
   * simulation run.
   */
  public void flush() {
    try (Jedis jedis = jedisPool.getResource()) {
      jedis.flushAll();
    } catch (Exception e) {
      throw new RuntimeException(e);
    }
  }

  /**
   * Borrows a Redis connection channel from JedisPool.
   *
   * @return a Redis connection channel
   */
  public Jedis borrowChannel() {
    return jedisPool.getResource();
  }

  /**
   * Returns a Redis connection channel back to the JedisPool. Note that the close() method does not
   * actually close the Jedis connection channel, it only returns the channel back to the JedisPool
   * instance. Calling close() on the JedisPool instance will effectively close all channels it
   * maintains. In addition, since Jedis extends BinaryJedis which implements Closeable, instead of
   * calling this method directly, try-with-resources can be used to manage the Jedis channel.
   *
   * @param jedis the Redis connection channel that needs to be returned.
   */
  public void returnChannel(Jedis jedis) {
    if (jedis != null) {
      jedis.close();
    }
  }

  /**
   * Close the jedis pool.
   */
  public void close() {
    if (jedisPool != null && !jedisPool.isClosed()) {
      jedisPool.close();
    }
  }
}
