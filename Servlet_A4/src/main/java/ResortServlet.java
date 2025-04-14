import com.google.gson.Gson;
import com.mongodb.MongoException;
import com.mongodb.client.MongoDatabase;
import com.upic.mongoPool.MongoPool;
import com.upic.query.GetResortSkiers;
import com.upic.query.Query;
import com.upic.redisPool.RedisPool;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import redis.clients.jedis.Jedis;
import redis.clients.jedis.Pipeline;
import redis.clients.jedis.exceptions.JedisConnectionException;

@WebServlet(name = "ResortServlet", urlPatterns = "/resorts/*")
public class ResortServlet extends HttpServlet {

  private static final String MONGODB_COLLECTION_NAME = "ResortSkiers"; // TODO: check MongoDB data model with consumer
  private Gson gson;
  private RedisPool redisPool;
  private MongoPool mongoPool;

  @Override
  public void init() throws ServletException {
    super.init();
    this.gson = new Gson();
    // setup Redis channel pool
    this.redisPool = RedisPool.getInstance();
    // setup MongoDB channel pool
    this.mongoPool = MongoPool.getInstance();
  }

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response)
      throws IOException {
    String path = request.getPathInfo();
    System.out.println("PathInfo: " + path);

    // validate the path
    if (!isValidPath(path)) {
      System.out.println("Invalid path");
      response.sendError(HttpServletResponse.SC_BAD_REQUEST); // change to bad request
      return;
    }

    Query query = new GetResortSkiers(this.gson, path);
    System.out.println("Query: " + query);
    // validate the query
    if (!query.validate()) {
      System.out.println("Invalid query");
      response.sendError(HttpServletResponse.SC_BAD_REQUEST);
      return;
    }

    System.out.println("Query validated.");

    // try querying redis and fallback to mongodb as needed
    try (Jedis jedis = redisPool.borrowChannel()) {
      List<String> redisRes = queryRedis(jedis, query);
      if (redisRes != null) {
        handleRedisHit(response, redisRes);
        return;
      }

      // Redis miss, query MongoDB
      System.out.println("Redis miss.");
      Map<String, Object> queryMap = query.getQueryMap();
      List<Integer> mongoRes = queryMongoDB(query, queryMap);
      if (mongoRes == null) {
        System.out.println("No result found in MongoDB");
        response.setStatus(HttpServletResponse.SC_NOT_FOUND);
        return;
      }

      // cache to redis
      cacheInRedis(jedis, query, mongoRes);

      handleRedisMiss(response, mongoRes);

    } catch (JedisConnectionException | MongoException e) {
      // handling Redis/MongoDB exceptions
      System.err.println("Error occurred during Redis/MongoDB operation: " + e.getMessage());
      response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
    } catch (Exception e) {
      System.err.println("Unexpected error: " + e.getMessage());
      response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
    }

  }

  private void handleRedisMiss(HttpServletResponse response, List<Integer> mongoRes) throws IOException {
    System.out.println("Redis miss.");
    response.setStatus(HttpServletResponse.SC_OK);
    response.getWriter().write("{\"numSkiers\":" + mongoRes.size() + "}"); // TODO: Check return value naming
  }

  private List<Integer> queryMongoDB(Query query, Map<String, Object> queryMap) {
    return query.queryMongoDBList(mongoPool.getDatabase(), MONGODB_COLLECTION_NAME,
            queryMap);
  }

  private void cacheInRedis(Jedis jedis, Query query, List<Integer> mongoRes) {
    System.out.println("Result found in MongoDB, caching result into Redis");
    Pipeline pipeline = jedis.pipelined();
    for (Integer s : mongoRes) {
      pipeline.sadd(query.getRedisKey(), String.valueOf(s));
    }
    pipeline.sync();
    System.out.println("Redis pipeline sync complete.");
  }

  private void handleRedisHit(HttpServletResponse response, List<String> redisRes) throws IOException {
      System.out.println("Redis hit.");
      response.setStatus(HttpServletResponse.SC_OK);
      response.getWriter().write("{\"numSkiers\":" + redisRes.size() + "}"); // TODO: Check return value naming
  }

  private List<String> queryRedis(Jedis jedis, Query query) {
    return query.queryRedisList(jedis, query.getRedisKey());
  }

  private boolean isValidPath(String path) {
    return path.matches("/\\d+/seasons/\\d+/day/\\d+/skiers");
  }
}
