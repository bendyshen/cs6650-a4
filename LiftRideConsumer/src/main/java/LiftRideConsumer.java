import com.mongodb.ConnectionString;
import com.mongodb.MongoClientSettings;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.rabbitmq.client.*;
import com.google.gson.*;
import org.bson.Document;

import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.*;

/**
 * LiftRideConsumer is responsible for consuming skier lift ride data messages from RabbitMQ
 * and persisting them into a MongoDB collection using batch insertion for efficiency.
 *
 * This version is optimized for performance on MongoDB Atlas Free Tier by:
 * - Using a shared thread-safe queue to decouple message consumption and DB writing
 * - Using a dedicated writer thread to insert documents in batches
 * - Increasing MongoDB connection pool size
 */

public class LiftRideConsumer {
    // RabbitMQ connection settings
    private static final String RABBITMQ_HOST = "34.217.9.220";
    private static final String QUEUE_NAME = "liftRideQueue";
    private static final String USERNAME = "admin";
    private static final String PASSWORD = "password";

    // Number of consumer threads to concurrently receive messages from RabbitMQ
    private static final int THREAD_POOL_SIZE = 8;

    // MongoDB connection string (Atlas cluster)
    private static final String MONGODB_URL =
            "mongodb+srv://yuanshen:7895123a@cs6650.ar7rpbj.mongodb.net/?retryWrites=true&w=majority&appName=CS6650";

    // Thread-safe queue for buffering documents before writing to MongoDB
    private static final BlockingQueue<Document> writeQueue = new LinkedBlockingQueue<>();

    private static final Gson gson = new Gson();

    public static void main(String[] args) throws Exception {
        // Configure MongoClient with increased connection pool settings
        MongoClientSettings settings = MongoClientSettings.builder()
                .applyConnectionString(new ConnectionString(MONGODB_URL))
                .applyToConnectionPoolSettings(builder -> builder.maxSize(100).minSize(10))
                .build();
        MongoClient mongoClient = MongoClients.create(settings);
        MongoDatabase database = mongoClient.getDatabase("assignment3");
        MongoCollection<Document> collection = database.getCollection("liftRide");

        // Dedicated MongoDB writer thread:
        // - Takes messages from writeQueue
        // - Batches them into insertMany for improved write performance
        new Thread(() -> {
            List<Document> batch = new ArrayList<>();
            while (true) {
                try {
                    Document doc = writeQueue.take();  // block until at least one message
                    batch.add(doc);
                    writeQueue.drainTo(batch, 19999); // take up to 19999 more messages if available
                    collection.insertMany(new ArrayList<>(batch)); // insert batch into MongoDB
                    batch.clear();
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        }).start();

        // Setup RabbitMQ connection and consumer channel
        ConnectionFactory factory = new ConnectionFactory();
        factory.setHost(RABBITMQ_HOST);
        factory.setUsername(USERNAME);
        factory.setPassword(PASSWORD);
        Connection connection = factory.newConnection();
        Channel channel = connection.createChannel();
        channel.queueDeclare(QUEUE_NAME, true, false, false, null);

        // Message callback: convert JSON to MongoDB Document and add to write queue
        DeliverCallback deliverCallback = (consumerTag, message) -> {
            String msg = new String(message.getBody(), StandardCharsets.UTF_8);
            Document doc = parseToDoc(msg);
            if (doc != null) writeQueue.offer(doc);
        };

        // Start multiple consumer threads, all consuming from the same channel
        // Each thread shares the same deliverCallback
        for (int i = 0; i < THREAD_POOL_SIZE; i++) {
            new Thread(() -> {
                try {
                    channel.basicConsume(QUEUE_NAME, true, deliverCallback, consumerTag -> {});
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }).start();
        }

        System.out.println(" [*] Waiting for messages. To exit press CTRL+C");
    }

    /**
     * Parses a JSON message into a MongoDB Document.
     * Also calculates the vertical distance (liftID * 10) and stores it.
     *
     * @param msg The JSON message string received from RabbitMQ
     * @return a BSON Document ready for MongoDB insertion, or null if parsing fails
     */
    private static Document parseToDoc(String msg) {
        try {
            JsonObject obj = JsonParser.parseString(msg).getAsJsonObject();
            int resortID = obj.get("resortID").getAsInt();
            String seasonID = obj.get("seasonID").getAsString();
            int dayID = obj.get("dayID").getAsInt();
            int skierID = obj.get("skierID").getAsInt();
            int time = obj.getAsJsonObject("data").get("time").getAsInt();
            int liftID = obj.getAsJsonObject("data").get("liftID").getAsInt();

            return new Document("resortID", resortID)
                    .append("seasonID", seasonID)
                    .append("dayID", dayID)
                    .append("skierID", skierID)
                    .append("time", time)
                    .append("liftID", liftID)
                    .append("vertical", liftID * 10);  // store precomputed vertical
        } catch (Exception e) {
            System.err.println("[x] Failed to parse message: " + msg);
            return null;
        }
    }
}