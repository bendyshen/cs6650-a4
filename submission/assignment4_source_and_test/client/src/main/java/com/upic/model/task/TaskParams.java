package com.upic.model.task;

/**
 * TaskParam enum class. It stores simulation parameters that are used to create Task instances and
 * make POST requests.
 */
public enum TaskParams {
  RAND_SEED(6650),

  SKIER_ID_MIN(1),
  SKIER_ID_MAX(100_000),

  RESORT_ID_MIN(1),
  //  RESORT_ID_MAX(10),
  RESORT_ID_MAX(1),

  LIFT_ID_MIN(1),
  LIFT_ID_MAX(40),

  SEASON_ID_MIN(2025),
  SEASON_ID_MAX(2025),

  DAY_ID_MIN(3),
  DAY_ID_MAX(3),

  TIME_MIN(1),
  TIME_MAX(360);

  private final Object value;

  TaskParams(Object value) {
    this.value = value;
  }

  public int getInt() {
    return (int) value;
  }

}
