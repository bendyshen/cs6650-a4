package com.upic.model.mongoPool;

import com.mongodb.ConnectionString;
import com.mongodb.MongoClientSettings;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import org.bson.Document;

public class MongoPool {

  private final String databaseName;
  private final String collectionName;
  private final MongoClient mongoClient;

  public MongoPool(String connectionString, String databaseName, String collectionName, int maxConnections, int minIdle) {
    this.databaseName = databaseName;
    this.collectionName = collectionName;
    MongoClientSettings settings = MongoClientSettings.builder()
        .applyConnectionString(new ConnectionString(connectionString))
        .applyToConnectionPoolSettings(builder -> {
          builder.maxSize(maxConnections);
          builder.minSize(minIdle);
        })
        .build();
    this.mongoClient = MongoClients.create(settings);
  }

  public MongoCollection<Document> getCollection() {
    return mongoClient.getDatabase(databaseName).getCollection(collectionName);
  }

  public void close() {
    if (mongoClient != null) {
      mongoClient.close();
    }
  }
}
