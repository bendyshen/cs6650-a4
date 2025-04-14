import com.mongodb.ConnectionString;
import com.mongodb.MongoClientSettings;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.rabbitmq.client.*;
import com.google.gson.*;
import org.bson.Document;
import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;

import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.*;

/**
 * PostService is responsible for consuming lift ride POST requests from RabbitMQ,
 * updating Redis cache for supporting three GET APIs, and performing batch insertion into MongoDB.
 *
 * Responsibilities:
 * - Consume JSON messages from RabbitMQ (queue: LiftRidePostQueue)
 * - Parse each message into a structured Document
 * - Update Redis cache:
 *   1. Track unique skiers for a specific resort/season/day using HyperLogLog
 *   2. Increment skier's daily vertical using INCRBY
 *   3. Increment skier's total vertical across all days using INCRBY
 * - Batch write documents into MongoDB for long-term storage and future analytics
 */
public class PostService {
    // RabbitMQ connection settings
    private static final String RABBITMQ_HOST = "34.217.9.220"; // RabbitMQ IP Address
    private static final String QUEUE_NAME = "LiftRidePostQueue"; // Queue name for POST messages
    private static final String USERNAME = "admin"; // RabbitMQ username
    private static final String PASSWORD = "password"; // RabbitMQ password

    // Redis connection
    private static final String REDIS_HOST = "<YOUR_REDIS_HOST_HERE>"; // Replace with Redis EC2 IP or domain
    private static final Integer REDIS_PORT = 6379; // Replace with Redis Port Number

    // MongoDB Atlas connection
    private static final String MONGODB_USERNAME = "cs6650-a4"; // MongoDB username
    private static final String MONGODB_PASSWORD = "CS6650-a4"; // MongoDB password
    private static final String MONGODB_URL = "mongodb+srv://" + MONGODB_USERNAME + ":" + MONGODB_PASSWORD + "@cs6650.ar7rpbj.mongodb.net/?retryWrites=true&w=majority&appName=CS6650";

    // Thread pool configuration
    private static final int THREAD_POOL_SIZE = 8;
    private static final BlockingQueue<Document> writeQueue = new LinkedBlockingQueue<>();

    private static final Gson gson = new Gson();

    public static void main(String[] args) throws Exception {
        // Initialize Redis connection pool
        JedisPool jedisPool = new JedisPool(REDIS_HOST, REDIS_PORT);

        // Initialize MongoDB connection
        MongoClientSettings settings = MongoClientSettings.builder()
                .applyConnectionString(new ConnectionString(MONGODB_URL))
                .applyToConnectionPoolSettings(builder -> builder.maxSize(100).minSize(10))
                .build();
        MongoClient mongoClient = MongoClients.create(settings);
        MongoDatabase database = mongoClient.getDatabase("assignment3");
        MongoCollection<Document> collection = database.getCollection("liftRide");

        // MongoDB writer thread for batch insert
        new Thread(() -> {
            List<Document> batch = new ArrayList<>();
            while (true) {
                try {
                    Document doc = writeQueue.take();
                    batch.add(doc);
                    writeQueue.drainTo(batch, 19999); // Add up to 19999 more if available
                    collection.insertMany(new ArrayList<>(batch));
                    batch.clear();
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        }).start();

        // Setup RabbitMQ consumer
        ConnectionFactory factory = new ConnectionFactory();
        factory.setHost(RABBITMQ_HOST);
        factory.setUsername(USERNAME);
        factory.setPassword(PASSWORD);
        Connection connection = factory.newConnection();
        Channel channel = connection.createChannel();
        channel.queueDeclare(QUEUE_NAME, true, false, false, null);

        DeliverCallback deliverCallback = (consumerTag, message) -> {
            String msg = new String(message.getBody(), StandardCharsets.UTF_8);
            try (Jedis jedis = jedisPool.getResource()) {
                Document doc = parseToDoc(msg, jedis);
                if (doc != null) writeQueue.offer(doc);
            }
        };

        // Launch consumer threads to receive messages concurrently
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
     * Parses a JSON string into a MongoDB Document and updates Redis caches
     * for 3 GET APIs accordingly.
     *
     * @param msg JSON message string from RabbitMQ
     * @param jedis Jedis Redis client for updating cache
     * @return Document to be inserted into MongoDB
     */
    private static Document parseToDoc(String msg, Jedis jedis) {
        try {
            JsonObject obj = JsonParser.parseString(msg).getAsJsonObject();
            int resortID = obj.get("resortID").getAsInt();
            String seasonID = obj.get("seasonID").getAsString();
            int dayID = obj.get("dayID").getAsInt();
            int skierID = obj.get("skierID").getAsInt();
            int time = obj.getAsJsonObject("data").get("time").getAsInt();
            int liftID = obj.getAsJsonObject("data").get("liftID").getAsInt();

            int vertical = liftID * 10;

            // Redis Key Examples:
            // - skier:{skierID}:season:{seasonID}:day:{dayID}:vertical
            // - skier:{skierID}:vertical
            // - resort:{resortID}:season:{seasonID}:day:{dayID}:skiers

            // API #1: Count unique skiers at resort/season/day using HyperLogLog
            jedis.pfadd("resort:" + resortID + ":season:" + seasonID + ":day:" + dayID + ":skiers", String.valueOf(skierID));

            // API #2: Update skier's vertical for a specific day
            jedis.incrBy("skier:" + skierID + ":season:" + seasonID + ":day:" + dayID + ":vertical", vertical);

            // API #3: Update skier's total vertical across all days
            jedis.incrBy("skier:" + skierID + ":vertical", vertical);

            return new Document("resortID", resortID)
                    .append("seasonID", seasonID)
                    .append("dayID", dayID)
                    .append("skierID", skierID)
                    .append("time", time)
                    .append("liftID", liftID)
                    .append("vertical", vertical);
        } catch (Exception e) {
            System.err.println("[x] Failed to parse or process message: " + msg);
            e.printStackTrace();
            return null;
        }
    }
}