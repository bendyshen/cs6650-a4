package com.upic.model.task;

import com.upic.model.logger.RequestInfo;
import com.upic.model.requestProducer.PostRequestMaker;
import io.swagger.client.ApiClient;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.concurrent.Callable;
import java.util.concurrent.CountDownLatch;
import org.slf4j.Logger;

/**
 * Task class. It makes POST request to the server. Each task will make a given amount of POST
 * request and return the request information as a Future instance.
 */
public class Task implements Callable<List<RequestInfo>> {

  private final int requestCount;
  private final int maxRetries;
  private final CountDownLatch latch;
  private final Random rand;
  private final ApiClient apiClient;
  private final Logger globalLogger;

  /**
   * Constructor for Task class.
   *
   * @param requestCount the number of POST request to make
   * @param maxRetries   the maximum number of retry
   * @param latch        the Countdown latch used for synchronization
   * @param rand         the random variable generator used for producing PostRequestMaker
   * @param apiClient    the API client used to make POST requests
   * @param globalLogger the global logger used to log various information
   */
  public Task(int requestCount, int maxRetries, CountDownLatch latch, Random rand,
      ApiClient apiClient, Logger globalLogger) {
    this.requestCount = requestCount;
    this.maxRetries = maxRetries;
    this.latch = latch;
    this.rand = rand;
    this.apiClient = apiClient;
    this.globalLogger = globalLogger;
  }

  @Override
  public List<RequestInfo> call() {
    List<RequestInfo> requestInfos = new ArrayList<>();
    for (int i = 0; i < requestCount; i++) {
      RequestInfo requestInfo = new PostRequestMaker(maxRetries, rand, apiClient,
          globalLogger).makeRequest();
      requestInfos.add(requestInfo);
    }
    if (latch != null) {
      latch.countDown();
    }
    return requestInfos;
  }
}
