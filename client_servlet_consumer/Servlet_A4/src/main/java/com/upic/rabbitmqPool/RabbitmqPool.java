package com.upic.rabbitmqPool;


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

/**
 * RabbitmqPool class. It creates a given number of dedicated channels that are assigned to the
 * publishers.
 */
public class RabbitmqPool {

  public static final String EXCHANGE_NAME = "LiftRidePostExchange";            // TODO: check before run
  public static final String POST_ROUTING_KEY = "LiftRidePostRoutingKey";       // TODO: check before run
  private static final String POST_QUEUE_NAME = "LiftRidePostQueue";            // TODO: check before run
  private static final String URI_STRING = "amqp://guest:guest@34.222.45.112:5672"; // TODO: check before run
  private static final int CHANNEL_POOL_SIZE = 32;

  private static final Boolean IS_TEST_ON = true;
  private static final int MIN_IDLE = 0;
  private final Connection connection;
  private final GenericObjectPool<Channel> channelPool;
  private static RabbitmqPool instance = null;

  /**
   * Constructor for RabbitmqPool.
   *
   * @param uriString       the URI used set up connection
   * @param channelPoolSize the number of channels to create, it must equal to the number of
   *                        consumers
   */
  private RabbitmqPool(String uriString, int channelPoolSize) {
    ConnectionFactory connectionFactory = createConnectionFactory(uriString);
    this.connection = createConnection(connectionFactory);
    GenericObjectPoolConfig<Channel> config = createChannelPoolConfig(channelPoolSize);
    this.channelPool = new GenericObjectPool<>(new RabbitmqChannelFactory(connection), config);
  }

  /**
   * Singleton pattern to get RabbitmqPool instance.
   * @return the RabbitmqPool instance
   */
  public static RabbitmqPool getInstance() {
    if (instance == null) {
      instance = new RabbitmqPool(URI_STRING, CHANNEL_POOL_SIZE);
    }
    instance.initConnection(EXCHANGE_NAME, POST_ROUTING_KEY, POST_QUEUE_NAME);
    return instance;
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
      throw new RuntimeException(e);
    }
    return connection;
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
   * Initializes connection.
   *
   * @param exchangeName the exchange name
   * @param queueName    the queue name
   * @param routingKey   the routing key
   */
  public void initConnection(String exchangeName, String routingKey,  String queueName) {
    try (Channel temp = connection.createChannel()) {
      temp.exchangeDeclare(exchangeName, BuiltinExchangeType.DIRECT); // declare exchange
      temp.queueDeclare(queueName, true, false, false, null); // declare queue
      temp.queueBind(queueName, exchangeName, routingKey, null); // bind queue
    } catch (IOException | TimeoutException e) {
      if (connection.isOpen()) {
        try {
          connection.close();
        } catch (IOException closeException) {
          throw new RuntimeException(closeException);
        }
      }
      throw new RuntimeException(e);
    }
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
