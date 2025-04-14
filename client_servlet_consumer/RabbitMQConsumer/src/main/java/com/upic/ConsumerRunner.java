package com.upic;

import com.upic.control.ConsumerManager;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * ConsumerRunner class. It runs the simulation.
 */
public class ConsumerRunner {

  // RabbitMQ connection parameters
  private static final String RABBITMQ_EXCHANGE_NAME = "LiftRidePostExchange";  // TODO: check before run
  private static final String RABBITMQ_ROUTING_KEY = "LiftRidePostRoutingKey";  // TODO: check before run
  private static final String RABBITMQ_QUEUE_NAME = "LiftRidePostQueue";        // TODO: check before run
  private static final String RABBITMQ_URI_STRING = "amqp://guest:guest@35.87.74.182:5672";  // TODO: check before run
  // RabbitMQ channel pool parameters
  private static final int RABBITMQ_CONSUMER_COUNT = 128;
  private static final int RABBITMQ_PREFETCH_COUNT = 5000;

  // Redis connection parameters
  private static final String REDIS_HOST = "54.70.46.97"; // TODO: check before run
  private static final int REDIS_PORT = 6379;             // TODO: check before run
  // Redis channel pool parameters
  private static final int REDIS_CHANNEL_POOL_SIZE = 128;

  // MongoDB connection parameters
  private static final String MONGODB_CONNECTION_STRING = "mongodb://35.87.19.112:27017"; // TODO: check before run
  private static final String MONGODB_DATABASE_NAME = "assignment4";                      // TODO: check before run
  private static final String MONGODB_COLLECTION_NAME = "LiftRide";                       // TODO: check before run
  private static final int MONGODB_MAX_CONNECTIONS = 128;
  private static final int MONGODB_MIN_IDLE_CONNECTIONS = 1;

  // Redis worker thread pool parameters
  private static final int REDIS_WORKER_POOL_SIZE = 100;
  private static final int REDIS_BATCH_COUNT = 100;
  private static final int REDIS_BATCH_SIZE = 2000;

  // Redis worker thread pool parameters
  private static final int MONGO_WORKER_POOL_SIZE = 100;
  private static final int MONGO_BATCH_COUNT = 100;
  private static final int MONGO_BATCH_SIZE = 2000;

  public static void main(String[] args) {
    Logger globalLogger = LoggerFactory.getLogger("ConsumerRunner");
    ConsumerManager consumerManager = new ConsumerManager(globalLogger, RABBITMQ_URI_STRING,
        RABBITMQ_EXCHANGE_NAME, RABBITMQ_QUEUE_NAME, RABBITMQ_ROUTING_KEY, RABBITMQ_CONSUMER_COUNT,
        RABBITMQ_PREFETCH_COUNT, REDIS_CHANNEL_POOL_SIZE, REDIS_HOST, REDIS_PORT,
        MONGODB_CONNECTION_STRING, MONGODB_DATABASE_NAME, MONGODB_COLLECTION_NAME,
        MONGODB_MAX_CONNECTIONS, MONGODB_MIN_IDLE_CONNECTIONS, REDIS_WORKER_POOL_SIZE,
        REDIS_BATCH_COUNT, REDIS_BATCH_SIZE, MONGO_WORKER_POOL_SIZE, MONGO_BATCH_COUNT,
        MONGO_BATCH_SIZE);
    consumerManager.execute();
  }
}
