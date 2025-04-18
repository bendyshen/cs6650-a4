package com.upic.model.rabbitmqPool;

import com.rabbitmq.client.Channel;
import com.rabbitmq.client.Connection;
import org.apache.commons.pool2.BasePooledObjectFactory;
import org.apache.commons.pool2.PooledObject;
import org.apache.commons.pool2.impl.DefaultPooledObject;

/**
 * RabbitmqChannelFactory class. It extends BasePooledObjectFactory to create channels.
 */
public class RabbitmqChannelFactory extends BasePooledObjectFactory<Channel> {

  private final Connection connection;

  /**
   * Constructor of the RabbitmqChannelFactory class.
   *
   * @param connection the connection used for all consumers.
   */
  public RabbitmqChannelFactory(Connection connection) {
    this.connection = connection;
  }

  @Override
  public Channel create() throws Exception {
    return connection.createChannel();
  }

  @Override
  public PooledObject<Channel> wrap(Channel channel) {
    return new DefaultPooledObject<>(channel);
  }

  @Override
  public void destroyObject(PooledObject<Channel> pooledObject) throws Exception {
    Channel channel = pooledObject.getObject();
    if (channel != null && channel.isOpen()) {
      channel.close();
    }
  }

  @Override
  public boolean validateObject(PooledObject<Channel> pooledObject) {
    Channel channel = pooledObject.getObject();
    return channel != null && channel.isOpen();
  }
}
