package com.upic.cacheWriter;

import java.util.concurrent.LinkedBlockingQueue;
import java.util.concurrent.ThreadPoolExecutor;
import java.util.concurrent.TimeUnit;

/**
 * CacheWriter class. It writes data read from database to the Redis cache asynchronously. Singleton
 * pattern is used.
 */
public class CacheWriter {

  private static final int CORE_POOL_SIZE = 32;
  private static final int MAX_POOL_SIZE = 32;
  private static final int KEEP_ALIVE_TIME = 5;
  private static final int AWAIT_SHUTDOWN_TIME = 15;
  private final ThreadPoolExecutor workerPool;
  private static CacheWriter instance;

  /**
   * Constructor for CacheWriter class.
   *
   * @param corePoolSize    core thread count for the worker thread pool
   * @param maximumPoolSize maximum thread count for the worker thread pool
   * @param keepAliveTime   the keep alive time for each thread
   * @param timeUnit        the time unit for keep alive time
   */
  private CacheWriter(int corePoolSize, int maximumPoolSize, long keepAliveTime,
      TimeUnit timeUnit) {
    workerPool = new ThreadPoolExecutor(corePoolSize, maximumPoolSize, keepAliveTime, timeUnit,
        new LinkedBlockingQueue<>());
    workerPool.prestartAllCoreThreads();
    workerPool.allowCoreThreadTimeOut(true);
  }

  /**
   * Gets the CacheWriter instance.
   *
   * @return the CacheWriter instance
   */
  public static CacheWriter getInstance() {
    if (instance == null) {
      instance = new CacheWriter(CORE_POOL_SIZE, MAX_POOL_SIZE, KEEP_ALIVE_TIME, TimeUnit.MINUTES);
    }
    return instance;
  }

  /**
   * Calls hincrBy method to increment a hashed integer in Redis. Key and value are encapsulated
   * inside the runnable task.
   *
   * @param task the runnable task
   */
  public void writeToCache(HincrByTask task) {
    workerPool.submit(task);
  }

  /**
   * Calls sadd method to add elements into a set. Key and value are encapsulated inside the
   * runnable task.
   *
   * @param task the runnable task
   */
  public void writeToCache(SaddTask task) {
    workerPool.submit(task);
  }

  /**
   * Shuts down worker thread pool.
   */
  public void shutdown() {
    try {
      if (!workerPool.awaitTermination(AWAIT_SHUTDOWN_TIME, TimeUnit.SECONDS)) {
        workerPool.shutdownNow();
      }
    } catch (InterruptedException e) {
      Thread.currentThread().interrupt();
    }
  }
}
