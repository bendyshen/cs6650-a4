package com.upic.mongoPool;

import com.mongodb.ConnectionString;
import com.mongodb.MongoClientSettings;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoDatabase;

public class MongoPool {

  private static final String MONGODB_CONNECTION_STRING = "mongodb://localhost:27017";  // TODO: check MongoDB data model with consumer
  private static final String MONGODB_DATABASE_NAME = "Skiers";                         // TODO: check MongoDB data model with consumer
  private static final int MAX_CONNECTIONS = 32;
  private static final int MIN_IDLE_CONNECTIONS = 32;
  private final String databaseName;
  private final MongoClient mongoClient;
  private static MongoPool instance = null;

  private MongoPool(String connectionString, String databaseName, int maxConnections, int minIdle) {
    this.databaseName = databaseName;
    MongoClientSettings settings = MongoClientSettings.builder()
        .applyConnectionString(new ConnectionString(connectionString))
        .applyToConnectionPoolSettings(builder -> {
          builder.maxSize(maxConnections);
          builder.minSize(minIdle);
        })
        .build();
    this.mongoClient = MongoClients.create(settings);
  }

  public static MongoPool getInstance() {
    if (instance == null) {
      instance = new MongoPool(MONGODB_CONNECTION_STRING, MONGODB_DATABASE_NAME,
          MAX_CONNECTIONS, MIN_IDLE_CONNECTIONS);
    }
    return instance;
  }

  public MongoDatabase getDatabase() {
    return mongoClient.getDatabase(this.databaseName);
  }

  public void close() {
    if (mongoClient != null) {
      mongoClient.close();
    }
  }
}
