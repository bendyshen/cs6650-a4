package com.upic.model.logger;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.concurrent.CancellationException;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.Future;
import org.slf4j.Logger;

/**
 * RequestLogger class. It is used to cache request info, calculate request statistics and persist
 * request info into a csv file.
 */
public class RequestLogger {

  private static final String LOGGER_CSV_HEADER = "Start Time,Request Type,Latency (ms),Response Code\n";
  private static final String LOGGER_INIT_ERROR_MESSAGE = "log initialization error";
  private static final String LOGGER_WRITE_ERROR_MESSAGE = "log write error";
  private static final String LOGGER_CACHE_ERROR_MESSAGE = "log cache error";
  private static final int BUFFER_SIZE = 200_000;
  private final String csvPath;
  private final List<Future<List<RequestInfo>>> buffer;
  private final Logger globalLogger;
  private boolean initFailed;

  /**
   * Constructor of the RequestLogger class.
   *
   * @param csvPath      the path to the csv file
   * @param globalLogger the global logger used to log various information
   */
  public RequestLogger(String csvPath, Logger globalLogger) {
    this.csvPath = csvPath;
    this.buffer = new ArrayList<>(BUFFER_SIZE);
    this.globalLogger = globalLogger;
    this.initFailed = false;
    initializeCsvFile();
  }

  /**
   * Initializes the CSV file with headers if it doesn't already exist. If the file already exists,
   * it will be deleted and a new log file will be created.
   */
  private void initializeCsvFile() {
    File file = new File(csvPath);
    if (file.exists() && !file.delete()) {
      globalLogger.error("[{}] cannot delete existing file {}", LOGGER_INIT_ERROR_MESSAGE, csvPath);
      initFailed = true;
      return;
    }
    try (FileWriter writer = new FileWriter(csvPath, true)) {
      writer.append(LOGGER_CSV_HEADER);
    } catch (IOException e) {
      globalLogger.error("[{}] failed to write to file {}", LOGGER_INIT_ERROR_MESSAGE,
          file.getAbsolutePath());
    }
  }

  /**
   * Gets all the RequestInfo instances from the buffer.
   *
   * @return a list of RequestInfo instances
   */
  private List<RequestInfo> getRequestInfos()
      throws CancellationException, ExecutionException, InterruptedException {
    List<RequestInfo> requestInfos = new ArrayList<>();
    for (Future<List<RequestInfo>> futureList : buffer) {
      requestInfos.addAll(futureList.get());
    }
    return requestInfos;
  }

  /**
   * Gets the sorted response time for all requests
   *
   * @return list of request response time
   * @throws CancellationException exception when the Future task is canceled
   * @throws ExecutionException    exception when failed to retrieve the result of the Future task
   * @throws InterruptedException  exception when current thread is interrupted
   */
  private List<Long> getSortedResponseTimes()
      throws CancellationException, ExecutionException, InterruptedException {
    List<RequestInfo> requestInfos = getRequestInfos();
    List<Long> responseTime = new ArrayList<>(requestInfos.size());
    for (RequestInfo requestInfo : requestInfos) {
      responseTime.add(requestInfo.endTime() - requestInfo.startTime());
    }
    Collections.sort(responseTime);
    return responseTime;
  }

  /**
   * Calculate mean response time.
   *
   * @param sortedResponseTime sorted response time
   * @return mean response time
   */
  private double calculateMean(List<Long> sortedResponseTime) {
    return sortedResponseTime.isEmpty() ? 0.0 :
        sortedResponseTime.stream()
            .mapToLong(Long::longValue)
            .average()
            .orElse(0.0);
  }

