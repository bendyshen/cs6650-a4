package com.upic.control;

import com.upic.model.consumer.RabbitmqConsumers;
import org.slf4j.Logger;

/**
 * Consumer Manager class. It manages the simulation pipeline.
 */
public class ConsumerManager {

  private final Logger globalLogger;
  private final RabbitmqConsumers rabbitmqConsumers;

  /**
   * Constructor of ConsumerManager class.
   *
   * @param globalLogger          global logger used to log various information
   * @param rabbitmqUriString     the RabbitMQ URI used set up connection
   * @param rabbitmqExchangeName  the RabbitMQ exchange name
   * @param rabbitmqQueueName     the RabbitMQ queue name
   * @param rabbitmqRoutingKey    the RabbitMQ routing key
   * @param rabbitmqConsumerCount the number of competing consumers for RabbitMQ
   * @param rabbitmqPrefetchCount the prefetch count for RabbitMQ consumers
   * @param redisChannelPoolSize  the number of Jedis channels in the Redis channel pool
   * @param redisHost             the redis host address
   * @param redisPort             the redis host port
   * @param mongoConnectionString the mongoDB connection string
   * @param mongoDatabaseName     the mongoDB database name
   * @param mongoCollectionName   the mongoDB collection name
   * @param mongoMaxConnections   the mongoDB max connection count
   * @param mongoMinIdle          the mongoDB min idle connection count
   * @param redisWorkerPoolSize   the redis worker thread pool size
   * @param redisBatchCount       the number of tasks submitted to the redis worker thread pool
   * @param redisBatchSize        the number of messages processed in each task by redis worker
   *                              thread
   * @param mongoWorkerPoolSize   the mongodb worker thread pool size
   * @param mongoBatchCount       the number of tasks submitted to the mongodb worker thread pool
   * @param mongoBatchSize        the number of messages processed in each task by mongodb worker
   *                              thread
   */
  public ConsumerManager(Logger globalLogger, String rabbitmqUriString,
      String rabbitmqExchangeName, String rabbitmqQueueName, String rabbitmqRoutingKey,
      int rabbitmqConsumerCount, int rabbitmqPrefetchCount, int redisChannelPoolSize,
      String redisHost, int redisPort, String mongoConnectionString, String mongoDatabaseName,
      String mongoCollectionName, int mongoMaxConnections, int mongoMinIdle,
      int redisWorkerPoolSize, int redisBatchCount, int redisBatchSize, int mongoWorkerPoolSize,
      int mongoBatchCount, int mongoBatchSize) {
    this.globalLogger = globalLogger;
    this.rabbitmqConsumers = new RabbitmqConsumers(globalLogger, rabbitmqUriString,
        rabbitmqExchangeName, rabbitmqQueueName,
        rabbitmqRoutingKey, rabbitmqConsumerCount, rabbitmqPrefetchCount, redisChannelPoolSize,
        redisHost, redisPort, mongoConnectionString, mongoDatabaseName, mongoCollectionName,
        mongoMaxConnections, mongoMinIdle, redisWorkerPoolSize, redisBatchCount, redisBatchSize,
        mongoWorkerPoolSize, mongoBatchCount, mongoBatchSize);
  }

  /**
   * Executes the simulation pipeline.
   */
  public void execute() {
    globalLogger.info("simulation started");
    rabbitmqConsumers.init();
    rabbitmqConsumers.awaitCompletion();
    rabbitmqConsumers.closeChannelPool();
    rabbitmqConsumers.shutdownWorkerPool();
    globalLogger.info("simulation completed");
    rabbitmqConsumers.showStatistics();
  }
}
