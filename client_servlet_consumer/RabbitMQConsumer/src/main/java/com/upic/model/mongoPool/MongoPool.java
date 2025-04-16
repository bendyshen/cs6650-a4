package com.upic.model.mongoPool;

import com.mongodb.ConnectionString;
import com.mongodb.MongoClientSettings;
import com.mongodb.WriteConcern;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import org.bson.Document;

/**
 * MongoPool class. It represents a MongoDB connection pool.
 */
public class MongoPool {

  private final String databaseName;
  private final String collectionName;
  private final MongoClient mongoClient;

  /**
   * Constructor for MongoPool class.
   *
   * @param connectionString the connection url
   * @param databaseName     the database name
   * @param collectionName   the collection name
   * @param maxConnections   the maximum connections
   * @param minIdle          the minimum idle connections
   */
  public MongoPool(String connectionString, String databaseName, String collectionName,
      int maxConnections, int minIdle) {
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

  /**
   * Gets the reference to the collection. Quorum based write operation is used here for data
   * consistency. Also see retry specification in the URL.
   *
   * @return the reference to the collection
   */
  public MongoCollection<Document> getCollection() {
    return mongoClient.getDatabase(databaseName).withWriteConcern(WriteConcern.MAJORITY)
        .getCollection(collectionName);
  }

  /**
   * Closes the mongodb client.
   */
  public void close() {
    if (mongoClient != null) {
      mongoClient.close();
    }
  }
}
