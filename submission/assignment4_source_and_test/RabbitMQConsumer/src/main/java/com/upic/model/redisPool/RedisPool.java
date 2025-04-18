package com.upic.model.redisPool;

import org.slf4j.Logger;
import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;
import redis.clients.jedis.JedisPoolConfig;

/**
 * RedisPool class. It provides a Jedis channel pool to Redis worker threads for writing to the
 * Redis instance.
 */
public class RedisPool {

  private static final String FLUSH_ERROR = "failed to flush all Redis database";
  private static final int MIN_IDLE = 0;
  private static final Boolean IS_TEST_ON = true;
  private final Logger globalLogger;
  private final JedisPool jedisPool;

  /**
   * Constructor for RedisPool class.
   *
   * @param jedisPoolSize the Jedis pool size.
   * @param redisHost     the redis host address.
   * @param redisPort     the redis host port.
   */
  public RedisPool(Logger globalLogger, int jedisPoolSize, String redisHost, int redisPort) {
    this.globalLogger = globalLogger;
    JedisPoolConfig config = createJedisPoolConfig(jedisPoolSize);
    this.jedisPool = new JedisPool(config, redisHost, redisPort);
    globalLogger.info("redis connection pool initialization successful");
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
      globalLogger.error("[{}]{}", FLUSH_ERROR, e.getMessage());
    }
    globalLogger.info("redis cache flush successful");
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
