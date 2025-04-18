# Assignment 4
*Team RabbitRush*  
Xi Yang, Yuan Shen, Zhixuan Liu, Nahai Gu
## Instructions
### I. Setup 
Provision the required EC2 instances for the following components:
* Tomcat servers (to host the servlet)
* Redis (as a caching layer)
* RabbitMQ (message broker)
* RabbitMQConsumer (background consumer for processing messages)
* MongoDB (database cluster)
### II. Configuration Parameters
Ensure all configuration parameters marked with TODO comments are correctly updated:
1. **Servlet_A4**
* Configure MongoDB settings (URL, database name, and collection name) in the `MongoPool` class. This setup uses a MongoDB cluster.
* Configure RabbitMQ settings (exchange name, routing key, queue name, and URI string) in the `RabbitmqPool` class.
* Set Redis host and port in the `RedisPool` class.
2. **Client**
* Set the Application Load Balancer (ALB) URL in the `SimulationRunner` class.
3. **RabbitMQConsumer**
* Set parameters for RabbitMQ, Redis, and MongoDB in the `ConsumerRunner` class.
### III. Deployment
1. Deploy the servlet to the Tomcat server instances.
2. Deploy the RabbitMQConsumer service to its dedicated EC2 instance.
### IV. Run simulation
1. Start the RabbitMQ consumer.
2. Start the client to begin the simulation.
## Testing
Test results can be found in `./TestResults` directory.
