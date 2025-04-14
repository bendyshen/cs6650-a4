import io.swagger.client.model.LiftRide;
import java.util.concurrent.ThreadLocalRandom;

/**
 * LiftRideEvent represents an event where a skier takes a ride on a lift.
 *
 * This class encapsulates the details of a ski lift ride, including:
 * - The lift ride information (lift ID and time).
 * - The resort where the ride took place.
 * - The skier who took the ride.
 */
public class LiftRideEvent {
    public final LiftRide liftRide;
    public final int resortID;
    public final int skierID;
    public final int dayID;

    /**
     * Constructs a LiftRideEvent with the specified LiftRide details.
     *
     * @param liftRide The LiftRide object containing the lift ID and time.
     * @param resortID The ID of the ski resort where the ride occurred.
     * @param skierID  The ID of the skier who took the lift ride.
     * @param dayID  The ID of the day that skier who took the lift ride.
     */
    public LiftRideEvent(LiftRide liftRide, int resortID, int skierID, int dayID) {
        this.liftRide = liftRide;
        this.resortID = resortID;
        this.skierID = skierID;
        this.dayID = dayID;
    }

    /**
     * Creates a LiftRideEvent with randomly generated values.
     *
     * Generates:
     * - A random lift ID between 1 and 40.
     * - A random ride time between 1 and 360 minutes.
     * - A random resort ID between 1 and 10.
     * - A random skier ID between 1 and 100,000.
     *
     * @return A new LiftRideEvent with random attributes.
     */
    public static LiftRideEvent createRandomEvent(int dayID) {
        return new LiftRideEvent(
                new LiftRide()
                        .liftID(ThreadLocalRandom.current().nextInt(1, 41))  // Random lift ID (1-40)
                        .time(ThreadLocalRandom.current().nextInt(1, 361)),  // Random time (1-360 minutes)
                ThreadLocalRandom.current().nextInt(1, 11),                  // Random resort ID (1-10)
                ThreadLocalRandom.current().nextInt(1, 100_001),               // Random skier ID (1-100,000)
                dayID
        );
    }
}