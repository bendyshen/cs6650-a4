package com.upic.control;

import com.upic.model.taskConsumer.MultithreadedClient;
import java.util.concurrent.CancellationException;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.ExecutionException;
import org.slf4j.Logger;

/**
 * SimulationManager class. It orchestras the concurrent client POST requests simulation.
 */
public class SimulationManager {

  private final int phaseOneBatchCount;
  private final int phaseOneBatchSize;
  private final int phaseTwoBatchCount;
  private final int phaseTwoBatchSize;
  private final CountDownLatch phaseOneLatch;
  private final CountDownLatch phaseTwoLatch;
  private final MultithreadedClient client;
  private final Logger globalLogger;

  /**
   * Constructor of SimulationManager class.
   *
   * @param baseUrl            the base URL for POST requests
   * @param requestLogPath     the file path for request information log
   * @param consumerPoolSize   the thread count of the consumer thread pool
   * @param phaseOneBatchCount the number of Tasks submitted to thread pool in phase one
   * @param phaseOneBatchSize  the number of POST request made by each Task in phase one
   * @param phaseOneLatchCount the Countdown latch used for synchronization in phase one
   * @param phaseTwoBatchCount the number of Tasks submitted to thread pool in phase two
   * @param phaseTwoBatchSize  the number of POST request made by each Task in phase two
   * @param phaseTwoLatchCount the Countdown latch used for synchronization in phase two
   * @param monitorInterval    the measurement interval for thread pool monitor
   * @param isMonitorOn        if thread monitor is on
   * @param globalLogger       the global logger used to log various information
   */
  public SimulationManager(String baseUrl, String requestLogPath, int consumerPoolSize,
      int phaseOneBatchCount,
      int phaseOneBatchSize,
      int phaseOneLatchCount, int phaseTwoBatchCount, int phaseTwoBatchSize, int phaseTwoLatchCount,
      int monitorInterval, boolean isMonitorOn, Logger globalLogger) {
    this.phaseOneBatchCount = phaseOneBatchCount;
    this.phaseOneBatchSize = phaseOneBatchSize;
    this.phaseTwoBatchCount = phaseTwoBatchCount;
    this.phaseTwoBatchSize = phaseTwoBatchSize;
    this.phaseOneLatch = new CountDownLatch(phaseOneLatchCount);
    this.phaseTwoLatch = new CountDownLatch(phaseTwoLatchCount);
    this.client = new MultithreadedClient(baseUrl, requestLogPath, consumerPoolSize,
        monitorInterval, isMonitorOn, globalLogger);
    this.globalLogger = globalLogger;
  }

  /**
   * Executes the simulation.
   */
  public void execute() {
    globalLogger.info("initializing thread pool...");
    client.init();

    globalLogger.info("simulation started");
    long startTime = System.currentTimeMillis();
    // start phase one
    client.runTask(phaseOneBatchCount, phaseOneBatchSize, phaseOneLatch);
    try {
      phaseOneLatch.await();
    } catch (InterruptedException e) {
      Thread.currentThread().interrupt();
    }
    // start phase two
    client.runTask(phaseTwoBatchCount, phaseTwoBatchSize, phaseTwoLatch);
    try {
      phaseTwoLatch.await();
    } catch (InterruptedException e) {
      Thread.currentThread().interrupt();
    }
    long endTime = System.currentTimeMillis();
    globalLogger.info("simulation completed");

    globalLogger.info("shutting down thread pools...");
    client.shutdownThreadPools();

    globalLogger.info("writing request log...");
    client.writeRequestInfo();

    globalLogger.info("calculating statistics...");
    try {
      client.showStatistics(startTime, endTime);
    } catch (CancellationException | ExecutionException | InterruptedException e) {
      globalLogger.error("[{}] failed to show simulation statistics", e.getMessage());
    }

    globalLogger.info("client shut down");
  }
}
