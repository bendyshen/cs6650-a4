# Load Test

## Test Endpoints
Apache JMeter was used to evaluate the performance of four different GET APIs under simulated load conditions.

* GET `/resorts/{resortID}/seasons/{seasonID}/day/{dayID}/skiers`  
  Get number of unique skiers at a given resort on a spefici day in a specific season.  
  Test report directory: `./GetResortSkiers`.
* GET `/skiers/{resortID}/seasons/{seasonID}/days/{dayID}/skiers/{skierID}`  
  Get the ski day vertical for a skier at a given resort in a specific season.  
  Test report directory: `./GetDayVertical`.
* GET `/skiers/{skierID}/vertical?resort={resortID}`  
  Get the total vertical for the skier at the specified resort for all seasons.   
  Test report directory: `./GetTotalVertical`.
* GET `/skiers/{skierID}/vertical?resort={resortID}&season={seasonID}`  
  Get the total vertical for the skier for a specified season at the specified resort.  
  Test report directory: `./GetTotalVerticalSeason`.

## Test Configuration
Each API was tested using a dedicated JMeter Thread Group configured as follows:
* Number of Threads (Users): 128
* Ramp-Up Period: 10 seconds
* Loop Count (Iterations): 500

Please refer to the `LiftRideGetTest.jmx` for more configuration details. This setup was designed to evaluate both throughput and response time under load for each individual endpoint. 

## Concurrent Test
In addition to the individual API tests, a fifth load test was conducted where all four Thread Groups were executed simultaneously. This test aimed to simulate a more realistic load environment with concurrent API calls.  
Test report directory: `./Total`