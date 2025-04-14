package com.upic.model.monitor;

import java.util.concurrent.ThreadPoolExecutor;
import org.slf4j.Logger;

/**
 * ThreadPoolMonitor class. It monitors the state of a ThreadPoolExecutor instance and produce
 * active thread count statistics.
 */
public class ThreadPoolMonitor implements Runnable {

  private int maxActiveThreadCount;
  private int minActiveThreadCount;
  private int runningActiveThreadCount;
  private int measurementCount;
  private boolean isMonitorOn;
  private Thread workerThread;
  private final int measurementInterval;
  private final ThreadPoolExecutor threadPoolExecutor;
  private final Logger globalLogger;

  /**
   * Constructor for ThreadPoolMonitor class.
   *
   * @param threadPoolExecutor  the threadPoolExecutor that is monitored
   * @param measurementInterval the measurement interval
   * @param globalLogger        the global logger used to log various information
   */
  public ThreadPoolMonitor(ThreadPoolExecutor threadPoolExecutor, int measurementInterval,
      Logger globalLogger) {
    this.isMonitorOn = false;
    this.workerThread = null;
    this.threadPoolExecutor = threadPoolExecutor;
    this.measurementInterval = measurementInterval;
    this.globalLogger = globalLogger;
    this.maxActiveThreadCount = Integer.MIN_VALUE;
    this.minActiveThreadCount = Integer.MAX_VALUE;
    this.runningActiveThreadCount = 0;
    this.measurementCount = 0;
  }

  /**
   * Start the monitor thread.
   */
  public void start() {
    isMonitorOn = true;
    workerThread = new Thread(this);
    workerThread.setPriority(1);
    workerThread.start();
  }

  /**
   * Shutdown the monitor thread.
   */
  public void shutdown() {
    isMonitorOn = false;
    try {
      workerThread.join();
    } catch (InterruptedException e) {
      Thread.currentThread().interrupt();
    }
  }

  /**
   * Prints the statistics in terminal.
   */
  public void showThreadPoolStatistics() {
    globalLogger.info(
        "-------------------------ThreadPoolMonitor Statistics-------------------------");
    globalLogger.info("[THREAD POOL]            {}", threadPoolExecutor.toString());
    globalLogger.info("[MAX ACTIVE THREADS]     {}", maxActiveThreadCount);
    globalLogger.info("[MIN ACTIVE THREADS]     {}", minActiveThreadCount);
    globalLogger.info("[AVG ACTIVE THREADS]     {}", runningActiveThreadCount / measurementCount);
    globalLogger.info("[NUM OF MEASUREMENT]     {}", measurementCount);
  }

  @Override
  public void run() {
    while (!threadPoolExecutor.isTerminated() && isMonitorOn) {
      if (Thread.currentThread().isInterrupted()) {
        Thread.currentThread().interrupt();
        break;
      }
      try {
        Thread.sleep(measurementInterval);
      } catch (InterruptedException e) {
        Thread.currentThread().interrupt();
        break;
      }
      int activeThreadCount = threadPoolExecutor.getActiveCount();
      measurementCount++;
      runningActiveThreadCount += activeThreadCount;
      maxActiveThreadCount = Math.max(maxActiveThreadCount, activeThreadCount);
      minActiveThreadCount = Math.min(minActiveThreadCount, activeThreadCount);
    }
  }
}
