/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
$(document).ready(function() {

    $(".click-title").mouseenter( function(    e){
        e.preventDefault();
        this.style.cursor="pointer";
    });
    $(".click-title").mousedown( function(event){
        event.preventDefault();
    });

    // Ugly code while this script is shared among several pages
    try{
        refreshHitsPerSecond(true);
    } catch(e){}
    try{
        refreshResponseTimeOverTime(true);
    } catch(e){}
    try{
        refreshResponseTimePercentiles();
    } catch(e){}
});


var responseTimePercentilesInfos = {
        data: {"result": {"minY": 9.0, "minX": 0.0, "maxY": 354.0, "series": [{"data": [[0.0, 9.0], [0.1, 12.0], [0.2, 13.0], [0.3, 14.0], [0.4, 14.0], [0.5, 15.0], [0.6, 15.0], [0.7, 16.0], [0.8, 17.0], [0.9, 18.0], [1.0, 18.0], [1.1, 19.0], [1.2, 19.0], [1.3, 20.0], [1.4, 20.0], [1.5, 20.0], [1.6, 21.0], [1.7, 21.0], [1.8, 21.0], [1.9, 21.0], [2.0, 22.0], [2.1, 22.0], [2.2, 22.0], [2.3, 22.0], [2.4, 22.0], [2.5, 23.0], [2.6, 23.0], [2.7, 23.0], [2.8, 23.0], [2.9, 24.0], [3.0, 24.0], [3.1, 24.0], [3.2, 25.0], [3.3, 25.0], [3.4, 26.0], [3.5, 27.0], [3.6, 28.0], [3.7, 29.0], [3.8, 29.0], [3.9, 30.0], [4.0, 32.0], [4.1, 33.0], [4.2, 34.0], [4.3, 35.0], [4.4, 35.0], [4.5, 36.0], [4.6, 36.0], [4.7, 36.0], [4.8, 37.0], [4.9, 37.0], [5.0, 37.0], [5.1, 37.0], [5.2, 37.0], [5.3, 37.0], [5.4, 37.0], [5.5, 37.0], [5.6, 37.0], [5.7, 38.0], [5.8, 38.0], [5.9, 38.0], [6.0, 38.0], [6.1, 38.0], [6.2, 38.0], [6.3, 38.0], [6.4, 38.0], [6.5, 38.0], [6.6, 38.0], [6.7, 38.0], [6.8, 38.0], [6.9, 38.0], [7.0, 38.0], [7.1, 38.0], [7.2, 39.0], [7.3, 39.0], [7.4, 39.0], [7.5, 39.0], [7.6, 39.0], [7.7, 39.0], [7.8, 39.0], [7.9, 39.0], [8.0, 39.0], [8.1, 39.0], [8.2, 39.0], [8.3, 39.0], [8.4, 39.0], [8.5, 39.0], [8.6, 39.0], [8.7, 39.0], [8.8, 39.0], [8.9, 39.0], [9.0, 39.0], [9.1, 39.0], [9.2, 39.0], [9.3, 39.0], [9.4, 40.0], [9.5, 40.0], [9.6, 40.0], [9.7, 40.0], [9.8, 40.0], [9.9, 40.0], [10.0, 40.0], [10.1, 40.0], [10.2, 40.0], [10.3, 40.0], [10.4, 40.0], [10.5, 40.0], [10.6, 40.0], [10.7, 40.0], [10.8, 40.0], [10.9, 40.0], [11.0, 40.0], [11.1, 40.0], [11.2, 40.0], [11.3, 40.0], [11.4, 40.0], [11.5, 40.0], [11.6, 40.0], [11.7, 40.0], [11.8, 40.0], [11.9, 40.0], [12.0, 41.0], [12.1, 41.0], [12.2, 41.0], [12.3, 41.0], [12.4, 41.0], [12.5, 41.0], [12.6, 41.0], [12.7, 41.0], [12.8, 41.0], [12.9, 41.0], [13.0, 41.0], [13.1, 41.0], [13.2, 41.0], [13.3, 41.0], [13.4, 41.0], [13.5, 41.0], [13.6, 41.0], [13.7, 41.0], [13.8, 41.0], [13.9, 41.0], [14.0, 41.0], [14.1, 41.0], [14.2, 41.0], [14.3, 42.0], [14.4, 42.0], [14.5, 42.0], [14.6, 42.0], [14.7, 42.0], [14.8, 42.0], [14.9, 42.0], [15.0, 42.0], [15.1, 42.0], [15.2, 42.0], [15.3, 42.0], [15.4, 42.0], [15.5, 42.0], [15.6, 42.0], [15.7, 42.0], [15.8, 42.0], [15.9, 42.0], [16.0, 42.0], [16.1, 42.0], [16.2, 42.0], [16.3, 42.0], [16.4, 42.0], [16.5, 43.0], [16.6, 43.0], [16.7, 43.0], [16.8, 43.0], [16.9, 43.0], [17.0, 43.0], [17.1, 43.0], [17.2, 43.0], [17.3, 43.0], [17.4, 43.0], [17.5, 43.0], [17.6, 43.0], [17.7, 43.0], [17.8, 44.0], [17.9, 44.0], [18.0, 44.0], [18.1, 44.0], [18.2, 44.0], [18.3, 44.0], [18.4, 44.0], [18.5, 44.0], [18.6, 44.0], [18.7, 45.0], [18.8, 45.0], [18.9, 45.0], [19.0, 45.0], [19.1, 45.0], [19.2, 45.0], [19.3, 46.0], [19.4, 46.0], [19.5, 46.0], [19.6, 46.0], [19.7, 47.0], [19.8, 47.0], [19.9, 47.0], [20.0, 47.0], [20.1, 48.0], [20.2, 48.0], [20.3, 48.0], [20.4, 48.0], [20.5, 49.0], [20.6, 49.0], [20.7, 49.0], [20.8, 49.0], [20.9, 50.0], [21.0, 50.0], [21.1, 50.0], [21.2, 51.0], [21.3, 51.0], [21.4, 51.0], [21.5, 51.0], [21.6, 52.0], [21.7, 52.0], [21.8, 52.0], [21.9, 53.0], [22.0, 53.0], [22.1, 53.0], [22.2, 53.0], [22.3, 54.0], [22.4, 54.0], [22.5, 54.0], [22.6, 54.0], [22.7, 54.0], [22.8, 55.0], [22.9, 55.0], [23.0, 55.0], [23.1, 55.0], [23.2, 55.0], [23.3, 55.0], [23.4, 55.0], [23.5, 55.0], [23.6, 55.0], [23.7, 55.0], [23.8, 56.0], [23.9, 56.0], [24.0, 56.0], [24.1, 56.0], [24.2, 56.0], [24.3, 56.0], [24.4, 56.0], [24.5, 56.0], [24.6, 56.0], [24.7, 56.0], [24.8, 56.0], [24.9, 56.0], [25.0, 56.0], [25.1, 56.0], [25.2, 56.0], [25.3, 56.0], [25.4, 56.0], [25.5, 56.0], [25.6, 57.0], [25.7, 57.0], [25.8, 57.0], [25.9, 57.0], [26.0, 57.0], [26.1, 57.0], [26.2, 57.0], [26.3, 57.0], [26.4, 57.0], [26.5, 57.0], [26.6, 57.0], [26.7, 57.0], [26.8, 57.0], [26.9, 57.0], [27.0, 57.0], [27.1, 57.0], [27.2, 57.0], [27.3, 57.0], [27.4, 57.0], [27.5, 57.0], [27.6, 57.0], [27.7, 57.0], [27.8, 57.0], [27.9, 57.0], [28.0, 57.0], [28.1, 57.0], [28.2, 57.0], [28.3, 57.0], [28.4, 57.0], [28.5, 57.0], [28.6, 57.0], [28.7, 57.0], [28.8, 57.0], [28.9, 57.0], [29.0, 57.0], [29.1, 58.0], [29.2, 58.0], [29.3, 58.0], [29.4, 58.0], [29.5, 58.0], [29.6, 58.0], [29.7, 58.0], [29.8, 58.0], [29.9, 58.0], [30.0, 58.0], [30.1, 58.0], [30.2, 58.0], [30.3, 58.0], [30.4, 58.0], [30.5, 58.0], [30.6, 58.0], [30.7, 58.0], [30.8, 58.0], [30.9, 58.0], [31.0, 58.0], [31.1, 58.0], [31.2, 58.0], [31.3, 58.0], [31.4, 58.0], [31.5, 58.0], [31.6, 58.0], [31.7, 58.0], [31.8, 58.0], [31.9, 58.0], [32.0, 58.0], [32.1, 58.0], [32.2, 58.0], [32.3, 58.0], [32.4, 58.0], [32.5, 58.0], [32.6, 58.0], [32.7, 58.0], [32.8, 58.0], [32.9, 58.0], [33.0, 58.0], [33.1, 58.0], [33.2, 58.0], [33.3, 58.0], [33.4, 58.0], [33.5, 58.0], [33.6, 58.0], [33.7, 58.0], [33.8, 58.0], [33.9, 58.0], [34.0, 58.0], [34.1, 58.0], [34.2, 58.0], [34.3, 58.0], [34.4, 58.0], [34.5, 58.0], [34.6, 58.0], [34.7, 58.0], [34.8, 58.0], [34.9, 58.0], [35.0, 59.0], [35.1, 59.0], [35.2, 59.0], [35.3, 59.0], [35.4, 59.0], [35.5, 59.0], [35.6, 59.0], [35.7, 59.0], [35.8, 59.0], [35.9, 59.0], [36.0, 59.0], [36.1, 59.0], [36.2, 59.0], [36.3, 59.0], [36.4, 59.0], [36.5, 59.0], [36.6, 59.0], [36.7, 59.0], [36.8, 59.0], [36.9, 59.0], [37.0, 59.0], [37.1, 59.0], [37.2, 59.0], [37.3, 59.0], [37.4, 59.0], [37.5, 59.0], [37.6, 59.0], [37.7, 59.0], [37.8, 59.0], [37.9, 59.0], [38.0, 59.0], [38.1, 59.0], [38.2, 59.0], [38.3, 59.0], [38.4, 59.0], [38.5, 59.0], [38.6, 59.0], [38.7, 59.0], [38.8, 59.0], [38.9, 59.0], [39.0, 59.0], [39.1, 59.0], [39.2, 59.0], [39.3, 59.0], [39.4, 59.0], [39.5, 59.0], [39.6, 59.0], [39.7, 59.0], [39.8, 59.0], [39.9, 59.0], [40.0, 59.0], [40.1, 59.0], [40.2, 59.0], [40.3, 59.0], [40.4, 59.0], [40.5, 59.0], [40.6, 59.0], [40.7, 59.0], [40.8, 59.0], [40.9, 59.0], [41.0, 59.0], [41.1, 59.0], [41.2, 59.0], [41.3, 59.0], [41.4, 59.0], [41.5, 59.0], [41.6, 59.0], [41.7, 59.0], [41.8, 59.0], [41.9, 59.0], [42.0, 59.0], [42.1, 59.0], [42.2, 59.0], [42.3, 59.0], [42.4, 59.0], [42.5, 59.0], [42.6, 59.0], [42.7, 59.0], [42.8, 59.0], [42.9, 59.0], [43.0, 59.0], [43.1, 59.0], [43.2, 59.0], [43.3, 59.0], [43.4, 59.0], [43.5, 59.0], [43.6, 59.0], [43.7, 59.0], [43.8, 59.0], [43.9, 59.0], [44.0, 59.0], [44.1, 59.0], [44.2, 60.0], [44.3, 60.0], [44.4, 60.0], [44.5, 60.0], [44.6, 60.0], [44.7, 60.0], [44.8, 60.0], [44.9, 60.0], [45.0, 60.0], [45.1, 60.0], [45.2, 60.0], [45.3, 60.0], [45.4, 60.0], [45.5, 60.0], [45.6, 60.0], [45.7, 60.0], [45.8, 60.0], [45.9, 60.0], [46.0, 60.0], [46.1, 60.0], [46.2, 60.0], [46.3, 60.0], [46.4, 60.0], [46.5, 60.0], [46.6, 60.0], [46.7, 60.0], [46.8, 60.0], [46.9, 60.0], [47.0, 60.0], [47.1, 60.0], [47.2, 60.0], [47.3, 60.0], [47.4, 60.0], [47.5, 60.0], [47.6, 60.0], [47.7, 60.0], [47.8, 60.0], [47.9, 60.0], [48.0, 60.0], [48.1, 60.0], [48.2, 60.0], [48.3, 60.0], [48.4, 60.0], [48.5, 60.0], [48.6, 60.0], [48.7, 60.0], [48.8, 60.0], [48.9, 60.0], [49.0, 60.0], [49.1, 60.0], [49.2, 60.0], [49.3, 60.0], [49.4, 60.0], [49.5, 60.0], [49.6, 60.0], [49.7, 60.0], [49.8, 60.0], [49.9, 60.0], [50.0, 60.0], [50.1, 60.0], [50.2, 60.0], [50.3, 60.0], [50.4, 60.0], [50.5, 60.0], [50.6, 60.0], [50.7, 60.0], [50.8, 60.0], [50.9, 60.0], [51.0, 60.0], [51.1, 60.0], [51.2, 60.0], [51.3, 60.0], [51.4, 60.0], [51.5, 60.0], [51.6, 60.0], [51.7, 60.0], [51.8, 60.0], [51.9, 60.0], [52.0, 60.0], [52.1, 60.0], [52.2, 60.0], [52.3, 60.0], [52.4, 60.0], [52.5, 60.0], [52.6, 60.0], [52.7, 60.0], [52.8, 60.0], [52.9, 60.0], [53.0, 60.0], [53.1, 60.0], [53.2, 60.0], [53.3, 60.0], [53.4, 60.0], [53.5, 60.0], [53.6, 60.0], [53.7, 60.0], [53.8, 60.0], [53.9, 60.0], [54.0, 60.0], [54.1, 60.0], [54.2, 60.0], [54.3, 60.0], [54.4, 60.0], [54.5, 60.0], [54.6, 60.0], [54.7, 61.0], [54.8, 61.0], [54.9, 61.0], [55.0, 61.0], [55.1, 61.0], [55.2, 61.0], [55.3, 61.0], [55.4, 61.0], [55.5, 61.0], [55.6, 61.0], [55.7, 61.0], [55.8, 61.0], [55.9, 61.0], [56.0, 61.0], [56.1, 61.0], [56.2, 61.0], [56.3, 61.0], [56.4, 61.0], [56.5, 61.0], [56.6, 61.0], [56.7, 61.0], [56.8, 61.0], [56.9, 61.0], [57.0, 61.0], [57.1, 61.0], [57.2, 61.0], [57.3, 61.0], [57.4, 61.0], [57.5, 61.0], [57.6, 61.0], [57.7, 61.0], [57.8, 61.0], [57.9, 61.0], [58.0, 61.0], [58.1, 61.0], [58.2, 61.0], [58.3, 61.0], [58.4, 61.0], [58.5, 61.0], [58.6, 61.0], [58.7, 61.0], [58.8, 61.0], [58.9, 61.0], [59.0, 61.0], [59.1, 61.0], [59.2, 61.0], [59.3, 61.0], [59.4, 61.0], [59.5, 61.0], [59.6, 61.0], [59.7, 61.0], [59.8, 61.0], [59.9, 61.0], [60.0, 61.0], [60.1, 61.0], [60.2, 61.0], [60.3, 61.0], [60.4, 61.0], [60.5, 61.0], [60.6, 61.0], [60.7, 61.0], [60.8, 61.0], [60.9, 61.0], [61.0, 61.0], [61.1, 61.0], [61.2, 61.0], [61.3, 61.0], [61.4, 61.0], [61.5, 61.0], [61.6, 61.0], [61.7, 61.0], [61.8, 61.0], [61.9, 61.0], [62.0, 61.0], [62.1, 61.0], [62.2, 61.0], [62.3, 61.0], [62.4, 61.0], [62.5, 62.0], [62.6, 62.0], [62.7, 62.0], [62.8, 62.0], [62.9, 62.0], [63.0, 62.0], [63.1, 62.0], [63.2, 62.0], [63.3, 62.0], [63.4, 62.0], [63.5, 62.0], [63.6, 62.0], [63.7, 62.0], [63.8, 62.0], [63.9, 62.0], [64.0, 62.0], [64.1, 62.0], [64.2, 62.0], [64.3, 62.0], [64.4, 62.0], [64.5, 62.0], [64.6, 62.0], [64.7, 62.0], [64.8, 62.0], [64.9, 62.0], [65.0, 62.0], [65.1, 62.0], [65.2, 62.0], [65.3, 62.0], [65.4, 62.0], [65.5, 62.0], [65.6, 62.0], [65.7, 62.0], [65.8, 62.0], [65.9, 62.0], [66.0, 62.0], [66.1, 62.0], [66.2, 62.0], [66.3, 62.0], [66.4, 62.0], [66.5, 62.0], [66.6, 62.0], [66.7, 62.0], [66.8, 62.0], [66.9, 62.0], [67.0, 62.0], [67.1, 62.0], [67.2, 62.0], [67.3, 62.0], [67.4, 63.0], [67.5, 63.0], [67.6, 63.0], [67.7, 63.0], [67.8, 63.0], [67.9, 63.0], [68.0, 63.0], [68.1, 63.0], [68.2, 63.0], [68.3, 63.0], [68.4, 63.0], [68.5, 63.0], [68.6, 63.0], [68.7, 63.0], [68.8, 63.0], [68.9, 63.0], [69.0, 63.0], [69.1, 63.0], [69.2, 63.0], [69.3, 63.0], [69.4, 63.0], [69.5, 63.0], [69.6, 63.0], [69.7, 63.0], [69.8, 63.0], [69.9, 63.0], [70.0, 63.0], [70.1, 63.0], [70.2, 64.0], [70.3, 64.0], [70.4, 64.0], [70.5, 64.0], [70.6, 64.0], [70.7, 64.0], [70.8, 64.0], [70.9, 64.0], [71.0, 64.0], [71.1, 64.0], [71.2, 64.0], [71.3, 64.0], [71.4, 64.0], [71.5, 64.0], [71.6, 64.0], [71.7, 64.0], [71.8, 64.0], [71.9, 64.0], [72.0, 64.0], [72.1, 65.0], [72.2, 65.0], [72.3, 65.0], [72.4, 65.0], [72.5, 65.0], [72.6, 65.0], [72.7, 65.0], [72.8, 65.0], [72.9, 65.0], [73.0, 65.0], [73.1, 65.0], [73.2, 65.0], [73.3, 65.0], [73.4, 65.0], [73.5, 65.0], [73.6, 66.0], [73.7, 66.0], [73.8, 66.0], [73.9, 66.0], [74.0, 66.0], [74.1, 66.0], [74.2, 66.0], [74.3, 66.0], [74.4, 66.0], [74.5, 66.0], [74.6, 66.0], [74.7, 66.0], [74.8, 67.0], [74.9, 67.0], [75.0, 67.0], [75.1, 67.0], [75.2, 67.0], [75.3, 67.0], [75.4, 67.0], [75.5, 67.0], [75.6, 67.0], [75.7, 68.0], [75.8, 68.0], [75.9, 68.0], [76.0, 68.0], [76.1, 68.0], [76.2, 68.0], [76.3, 68.0], [76.4, 68.0], [76.5, 68.0], [76.6, 68.0], [76.7, 69.0], [76.8, 69.0], [76.9, 69.0], [77.0, 69.0], [77.1, 69.0], [77.2, 69.0], [77.3, 69.0], [77.4, 69.0], [77.5, 69.0], [77.6, 69.0], [77.7, 69.0], [77.8, 70.0], [77.9, 70.0], [78.0, 70.0], [78.1, 70.0], [78.2, 70.0], [78.3, 70.0], [78.4, 70.0], [78.5, 70.0], [78.6, 70.0], [78.7, 71.0], [78.8, 71.0], [78.9, 71.0], [79.0, 71.0], [79.1, 71.0], [79.2, 71.0], [79.3, 71.0], [79.4, 71.0], [79.5, 72.0], [79.6, 72.0], [79.7, 72.0], [79.8, 72.0], [79.9, 72.0], [80.0, 72.0], [80.1, 72.0], [80.2, 72.0], [80.3, 73.0], [80.4, 73.0], [80.5, 73.0], [80.6, 73.0], [80.7, 73.0], [80.8, 73.0], [80.9, 73.0], [81.0, 73.0], [81.1, 73.0], [81.2, 73.0], [81.3, 74.0], [81.4, 74.0], [81.5, 74.0], [81.6, 74.0], [81.7, 74.0], [81.8, 74.0], [81.9, 74.0], [82.0, 74.0], [82.1, 74.0], [82.2, 74.0], [82.3, 74.0], [82.4, 75.0], [82.5, 75.0], [82.6, 75.0], [82.7, 75.0], [82.8, 75.0], [82.9, 75.0], [83.0, 75.0], [83.1, 75.0], [83.2, 75.0], [83.3, 75.0], [83.4, 75.0], [83.5, 75.0], [83.6, 75.0], [83.7, 75.0], [83.8, 76.0], [83.9, 76.0], [84.0, 76.0], [84.1, 76.0], [84.2, 76.0], [84.3, 76.0], [84.4, 76.0], [84.5, 76.0], [84.6, 76.0], [84.7, 76.0], [84.8, 76.0], [84.9, 76.0], [85.0, 76.0], [85.1, 76.0], [85.2, 76.0], [85.3, 77.0], [85.4, 77.0], [85.5, 77.0], [85.6, 77.0], [85.7, 77.0], [85.8, 77.0], [85.9, 77.0], [86.0, 77.0], [86.1, 77.0], [86.2, 77.0], [86.3, 77.0], [86.4, 77.0], [86.5, 77.0], [86.6, 77.0], [86.7, 77.0], [86.8, 78.0], [86.9, 78.0], [87.0, 78.0], [87.1, 78.0], [87.2, 78.0], [87.3, 78.0], [87.4, 78.0], [87.5, 78.0], [87.6, 78.0], [87.7, 78.0], [87.8, 78.0], [87.9, 78.0], [88.0, 78.0], [88.1, 78.0], [88.2, 78.0], [88.3, 78.0], [88.4, 78.0], [88.5, 78.0], [88.6, 79.0], [88.7, 79.0], [88.8, 79.0], [88.9, 79.0], [89.0, 79.0], [89.1, 79.0], [89.2, 79.0], [89.3, 79.0], [89.4, 79.0], [89.5, 79.0], [89.6, 79.0], [89.7, 79.0], [89.8, 79.0], [89.9, 79.0], [90.0, 79.0], [90.1, 79.0], [90.2, 79.0], [90.3, 79.0], [90.4, 79.0], [90.5, 80.0], [90.6, 80.0], [90.7, 80.0], [90.8, 80.0], [90.9, 80.0], [91.0, 80.0], [91.1, 80.0], [91.2, 80.0], [91.3, 80.0], [91.4, 80.0], [91.5, 80.0], [91.6, 80.0], [91.7, 80.0], [91.8, 80.0], [91.9, 80.0], [92.0, 80.0], [92.1, 80.0], [92.2, 81.0], [92.3, 81.0], [92.4, 81.0], [92.5, 81.0], [92.6, 81.0], [92.7, 81.0], [92.8, 81.0], [92.9, 81.0], [93.0, 81.0], [93.1, 81.0], [93.2, 81.0], [93.3, 81.0], [93.4, 81.0], [93.5, 81.0], [93.6, 82.0], [93.7, 82.0], [93.8, 82.0], [93.9, 82.0], [94.0, 82.0], [94.1, 82.0], [94.2, 82.0], [94.3, 82.0], [94.4, 83.0], [94.5, 83.0], [94.6, 83.0], [94.7, 83.0], [94.8, 83.0], [94.9, 84.0], [95.0, 84.0], [95.1, 84.0], [95.2, 84.0], [95.3, 85.0], [95.4, 85.0], [95.5, 85.0], [95.6, 86.0], [95.7, 86.0], [95.8, 86.0], [95.9, 87.0], [96.0, 87.0], [96.1, 87.0], [96.2, 88.0], [96.3, 88.0], [96.4, 89.0], [96.5, 89.0], [96.6, 90.0], [96.7, 90.0], [96.8, 90.0], [96.9, 91.0], [97.0, 91.0], [97.1, 91.0], [97.2, 92.0], [97.3, 92.0], [97.4, 93.0], [97.5, 94.0], [97.6, 94.0], [97.7, 95.0], [97.8, 95.0], [97.9, 96.0], [98.0, 97.0], [98.1, 97.0], [98.2, 98.0], [98.3, 99.0], [98.4, 100.0], [98.5, 102.0], [98.6, 104.0], [98.7, 107.0], [98.8, 116.0], [98.9, 119.0], [99.0, 162.0], [99.1, 171.0], [99.2, 177.0], [99.3, 182.0], [99.4, 183.0], [99.5, 183.0], [99.6, 184.0], [99.7, 196.0], [99.8, 227.0], [99.9, 278.0], [100.0, 354.0]], "isOverall": false, "label": "GetTotalVertical", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 100.0, "title": "Response Time Percentiles"}},
        getOptions: function() {
            return {
                series: {
                    points: { show: false }
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentiles'
                },
                xaxis: {
                    tickDecimals: 1,
                    axisLabel: "Percentiles",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Percentile value in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : %x.2 percentile was %y ms"
                },
                selection: { mode: "xy" },
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentiles"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesPercentiles"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesPercentiles"), dataset, prepareOverviewOptions(options));
        }
};

/**
 * @param elementId Id of element where we display message
 */
function setEmptyGraph(elementId) {
    $(function() {
        $(elementId).text("No graph series with filter="+seriesFilter);
    });
}

// Response times percentiles
function refreshResponseTimePercentiles() {
    var infos = responseTimePercentilesInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimePercentiles");
        return;
    }
    if (isGraph($("#flotResponseTimesPercentiles"))){
        infos.createGraph();
    } else {
        var choiceContainer = $("#choicesResponseTimePercentiles");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesPercentiles", "#overviewResponseTimesPercentiles");
        $('#bodyResponseTimePercentiles .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimeDistributionInfos = {
        data: {"result": {"minY": 9.0, "minX": 0.0, "maxY": 62945.0, "series": [{"data": [[0.0, 62945.0], [300.0, 9.0], [200.0, 168.0], [100.0, 878.0]], "isOverall": false, "label": "GetTotalVertical", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 300.0, "title": "Response Time Distribution"}},
        getOptions: function() {
            var granularity = this.data.result.granularity;
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    barWidth: this.data.result.granularity
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " responses for " + label + " were between " + xval + " and " + (xval + granularity) + " ms";
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimeDistribution"), prepareData(data.result.series, $("#choicesResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshResponseTimeDistribution() {
    var infos = responseTimeDistributionInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeDistribution");
        return;
    }
    if (isGraph($("#flotResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var syntheticResponseTimeDistributionInfos = {
        data: {"result": {"minY": 5955.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1,500ms"], [2, "Requests having \nresponse time > 1,500ms"], [3, "Requests in error"]], "maxY": 58045.0, "series": [{"data": [[0.0, 58045.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1,500ms", "isController": false}, {"data": [], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1,500ms", "isController": false}, {"data": [[3.0, 5955.0]], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 3.0, "title": "Synthetic Response Times Distribution"}},
        getOptions: function() {
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendSyntheticResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times ranges",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                    tickLength:0,
                    min:-0.5,
                    max:3.5
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    align: "center",
                    barWidth: 0.25,
                    fill:.75
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " " + label;
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            options.xaxis.ticks = data.result.ticks;
            $.plot($("#flotSyntheticResponseTimeDistribution"), prepareData(data.result.series, $("#choicesSyntheticResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshSyntheticResponseTimeDistribution() {
    var infos = syntheticResponseTimeDistributionInfos;
    prepareSeries(infos.data, true);
    if (isGraph($("#flotSyntheticResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerSyntheticResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var activeThreadsOverTimeInfos = {
        data: {"result": {"minY": 111.88817187499953, "minX": 1.74476664E12, "maxY": 111.88817187499953, "series": [{"data": [[1.74476664E12, 111.88817187499953]], "isOverall": false, "label": "GetTotalVertical", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.74476664E12, "title": "Active Threads Over Time"}},
        getOptions: function() {
            return {
                series: {
                    stack: true,
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 6,
                    show: true,
                    container: '#legendActiveThreadsOverTime'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                selection: {
                    mode: 'xy'
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : At %x there were %y active threads"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesActiveThreadsOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotActiveThreadsOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewActiveThreadsOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Active Threads Over Time
function refreshActiveThreadsOverTime(fixTimestamps) {
    var infos = activeThreadsOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, -25200000);
    }
    if(isGraph($("#flotActiveThreadsOverTime"))) {
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesActiveThreadsOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotActiveThreadsOverTime", "#overviewActiveThreadsOverTime");
        $('#footerActiveThreadsOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var timeVsThreadsInfos = {
        data: {"result": {"minY": 14.512820512820513, "minX": 1.0, "maxY": 74.59241706161141, "series": [{"data": [[2.0, 40.75], [3.0, 16.666666666666664], [4.0, 14.789473684210527], [5.0, 15.039999999999997], [6.0, 14.512820512820513], [7.0, 21.06976744186047], [8.0, 17.812500000000004], [9.0, 27.799999999999997], [10.0, 29.902439024390244], [11.0, 31.0], [12.0, 33.863636363636374], [13.0, 40.82692307692308], [14.0, 24.15517241379311], [15.0, 39.00000000000001], [16.0, 36.1578947368421], [17.0, 64.03030303030303], [18.0, 50.88095238095238], [19.0, 19.928571428571427], [20.0, 47.68656716417911], [21.0, 41.380530973451314], [22.0, 49.392156862745104], [23.0, 34.53246753246752], [24.0, 51.73333333333335], [25.0, 50.162790697674424], [26.0, 48.23199999999998], [27.0, 46.17894736842105], [28.0, 59.24999999999999], [29.0, 54.46575342465752], [30.0, 46.60344827586205], [31.0, 47.29577464788732], [32.0, 55.288135593220346], [33.0, 43.93577981651377], [34.0, 58.337662337662344], [35.0, 56.61111111111111], [36.0, 60.81318681318682], [37.0, 55.57142857142856], [38.0, 48.06400000000001], [39.0, 56.95348837209304], [40.0, 51.13173652694613], [41.0, 44.686635944700484], [42.0, 57.68999999999999], [43.0, 53.89506172839504], [44.0, 49.1937172774869], [45.0, 60.57627118644068], [46.0, 54.76], [47.0, 53.421768707482975], [48.0, 46.74358974358974], [49.0, 50.62096774193548], [50.0, 48.87046632124352], [51.0, 53.04716981132076], [52.0, 56.266666666666666], [53.0, 54.712500000000006], [54.0, 58.09271523178808], [55.0, 54.47435897435896], [56.0, 50.89371980676328], [57.0, 55.768595041322314], [58.0, 59.08661417322836], [59.0, 62.52272727272725], [60.0, 47.57342657342659], [61.0, 54.57560975609756], [62.0, 59.22826086956522], [63.0, 65.62711864406783], [64.0, 50.97619047619049], [65.0, 58.55855855855855], [66.0, 54.94919786096256], [67.0, 62.77368421052633], [68.0, 61.605263157894726], [69.0, 58.750000000000014], [70.0, 57.94845360824742], [71.0, 59.56989247311829], [72.0, 53.42500000000002], [73.0, 55.69754768392372], [74.0, 59.54385964912283], [75.0, 54.63589743589745], [76.0, 57.300771208226244], [77.0, 52.52803738317759], [78.0, 59.09929078014186], [79.0, 56.80132450331123], [80.0, 55.135000000000005], [81.0, 56.775862068965495], [82.0, 55.47008547008545], [83.0, 46.434554973822], [84.0, 53.949999999999996], [85.0, 65.5801526717557], [86.0, 55.792703150912104], [87.0, 57.957236842105246], [88.0, 58.013698630136965], [89.0, 54.22748815165877], [90.0, 53.645000000000024], [91.0, 59.994623655914], [92.0, 62.07633587786259], [93.0, 58.605633802816904], [94.0, 62.567039106145266], [95.0, 53.7481343283582], [96.0, 62.127777777777766], [97.0, 63.2206405693951], [98.0, 63.218009478673], [99.0, 57.22656250000001], [100.0, 54.4032786885246], [101.0, 53.52688172043011], [102.0, 47.97619047619047], [103.0, 59.99999999999999], [104.0, 67.14372469635624], [105.0, 65.50720461095099], [106.0, 63.927953890489945], [107.0, 60.410714285714285], [108.0, 61.097972972972954], [109.0, 54.14960629921259], [110.0, 60.2804232804233], [111.0, 56.38028169014079], [112.0, 56.8684210526316], [113.0, 71.65686274509808], [114.0, 63.797665369649835], [115.0, 67.78947368421053], [116.0, 62.83453237410071], [117.0, 63.35356600910474], [118.0, 66.8728682170543], [119.0, 74.59241706161141], [120.0, 68.68664850136243], [121.0, 59.53440366972475], [122.0, 73.29349067377235], [123.0, 60.342198581560304], [124.0, 66.32573289902278], [125.0, 60.81304347826087], [126.0, 62.488505747126425], [127.0, 49.90613718411556], [128.0, 62.60408012065701], [1.0, 34.5]], "isOverall": false, "label": "GetTotalVertical", "isController": false}, {"data": [[111.88817187499953, 61.0939062499998]], "isOverall": false, "label": "GetTotalVertical-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 128.0, "title": "Time VS Threads"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: { noColumns: 2,show: true, container: '#legendTimeVsThreads' },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s: At %x.2 active threads, Average response time was %y.2 ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesTimeVsThreads"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotTimesVsThreads"), dataset, options);
            // setup overview
            $.plot($("#overviewTimesVsThreads"), dataset, prepareOverviewOptions(options));
        }
};

// Time vs threads
function refreshTimeVsThreads(){
    var infos = timeVsThreadsInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTimeVsThreads");
        return;
    }
    if(isGraph($("#flotTimesVsThreads"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTimeVsThreads");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTimesVsThreads", "#overviewTimesVsThreads");
        $('#footerTimeVsThreads .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var bytesThroughputOverTimeInfos = {
        data : {"result": {"minY": 109152.93333333333, "minX": 1.74476664E12, "maxY": 200417.2, "series": [{"data": [[1.74476664E12, 109152.93333333333]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.74476664E12, 200417.2]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.74476664E12, "title": "Bytes Throughput Over Time"}},
        getOptions : function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity) ,
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Bytes / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendBytesThroughputOverTime'
                },
                selection: {
                    mode: "xy"
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y"
                }
            };
        },
        createGraph : function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesBytesThroughputOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotBytesThroughputOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewBytesThroughputOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Bytes throughput Over Time
function refreshBytesThroughputOverTime(fixTimestamps) {
    var infos = bytesThroughputOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, -25200000);
    }
    if(isGraph($("#flotBytesThroughputOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesBytesThroughputOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotBytesThroughputOverTime", "#overviewBytesThroughputOverTime");
        $('#footerBytesThroughputOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimesOverTimeInfos = {
        data: {"result": {"minY": 61.0939062499998, "minX": 1.74476664E12, "maxY": 61.0939062499998, "series": [{"data": [[1.74476664E12, 61.0939062499998]], "isOverall": false, "label": "GetTotalVertical", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.74476664E12, "title": "Response Time Over Time"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average response time was %y ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Times Over Time
function refreshResponseTimeOverTime(fixTimestamps) {
    var infos = responseTimesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, -25200000);
    }
    if(isGraph($("#flotResponseTimesOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesOverTime", "#overviewResponseTimesOverTime");
        $('#footerResponseTimesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var latenciesOverTimeInfos = {
        data: {"result": {"minY": 61.08840625000002, "minX": 1.74476664E12, "maxY": 61.08840625000002, "series": [{"data": [[1.74476664E12, 61.08840625000002]], "isOverall": false, "label": "GetTotalVertical", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.74476664E12, "title": "Latencies Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response latencies in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendLatenciesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average latency was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesLatenciesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotLatenciesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewLatenciesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Latencies Over Time
function refreshLatenciesOverTime(fixTimestamps) {
    var infos = latenciesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyLatenciesOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, -25200000);
    }
    if(isGraph($("#flotLatenciesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesLatenciesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotLatenciesOverTime", "#overviewLatenciesOverTime");
        $('#footerLatenciesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var connectTimeOverTimeInfos = {
        data: {"result": {"minY": 0.02843749999999964, "minX": 1.74476664E12, "maxY": 0.02843749999999964, "series": [{"data": [[1.74476664E12, 0.02843749999999964]], "isOverall": false, "label": "GetTotalVertical", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.74476664E12, "title": "Connect Time Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getConnectTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average Connect Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendConnectTimeOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average connect time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesConnectTimeOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotConnectTimeOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewConnectTimeOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Connect Time Over Time
function refreshConnectTimeOverTime(fixTimestamps) {
    var infos = connectTimeOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyConnectTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, -25200000);
    }
    if(isGraph($("#flotConnectTimeOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesConnectTimeOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotConnectTimeOverTime", "#overviewConnectTimeOverTime");
        $('#footerConnectTimeOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var responseTimePercentilesOverTimeInfos = {
        data: {"result": {"minY": 9.0, "minX": 1.74476664E12, "maxY": 354.0, "series": [{"data": [[1.74476664E12, 354.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.74476664E12, 79.0]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.74476664E12, 105.0]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.74476664E12, 84.0]], "isOverall": false, "label": "95th percentile", "isController": false}, {"data": [[1.74476664E12, 9.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.74476664E12, 60.0]], "isOverall": false, "label": "Median", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.74476664E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Response Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentilesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Response time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentilesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimePercentilesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimePercentilesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Time Percentiles Over Time
function refreshResponseTimePercentilesOverTime(fixTimestamps) {
    var infos = responseTimePercentilesOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, -25200000);
    }
    if(isGraph($("#flotResponseTimePercentilesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimePercentilesOverTime", "#overviewResponseTimePercentilesOverTime");
        $('#footerResponseTimePercentilesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var responseTimeVsRequestInfos = {
    data: {"result": {"minY": 14.0, "minX": 69.0, "maxY": 65.0, "series": [{"data": [[719.0, 59.0], [745.0, 58.0], [923.0, 58.0], [956.0, 58.0], [1091.0, 60.0], [69.0, 16.0], [1199.0, 59.0], [80.0, 14.0], [1336.0, 60.0], [1396.0, 61.0], [1424.0, 59.0], [1486.0, 60.0], [1586.0, 64.0], [1540.0, 60.0], [1656.0, 60.0], [1671.0, 63.0], [1716.0, 60.0], [1798.0, 65.0], [1910.0, 60.0], [1948.0, 63.0], [1982.0, 61.0], [1938.0, 61.0], [2018.0, 61.0], [2011.0, 62.0], [2037.0, 61.0], [2061.0, 61.0], [2072.0, 61.0], [2083.0, 61.0], [2082.0, 61.0], [2162.0, 60.0], [2107.0, 61.0], [2053.0, 61.0], [2065.0, 61.0], [2139.0, 61.0], [2143.0, 60.0], [2114.0, 61.0], [2102.0, 61.0], [2199.0, 60.0], [418.0, 26.0], [475.0, 42.0], [490.0, 55.0]], "isOverall": false, "label": "Successes", "isController": false}, {"data": [[719.0, 41.0], [745.0, 40.0], [923.0, 41.0], [956.0, 40.5], [1091.0, 42.0], [69.0, 18.0], [1199.0, 40.0], [80.0, 16.5], [1336.0, 41.0], [1396.0, 44.0], [1424.0, 40.0], [1486.0, 42.0], [1586.0, 43.0], [1540.0, 41.0], [1656.0, 42.0], [1671.0, 44.0], [1716.0, 44.0], [1798.0, 50.0], [1910.0, 42.0], [1948.0, 44.0], [1982.0, 43.0], [1938.0, 43.0], [2018.0, 45.0], [2011.0, 44.0], [2037.0, 42.0], [2061.0, 44.5], [2072.0, 45.0], [2083.0, 42.0], [2082.0, 43.0], [2162.0, 42.0], [2107.0, 43.0], [2053.0, 42.0], [2065.0, 44.0], [2139.0, 42.0], [2143.0, 43.0], [2114.0, 42.0], [2102.0, 42.0], [2199.0, 42.0], [418.0, 14.0], [475.0, 36.0], [490.0, 41.0]], "isOverall": false, "label": "Failures", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 2199.0, "title": "Response Time Vs Request"}},
    getOptions: function() {
        return {
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Response Time in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: {
                noColumns: 2,
                show: true,
                container: '#legendResponseTimeVsRequest'
            },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median response time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesResponseTimeVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotResponseTimeVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewResponseTimeVsRequest"), dataset, prepareOverviewOptions(options));

    }
};

// Response Time vs Request
function refreshResponseTimeVsRequest() {
    var infos = responseTimeVsRequestInfos;
    prepareSeries(infos.data);
    if (isGraph($("#flotResponseTimeVsRequest"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeVsRequest");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimeVsRequest", "#overviewResponseTimeVsRequest");
        $('#footerResponseRimeVsRequest .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var latenciesVsRequestInfos = {
    data: {"result": {"minY": 14.0, "minX": 69.0, "maxY": 65.0, "series": [{"data": [[719.0, 59.0], [745.0, 58.0], [923.0, 58.0], [956.0, 58.0], [1091.0, 60.0], [69.0, 16.0], [1199.0, 59.0], [80.0, 14.0], [1336.0, 60.0], [1396.0, 61.0], [1424.0, 59.0], [1486.0, 60.0], [1586.0, 64.0], [1540.0, 60.0], [1656.0, 60.0], [1671.0, 63.0], [1716.0, 60.0], [1798.0, 65.0], [1910.0, 60.0], [1948.0, 63.0], [1982.0, 61.0], [1938.0, 61.0], [2018.0, 61.0], [2011.0, 62.0], [2037.0, 61.0], [2061.0, 61.0], [2072.0, 61.0], [2083.0, 61.0], [2082.0, 61.0], [2162.0, 60.0], [2107.0, 61.0], [2053.0, 61.0], [2065.0, 61.0], [2139.0, 61.0], [2143.0, 60.0], [2114.0, 61.0], [2102.0, 61.0], [2199.0, 60.0], [418.0, 26.0], [475.0, 42.0], [490.0, 55.0]], "isOverall": false, "label": "Successes", "isController": false}, {"data": [[719.0, 41.0], [745.0, 40.0], [923.0, 41.0], [956.0, 40.5], [1091.0, 42.0], [69.0, 18.0], [1199.0, 40.0], [80.0, 16.0], [1336.0, 41.0], [1396.0, 44.0], [1424.0, 40.0], [1486.0, 42.0], [1586.0, 43.0], [1540.0, 41.0], [1656.0, 42.0], [1671.0, 44.0], [1716.0, 44.0], [1798.0, 50.0], [1910.0, 42.0], [1948.0, 44.0], [1982.0, 43.0], [1938.0, 43.0], [2018.0, 45.0], [2011.0, 44.0], [2037.0, 42.0], [2061.0, 44.5], [2072.0, 45.0], [2083.0, 42.0], [2082.0, 43.0], [2162.0, 42.0], [2107.0, 43.0], [2053.0, 42.0], [2065.0, 44.0], [2139.0, 42.0], [2143.0, 43.0], [2114.0, 42.0], [2102.0, 42.0], [2199.0, 42.0], [418.0, 14.0], [475.0, 36.0], [490.0, 41.0]], "isOverall": false, "label": "Failures", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 2199.0, "title": "Latencies Vs Request"}},
    getOptions: function() {
        return{
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Latency in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: { noColumns: 2,show: true, container: '#legendLatencyVsRequest' },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median Latency time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesLatencyVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotLatenciesVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewLatenciesVsRequest"), dataset, prepareOverviewOptions(options));
    }
};

// Latencies vs Request
function refreshLatenciesVsRequest() {
        var infos = latenciesVsRequestInfos;
        prepareSeries(infos.data);
        if(isGraph($("#flotLatenciesVsRequest"))){
            infos.createGraph();
        }else{
            var choiceContainer = $("#choicesLatencyVsRequest");
            createLegend(choiceContainer, infos);
            infos.createGraph();
            setGraphZoomable("#flotLatenciesVsRequest", "#overviewLatenciesVsRequest");
            $('#footerLatenciesVsRequest .legendColorBox > div').each(function(i){
                $(this).clone().prependTo(choiceContainer.find("li").eq(i));
            });
        }
};

var hitsPerSecondInfos = {
        data: {"result": {"minY": 1066.6666666666667, "minX": 1.74476664E12, "maxY": 1066.6666666666667, "series": [{"data": [[1.74476664E12, 1066.6666666666667]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.74476664E12, "title": "Hits Per Second"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of hits / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendHitsPerSecond"
                },
                selection: {
                    mode : 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y.2 hits/sec"
                }
            };
        },
        createGraph: function createGraph() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesHitsPerSecond"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotHitsPerSecond"), dataset, options);
            // setup overview
            $.plot($("#overviewHitsPerSecond"), dataset, prepareOverviewOptions(options));
        }
};

// Hits per second
function refreshHitsPerSecond(fixTimestamps) {
    var infos = hitsPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, -25200000);
    }
    if (isGraph($("#flotHitsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesHitsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotHitsPerSecond", "#overviewHitsPerSecond");
        $('#footerHitsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var codesPerSecondInfos = {
        data: {"result": {"minY": 99.25, "minX": 1.74476664E12, "maxY": 967.4166666666666, "series": [{"data": [[1.74476664E12, 967.4166666666666]], "isOverall": false, "label": "200", "isController": false}, {"data": [[1.74476664E12, 99.25]], "isOverall": false, "label": "404", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.74476664E12, "title": "Codes Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendCodesPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "Number of Response Codes %s at %x was %y.2 responses / sec"
                }
            };
        },
    createGraph: function() {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesCodesPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotCodesPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewCodesPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Codes per second
function refreshCodesPerSecond(fixTimestamps) {
    var infos = codesPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, -25200000);
    }
    if(isGraph($("#flotCodesPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesCodesPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotCodesPerSecond", "#overviewCodesPerSecond");
        $('#footerCodesPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var transactionsPerSecondInfos = {
        data: {"result": {"minY": 99.25, "minX": 1.74476664E12, "maxY": 967.4166666666666, "series": [{"data": [[1.74476664E12, 967.4166666666666]], "isOverall": false, "label": "GetTotalVertical-success", "isController": false}, {"data": [[1.74476664E12, 99.25]], "isOverall": false, "label": "GetTotalVertical-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.74476664E12, "title": "Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTransactionsPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                }
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTransactionsPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTransactionsPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewTransactionsPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Transactions per second
function refreshTransactionsPerSecond(fixTimestamps) {
    var infos = transactionsPerSecondInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTransactionsPerSecond");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, -25200000);
    }
    if(isGraph($("#flotTransactionsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTransactionsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTransactionsPerSecond", "#overviewTransactionsPerSecond");
        $('#footerTransactionsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var totalTPSInfos = {
        data: {"result": {"minY": 99.25, "minX": 1.74476664E12, "maxY": 967.4166666666666, "series": [{"data": [[1.74476664E12, 967.4166666666666]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [[1.74476664E12, 99.25]], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.74476664E12, "title": "Total Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTotalTPS"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                },
                colors: ["#9ACD32", "#FF6347"]
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTotalTPS"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTotalTPS"), dataset, options);
        // setup overview
        $.plot($("#overviewTotalTPS"), dataset, prepareOverviewOptions(options));
    }
};

// Total Transactions per second
function refreshTotalTPS(fixTimestamps) {
    var infos = totalTPSInfos;
    // We want to ignore seriesFilter
    prepareSeries(infos.data, false, true);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, -25200000);
    }
    if(isGraph($("#flotTotalTPS"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTotalTPS");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTotalTPS", "#overviewTotalTPS");
        $('#footerTotalTPS .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

// Collapse the graph matching the specified DOM element depending the collapsed
// status
function collapse(elem, collapsed){
    if(collapsed){
        $(elem).parent().find(".fa-chevron-up").removeClass("fa-chevron-up").addClass("fa-chevron-down");
    } else {
        $(elem).parent().find(".fa-chevron-down").removeClass("fa-chevron-down").addClass("fa-chevron-up");
        if (elem.id == "bodyBytesThroughputOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshBytesThroughputOverTime(true);
            }
            document.location.href="#bytesThroughputOverTime";
        } else if (elem.id == "bodyLatenciesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesOverTime(true);
            }
            document.location.href="#latenciesOverTime";
        } else if (elem.id == "bodyCustomGraph") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCustomGraph(true);
            }
            document.location.href="#responseCustomGraph";
        } else if (elem.id == "bodyConnectTimeOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshConnectTimeOverTime(true);
            }
            document.location.href="#connectTimeOverTime";
        } else if (elem.id == "bodyResponseTimePercentilesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimePercentilesOverTime(true);
            }
            document.location.href="#responseTimePercentilesOverTime";
        } else if (elem.id == "bodyResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeDistribution();
            }
            document.location.href="#responseTimeDistribution" ;
        } else if (elem.id == "bodySyntheticResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshSyntheticResponseTimeDistribution();
            }
            document.location.href="#syntheticResponseTimeDistribution" ;
        } else if (elem.id == "bodyActiveThreadsOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshActiveThreadsOverTime(true);
            }
            document.location.href="#activeThreadsOverTime";
        } else if (elem.id == "bodyTimeVsThreads") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTimeVsThreads();
            }
            document.location.href="#timeVsThreads" ;
        } else if (elem.id == "bodyCodesPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCodesPerSecond(true);
            }
            document.location.href="#codesPerSecond";
        } else if (elem.id == "bodyTransactionsPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTransactionsPerSecond(true);
            }
            document.location.href="#transactionsPerSecond";
        } else if (elem.id == "bodyTotalTPS") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTotalTPS(true);
            }
            document.location.href="#totalTPS";
        } else if (elem.id == "bodyResponseTimeVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeVsRequest();
            }
            document.location.href="#responseTimeVsRequest";
        } else if (elem.id == "bodyLatenciesVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesVsRequest();
            }
            document.location.href="#latencyVsRequest";
        }
    }
}

/*
 * Activates or deactivates all series of the specified graph (represented by id parameter)
 * depending on checked argument.
 */
function toggleAll(id, checked){
    var placeholder = document.getElementById(id);

    var cases = $(placeholder).find(':checkbox');
    cases.prop('checked', checked);
    $(cases).parent().children().children().toggleClass("legend-disabled", !checked);

    var choiceContainer;
    if ( id == "choicesBytesThroughputOverTime"){
        choiceContainer = $("#choicesBytesThroughputOverTime");
        refreshBytesThroughputOverTime(false);
    } else if(id == "choicesResponseTimesOverTime"){
        choiceContainer = $("#choicesResponseTimesOverTime");
        refreshResponseTimeOverTime(false);
    }else if(id == "choicesResponseCustomGraph"){
        choiceContainer = $("#choicesResponseCustomGraph");
        refreshCustomGraph(false);
    } else if ( id == "choicesLatenciesOverTime"){
        choiceContainer = $("#choicesLatenciesOverTime");
        refreshLatenciesOverTime(false);
    } else if ( id == "choicesConnectTimeOverTime"){
        choiceContainer = $("#choicesConnectTimeOverTime");
        refreshConnectTimeOverTime(false);
    } else if ( id == "choicesResponseTimePercentilesOverTime"){
        choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        refreshResponseTimePercentilesOverTime(false);
    } else if ( id == "choicesResponseTimePercentiles"){
        choiceContainer = $("#choicesResponseTimePercentiles");
        refreshResponseTimePercentiles();
    } else if(id == "choicesActiveThreadsOverTime"){
        choiceContainer = $("#choicesActiveThreadsOverTime");
        refreshActiveThreadsOverTime(false);
    } else if ( id == "choicesTimeVsThreads"){
        choiceContainer = $("#choicesTimeVsThreads");
        refreshTimeVsThreads();
    } else if ( id == "choicesSyntheticResponseTimeDistribution"){
        choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        refreshSyntheticResponseTimeDistribution();
    } else if ( id == "choicesResponseTimeDistribution"){
        choiceContainer = $("#choicesResponseTimeDistribution");
        refreshResponseTimeDistribution();
    } else if ( id == "choicesHitsPerSecond"){
        choiceContainer = $("#choicesHitsPerSecond");
        refreshHitsPerSecond(false);
    } else if(id == "choicesCodesPerSecond"){
        choiceContainer = $("#choicesCodesPerSecond");
        refreshCodesPerSecond(false);
    } else if ( id == "choicesTransactionsPerSecond"){
        choiceContainer = $("#choicesTransactionsPerSecond");
        refreshTransactionsPerSecond(false);
    } else if ( id == "choicesTotalTPS"){
        choiceContainer = $("#choicesTotalTPS");
        refreshTotalTPS(false);
    } else if ( id == "choicesResponseTimeVsRequest"){
        choiceContainer = $("#choicesResponseTimeVsRequest");
        refreshResponseTimeVsRequest();
    } else if ( id == "choicesLatencyVsRequest"){
        choiceContainer = $("#choicesLatencyVsRequest");
        refreshLatenciesVsRequest();
    }
    var color = checked ? "black" : "#818181";
    if(choiceContainer != null) {
        choiceContainer.find("label").each(function(){
            this.style.color = color;
        });
    }
}

