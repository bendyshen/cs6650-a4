package com.upic.validator;

import static com.upic.validator.Params.DAY_ID_LOWER_BOUND;
import static com.upic.validator.Params.DAY_ID_UPPER_BOUND;
import static com.upic.validator.Params.EXPECTED_POST_REQUEST_BODY_TYPE;
import static com.upic.validator.Params.FIELD_1;
import static com.upic.validator.Params.FIELD_2;
import static com.upic.validator.Params.FIELD_3;
import static com.upic.validator.Params.LIFT_ID_LOWER_BOUND;
import static com.upic.validator.Params.LIFT_ID_UPPER_BOUND;
import static com.upic.validator.Params.RESORT_ID_LOWER_BOUND;
import static com.upic.validator.Params.RESORT_ID_UPPER_BOUND;
import static com.upic.validator.Params.SEASON_ID_LOWER_BOUND;
import static com.upic.validator.Params.SEASON_ID_UPPER_BOUND;
import static com.upic.validator.Params.SKIER_ID_LOWER_BOUND;
import static com.upic.validator.Params.SKIER_ID_UPPER_BOUND;
import static com.upic.validator.Params.TIME_LOWER_BOUND;
import static com.upic.validator.Params.TIME_UPPER_BOUND;
import static com.upic.validator.Params.URL_TOKEN_COUNT;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonSyntaxException;
import io.swagger.client.model.LiftRide;
import java.io.BufferedReader;
import java.io.IOException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * PostRequestValidator class. It provides comprehensive validation on the request URL and request
 * body.
 */
public class PostRequestValidator {

  /**
   * Validate post request url.
   *
   * @param request  the HTTP request
   * @param response the HTTP response
   * @return skierID if the url is not null or empty, and if it has the expected structure, the
   * correct fields and parameters, null otherwise
   * @throws IOException IO exception for response writer
   */
  public static JsonObject validateRequestUrl(HttpServletRequest request,
      HttpServletResponse response)
      throws IOException {
    // retrieve URL
    String urlPath = request.getPathInfo();
    // check if URL is not null and not empty
    if (!validateNonEmptyUrl(urlPath)) {
      response.setStatus(HttpServletResponse.SC_NOT_FOUND);
      response.getWriter().write("{\"error\":\"url path is empty\"}");
      return null;
    }
    // split url into tokens
    String[] url = urlPath.split("/");
    // check if URL has the correct fields
    if (!validateUrlFields(url)) {
      response.setStatus(HttpServletResponse.SC_NOT_FOUND);
      response.getWriter().write("{\"error\":\"invalid url fields\"}");
      return null;
    }
    JsonObject paramsJson;
    // check if URL has the correct parameters
    if ((paramsJson = validateUrlParams(url)) == null) {
      response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
      response.getWriter().write("{\"error\":\"invalid url parameters\"}");
      return null;
    }
    return paramsJson;
  }

  /**
   * Validate post request body.
   *
   * @param request  the HTTP request
   * @param response the HTTP response
   * @return JsonObject that represents a LiftRide object if the body is not empty, and if the body
   * is well formated with valid fields and parameters, null otherwise
   * @throws IOException IO exception for response writer
   */
  public static JsonObject validateRequestBody(Gson gson, HttpServletRequest request,
      HttpServletResponse response)
      throws IOException {
    // validate request body
    String requestBody = getRequestBody(request);
    // check if request body is in JSON format
    if (!validateRequestBodyType(request)) {
      response.setStatus(HttpServletResponse.SC_UNSUPPORTED_MEDIA_TYPE);
      response.getWriter().write("{\"error\":\"invalid request body type\"}");
      return null;
    }
    // check if request body not null and not empty
    if (!validateNonEmptyRequestBody(requestBody)) {
      response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
      response.getWriter().write("{\"error\":\"request body is empty\"}");
      return null;
    }
    // check if request body is well-formed
    LiftRide liftRide;
    try {
      if ((liftRide = gson.fromJson(requestBody, LiftRide.class)) == null) {
        response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
        response.getWriter().write("{\"error\":\"malformed json format\"}");
        return null;
      }
    } catch (JsonSyntaxException e) {
      response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
      response.getWriter().write("{\"error\":\"malformed json format\"}");
      return null;
    }
    // check if LiftRide instance is null or the instance's fields are null
    if (!validateRequestBodyFields(liftRide)) {
      response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
      response.getWriter().write("{\"error\":\"invalid liftRide fields\"}");
      return null;
    }
    // check if request body fields are valid
    if (!validateRequestBodyParams(liftRide)) {
      response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
      response.getWriter().write("{\"error\":\"invalid liftRide parameters\"}");
      return null;
    }
    return gson.fromJson(requestBody, JsonObject.class);
  }

