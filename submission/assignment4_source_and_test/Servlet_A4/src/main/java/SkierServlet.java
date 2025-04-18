import static com.upic.publisher.MessagePublisher.publishMessage;
import static com.upic.rabbitmqPool.RabbitmqPool.EXCHANGE_NAME;
import static com.upic.rabbitmqPool.RabbitmqPool.POST_ROUTING_KEY;
import static com.upic.validator.PostRequestValidator.validateRequestBody;
import static com.upic.validator.PostRequestValidator.validateRequestUrl;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.mongodb.client.MongoCollection;
import com.upic.cacheWriter.CacheWriter;
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
import org.bson.Document;


@WebServlet(name = "SkierServlet", urlPatterns = "/skiers/*")
public class SkierServlet extends HttpServlet {

  private Gson gson;
  private RabbitmqPool rabbitmqPool;
  private RedisPool redisPool;
  private MongoCollection<Document> mongoCollection;
  private CacheWriter cacheWriter;

  @Override
  public void init() throws ServletException {
    super.init();
    this.gson = new Gson();
    // setup RabbitMQ channel pool
    this.rabbitmqPool = RabbitmqPool.getInstance();
    // setup Redis channel pool
    this.redisPool = RedisPool.getInstance();
    // setup MongoDB channel pool
    this.mongoCollection = MongoPool.getInstance().getCollection();
    // setup Redis cache writer
    this.cacheWriter = CacheWriter.getInstance();
  }

  @Override
  protected void doGet(HttpServletRequest request, HttpServletResponse response)
      throws IOException {
    String path = request.getPathInfo();
    Query query;
    String result;

    // determine query type: GetDayVertical or GetTotalVertical
    if (path.matches("/\\d+/seasons/\\d+/days/\\d+/skiers/\\d+")) {
      query = new GetDayVertical(this.gson, path, redisPool, mongoCollection, cacheWriter);
    } else if (path.matches("/\\d+/vertical")) {
      String resortID = request.getParameter("resort");
      String seasonID = request.getParameter("season");
      if (seasonID == null) {
        // adds query parameter resort to the path
        query = new GetTotalVertical(this.gson, path + "/resort/" + resortID, redisPool,
            mongoCollection, cacheWriter);
      } else {
        // adds query parameters resort and season to the path
        query = new GetTotalVertical(this.gson,
            path + "/resort/" + resortID + "/season/" + seasonID, redisPool, mongoCollection,
            cacheWriter);
      }
    } else {
      response.sendError(HttpServletResponse.SC_BAD_REQUEST);
      return;
    }
    // if query is valid
    if (query.validate()) {
      result = query.queryRedis();
      // Redis hit
      if (result != null) {
        response.setStatus(HttpServletResponse.SC_OK);
        response.getWriter().write(result);
        return;
      }
      // Redis miss
      result = query.queryMongoDB();
      if (result != null) {
        response.setStatus(HttpServletResponse.SC_OK);
        response.getWriter().write(result);
        return;
      }
      response.getWriter().write("N/A");
      response.setStatus(HttpServletResponse.SC_NOT_FOUND);
    } else {
      response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
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
      publishMessage(EXCHANGE_NAME, POST_ROUTING_KEY, messageJson.toString(), rabbitmqPool);
      response.setStatus(201);
      response.getWriter().write("{\"success\":\"201\"}");
    } catch (Exception e) {
      response.setStatus(500);
      response.getWriter().write("{\"error\":\"failed to publish message\"}");
    }
  }

}
