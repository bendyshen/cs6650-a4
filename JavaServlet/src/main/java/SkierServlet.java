import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;
import java.io.BufferedReader;
import java.io.IOException;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.LinkedBlockingQueue;

import com.rabbitmq.client.Channel;
import com.rabbitmq.client.Connection;
import com.rabbitmq.client.ConnectionFactory;

/**
 * SkierServlet handles HTTP POST requests for recording skier lift rides.
 *
 * This servlet processes lift ride data and sends it to a RabbitMQ message queue.
 * It uses a connection pool to manage RabbitMQ channels efficiently.
 */
@WebServlet(name = "SkierServlet", value = "/skiers/*")
public class SkierServlet extends HttpServlet {
    private static final String RABBITMQ_HOST = "34.217.9.220";  // RabbitMQ server address
    private static final String QUEUE_NAME = "liftRideQueue";     // Queue name for messages
    private static final String USERNAME = "admin";               // RabbitMQ username
    private static final String PASSWORD = "password";            // RabbitMQ password
    private Connection connection;                                // RabbitMQ connection
    private BlockingQueue<Channel> channelPool;                   // Channel pool for efficiency

    /**
     * Initializes the servlet by establishing a connection to RabbitMQ and
     * pre-creating a pool of channels to optimize message publishing.
     */
    @Override
    public void init() throws ServletException {
        try {
            ConnectionFactory factory = new ConnectionFactory();
            factory.setHost(RABBITMQ_HOST);
            factory.setUsername(USERNAME);
            factory.setPassword(PASSWORD);
            factory.setPort(5672);
            connection = factory.newConnection();

            // Initialize a pool of 10 RabbitMQ channels
            channelPool = new LinkedBlockingQueue<>(10);
            for (int i = 0; i < 10; i++) {
                channelPool.offer(connection.createChannel());
            }
        } catch (Exception e) {
            throw new ServletException("Failed to initialize RabbitMQ", e);
        }
    }

    /**
     * Handles POST requests to record a skier's lift ride.
     *
     * The request URL should be formatted as:
     * /skiers/{resortID}/seasons/{seasonID}/days/{dayID}/skiers/{skierID}
     *
     * The request body should contain a JSON object with ride details (liftID, time).
     *
     * @param request  HTTP request containing skier lift ride data.
     * @param response HTTP response to indicate success or failure.
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        String pathInfo = request.getPathInfo();
        String[] pathParts = pathInfo.split("/");

        // Validate URL format
        if (pathParts.length != 8) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            response.getWriter().write("{\"error\": \"Invalid URL format\"}");
            return;
        }

        try {
            int resortID = Integer.parseInt(pathParts[1]);
            String seasonID = pathParts[3];
            int dayID = Integer.parseInt(pathParts[5]);
            int skierID = Integer.parseInt(pathParts[7]);

            // Validate path parameters
            if (!isValidPathParams(dayID, skierID)) {
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                response.getWriter().write("{\"error\": \"Invalid path parameters\"}");
                return;
            }

            // Read request body (JSON data)
            StringBuilder stringBuilder = new StringBuilder();
            BufferedReader reader = request.getReader();
            String line;
            while ((line = reader.readLine()) != null) {
                stringBuilder.append(line);
            }
            String requestBody = stringBuilder.toString();

            // Construct JSON message for RabbitMQ
            String formattedMessage = String.format(
                    "{\"resortID\":%d,\"seasonID\":\"%s\",\"dayID\":%d,\"skierID\":%d,\"data\":%s}",
                    resortID, seasonID, dayID, skierID, requestBody
            );

            // Send message to RabbitMQ
            if (sendToRabbitMQ(formattedMessage)) {
                response.setStatus(HttpServletResponse.SC_CREATED);
                response.getWriter().write("{\"message\": \"Lift ride recorded successfully\"}");
            } else {
                response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
                response.getWriter().write("{\"error\": \"Failed to send message to RabbitMQ\"}");
            }

        } catch (Exception e) {
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            response.getWriter().write("{\"error\": \"Internal server error\"}");
        }
    }

    /**
     * Sends a message to RabbitMQ.
     *
     * This method retrieves a channel from the pool, publishes the message,
     * and then returns the channel to the pool.
     *
     * @param message The JSON message to be sent to RabbitMQ.
     * @return True if the message was successfully sent, otherwise false.
     */
    private boolean sendToRabbitMQ(String message) {
        Channel channel = null;
        try {
            channel = channelPool.take();  // Retrieve a channel from the pool
            channel.queueDeclare(QUEUE_NAME, true, false, false, null);
            channel.basicPublish("", QUEUE_NAME, null, message.getBytes());
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        } finally {
            if (channel != null) {
                channelPool.offer(channel);  // Return the channel to the pool
            }
        }
    }

    /**
     * Cleans up resources when the servlet is destroyed.
     *
     * Closes all RabbitMQ channels and the connection.
     */
    @Override
    public void destroy() {
        try {
            for (Channel channel : channelPool) {
                channel.close();
            }
            connection.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     * Validates the dayID and skierID to ensure they are within valid ranges.
     *
     * @param dayID   The day of the season (1-366).
     * @param skierID The skier ID (must be greater than 0).
     * @return True if the parameters are valid, otherwise false.
     */
    private boolean isValidPathParams(int dayID, int skierID) {
        return dayID >= 1 && dayID <= 366 && skierID > 0;
    }
}