  /**
   * Calculate median response time.
   *
   * @param sortedResponseTime sorted response time
   * @return median response time
   */
  private double calculateMedian(List<Long> sortedResponseTime) {
    if (sortedResponseTime.isEmpty()) {
      globalLogger.error("failed to calculate median: response time is empty");
      return 0.0;
    }
    int size = sortedResponseTime.size();
    if (size % 2 == 1) {
      return sortedResponseTime.get(size / 2);
    } else {
      long left = sortedResponseTime.get(size / 2 - 1);
      long right = sortedResponseTime.get(size / 2);
      return (left + right) / 2.0;
    }
  }

  /**
   * Calculate 99th percentile response time.
   *
   * @param sortedResponseTime sorted response time
   * @return the 99th percentile response time
   */
  private long calculateP99(List<Long> sortedResponseTime) {
    int index = (int) (sortedResponseTime.size() * 0.99);
    return sortedResponseTime.get(index);
  }

  /**
   * Calculate minimum response time.
   *
   * @param sortedResponseTime sorted response time
   * @return the minimum response time
   */
  public long calculateMin(List<Long> sortedResponseTime) {
    return Collections.min(sortedResponseTime);
  }

  /**
   * Calculate maximum response time.
   *
   * @param sortedResponseTime sorted response time
   * @return the maximum response time
   */
  public long calculateMax(List<Long> sortedResponseTime) {
    return Collections.max(sortedResponseTime);
  }

  /**
   * Write the log cache to the csv log file. Not thread safe.
   */
  public void write() {
    if (initFailed) {
      globalLogger.error("[{}] request log already exits, failed to delete file {}",
          LOGGER_WRITE_ERROR_MESSAGE, csvPath);
      return;
    }
    if (buffer.isEmpty()) {
      globalLogger.error("[{}] buffer is empty", LOGGER_WRITE_ERROR_MESSAGE);
      return;
    }
    List<RequestInfo> requestInfos;
    try {
      requestInfos = getRequestInfos();
    } catch (CancellationException | ExecutionException | InterruptedException e) {
      globalLogger.error("[{}] {}", LOGGER_WRITE_ERROR_MESSAGE, e.getMessage());
      return;
    }
    try (FileWriter writer = new FileWriter(csvPath, true)) {
      for (RequestInfo requestInfo : requestInfos) {
        writer.append(requestInfo.toString());
      }
    } catch (IOException e) {
      globalLogger.error("[{}] {}", LOGGER_WRITE_ERROR_MESSAGE, e.getMessage());
    }

  }

  /**
   * Cache the request information.
   *
   * @param future Future instance that stores the request details
   */
  public void cache(Future<List<RequestInfo>> future) {
    buffer.add(future);
  }

  /**
   * Gets the number of request that are successfully sent.
   *
   * @return the number of request that are successfully sent
   * @throws CancellationException exception when the Future task is canceled
   * @throws ExecutionException    exception when failed to retrieve the result of the Future task
   * @throws InterruptedException  exception when current thread is interrupted
   */
  public int getSuccessfulRequestCount()
      throws CancellationException, ExecutionException, InterruptedException {
    return getRequestInfos().size();
  }

  /**
   * Prints out latency statistics.
   */
  public void showLatencyStatistics() {
    List<Long> responseTime;
    try {
      responseTime = getSortedResponseTimes();
    } catch (CancellationException | ExecutionException | InterruptedException e) {
      globalLogger.error("[{}] {}", LOGGER_CACHE_ERROR_MESSAGE, e.getMessage());
      return;
    }
    globalLogger.info("-------------------------Latency Statistics-------------------------");
    globalLogger.info("[MIN RESPONSE TIME]      {} ms", calculateMin(responseTime));
    globalLogger.info("[MAX RESPONSE TIME]      {} ms", calculateMax(responseTime));
    globalLogger.info("[MEAN RESPONSE TIME]     {} ms", calculateMean(responseTime));
    globalLogger.info("[MEDIAN RESPONSE TIME]   {} ms", calculateMedian(responseTime));
    globalLogger.info("[P99 RESPONSE TIME]      {} ms", calculateP99(responseTime));
  }
}
