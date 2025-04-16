package com.upic.contextListener;

import com.upic.cacheWriter.CacheWriter;
import com.upic.mongoPool.MongoPool;
import com.upic.rabbitmqPool.RabbitmqPool;
import com.upic.redisPool.RedisPool;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.annotation.WebListener;

/**
 * ContextListener class. It manages the initialization and destruction of shared resources among
 * all servlets.
 */
@WebListener
public class ContextListener implements ServletContextListener {

  @Override
  public void contextInitialized(ServletContextEvent sce) {
    RedisPool.getInstance();
    MongoPool.getInstance();
    RabbitmqPool.getInstance();
    CacheWriter.getInstance();
  }

  @Override
  public void contextDestroyed(ServletContextEvent sce) {
    RedisPool.getInstance().close();
    MongoPool.getInstance().close();
    RabbitmqPool.getInstance().close();
    CacheWriter.getInstance().shutdown();
  }
}
