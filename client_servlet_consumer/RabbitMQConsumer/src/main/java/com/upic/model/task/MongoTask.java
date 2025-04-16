package com.upic.model.task;

import com.mongodb.client.MongoCollection;
import java.util.ArrayList;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.atomic.AtomicInteger;
import org.bson.Document;
import org.slf4j.Logger;

/**
 * MongoTask class. It represents a write operation to the MongoDB. It batch-writes all the messages
 * processed in this task.
 */
public class MongoTask implements Runnable {

  private final Logger globalLogger;
  private final MongoCollection<Document> mongoCollection;
  private final BlockingQueue<Document> mongoQueue;
  private final int batchSize;
  private final CountDownLatch mongoLatch;
  private final AtomicInteger messageCounter;

  /**
   * Constructor for MongoTask class.
   *
   * @param globalLogger        global logger used to log various information
   * @param batchSize           the number of messages processed in the task
   * @param mongoLatch          the countdown latch
   * @param mongoCollection     the reference to the collection
   * @param mongoQueue          the message queue that contains write data
   * @param mongoMessageCounter the message counter
   */
  public MongoTask(Logger globalLogger, int batchSize, CountDownLatch mongoLatch,
      MongoCollection<Document> mongoCollection,
      BlockingQueue<Document> mongoQueue, AtomicInteger mongoMessageCounter) {
    this.globalLogger = globalLogger;
    this.mongoCollection = mongoCollection;
    this.mongoQueue = mongoQueue;
    this.batchSize = batchSize;
    this.mongoLatch = mongoLatch;
    this.messageCounter = mongoMessageCounter;
  }

  @Override
  public void run() {
    ArrayList<Document> buffer = new ArrayList<>();
    try {
      // cache all documents processed by the current thread
      for (int i = 0; i < batchSize; i++) {
        try {
          Document doc = mongoQueue.take();  // blocking call
          buffer.add(doc);
          messageCounter.incrementAndGet();
          mongoLatch.countDown();
        } catch (InterruptedException e) {
          Thread.currentThread().interrupt();
        } catch (Exception e) {
          globalLogger.error(e.getMessage());
        }
      }
      // batch write to MongoDB
      mongoCollection.insertMany(new ArrayList<>(buffer));
    } catch (Exception e) {
      globalLogger.error(e.getMessage());
    }
  }
}