  /**
   * Helper method. Check if URL path is empty.
   *
   * @param urlPath URL path
   * @return true if URL is not null and not empty, false otherwise
   */
  private static boolean validateNonEmptyUrl(String urlPath) {
    return urlPath != null && !urlPath.isEmpty();
  }

  /**
   * Helper method. Check if the URL fields are correct.
   *
   * @param url URL tokens
   * @return true if the URL fields are correct, false otherwise
   */
  private static boolean validateUrlFields(String[] url) {
    // check if the URL was split into the correct number of tokens
    if (url.length != URL_TOKEN_COUNT.getInt()) {
      return false;
    }
    // check if the split URL has the correct fields
    return FIELD_1.getString().equals(url[2])
        && FIELD_2.getString().equals(url[4])
        && FIELD_3.getString().equals(url[6]);
  }

  /**
   * Helper method. Check if the URL parameters are correct. urlPath =
   * "/skiers/{resortID}/seasons/{seasonID}/days/{dayID}/skier/{skierID}" url = [, resortID,
   * "seasons", seasonID, "days", dayID, "skiers", skierID]
   *
   * @param url URL tokens
   * @return JsonObject of the fields and parameters if the URL parameters are correct, null
   * otherwise
   */
  private static JsonObject validateUrlParams(String[] url) {
    int resortID;
    int seasonID;
    int dayID;
    int skierID;
    try {
      resortID = Integer.parseInt(url[1]);
      seasonID = Integer.parseInt(url[3]);
      dayID = Integer.parseInt(url[5]);
      skierID = Integer.parseInt(url[7]);
    } catch (NumberFormatException e) {
      return null;
    }
    if ((resortID >= RESORT_ID_LOWER_BOUND.getInt() && resortID <= RESORT_ID_UPPER_BOUND.getInt())
        && (seasonID >= SEASON_ID_LOWER_BOUND.getInt()
        && seasonID <= SEASON_ID_UPPER_BOUND.getInt())
        && (dayID >= DAY_ID_LOWER_BOUND.getInt() && dayID <= DAY_ID_UPPER_BOUND.getInt())
        && (skierID >= SKIER_ID_LOWER_BOUND.getInt() && skierID <= SKIER_ID_UPPER_BOUND.getInt())) {
      JsonObject paramsJson = new JsonObject();
      paramsJson.addProperty("resortID", resortID);
      paramsJson.addProperty("seasonID", seasonID);
      paramsJson.addProperty("dayID", dayID);
      paramsJson.addProperty("skierID", skierID);
      return paramsJson;
    } else {
      return null;
    }
  }

  /**
   * Helper method. Get the post request body.
   *
   * @param request the post request
   * @return the request body, null if the request body is empty
   */
  private static String getRequestBody(HttpServletRequest request) {
    StringBuilder requestBody = new StringBuilder();
    try (BufferedReader reader = request.getReader()) {
      String line;
      while ((line = reader.readLine()) != null) {
        requestBody.append(line);
      }
    } catch (Exception e) {
      return null;
    }
    return requestBody.toString();
  }

  /**
   * Helper method. Check if the post request body has the correct type.
   *
   * @param request the post request
   * @return true if the post request body has the EXPECTED_POST_REQUEST_BODY_TYPE, false otherwise
   */
  private static boolean validateRequestBodyType(HttpServletRequest request) {
    if (request.getContentType() == null || request.getContentType().isEmpty()) {
      return false;
    }
    return EXPECTED_POST_REQUEST_BODY_TYPE.getString().equals(request.getContentType());
  }

  /**
   * Helper method. Check if the post request body is empty.
   *
   * @param requestBody the post request body
   * @return true if the post request body not null and not empty, false otherwise
   */
  private static boolean validateNonEmptyRequestBody(String requestBody) {
    return requestBody != null && !requestBody.isEmpty();
  }

  /**
   * Helper method. Check if the LiftRide object formed from post request body has the valid
   * fields.
   *
   * @param liftRide the LiftRide object
   * @return true if the LiftRide object has the valid fields, false otherwise
   */
  private static boolean validateRequestBodyFields(LiftRide liftRide) {
    return liftRide.getTime() != null && liftRide.getLiftID() != null;
  }

  /**
   * Helper method. Check if the LiftRide object formed from post request body has the valid
   * parameters.
   *
   * @param liftRide the LiftRide object
   * @return true if the LiftRide object has the valid parameters, false otherwise
   */
  private static boolean validateRequestBodyParams(LiftRide liftRide) {
    return (liftRide.getLiftID() >= LIFT_ID_LOWER_BOUND.getInt()
        && liftRide.getLiftID() <= LIFT_ID_UPPER_BOUND.getInt())
        && (liftRide.getTime() >= TIME_LOWER_BOUND.getInt()
        && liftRide.getTime() <= TIME_UPPER_BOUND.getInt());
  }
}
