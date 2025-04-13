import static com.upic.publisher.MessagePublisher.publishMessage;
import static com.upic.rabbitmqPool.RabbitmqPool.EXCHANGE_NAME;
import static com.upic.rabbitmqPool.RabbitmqPool.WRITE_ROUTING_KEY;
import static com.upic.validator.PostRequestValidator.validateRequestBody;
import static com.upic.validator.PostRequestValidator.validateRequestUrl;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.upic.mongoPool.MongoPool;
import com.upic.query.GetDayVertical;
import com.upic.query.GetTotalVertical;
import com.upic.query.Query;
import com.upic.rabbitmqPool.RabbitmqPool;
import com.upic.redisPool.RedisPool;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import redis.clients.jedis.Jedis;
import redis.clients.jedis.Pipeline;


@WebServlet(name = "SkierServlet", urlPatterns = "/skiers/*")
public class SkierServlet extends HttpServlet {

  private static final String COLLECTION_NAME_DAY_VERTICAL = "SkierVertical"; // TODO: check MongoDB data model with consumer
  private static final String COLLECTION_NAME_TOTAL_VERTICAL = "TotalVertical"; // TODO: check MongoDB data model with consumer
  private static final String COLLECTION_NAME_TOTAL_VERTICAL_SEASON = "TotalVerticalSeason"; // TODO: check MongoDB data model with consumer
  private Gson gson;
  private RabbitmqPool rabbitmqPool;
  private RedisPool redisPool;
  private MongoPool mongoPool;

  @Override
  public void init() throws ServletException {
    super.init();
    this.gson = new Gson();
    // setup RabbitMQ channel pool
    this.rabbitmqPool = RabbitmqPool.getInstance();
    // setup Redis channel pool
    this.redisPool = RedisPool.getInstance();
    // setup MongoDB channel pool
    this.mongoPool = MongoPool.getInstance();
  }

  @Override
  protected void doGet(HttpServletRequest request, HttpServletResponse response)
      throws IOException {
    String path = request.getPathInfo();
    Query query;
    String collectionName;
    String result;

    // determine query type: GetDayVertical or GetTotalVertical
    if (path.matches("/\\d+/seasons/\\d+/days/\\d+/skiers/\\d+")) {
      query = new GetDayVertical(this.gson, path);
      collectionName = COLLECTION_NAME_DAY_VERTICAL;
    } else if (path.matches("/\\d+/vertical")) {
      String seasonVal = request.getParameter("season");
      if (seasonVal == null) {
        query = new GetTotalVertical(this.gson, path);
        collectionName = COLLECTION_NAME_TOTAL_VERTICAL;
      } else {
        query = new GetTotalVertical(this.gson, path + "/season/" + seasonVal);
        collectionName = COLLECTION_NAME_TOTAL_VERTICAL_SEASON;
      }
    } else {
      response.sendError(HttpServletResponse.SC_NOT_FOUND);
      return;
    }

    System.out.println("Query: " + query);
    // if query is valid
    if (query.validate()) {
      System.out.println("Query validated.");
      try (Jedis jedis = redisPool.borrowChannel()) {
        // assumes that Redis and MangoDB use the same key
        // TODO: check Redis data model, see if Key used in write matches Key used in read
        result = query.queryRedisString(jedis, query.getRedisKey());
        // Redis hit
        if (result != null) {
          System.out.println("Redis hit.");
          response.setStatus(HttpServletResponse.SC_OK);
          response.getWriter().write(result);
          return;
        }
        // Redis miss, query MongoDB
        System.out.println("Redis miss.");
        // TODO: check MongoDB data model, see if database name, collection name, and key setup match the constants
        result = query.queryMongoDBString(mongoPool.getDatabase(), collectionName,
            query.getMongoKey());
        // if no result found in MongoDB
        if (result == null) {
          System.out.println("no result found in MongoDB");
          response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
          return;
        }
        // otherwise, cache the result in Redis
        System.out.println("result found in MongoDB");
        Pipeline pipeline = jedis.pipelined();
        pipeline.set(query.getRedisKey(), result);
        pipeline.sync();
        System.out.println("Redis pipeline sync complete.");
        response.setStatus(HttpServletResponse.SC_OK);
        response.getWriter().write(result);
      } catch (Exception e) {
        response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
      }
    }
  }

  @Override
  protected void doPost(HttpServletRequest request, HttpServletResponse response)
      throws IOException {
    response.setContentType("application/json");
    // validate URL
    JsonObject messageJson;
    try {
      if ((messageJson = validateRequestUrl(request, response)) == null) {
        return;
      }
    } catch (IOException e) {
      response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
      response.getWriter().write("{\"error\":\"internal server error\"}");
      return;
    }
    // validate request body
    JsonObject liftRideJson;
    try {
      if ((liftRideJson = validateRequestBody(gson, request, response)) == null) {
        return;
      }
    } catch (IOException e) {
      response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
      response.getWriter().write("{\"error\":\"internal server error\"}");
      return;
    }
    // publish message
    messageJson.add("liftRide", liftRideJson);
    try {
      publishMessage(EXCHANGE_NAME, WRITE_ROUTING_KEY, messageJson.toString(), rabbitmqPool);
      response.setStatus(201);
      response.getWriter().write("{\"success\":\"201\"}");
    } catch (Exception e) {
      response.setStatus(500);
      response.getWriter().write("{\"error\":\"failed to publish message\"}");
    }
  }

}
