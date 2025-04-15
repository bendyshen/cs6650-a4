package com.upic.mongoPool;

import com.mongodb.ConnectionString;
import com.mongodb.MongoClientSettings;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.model.Indexes;
import org.bson.Document;

public class MongoPool {

  private static final String MONGODB_CONNECTION_STRING = "mongodb://34.210.184.7:27017";  // TODO: check before run
  private static final String MONGODB_DATABASE_NAME = "assignment4";                    // TODO: check before run
  private static final String MONGODB_COLLECTION_NAME = "LiftRide";                     // TODO: check before run
  private static final int MAX_CONNECTIONS = 32;
  private static final int MIN_IDLE_CONNECTIONS = 32;
  private final MongoClient mongoClient;
  private final MongoCollection<Document> collection;
  private static MongoPool instance = null;

  private MongoPool(String connectionString, int maxConnections, int minIdle) {
    MongoClientSettings settings = MongoClientSettings.builder()
        .applyConnectionString(new ConnectionString(connectionString))
        .applyToConnectionPoolSettings(builder -> {
          builder.maxSize(maxConnections);
          builder.minSize(minIdle);
        })
        .build();
    this.mongoClient = MongoClients.create(settings);
    this.collection = mongoClient.getDatabase(MONGODB_DATABASE_NAME).getCollection(MONGODB_COLLECTION_NAME);
    this.collection.createIndex((Indexes.ascending("resortID", "seasonID", "dayID")));
    this.collection.createIndex((Indexes.ascending("skierID", "seasonID", "dayID")));
    this.collection.createIndex((Indexes.ascending("skierID", "resortID")));
    this.collection.createIndex((Indexes.ascending("skierID", "resortID", "seasonID")));
  }

  public static MongoPool getInstance() {
    if (instance == null) {
      instance = new MongoPool(MONGODB_CONNECTION_STRING, MAX_CONNECTIONS, MIN_IDLE_CONNECTIONS);
    }
    return instance;
  }

  public MongoCollection<Document> getCollection() {
    return this.collection;
  }

  public void close() {
    if (mongoClient != null) {
      mongoClient.close();
    }
  }
}
