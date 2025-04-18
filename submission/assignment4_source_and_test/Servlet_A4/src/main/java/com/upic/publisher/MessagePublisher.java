package com.upic.publisher;

import com.rabbitmq.client.Channel;
import com.upic.rabbitmqPool.RabbitmqPool;
import java.nio.charset.StandardCharsets;

/**
 * MessagePublisher class. It contains helper methods to publish message to an exchange using a
 * given channel.
 */
public class MessagePublisher {

  /**
   * Publishes a message to a given exchange through a given channel.
   *
   * @param exchangeName the exchange name
   * @param routingKey   the routing key
   * @param message      the message body
   * @param rabbitmqPool the channel pool
   * @throws Exception exception
   */
  public static void publishMessage(String exchangeName, String routingKey, String message,
      RabbitmqPool rabbitmqPool)
      throws Exception {
    byte[] messageBytes = message.getBytes(StandardCharsets.UTF_8);
    Channel channel = rabbitmqPool.borrowChannel();
    channel.basicPublish(exchangeName, routingKey, true, null, messageBytes);
    rabbitmqPool.returnChannel(channel);
  }
}
