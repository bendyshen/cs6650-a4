package com.upic.model.consumer;

import com.rabbitmq.client.AMQP.BasicProperties;
import com.rabbitmq.client.Channel;
import com.rabbitmq.client.DefaultConsumer;
import com.rabbitmq.client.Envelope;
import java.io.IOException;
import java.util.concurrent.ConcurrentLinkedQueue;
import java.util.concurrent.Semaphore;
import org.slf4j.Logger;

/**
 * Consumer class. It's a customized RabbitMQ consumer that shares a worker thread pool defined by
 * the user in the main thread. The purpose of using a costume consumer is to avoid RabbitMQ
 * internal thread pool and gain more control over the thread pool parameters when tuning.
 */
public class Consumer extends DefaultConsumer {

  private final String queueName;
  private final Channel channel;
  private final ConcurrentLinkedQueue<byte[]> messageBuffer;
  private final Logger globalLogger;
  private final Semaphore semaphore;

  /**
   * Constructs a new instance and records its association to the passed-in channel.
   *
   * @param channel the channel to which this consumer is attached
   */
  public Consumer(Logger globalLogger, String queueName, Channel channel, int prefetchCount,
      ConcurrentLinkedQueue<byte[]> messageBuffer, Semaphore semaphore) {
    super(channel);
    this.globalLogger = globalLogger;
    this.queueName = queueName;
    this.channel = channel;
    try {
      initChannel(prefetchCount);
    } catch (IOException e) {
      throw new RuntimeException(e);
    }
    this.messageBuffer = messageBuffer;
    this.semaphore = semaphore;
  }

  /**
   * Helper method. Initializes the channel by setting the prefetch count and call basicConsume().
   *
   * @param prefetchCount the prefetch count
   * @throws IOException exception
   */
  private void initChannel(int prefetchCount) throws IOException {
    channel.basicQos(prefetchCount);
    channel.basicConsume(queueName, false, this);
  }

  @Override
  public void handleDelivery(String consumerTag, Envelope envelope, BasicProperties properties,
      byte[] body) throws IOException {
    super.handleDelivery(consumerTag, envelope, properties, body);
    try {
      messageBuffer.add(body);
      semaphore.release();
      channel.basicAck(envelope.getDeliveryTag(), false);
    } catch (Exception e) {
      globalLogger.error(e.getMessage());
      channel.basicNack(envelope.getDeliveryTag(), false, true);
    }
  }
}
