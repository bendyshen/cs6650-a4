import io.swagger.client.ApiClient;
import io.swagger.client.ApiException;
import io.swagger.client.api.SkiersApi;

/**
 * LiftRideProducer is responsible for sending LiftRideEvent data
 * to the server using the SkiersApi client.
 *
 * This class encapsulates the logic of making HTTP POST requests
 * to the backend API through a Load Balancer or directly to an EC2 instance.
 */
public class LiftRideProducer {
    private final SkiersApi skiersApi;

    /**
     * Constructor that initializes the API client.
     *
     * @param basePath The base URL of the backend server (can be Load Balancer or EC2 IP).
     */
    public LiftRideProducer(String basePath) {
        this.skiersApi = new SkiersApi(new ApiClient().setBasePath(basePath));
    }

    /**
     * Sends a LiftRideEvent to the backend server.
     *
     * @param event The LiftRideEvent object containing skier ride details.
     * @return true if the request is successfully processed, false otherwise.
     */
    public boolean sendEvent(LiftRideEvent event) {
        try {
            skiersApi.writeNewLiftRide(
                    event.liftRide,
                    event.resortID,
                    "2025",    // Hardcoded season ID
                    "1",       // Hardcoded day ID
                    event.skierID
            );
            return true;
        } catch (ApiException e) {
            e.printStackTrace();  // Print error stack trace for debugging
            return false;          // Return false on failure
        }
    }
}