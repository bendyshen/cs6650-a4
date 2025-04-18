package com.upic.model.requestProducer;

import static com.upic.model.task.TaskParams.DAY_ID_MAX;
import static com.upic.model.task.TaskParams.LIFT_ID_MAX;
import static com.upic.model.task.TaskParams.RESORT_ID_MAX;
import static com.upic.model.task.TaskParams.SEASON_ID_MAX;
import static com.upic.model.task.TaskParams.SKIER_ID_MAX;

import com.upic.model.logger.RequestInfo;
import io.swagger.client.ApiClient;
import io.swagger.client.ApiException;
import io.swagger.client.ApiResponse;
import io.swagger.client.api.SkiersApi;
import io.swagger.client.model.LiftRide;
import java.util.Random;
import org.slf4j.Logger;

/**
 * PostRequestMaker class. It is used to randomly produce the body of a POST request.
 */
public class PostRequestMaker {

  private static final String REQUEST_TYPE = "POST";
  private static final String CLIENT_ERROR_MESSAGE = "client error";
  private static final String SERVER_ERROR_MESSAGE = "server error";
  private static final int SC_CREATED = 201;
  private static final int SC_CLIENT_ERROR_LOW = 400;
  private static final int SC_CLIENT_ERROR_HIGH = 499;
  private static final int SC_SERVER_ERROR_LOW = 500;
  private static final int SC_SERVER_ERROR_HIGH = 599;
  private final int maxRetries;
  private final int resortID;
  private final int skierID;
  private final String seasonID;
  private final String dayID;
  private final LiftRide liftRide;
  private final SkiersApi skiersApi;
  private final Logger globalLogger;

  /**
   * Constructor for PostRequestMaker class.
   *
   * @param maxRetries   the maximum number of retry
   * @param rand         the random variable generator used for producing PostRequestMaker
   * @param apiClient    the API client used to make POST requests
   * @param globalLogger the global logger used to log various information
   */
  public PostRequestMaker(int maxRetries, Random rand, ApiClient apiClient, Logger globalLogger) {
    this.maxRetries = maxRetries;
    this.resortID = rand.nextInt(RESORT_ID_MAX.getInt()) + 1;
    this.skierID = rand.nextInt(SKIER_ID_MAX.getInt()) + 1;
    this.liftRide = new LiftRide();
    this.liftRide.setTime(rand.nextInt(LIFT_ID_MAX.getInt()) + 1);
    this.liftRide.setLiftID(rand.nextInt(LIFT_ID_MAX.getInt()) + 1);
    this.seasonID = "" + SEASON_ID_MAX.getInt();
    this.dayID = "" + DAY_ID_MAX.getInt();
    this.skiersApi = new SkiersApi(apiClient);
    this.globalLogger = globalLogger;
  }

  /**
   * Checks if the maximum retry count is reached.
   *
   * @param errorMessage the error message to log
   * @param responseCode the response code
   * @param retryCount   the current retry count
   * @param maxRetries   the max retry count
   * @return true if the maximum retry count is reached, false otherwise
   */
  private boolean reachedMaxRetryCount(String errorMessage, int responseCode, int retryCount,
      int maxRetries) {
    if (retryCount > maxRetries) {
      globalLogger.warn("[{}, status code: {}] max retry count reached", errorMessage,
          responseCode);
      return true;
    } else {
      globalLogger.warn("[{}, status code: {}] retrying ... ({}/{})", errorMessage, responseCode,
          retryCount, maxRetries);
      return false;
    }
  }

  /**
   * Make POST request. If the request failed, it will retry 5 times before terminating.
   *
   * @return RequestInfo instance containing request details if response code 201 is received, null
   * otherwise
   */
  public RequestInfo makeRequest() {
    int retryCount = 0;
    while (retryCount < maxRetries) {
      try {
        // send the POST request
        long start = System.currentTimeMillis();  // time stamp
        ApiResponse<Void> response = skiersApi.writeNewLiftRideWithHttpInfo(
            liftRide, resortID, seasonID, dayID, skierID);
        long end = System.currentTimeMillis();    // time stamp

        // get response code
        int responseCode = response.getStatusCode();

        // check response code
        if (responseCode == SC_CREATED) {
          return new RequestInfo(start, end, REQUEST_TYPE, responseCode);
        } else if (responseCode >= SC_CLIENT_ERROR_LOW && responseCode < SC_CLIENT_ERROR_HIGH) {
          retryCount++;
          if (reachedMaxRetryCount(CLIENT_ERROR_MESSAGE, responseCode, retryCount, maxRetries)) {
            break;
          }
        } else if (responseCode >= SC_SERVER_ERROR_LOW && responseCode <= SC_SERVER_ERROR_HIGH) {
          retryCount++;
          if (reachedMaxRetryCount(SERVER_ERROR_MESSAGE, responseCode, retryCount, maxRetries)) {
            break;
          }
        } else {
          globalLogger.warn("[unexpected response, status code: {}], request cancelled",
              responseCode);
          break;
        }
      } catch (ApiException e) {
        retryCount++;
        if (reachedMaxRetryCount(e.getMessage(), e.getCode(), retryCount, maxRetries)) {
          break;
        }
      }
    }
    return null;
  }
}
