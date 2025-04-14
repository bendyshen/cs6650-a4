package com.upic.model.taskConsumer;

import static com.upic.model.task.TaskParams.RAND_SEED;

import com.upic.model.logger.RequestLogger;
import com.upic.model.monitor.ThreadPoolMonitor;
import com.upic.model.task.Task;
import io.swagger.client.ApiClient;
import java.util.Random;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.ThreadPoolExecutor;
import java.util.concurrent.TimeUnit;
import org.slf4j.Logger;

/**
 * MultithreadedClient class. It uses a thread pool to simulate concurrent POST requests from
 * client.
 */
public class MultithreadedClient {

  private static final String DEFAULT_BASE_RUL = "http://localhost:8080/SkierServlet_A1/";
  private static final String DEFAULT_CSV_PATH = "logs/requestLog.csv";
  private static final int TOTAL_REQUEST_COUNT = 200_000;
  private static final int THREAD_PRIORITY = 10;
  private static final int THREAD_POOL_TIME_OUT = 5; // minutes
  private static final int MAX_RETRIES = 5;
  private final boolean isMonitorOn;
  private final Logger globalLogger;
  private final Random rand;
  private final ApiClient apiClient;
  private final ExecutorService consumer;
  private final ThreadPoolMonitor poolMonitor;
  private final RequestLogger requestLogger;

  /**
   * Constructor of MultithreadedClient class.
   *
   * @param baseUrl          the base URL for POST requests
   * @param requestLogPath   the file path for request information log
   * @param consumerPoolSize the thread count of the consumer thread pool
   * @param monitorInterval  the measurement interval for thread pool monitor
   * @param isMonitorOn      if thread monitor is on
   * @param globalLogger     the global logger used to log various information
   */
  public MultithreadedClient(String baseUrl, String requestLogPath, int consumerPoolSize,
      int monitorInterval, boolean isMonitorOn, Logger globalLogger) {
    this.rand = new Random(RAND_SEED.getInt());
    this.requestLogger = new RequestLogger(
        requestLogPath == null ? DEFAULT_CSV_PATH : requestLogPath,
        globalLogger);
    this.apiClient = new ApiClient().setBasePath(baseUrl == null ? DEFAULT_BASE_RUL : baseUrl);
    this.consumer = Executors.newFixedThreadPool(consumerPoolSize, new PriorityThreadFactory(THREAD_PRIORITY) {});
    this.poolMonitor = new ThreadPoolMonitor((ThreadPoolExecutor) consumer, monitorInterval, globalLogger);
    this.isMonitorOn = isMonitorOn;
    this.globalLogger = globalLogger;
  }

  /**
   * Initializes the client.
   */
  public void init() {
    if (isMonitorOn) {
      poolMonitor.start();
    }
    ((ThreadPoolExecutor) consumer).prestartAllCoreThreads();
    try {
      Thread.sleep(1000);
    } catch (InterruptedException e) {
      Thread.currentThread().interrupt();
    }
    globalLogger.info("consumer threads started ({}/{})",
        ((ThreadPoolExecutor) consumer).getPoolSize(),
        ((ThreadPoolExecutor) consumer).getMaximumPoolSize());
  }

  /**
   * Runs POST request tasks.
   *
   * @param batchCount the total amount of tasks
   * @param batchSize  the number of POST request per task
   * @param latch      the Countdown latch used for synchronization
   */
  public void runTask(int batchCount, int batchSize, CountDownLatch latch) {
    for (int i = 0; i < batchCount; i++) {
      requestLogger.cache(
          consumer.submit(new Task(batchSize, MAX_RETRIES, latch, rand, apiClient, globalLogger)));
    }
  }

  /**
   * Shuts down the client.
   */
  public void shutdownThreadPools() {
    if (isMonitorOn) {
      poolMonitor.shutdown();
    }
    consumer.shutdown();
    try {
      if (!consumer.awaitTermination(THREAD_POOL_TIME_OUT, TimeUnit.MINUTES)) {
        consumer.shutdownNow();
      }
    } catch (InterruptedException e) {
      Thread.currentThread().interrupt();
    }
  }

  /**
   * Persists the request info to the CSV log file.
   */
  public void writeRequestInfo() {
    requestLogger.write();
  }

  /**
   * Shows simulation statistics.
   */
  public void showStatistics(long startTime, long endTime)
      throws ExecutionException, InterruptedException {
    if (isMonitorOn) {
      poolMonitor.showThreadPoolStatistics();
    }
    requestLogger.showLatencyStatistics();

    double wallTimeSeconds = (endTime - startTime) / 1000.0;
    int sentRequestCount = requestLogger.getSuccessfulRequestCount();
    globalLogger.info("-------------------------Simulation Summary-------------------------");
    globalLogger.info("[REQUEST PRODUCED]       {}", TOTAL_REQUEST_COUNT);
    globalLogger.info("[REQUEST SENT]           {}", sentRequestCount);
    globalLogger.info("[REQUEST FAILED]         {}", TOTAL_REQUEST_COUNT - sentRequestCount);
    globalLogger.info("[THROUGHPUT]             {}/{}(s) = {}", sentRequestCount, wallTimeSeconds,
        sentRequestCount / wallTimeSeconds);

  }
}
