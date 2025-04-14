package com.upic.validator;

/**
 * Parameters for URL and request body validation.
 */
public enum Params {
  URL_TOKEN_COUNT(8),

  FIELD_1("seasons"),
  FIELD_2("days"),
  FIELD_3("skiers"),

  SKIER_ID_LOWER_BOUND(1),
  SKIER_ID_UPPER_BOUND(100_000),

  RESORT_ID_LOWER_BOUND(1),
  RESORT_ID_UPPER_BOUND(10),

  LIFT_ID_LOWER_BOUND(1),
  LIFT_ID_UPPER_BOUND(40),

  SEASON_ID_LOWER_BOUND(2025),
  SEASON_ID_UPPER_BOUND(2025),

  DAY_ID_LOWER_BOUND(1),
  DAY_ID_UPPER_BOUND(3), // changed upper bound based on assignment 4 requirements

  TIME_LOWER_BOUND(1),
  TIME_UPPER_BOUND(360),

  EXPECTED_POST_REQUEST_BODY_TYPE("application/json; charset=utf-8");

  private final Object value;

  Params(Object value) {
    this.value = value;
  }

  public int getInt() {
    return (int) value;
  }

  public String getString() {
    return (String) value;
  }

}
