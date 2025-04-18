
import static com.upic.model.task.TaskParams.RAND_SEED;

import com.upic.model.logger.RequestInfo;
import com.upic.model.logger.RequestLogger;
import com.upic.model.task.Task;
import io.swagger.client.ApiClient;
import java.util.List;
import java.util.Random;
import java.util.concurrent.CancellationException;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;
import java.util.concurrent.TimeUnit;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class SingleClientTest {
  private static final String DEFAULT_BASE_RUL = "http://localhost:8080/SkierServlet_A3/";
  private static final String DEFAULT_CSV_PATH = "logs/requestLog.csv";
  private static final int THREAD_POOL_TIME_OUT = 5; // minutes
  private static final int TASK_REQUEST_COUNT = 1;
  private static final int MAX_RETRIES = 5;
  public static final int TOTAL_REQUEST_COUNT = 200_000;
  private final Random rand;
  private final ApiClient apiClient;
  private final RequestLogger requestLogger;
  private final Logger globalLogger;
  private final ExecutorService consumer;

  public SingleClientTest(String baseUrl, String requestLogPath, Logger globalLogger) {
    this.rand = new Random(RAND_SEED.getInt());
    this.apiClient = new ApiClient().setBasePath(baseUrl == null ? DEFAULT_BASE_RUL : baseUrl);
    this.globalLogger = globalLogger;
    this.requestLogger = new RequestLogger(
        requestLogPath == null ? DEFAULT_CSV_PATH : requestLogPath,
        globalLogger);
    this.consumer = Executors.newSingleThreadExecutor();
  }

  public void runTask(int batchCount, CountDownLatch latch) {
    for (int i = 0; i < batchCount; i++) {
      Future<List<RequestInfo>> future = consumer.submit(
          new Task(TASK_REQUEST_COUNT, MAX_RETRIES, latch, rand, apiClient, globalLogger));
      requestLogger.cache(future);
    }
  }

  public void shutdownThreadPools() {
    consumer.shutdown();
    try {
      if (!consumer.awaitTermination(THREAD_POOL_TIME_OUT, TimeUnit.MINUTES)) {
        consumer.shutdownNow();
      }
    } catch (InterruptedException e) {
      Thread.currentThread().interrupt();
    }
  }

  public void writeRequestInfo() {
    requestLogger.write();
  }

  /**
   * Shows simulation statistics.
   */
  public void showStatistics(long startTime, long endTime)
      throws ExecutionException, InterruptedException {
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

  public static void main(String[] args) {
    Logger globalLogger = LoggerFactory.getLogger("SingleThreadTestLogger");
    SingleClientTest testClient = new SingleClientTest(null, "logs/testRequestLog.csv", globalLogger);

    globalLogger.info("simulation started");
    long startTime = System.currentTimeMillis();
    CountDownLatch latch = new CountDownLatch(TOTAL_REQUEST_COUNT);
    testClient.runTask(TOTAL_REQUEST_COUNT, latch);
    try {
      latch.await();
    } catch (InterruptedException e) {
      Thread.currentThread().interrupt();
    }
    long endTime = System.currentTimeMillis();
    globalLogger.info("simulation completed");

    globalLogger.info("shutting down thread pools...");
    testClient.shutdownThreadPools();

    globalLogger.info("writing request log...");
    testClient.writeRequestInfo();

    globalLogger.info("calculating statistics...");
    try {
      testClient.showStatistics(startTime, endTime);
    } catch (CancellationException | ExecutionException | InterruptedException e) {
      globalLogger.error("[{}] failed to show simulation statistics", e.getMessage());
    }

    globalLogger.info("test client shut down");
  }
}
