package com.upic.model.rabbitmqPool;


import com.rabbitmq.client.BuiltinExchangeType;
import com.rabbitmq.client.Channel;
import com.rabbitmq.client.Connection;
import com.rabbitmq.client.ConnectionFactory;
import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.security.KeyManagementException;
import java.security.NoSuchAlgorithmException;
import java.util.concurrent.TimeoutException;
import org.apache.commons.pool2.impl.GenericObjectPool;
import org.apache.commons.pool2.impl.GenericObjectPoolConfig;
import org.slf4j.Logger;

/**
 * RabbitmqPool class. It creates a given number of dedicated channels that are assigned to the
 * consumers.
 */
public class RabbitmqPool {

  private static final Boolean IS_TEST_ON = true;
  private static final int MIN_IDLE = 0;
  private static final String FACTORY_CREATION_ERROR_MESSAGE = "connection factory creation error";
  private static final String CONNECTION_CREATION_ERROR_MESSAGE = "connection creation error";
  private final Connection connection;
  private final GenericObjectPool<Channel> channelPool;
  private final Logger globalLogger;

  /**
   * Constructor for RabbitmqPool.
   *
   * @param uriString       the URI used set up connection
   * @param exchangeName    the exchange name
   * @param queueName       the queue name
   * @param routingKey      the routing key
   * @param channelPoolSize the number of channels to create, it must equal to the number of
   *                        consumers
   * @param globalLogger    global logger used to log various information
   */
  public RabbitmqPool(String uriString, String exchangeName, String queueName, String routingKey,
      int channelPoolSize, Logger globalLogger) {
    this.globalLogger = globalLogger;
    ConnectionFactory connectionFactory = createConnectionFactory(uriString);
    this.connection = createConnection(connectionFactory);
    initConnection(exchangeName, queueName, routingKey);
    GenericObjectPoolConfig<Channel> config = createChannelPoolConfig(channelPoolSize);
    this.channelPool = new GenericObjectPool<>(new RabbitmqChannelFactory(connection), config);

  }

  /**
   * Helper method. Creates a ConnectionFactory instance.
   *
   * @param uriString the URI used to create the ConnectionFactory instance.
   * @return a ConnectionFactory instance.
   */
  private ConnectionFactory createConnectionFactory(String uriString) {
    ConnectionFactory factory;
    try {
      factory = new ConnectionFactory();
      URI uri = new URI(uriString);
      factory.setUri(uri);
    } catch (URISyntaxException | NoSuchAlgorithmException | KeyManagementException e) {
      globalLogger.error("[{}] {} ", FACTORY_CREATION_ERROR_MESSAGE, e.getMessage());
      throw new RuntimeException(e);
    }
    return factory;
  }

  /**
   * Helper method. Creates a Connection instance using a ConnectionFactory.
   *
   * @param factory the ConnectionFactory used to create the connection
   * @return a Connection instance
   */
  private Connection createConnection(ConnectionFactory factory) {
    Connection connection;
    try {
      connection = factory.newConnection();
    } catch (IOException | TimeoutException e) {
      globalLogger.error("[{}] {} ", CONNECTION_CREATION_ERROR_MESSAGE, e.getMessage());
      throw new RuntimeException(e);
    }
    return connection;
  }

  /**
   * Initializes connection.
   *
   * @param exchangeName the exchange name
   * @param queueName    the queue name
   * @param routingKey   the routing key
   */
  private void initConnection(String exchangeName, String queueName, String routingKey) {
    try (Channel temp = connection.createChannel()) {
      temp.exchangeDeclare(exchangeName, BuiltinExchangeType.DIRECT); // declare exchange
      temp.queueDeclare(queueName, true, false, false, null); // declare queue
      temp.queueBind(queueName, exchangeName, routingKey, null); // bind queue
      globalLogger.info("rabbitmq connection pool initialization successful");
    } catch (IOException | TimeoutException e) {
      if (connection.isOpen()) {
        try {
          connection.close();
        } catch (IOException closeException) {
          globalLogger.error("[{}] {} ", CONNECTION_CREATION_ERROR_MESSAGE,
              closeException.getMessage());
          throw new RuntimeException(closeException);
        }
      }
      throw new RuntimeException(e);
    }
  }

  /**
   * Creates a configuration instance for the channel pool.
   *
   * @param channelPoolSize the number of channels in the channel pool
   * @return a configuration instance for the channel pool
   */
  private GenericObjectPoolConfig<Channel> createChannelPoolConfig(int channelPoolSize) {
    GenericObjectPoolConfig<Channel> config = new GenericObjectPoolConfig<>();
    config.setMaxTotal(channelPoolSize);
    config.setMaxIdle(channelPoolSize);
    config.setMinIdle(MIN_IDLE);
    config.setTestOnBorrow(IS_TEST_ON);
    config.setTestOnReturn(IS_TEST_ON);
    return config;
  }

  /**
   * Borrows a channel.
   *
   * @return the channel
   * @throws Exception exception
   */
  public Channel borrowChannel() throws Exception {
    return channelPool.borrowObject();
  }

  /**
   * Returns a channel
   *
   * @param channel the channel
   */
  public void returnChannel(Channel channel) {
    if (channel != null) {
      channelPool.returnObject(channel);
    }
  }

  /**
   * Closes the channel pool. It calls close() to destroy each channel in the pool, then it closes
   * the connection.`
   */
  public void close() {
    channelPool.close();
    if (connection.isOpen()) {
      try {
        connection.close();
      } catch (IOException e) {
        throw new RuntimeException(e);
      }
    }
  }


}
