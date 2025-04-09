import java.util.concurrent.*;
import java.util.concurrent.atomic.*;
import java.util.concurrent.locks.LockSupport;

/**
 * LiftRideClient is a multi-threaded client designed to send HTTP POST requests
 * to a server via a Load Balancer or a direct EC2 instance.
 *
 * The client operates in two phases:
 * 1. **Phase 1 (Initial Phase):** Fixed number of threads send requests.
 * 2. **Phase 2 (Dynamic Phase):** Additional threads start once any Phase 1 thread completes.
 *
 * The total number of requests is capped at 200,000, and failed requests
 * are retried up to 5 times before being counted as failures.
 */
public class LiftRideClient {
    // Replace with your EC2 IP address or Load Balancer DNS
    private static final String IP_ADDRESS = "44.243.128.98:8080";
    // Notice: add :8080 before /JavaServlet_war for single instance test
    private static final String BASE_PATH = "http://" + IP_ADDRESS + "/JavaServlet_war";

    private static final int TOTAL_REQUESTS = 200_000;       // Total number of requests to send
    private static final int INITIAL_THREADS = 32;           // Number of threads in Phase 1
    private static final int REQUESTS_PER_INITIAL = 1_000;   // Number of requests per thread in Phase 1
    private static final int MAX_RETRIES = 5;                // Maximum retry attempts for each request
    private static final int DYNAMIC_THREADS = 300;          // Number of threads in Phase 2 (dynamic phase)

    // Atomic counters to track progress
    private static final AtomicInteger successCount = new AtomicInteger(0);
    private static final AtomicInteger failureCount = new AtomicInteger(0);
    private static final AtomicInteger remainingInitials = new AtomicInteger(INITIAL_THREADS);
    private static final AtomicBoolean phase2Started = new AtomicBoolean(false);
    private static final AtomicInteger totalRequestsSent = new AtomicInteger(0);  // Global counter to prevent exceeding TOTAL_REQUESTS

    public static void main(String[] args) throws InterruptedException {
        long startTime = System.currentTimeMillis();

        // Executor service for Phase 1 threads
        ExecutorService phase1Executor = Executors.newFixedThreadPool(INITIAL_THREADS);
        for (int i = 0; i < INITIAL_THREADS; i++) {
            phase1Executor.execute(new Phase1Worker());
        }

        // Executor service for Phase 2 threads
        ExecutorService phase2Executor = Executors.newFixedThreadPool(DYNAMIC_THREADS);

        // Start a monitoring thread to launch Phase 2 when any Phase 1 thread finishes
        new Thread(() -> {
            while (!phase2Started.get()) {
                if (remainingInitials.get() < INITIAL_THREADS) {
                    System.out.println("[Phase2] Starting dynamic threads...");
                    for (int i = 0; i < DYNAMIC_THREADS; i++) {
                        phase2Executor.execute(new Phase2Worker());
                    }
                    phase2Started.set(true);
                }
                LockSupport.parkNanos(1_000_000); // Sleep for 1ms
            }
        }).start();

        // Wait for Phase 1 threads to complete
        phase1Executor.shutdown();
        phase1Executor.awaitTermination(1, TimeUnit.HOURS);

        // Wait for Phase 2 threads to complete
        phase2Executor.shutdown();
        phase2Executor.awaitTermination(1, TimeUnit.HOURS);

        long endTime = System.currentTimeMillis();
        printReport(startTime, endTime);
    }

    /**
     * Phase1Worker handles request submission during the initial phase.
     * Each thread sends a fixed number of requests (REQUESTS_PER_INITIAL).
     * When any thread finishes, Phase 2 workers are triggered.
     */
    static class Phase1Worker implements Runnable {
        private final LiftRideProducer producer = new LiftRideProducer(BASE_PATH);
        private int processed = 0;

        @Override
        public void run() {
            try {
                while (processed < REQUESTS_PER_INITIAL) {
                    int currentSent = totalRequestsSent.get();
                    if (currentSent >= TOTAL_REQUESTS) {
                        break;
                    }
                    if (totalRequestsSent.incrementAndGet() > TOTAL_REQUESTS) {
                        break;
                    }

                    LiftRideEvent event = LiftRideEvent.createRandomEvent();
                    if (sendPostWithRetry(event, producer)) {
                        processed++;
                        successCount.incrementAndGet();
                    } else {
                        failureCount.incrementAndGet();
                    }
                }
            } finally {
                // Decrement the remaining initial threads counter
                remainingInitials.decrementAndGet();
            }
        }
    }

    /**
     * Phase2Worker is responsible for sending additional requests dynamically.
     * It runs until the total number of requests reaches the predefined limit.
     */
    static class Phase2Worker implements Runnable {
        private final LiftRideProducer producer = new LiftRideProducer(BASE_PATH);

        @Override
        public void run() {
            while (true) {
                int currentSent = totalRequestsSent.get();
                if (currentSent >= TOTAL_REQUESTS) {
                    break;
                }
                if (totalRequestsSent.incrementAndGet() > TOTAL_REQUESTS) {
                    break;
                }

                LiftRideEvent event = LiftRideEvent.createRandomEvent();
                if (sendPostWithRetry(event, producer)) {
                    successCount.incrementAndGet();
                } else {
                    failureCount.incrementAndGet();
                }
            }
        }
    }

    /**
     * Attempts to send an event via HTTP POST with retry logic.
     * If the request fails, it retries up to MAX_RETRIES times with exponential backoff.
     *
     * @param event LiftRideEvent to be sent
     * @param producer LiftRideProducer instance responsible for sending requests
     * @return true if the request succeeds, false otherwise
     */
    private static boolean sendPostWithRetry(LiftRideEvent event, LiftRideProducer producer) {
        for (int attempt = 1; attempt <= MAX_RETRIES; attempt++) {
            if (producer.sendEvent(event)) {
                return true;
            }
            // Exponential backoff delay: min(2^attempt * 10ms, 1s)
            long delay = Math.min((long) Math.pow(2, attempt) * 10_000_000, 1_000_000_000);
            LockSupport.parkNanos(delay);
        }
        return false;
    }

    /**
     * Prints the final report with total execution time and request statistics.
     *
     * @param startTime Start timestamp in milliseconds
     * @param endTime End timestamp in milliseconds
     */
    private static void printReport(long startTime, long endTime) {
        long totalTime = endTime - startTime;
        System.out.println("\n=== FINAL REPORT ===");
        System.out.println("Successful requests: " + successCount.get());
        System.out.println("Failed requests: " + failureCount.get());
        System.out.println("Dynamic threads used: " + DYNAMIC_THREADS);
        System.out.printf("Total time: %.2f seconds%n", totalTime / 1000.0);
        System.out.printf("Throughput: %,.0f req/s%n", successCount.get() / (totalTime / 1000.0));
    }
}