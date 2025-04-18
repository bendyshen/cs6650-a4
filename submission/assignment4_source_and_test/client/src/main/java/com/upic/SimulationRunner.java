package com.upic;

import com.upic.control.SimulationManager;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class SimulationRunner {

  // url for EC2 testing
  private static final String EC2_BASE_URL = "http://tomcat-551082373.us-west-2.elb.amazonaws.com/Servlet_A4"; // TODO: check before run

  // consumer thread pool parameters
  private static final int CONSUMER_POOL_SIZE = 200;
  // simulation parameters
  private static final int PHASE_ONE_BATCH_COUNT = 32;
  private static final int PHASE_ONE_BATCH_SIZE = 1000;
  private static final int PHASE_ONE_LATCH_COUNT = 1;

  private static final int PHASE_TWO_BATCH_COUNT = 200;
  private static final int PHASE_TWO_BATCH_SIZE = 840;
  private static final int PHASE_TWO_LATCH_COUNT = 200;

  // measurement interval for thread pool monitor
  private static final int MONITOR_MEASURE_INTERVAL = 10;  // milliseconds
  private static final boolean MONITOR_ON = false;

  public static void main(String[] args) {
    String baseUrl = EC2_BASE_URL;
    if (args.length == 1) {
      baseUrl = args[0];
    }
    Logger globalLogger = LoggerFactory.getLogger(SimulationRunner.class);
    SimulationManager manager = new SimulationManager(
        baseUrl,
        null,
        CONSUMER_POOL_SIZE,
        PHASE_ONE_BATCH_COUNT,
        PHASE_ONE_BATCH_SIZE,
        PHASE_ONE_LATCH_COUNT,
        PHASE_TWO_BATCH_COUNT,
        PHASE_TWO_BATCH_SIZE,
        PHASE_TWO_LATCH_COUNT,
        MONITOR_MEASURE_INTERVAL,
        MONITOR_ON,
        globalLogger);
    manager.execute();
  }
}
