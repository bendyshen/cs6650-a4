import com.google.gson.Gson;
import com.mongodb.client.MongoCollection;
import com.upic.cacheWriter.CacheWriter;
import com.upic.mongoPool.MongoPool;
import com.upic.query.GetResortSkiers;
import com.upic.query.Query;
import com.upic.redisPool.RedisPool;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.bson.Document;

@WebServlet(name = "ResortServlet", urlPatterns = "/resorts/*")
public class ResortServlet extends HttpServlet {

  private Gson gson;
  private RedisPool redisPool;
  private MongoCollection<Document> mongoCollection;
  private CacheWriter cacheWriter;

  @Override
  public void init() throws ServletException {
    super.init();
    this.gson = new Gson();
    // setup Redis channel pool
    this.redisPool = RedisPool.getInstance();
    // setup MongoDB channel pool
    this.mongoCollection = MongoPool.getInstance().getCollection();
    // setup Redis cache writer
    this.cacheWriter = CacheWriter.getInstance();
  }

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response)
      throws IOException {
    String path = request.getPathInfo();
    System.out.println("PathInfo: " + path);
    Query query;
    String result;
    // determine query type: GetResortSkiers
    if (path.matches("/\\d+/seasons/\\d+/day/\\d+/skiers")) {
      query = new GetResortSkiers(this.gson, path, redisPool, mongoCollection, cacheWriter);
      System.out.println("valid path");
    } else {
      System.out.println("invalid path");
      response.sendError(HttpServletResponse.SC_BAD_REQUEST);
      return;
    }
    // if query is valid
    if (query.validate()) {
      System.out.println("query validated.");
      result = query.queryRedis();
      // Redis hit
      if (result != null) {
        System.out.println("redis hit");
        response.setStatus(HttpServletResponse.SC_OK);
        response.getWriter().write(result);
        return;
      }
      // Redis miss
      System.out.println("redis miss");
      result = query.queryMongoDB();
      if (result != null) {
        System.out.println("mongodb hit");
        response.setStatus(HttpServletResponse.SC_OK);
        response.getWriter().write(result);
        return;
      }
      System.out.println("mongodb miss");
      response.getWriter().write("N/A");
      response.setStatus(HttpServletResponse.SC_NOT_FOUND);
    } else {
      response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
    }
  }
}
