import com.rabbitmq.client.Connection;
import com.rabbitmq.client.ConnectionFactory;

public class RabbitMQConnectionTest {
    private static final String RABBITMQ_HOST = "18.237.91.130";
    private static final String USERNAME = "guest"; // 或者 admin
    private static final String PASSWORD = "guest"; // 或者 admin

    public static void main(String[] args) {
        ConnectionFactory factory = new ConnectionFactory();
        factory.setHost(RABBITMQ_HOST);
        factory.setPort(5672);
        factory.setUsername(USERNAME);
        factory.setPassword(PASSWORD);

        try (Connection connection = factory.newConnection()) {
            System.out.println("✅ 成功连接到 RabbitMQ: " + RABBITMQ_HOST);
        } catch (Exception e) {
            System.err.println("❌ 连接失败: " + e.getMessage());
        }
    }
}