package com.upic.model.taskConsumer;

import java.util.concurrent.ThreadFactory;

/**
 * PriorityThreadFactory class. It is used to create high priority threads in ThreadPoolExecutor.
 */
public class PriorityThreadFactory implements ThreadFactory {

  private final int priority;

  /**
   * Constructor of PriorityThreadFactory class.
   *
   * @param priority thread priority level (low = 1, mid = 5, high = 10)
   */
  public PriorityThreadFactory(int priority) {
    this.priority = priority;
  }

  @Override
  public Thread newThread(Runnable r) {
    Thread thread = new Thread(r);
    thread.setPriority(priority);
    return thread;
  }
}
