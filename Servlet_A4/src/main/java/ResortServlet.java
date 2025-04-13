import com.google.gson.Gson;
import com.upic.mongoPool.MongoPool;
import com.upic.query.GetResortSkiers;
import com.upic.query.Query;
import com.upic.redisPool.RedisPool;
import java.io.IOException;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import redis.clients.jedis.Jedis;
import redis.clients.jedis.Pipeline;

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
    Query query;
    List<String> result = null;

    // determine query type: GetResortSkiers
    if (path.matches("/\\d+/seasons/\\d+/day/\\d+/skiers")) {
      query = new GetResortSkiers(this.gson, path);
      System.out.println("valid path");
    } else {
      System.out.println("invalid path");
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
        result = query.queryRedisList(jedis, query.getRedisKey());
        // Redis hit
        if (result != null) {
          System.out.println("Redis hit.");
          response.setStatus(HttpServletResponse.SC_OK);
          response.getWriter().write(String.valueOf(result.size()));
          return;
        }
        // Redis miss, query MongoDB
        System.out.println("Redis miss.");
        // TODO: check MongoDB data model, see if database name, collection name, and key setup match the constants
        List<Integer> temp = query.queryMongoDBList(mongoPool.getDatabase(), MONGODB_COLLECTION_NAME,
            query.getMongoKey());
        // if no result found in MongoDB
        if (temp == null) {
          System.out.println("no result found in MongoDB");
          response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
          return;
        }
        // otherwise, cache the result in Redis
        System.out.println("result found in MongoDB");
        Pipeline pipeline = jedis.pipelined();
        for (Integer s : temp) {
          pipeline.sadd(query.getRedisKey(), String.valueOf(s));
        }
        pipeline.sync();
        System.out.println("Redis pipeline sync complete.");
        response.setStatus(HttpServletResponse.SC_OK);
        response.getWriter().write(String.valueOf(temp.size()));
      } catch (Exception e) {
        response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
      }
    }
  }
}
