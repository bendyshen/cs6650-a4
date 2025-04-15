package com.upic.cacheWriter;

import java.util.concurrent.LinkedBlockingQueue;
import java.util.concurrent.ThreadPoolExecutor;
import java.util.concurrent.TimeUnit;

public class CacheWriter {

  private static final int CORE_POOL_SIZE = 32;
  private static final int MAX_POOL_SIZE = 32;
  private static final int KEEP_ALIVE_TIME = 5;
  private static final TimeUnit TIME_UNIT = TimeUnit.MINUTES;
  private static final int AWAIT_SHUTDOWN_TIME = 1;
  private final ThreadPoolExecutor workerPool;
  private static CacheWriter instance;

  private CacheWriter(int corePoolSize, int maximumPoolSize, long keepAliveTime,
      TimeUnit timeUnit) {
    workerPool = new ThreadPoolExecutor(corePoolSize, maximumPoolSize, keepAliveTime, timeUnit,
        new LinkedBlockingQueue<>());
    workerPool.prestartAllCoreThreads();
    workerPool.allowCoreThreadTimeOut(true);
  }

  public static CacheWriter getInstance() {
    if (instance == null) {
      instance = new CacheWriter(CORE_POOL_SIZE, MAX_POOL_SIZE, KEEP_ALIVE_TIME, TIME_UNIT);
    }
    return instance;
  }

  public void writeToCache(HincrByTask task) {
    workerPool.submit(task);
  }

  public void writeToCache(SaddTask task) {
    workerPool.submit(task);
  }

  public void shutdown() {
    try {
      if(!workerPool.awaitTermination(AWAIT_SHUTDOWN_TIME, TIME_UNIT)) {
        workerPool.shutdownNow();
      }
    } catch (InterruptedException e) {
      Thread.currentThread().interrupt();
    }
  }
}
