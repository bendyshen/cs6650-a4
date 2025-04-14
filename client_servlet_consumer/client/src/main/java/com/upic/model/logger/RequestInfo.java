package com.upic.model.logger;

import java.time.Instant;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;

/**
 * RequestInfo record class. It's used to store POST request information.
 *
 * @param startTime    start time of the POST request in milliseconds
 * @param endTime      end time of the POST request in milliseconds
 * @param requestType  type of the request, POST in this case
 * @param responseCode the response code from the server
 */
public record RequestInfo(long startTime, long endTime, String requestType, int responseCode) {

  private static final String DATE_TIME_FORMAT = "yyyy-MM-dd HH:mm:ss.SSS";

  @Override
  public String toString() {
    String formattedDateTime = Instant.ofEpochMilli(startTime).atOffset(ZoneOffset.UTC)
        .toLocalDateTime().format(DateTimeFormatter.ofPattern(DATE_TIME_FORMAT));
    long latency = endTime - startTime;
    return String.format("%s,%s,%d,%d%n", formattedDateTime, requestType, latency, responseCode);
  }
}
