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
        data: {"result": {"minY": 11.0, "minX": 0.0, "maxY": 1087.0, "series": [{"data": [[0.0, 11.0], [0.1, 13.0], [0.2, 14.0], [0.3, 15.0], [0.4, 15.0], [0.5, 16.0], [0.6, 16.0], [0.7, 17.0], [0.8, 18.0], [0.9, 19.0], [1.0, 20.0], [1.1, 20.0], [1.2, 21.0], [1.3, 21.0], [1.4, 21.0], [1.5, 21.0], [1.6, 22.0], [1.7, 22.0], [1.8, 22.0], [1.9, 23.0], [2.0, 23.0], [2.1, 23.0], [2.2, 24.0], [2.3, 25.0], [2.4, 27.0], [2.5, 28.0], [2.6, 29.0], [2.7, 29.0], [2.8, 30.0], [2.9, 32.0], [3.0, 33.0], [3.1, 34.0], [3.2, 35.0], [3.3, 35.0], [3.4, 36.0], [3.5, 36.0], [3.6, 36.0], [3.7, 37.0], [3.8, 37.0], [3.9, 37.0], [4.0, 37.0], [4.1, 37.0], [4.2, 37.0], [4.3, 38.0], [4.4, 38.0], [4.5, 38.0], [4.6, 38.0], [4.7, 38.0], [4.8, 38.0], [4.9, 38.0], [5.0, 38.0], [5.1, 38.0], [5.2, 38.0], [5.3, 38.0], [5.4, 38.0], [5.5, 39.0], [5.6, 39.0], [5.7, 39.0], [5.8, 39.0], [5.9, 39.0], [6.0, 39.0], [6.1, 39.0], [6.2, 39.0], [6.3, 39.0], [6.4, 39.0], [6.5, 39.0], [6.6, 39.0], [6.7, 39.0], [6.8, 39.0], [6.9, 39.0], [7.0, 39.0], [7.1, 39.0], [7.2, 39.0], [7.3, 39.0], [7.4, 40.0], [7.5, 40.0], [7.6, 40.0], [7.7, 40.0], [7.8, 40.0], [7.9, 40.0], [8.0, 40.0], [8.1, 40.0], [8.2, 40.0], [8.3, 40.0], [8.4, 40.0], [8.5, 40.0], [8.6, 40.0], [8.7, 40.0], [8.8, 40.0], [8.9, 40.0], [9.0, 40.0], [9.1, 40.0], [9.2, 40.0], [9.3, 40.0], [9.4, 40.0], [9.5, 40.0], [9.6, 40.0], [9.7, 41.0], [9.8, 41.0], [9.9, 41.0], [10.0, 41.0], [10.1, 41.0], [10.2, 41.0], [10.3, 41.0], [10.4, 41.0], [10.5, 41.0], [10.6, 41.0], [10.7, 41.0], [10.8, 41.0], [10.9, 41.0], [11.0, 41.0], [11.1, 41.0], [11.2, 41.0], [11.3, 41.0], [11.4, 41.0], [11.5, 41.0], [11.6, 42.0], [11.7, 42.0], [11.8, 42.0], [11.9, 42.0], [12.0, 42.0], [12.1, 42.0], [12.2, 42.0], [12.3, 42.0], [12.4, 42.0], [12.5, 42.0], [12.6, 42.0], [12.7, 42.0], [12.8, 42.0], [12.9, 42.0], [13.0, 43.0], [13.1, 43.0], [13.2, 43.0], [13.3, 43.0], [13.4, 43.0], [13.5, 43.0], [13.6, 43.0], [13.7, 43.0], [13.8, 44.0], [13.9, 44.0], [14.0, 44.0], [14.1, 44.0], [14.2, 44.0], [14.3, 44.0], [14.4, 45.0], [14.5, 45.0], [14.6, 45.0], [14.7, 46.0], [14.8, 46.0], [14.9, 47.0], [15.0, 47.0], [15.1, 48.0], [15.2, 48.0], [15.3, 49.0], [15.4, 49.0], [15.5, 49.0], [15.6, 50.0], [15.7, 50.0], [15.8, 51.0], [15.9, 51.0], [16.0, 52.0], [16.1, 52.0], [16.2, 52.0], [16.3, 52.0], [16.4, 53.0], [16.5, 53.0], [16.6, 53.0], [16.7, 53.0], [16.8, 54.0], [16.9, 54.0], [17.0, 54.0], [17.1, 54.0], [17.2, 54.0], [17.3, 55.0], [17.4, 55.0], [17.5, 55.0], [17.6, 55.0], [17.7, 55.0], [17.8, 55.0], [17.9, 55.0], [18.0, 55.0], [18.1, 55.0], [18.2, 56.0], [18.3, 56.0], [18.4, 56.0], [18.5, 56.0], [18.6, 56.0], [18.7, 56.0], [18.8, 56.0], [18.9, 56.0], [19.0, 56.0], [19.1, 56.0], [19.2, 56.0], [19.3, 56.0], [19.4, 56.0], [19.5, 56.0], [19.6, 56.0], [19.7, 57.0], [19.8, 57.0], [19.9, 57.0], [20.0, 57.0], [20.1, 57.0], [20.2, 57.0], [20.3, 57.0], [20.4, 57.0], [20.5, 57.0], [20.6, 57.0], [20.7, 57.0], [20.8, 57.0], [20.9, 57.0], [21.0, 57.0], [21.1, 57.0], [21.2, 57.0], [21.3, 57.0], [21.4, 57.0], [21.5, 57.0], [21.6, 57.0], [21.7, 57.0], [21.8, 57.0], [21.9, 57.0], [22.0, 57.0], [22.1, 57.0], [22.2, 57.0], [22.3, 57.0], [22.4, 57.0], [22.5, 57.0], [22.6, 57.0], [22.7, 57.0], [22.8, 58.0], [22.9, 58.0], [23.0, 58.0], [23.1, 58.0], [23.2, 58.0], [23.3, 58.0], [23.4, 58.0], [23.5, 58.0], [23.6, 58.0], [23.7, 58.0], [23.8, 58.0], [23.9, 58.0], [24.0, 58.0], [24.1, 58.0], [24.2, 58.0], [24.3, 58.0], [24.4, 58.0], [24.5, 58.0], [24.6, 58.0], [24.7, 58.0], [24.8, 58.0], [24.9, 58.0], [25.0, 58.0], [25.1, 58.0], [25.2, 58.0], [25.3, 58.0], [25.4, 58.0], [25.5, 58.0], [25.6, 58.0], [25.7, 58.0], [25.8, 58.0], [25.9, 58.0], [26.0, 58.0], [26.1, 58.0], [26.2, 58.0], [26.3, 58.0], [26.4, 58.0], [26.5, 58.0], [26.6, 58.0], [26.7, 58.0], [26.8, 58.0], [26.9, 58.0], [27.0, 58.0], [27.1, 58.0], [27.2, 58.0], [27.3, 58.0], [27.4, 58.0], [27.5, 58.0], [27.6, 58.0], [27.7, 58.0], [27.8, 58.0], [27.9, 58.0], [28.0, 58.0], [28.1, 58.0], [28.2, 58.0], [28.3, 58.0], [28.4, 58.0], [28.5, 58.0], [28.6, 58.0], [28.7, 58.0], [28.8, 58.0], [28.9, 58.0], [29.0, 58.0], [29.1, 58.0], [29.2, 58.0], [29.3, 59.0], [29.4, 59.0], [29.5, 59.0], [29.6, 59.0], [29.7, 59.0], [29.8, 59.0], [29.9, 59.0], [30.0, 59.0], [30.1, 59.0], [30.2, 59.0], [30.3, 59.0], [30.4, 59.0], [30.5, 59.0], [30.6, 59.0], [30.7, 59.0], [30.8, 59.0], [30.9, 59.0], [31.0, 59.0], [31.1, 59.0], [31.2, 59.0], [31.3, 59.0], [31.4, 59.0], [31.5, 59.0], [31.6, 59.0], [31.7, 59.0], [31.8, 59.0], [31.9, 59.0], [32.0, 59.0], [32.1, 59.0], [32.2, 59.0], [32.3, 59.0], [32.4, 59.0], [32.5, 59.0], [32.6, 59.0], [32.7, 59.0], [32.8, 59.0], [32.9, 59.0], [33.0, 59.0], [33.1, 59.0], [33.2, 59.0], [33.3, 59.0], [33.4, 59.0], [33.5, 59.0], [33.6, 59.0], [33.7, 59.0], [33.8, 59.0], [33.9, 59.0], [34.0, 59.0], [34.1, 59.0], [34.2, 59.0], [34.3, 59.0], [34.4, 59.0], [34.5, 59.0], [34.6, 59.0], [34.7, 59.0], [34.8, 59.0], [34.9, 59.0], [35.0, 59.0], [35.1, 59.0], [35.2, 59.0], [35.3, 59.0], [35.4, 59.0], [35.5, 59.0], [35.6, 59.0], [35.7, 59.0], [35.8, 59.0], [35.9, 59.0], [36.0, 59.0], [36.1, 59.0], [36.2, 59.0], [36.3, 59.0], [36.4, 59.0], [36.5, 59.0], [36.6, 59.0], [36.7, 59.0], [36.8, 59.0], [36.9, 59.0], [37.0, 59.0], [37.1, 59.0], [37.2, 59.0], [37.3, 59.0], [37.4, 59.0], [37.5, 59.0], [37.6, 59.0], [37.7, 59.0], [37.8, 59.0], [37.9, 59.0], [38.0, 59.0], [38.1, 59.0], [38.2, 59.0], [38.3, 59.0], [38.4, 59.0], [38.5, 59.0], [38.6, 59.0], [38.7, 59.0], [38.8, 59.0], [38.9, 59.0], [39.0, 59.0], [39.1, 59.0], [39.2, 59.0], [39.3, 59.0], [39.4, 59.0], [39.5, 60.0], [39.6, 60.0], [39.7, 60.0], [39.8, 60.0], [39.9, 60.0], [40.0, 60.0], [40.1, 60.0], [40.2, 60.0], [40.3, 60.0], [40.4, 60.0], [40.5, 60.0], [40.6, 60.0], [40.7, 60.0], [40.8, 60.0], [40.9, 60.0], [41.0, 60.0], [41.1, 60.0], [41.2, 60.0], [41.3, 60.0], [41.4, 60.0], [41.5, 60.0], [41.6, 60.0], [41.7, 60.0], [41.8, 60.0], [41.9, 60.0], [42.0, 60.0], [42.1, 60.0], [42.2, 60.0], [42.3, 60.0], [42.4, 60.0], [42.5, 60.0], [42.6, 60.0], [42.7, 60.0], [42.8, 60.0], [42.9, 60.0], [43.0, 60.0], [43.1, 60.0], [43.2, 60.0], [43.3, 60.0], [43.4, 60.0], [43.5, 60.0], [43.6, 60.0], [43.7, 60.0], [43.8, 60.0], [43.9, 60.0], [44.0, 60.0], [44.1, 60.0], [44.2, 60.0], [44.3, 60.0], [44.4, 60.0], [44.5, 60.0], [44.6, 60.0], [44.7, 60.0], [44.8, 60.0], [44.9, 60.0], [45.0, 60.0], [45.1, 60.0], [45.2, 60.0], [45.3, 60.0], [45.4, 60.0], [45.5, 60.0], [45.6, 60.0], [45.7, 60.0], [45.8, 60.0], [45.9, 60.0], [46.0, 60.0], [46.1, 60.0], [46.2, 60.0], [46.3, 60.0], [46.4, 60.0], [46.5, 60.0], [46.6, 60.0], [46.7, 60.0], [46.8, 60.0], [46.9, 60.0], [47.0, 60.0], [47.1, 60.0], [47.2, 60.0], [47.3, 60.0], [47.4, 60.0], [47.5, 60.0], [47.6, 60.0], [47.7, 60.0], [47.8, 60.0], [47.9, 60.0], [48.0, 60.0], [48.1, 60.0], [48.2, 60.0], [48.3, 60.0], [48.4, 60.0], [48.5, 60.0], [48.6, 60.0], [48.7, 60.0], [48.8, 60.0], [48.9, 60.0], [49.0, 60.0], [49.1, 60.0], [49.2, 60.0], [49.3, 60.0], [49.4, 60.0], [49.5, 60.0], [49.6, 60.0], [49.7, 60.0], [49.8, 60.0], [49.9, 60.0], [50.0, 60.0], [50.1, 60.0], [50.2, 60.0], [50.3, 60.0], [50.4, 60.0], [50.5, 61.0], [50.6, 61.0], [50.7, 61.0], [50.8, 61.0], [50.9, 61.0], [51.0, 61.0], [51.1, 61.0], [51.2, 61.0], [51.3, 61.0], [51.4, 61.0], [51.5, 61.0], [51.6, 61.0], [51.7, 61.0], [51.8, 61.0], [51.9, 61.0], [52.0, 61.0], [52.1, 61.0], [52.2, 61.0], [52.3, 61.0], [52.4, 61.0], [52.5, 61.0], [52.6, 61.0], [52.7, 61.0], [52.8, 61.0], [52.9, 61.0], [53.0, 61.0], [53.1, 61.0], [53.2, 61.0], [53.3, 61.0], [53.4, 61.0], [53.5, 61.0], [53.6, 61.0], [53.7, 61.0], [53.8, 61.0], [53.9, 61.0], [54.0, 61.0], [54.1, 61.0], [54.2, 61.0], [54.3, 61.0], [54.4, 61.0], [54.5, 61.0], [54.6, 61.0], [54.7, 61.0], [54.8, 61.0], [54.9, 61.0], [55.0, 61.0], [55.1, 61.0], [55.2, 61.0], [55.3, 61.0], [55.4, 61.0], [55.5, 61.0], [55.6, 61.0], [55.7, 61.0], [55.8, 61.0], [55.9, 61.0], [56.0, 61.0], [56.1, 61.0], [56.2, 61.0], [56.3, 61.0], [56.4, 61.0], [56.5, 61.0], [56.6, 61.0], [56.7, 61.0], [56.8, 61.0], [56.9, 61.0], [57.0, 61.0], [57.1, 61.0], [57.2, 61.0], [57.3, 61.0], [57.4, 61.0], [57.5, 61.0], [57.6, 61.0], [57.7, 61.0], [57.8, 61.0], [57.9, 61.0], [58.0, 61.0], [58.1, 61.0], [58.2, 61.0], [58.3, 61.0], [58.4, 61.0], [58.5, 61.0], [58.6, 61.0], [58.7, 61.0], [58.8, 61.0], [58.9, 61.0], [59.0, 61.0], [59.1, 61.0], [59.2, 61.0], [59.3, 61.0], [59.4, 62.0], [59.5, 62.0], [59.6, 62.0], [59.7, 62.0], [59.8, 62.0], [59.9, 62.0], [60.0, 62.0], [60.1, 62.0], [60.2, 62.0], [60.3, 62.0], [60.4, 62.0], [60.5, 62.0], [60.6, 62.0], [60.7, 62.0], [60.8, 62.0], [60.9, 62.0], [61.0, 62.0], [61.1, 62.0], [61.2, 62.0], [61.3, 62.0], [61.4, 62.0], [61.5, 62.0], [61.6, 62.0], [61.7, 62.0], [61.8, 62.0], [61.9, 62.0], [62.0, 62.0], [62.1, 62.0], [62.2, 62.0], [62.3, 62.0], [62.4, 62.0], [62.5, 62.0], [62.6, 62.0], [62.7, 62.0], [62.8, 62.0], [62.9, 62.0], [63.0, 62.0], [63.1, 62.0], [63.2, 62.0], [63.3, 62.0], [63.4, 62.0], [63.5, 62.0], [63.6, 62.0], [63.7, 62.0], [63.8, 62.0], [63.9, 62.0], [64.0, 62.0], [64.1, 62.0], [64.2, 62.0], [64.3, 62.0], [64.4, 62.0], [64.5, 62.0], [64.6, 62.0], [64.7, 62.0], [64.8, 62.0], [64.9, 62.0], [65.0, 62.0], [65.1, 62.0], [65.2, 63.0], [65.3, 63.0], [65.4, 63.0], [65.5, 63.0], [65.6, 63.0], [65.7, 63.0], [65.8, 63.0], [65.9, 63.0], [66.0, 63.0], [66.1, 63.0], [66.2, 63.0], [66.3, 63.0], [66.4, 63.0], [66.5, 63.0], [66.6, 63.0], [66.7, 63.0], [66.8, 63.0], [66.9, 63.0], [67.0, 63.0], [67.1, 63.0], [67.2, 63.0], [67.3, 63.0], [67.4, 63.0], [67.5, 63.0], [67.6, 63.0], [67.7, 63.0], [67.8, 63.0], [67.9, 63.0], [68.0, 63.0], [68.1, 63.0], [68.2, 64.0], [68.3, 64.0], [68.4, 64.0], [68.5, 64.0], [68.6, 64.0], [68.7, 64.0], [68.8, 64.0], [68.9, 64.0], [69.0, 64.0], [69.1, 64.0], [69.2, 64.0], [69.3, 64.0], [69.4, 64.0], [69.5, 64.0], [69.6, 64.0], [69.7, 64.0], [69.8, 64.0], [69.9, 64.0], [70.0, 64.0], [70.1, 65.0], [70.2, 65.0], [70.3, 65.0], [70.4, 65.0], [70.5, 65.0], [70.6, 65.0], [70.7, 65.0], [70.8, 65.0], [70.9, 65.0], [71.0, 65.0], [71.1, 65.0], [71.2, 65.0], [71.3, 65.0], [71.4, 65.0], [71.5, 65.0], [71.6, 66.0], [71.7, 66.0], [71.8, 66.0], [71.9, 66.0], [72.0, 66.0], [72.1, 66.0], [72.2, 66.0], [72.3, 66.0], [72.4, 66.0], [72.5, 66.0], [72.6, 66.0], [72.7, 66.0], [72.8, 67.0], [72.9, 67.0], [73.0, 67.0], [73.1, 67.0], [73.2, 67.0], [73.3, 67.0], [73.4, 67.0], [73.5, 67.0], [73.6, 67.0], [73.7, 67.0], [73.8, 67.0], [73.9, 68.0], [74.0, 68.0], [74.1, 68.0], [74.2, 68.0], [74.3, 68.0], [74.4, 68.0], [74.5, 68.0], [74.6, 68.0], [74.7, 68.0], [74.8, 68.0], [74.9, 69.0], [75.0, 69.0], [75.1, 69.0], [75.2, 69.0], [75.3, 69.0], [75.4, 69.0], [75.5, 69.0], [75.6, 69.0], [75.7, 69.0], [75.8, 69.0], [75.9, 70.0], [76.0, 70.0], [76.1, 70.0], [76.2, 70.0], [76.3, 70.0], [76.4, 70.0], [76.5, 70.0], [76.6, 70.0], [76.7, 70.0], [76.8, 71.0], [76.9, 71.0], [77.0, 71.0], [77.1, 71.0], [77.2, 71.0], [77.3, 71.0], [77.4, 71.0], [77.5, 71.0], [77.6, 72.0], [77.7, 72.0], [77.8, 72.0], [77.9, 72.0], [78.0, 72.0], [78.1, 72.0], [78.2, 72.0], [78.3, 72.0], [78.4, 72.0], [78.5, 73.0], [78.6, 73.0], [78.7, 73.0], [78.8, 73.0], [78.9, 73.0], [79.0, 73.0], [79.1, 73.0], [79.2, 73.0], [79.3, 73.0], [79.4, 74.0], [79.5, 74.0], [79.6, 74.0], [79.7, 74.0], [79.8, 74.0], [79.9, 74.0], [80.0, 74.0], [80.1, 74.0], [80.2, 74.0], [80.3, 74.0], [80.4, 75.0], [80.5, 75.0], [80.6, 75.0], [80.7, 75.0], [80.8, 75.0], [80.9, 75.0], [81.0, 75.0], [81.1, 75.0], [81.2, 75.0], [81.3, 75.0], [81.4, 75.0], [81.5, 75.0], [81.6, 75.0], [81.7, 75.0], [81.8, 75.0], [81.9, 76.0], [82.0, 76.0], [82.1, 76.0], [82.2, 76.0], [82.3, 76.0], [82.4, 76.0], [82.5, 76.0], [82.6, 76.0], [82.7, 76.0], [82.8, 76.0], [82.9, 76.0], [83.0, 76.0], [83.1, 76.0], [83.2, 76.0], [83.3, 76.0], [83.4, 76.0], [83.5, 76.0], [83.6, 76.0], [83.7, 77.0], [83.8, 77.0], [83.9, 77.0], [84.0, 77.0], [84.1, 77.0], [84.2, 77.0], [84.3, 77.0], [84.4, 77.0], [84.5, 77.0], [84.6, 77.0], [84.7, 77.0], [84.8, 77.0], [84.9, 77.0], [85.0, 77.0], [85.1, 77.0], [85.2, 78.0], [85.3, 78.0], [85.4, 78.0], [85.5, 78.0], [85.6, 78.0], [85.7, 78.0], [85.8, 78.0], [85.9, 78.0], [86.0, 78.0], [86.1, 78.0], [86.2, 78.0], [86.3, 78.0], [86.4, 78.0], [86.5, 78.0], [86.6, 78.0], [86.7, 78.0], [86.8, 78.0], [86.9, 78.0], [87.0, 78.0], [87.1, 78.0], [87.2, 78.0], [87.3, 79.0], [87.4, 79.0], [87.5, 79.0], [87.6, 79.0], [87.7, 79.0], [87.8, 79.0], [87.9, 79.0], [88.0, 79.0], [88.1, 79.0], [88.2, 79.0], [88.3, 79.0], [88.4, 79.0], [88.5, 79.0], [88.6, 79.0], [88.7, 79.0], [88.8, 79.0], [88.9, 79.0], [89.0, 79.0], [89.1, 79.0], [89.2, 79.0], [89.3, 79.0], [89.4, 79.0], [89.5, 80.0], [89.6, 80.0], [89.7, 80.0], [89.8, 80.0], [89.9, 80.0], [90.0, 80.0], [90.1, 80.0], [90.2, 80.0], [90.3, 80.0], [90.4, 80.0], [90.5, 80.0], [90.6, 80.0], [90.7, 80.0], [90.8, 80.0], [90.9, 80.0], [91.0, 80.0], [91.1, 80.0], [91.2, 80.0], [91.3, 80.0], [91.4, 80.0], [91.5, 81.0], [91.6, 81.0], [91.7, 81.0], [91.8, 81.0], [91.9, 81.0], [92.0, 81.0], [92.1, 81.0], [92.2, 81.0], [92.3, 81.0], [92.4, 81.0], [92.5, 81.0], [92.6, 81.0], [92.7, 81.0], [92.8, 82.0], [92.9, 82.0], [93.0, 82.0], [93.1, 82.0], [93.2, 82.0], [93.3, 82.0], [93.4, 82.0], [93.5, 82.0], [93.6, 82.0], [93.7, 82.0], [93.8, 83.0], [93.9, 83.0], [94.0, 83.0], [94.1, 83.0], [94.2, 83.0], [94.3, 83.0], [94.4, 84.0], [94.5, 84.0], [94.6, 84.0], [94.7, 84.0], [94.8, 85.0], [94.9, 85.0], [95.0, 85.0], [95.1, 86.0], [95.2, 86.0], [95.3, 86.0], [95.4, 86.0], [95.5, 87.0], [95.6, 87.0], [95.7, 88.0], [95.8, 88.0], [95.9, 89.0], [96.0, 89.0], [96.1, 90.0], [96.2, 90.0], [96.3, 90.0], [96.4, 91.0], [96.5, 91.0], [96.6, 92.0], [96.7, 92.0], [96.8, 92.0], [96.9, 93.0], [97.0, 93.0], [97.1, 94.0], [97.2, 94.0], [97.3, 95.0], [97.4, 95.0], [97.5, 95.0], [97.6, 96.0], [97.7, 97.0], [97.8, 97.0], [97.9, 98.0], [98.0, 99.0], [98.1, 100.0], [98.2, 101.0], [98.3, 102.0], [98.4, 104.0], [98.5, 105.0], [98.6, 111.0], [98.7, 118.0], [98.8, 140.0], [98.9, 160.0], [99.0, 162.0], [99.1, 190.0], [99.2, 198.0], [99.3, 199.0], [99.4, 206.0], [99.5, 210.0], [99.6, 233.0], [99.7, 259.0], [99.8, 278.0], [99.9, 286.0], [100.0, 1087.0]], "isOverall": false, "label": "GetResortSkiers", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 100.0, "title": "Response Time Percentiles"}},
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
        data: {"result": {"minY": 1.0, "minX": 0.0, "maxY": 62774.0, "series": [{"data": [[0.0, 62774.0], [300.0, 16.0], [100.0, 790.0], [200.0, 415.0], [400.0, 3.0], [1000.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "GetResortSkiers", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 1000.0, "title": "Response Time Distribution"}},
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
        data: {"result": {"minY": 2.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1,500ms"], [2, "Requests having \nresponse time > 1,500ms"], [3, "Requests in error"]], "maxY": 63998.0, "series": [{"data": [[0.0, 63998.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [[1.0, 2.0]], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1,500ms", "isController": false}, {"data": [], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1,500ms", "isController": false}, {"data": [], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 1.0, "title": "Synthetic Response Times Distribution"}},
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
        data: {"result": {"minY": 112.26551562500009, "minX": 1.74476688E12, "maxY": 112.26551562500009, "series": [{"data": [[1.74476688E12, 112.26551562500009]], "isOverall": false, "label": "GetResortSkiers", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.74476688E12, "title": "Active Threads Over Time"}},
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
        data: {"result": {"minY": 15.641509433962266, "minX": 1.0, "maxY": 90.75757575757576, "series": [{"data": [[2.0, 17.045454545454543], [3.0, 23.11538461538462], [4.0, 15.641509433962266], [5.0, 17.333333333333336], [6.0, 15.8], [7.0, 28.485714285714288], [8.0, 23.348837209302324], [9.0, 20.884615384615387], [10.0, 35.5], [11.0, 54.40816326530612], [12.0, 28.324324324324316], [13.0, 36.58333333333332], [14.0, 35.63636363636364], [15.0, 28.661764705882355], [16.0, 39.275], [17.0, 31.95833333333334], [18.0, 30.79347826086957], [19.0, 47.73809523809523], [20.0, 47.048780487804876], [21.0, 40.714285714285715], [22.0, 63.03076923076924], [23.0, 52.66666666666668], [24.0, 33.4], [25.0, 34.37362637362637], [26.0, 47.62500000000001], [27.0, 47.77777777777777], [28.0, 52.71764705882354], [29.0, 38.10344827586208], [30.0, 37.766355140186946], [31.0, 50.81730769230771], [32.0, 61.47058823529412], [33.0, 43.19354838709676], [34.0, 90.75757575757576], [35.0, 50.34453781512602], [36.0, 41.47857142857144], [37.0, 44.73103448275863], [38.0, 44.29999999999998], [39.0, 57.02272727272729], [40.0, 48.466666666666676], [41.0, 55.82911392405063], [42.0, 57.160714285714285], [43.0, 55.809523809523824], [44.0, 55.40816326530613], [45.0, 52.22033898305087], [46.0, 72.46666666666664], [47.0, 61.9108910891089], [48.0, 46.38983050847459], [49.0, 63.17796610169489], [50.0, 61.718309859154914], [51.0, 56.172727272727286], [52.0, 53.213333333333345], [53.0, 52.4140127388535], [54.0, 56.77346278317153], [55.0, 61.01456310679612], [56.0, 54.129032258064534], [57.0, 59.76190476190478], [58.0, 57.23320158102763], [59.0, 56.25217391304348], [60.0, 51.00000000000001], [61.0, 55.8], [62.0, 68.55769230769234], [63.0, 59.0138888888889], [64.0, 58.24324324324324], [65.0, 61.86127167630056], [66.0, 54.63013698630135], [67.0, 65.25490196078437], [68.0, 60.49367088607593], [69.0, 57.95522388059701], [70.0, 54.158333333333324], [71.0, 60.94400000000001], [72.0, 50.10204081632652], [73.0, 64.32110091743114], [74.0, 68.35384615384618], [75.0, 57.45618556701028], [76.0, 59.165898617511516], [77.0, 63.59900990099008], [78.0, 60.864406779661], [79.0, 56.12019230769229], [80.0, 63.45419847328243], [81.0, 61.02884615384615], [82.0, 58.68], [83.0, 60.84431137724553], [84.0, 60.17721518987341], [85.0, 58.53253012048194], [86.0, 53.66666666666664], [87.0, 59.40476190476192], [88.0, 60.17968749999999], [89.0, 55.300699300699314], [90.0, 54.94855305466241], [91.0, 64.82278481012654], [92.0, 62.91514143094841], [93.0, 62.22767857142856], [94.0, 61.16582914572863], [95.0, 59.939226519337], [96.0, 74.19557195571956], [97.0, 63.65289256198347], [98.0, 60.74041297935104], [99.0, 61.8502024291498], [100.0, 65.41916167664667], [101.0, 62.05665722379608], [102.0, 66.60714285714282], [103.0, 69.56809338521408], [104.0, 67.06837606837607], [105.0, 57.37871287128714], [106.0, 63.902777777777764], [107.0, 64.12773722627738], [108.0, 64.68263473053891], [109.0, 58.89329268292681], [110.0, 61.416744186046536], [111.0, 53.324873096446694], [112.0, 65.90853658536581], [113.0, 58.275806451612866], [114.0, 64.63117870722432], [115.0, 63.371900826446335], [116.0, 61.48322147651006], [117.0, 60.060504201680665], [118.0, 63.57213930348263], [119.0, 59.25747126436785], [120.0, 55.48474576271188], [121.0, 61.75682382133993], [122.0, 75.4375], [123.0, 62.557303370786556], [124.0, 63.56455696202531], [125.0, 59.91009174311928], [126.0, 65.23236124176857], [127.0, 59.49128919860626], [128.0, 65.73212273332605], [1.0, 46.857142857142854]], "isOverall": false, "label": "GetResortSkiers", "isController": false}, {"data": [[112.26551562500009, 63.15003124999956]], "isOverall": false, "label": "GetResortSkiers-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 128.0, "title": "Time VS Threads"}},
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
        data : {"result": {"minY": 108800.0, "minX": 1.74476688E12, "maxY": 205866.66666666666, "series": [{"data": [[1.74476688E12, 108800.0]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.74476688E12, 205866.66666666666]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.74476688E12, "title": "Bytes Throughput Over Time"}},
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
        data: {"result": {"minY": 63.15003124999956, "minX": 1.74476688E12, "maxY": 63.15003124999956, "series": [{"data": [[1.74476688E12, 63.15003124999956]], "isOverall": false, "label": "GetResortSkiers", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.74476688E12, "title": "Response Time Over Time"}},
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
        data: {"result": {"minY": 63.14389062500036, "minX": 1.74476688E12, "maxY": 63.14389062500036, "series": [{"data": [[1.74476688E12, 63.14389062500036]], "isOverall": false, "label": "GetResortSkiers", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.74476688E12, "title": "Latencies Over Time"}},
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
        data: {"result": {"minY": 0.04612500000000033, "minX": 1.74476688E12, "maxY": 0.04612500000000033, "series": [{"data": [[1.74476688E12, 0.04612500000000033]], "isOverall": false, "label": "GetResortSkiers", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.74476688E12, "title": "Connect Time Over Time"}},
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
        data: {"result": {"minY": 11.0, "minX": 1.74476688E12, "maxY": 1087.0, "series": [{"data": [[1.74476688E12, 1087.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.74476688E12, 80.0]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.74476688E12, 209.9900000000016]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.74476688E12, 88.0]], "isOverall": false, "label": "95th percentile", "isController": false}, {"data": [[1.74476688E12, 11.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.74476688E12, 60.0]], "isOverall": false, "label": "Median", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.74476688E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
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
    data: {"result": {"minY": 16.0, "minX": 60.0, "maxY": 73.0, "series": [{"data": [[701.0, 40.0], [774.0, 57.0], [806.0, 60.0], [945.0, 60.0], [60.0, 16.0], [1063.0, 59.0], [1160.0, 60.0], [1263.0, 73.0], [1247.0, 60.0], [1355.0, 60.0], [1437.0, 61.0], [1552.0, 60.0], [1545.0, 59.0], [1637.0, 69.0], [1656.0, 61.0], [1712.0, 61.0], [1749.0, 66.0], [1838.0, 60.0], [1904.0, 61.0], [1918.0, 60.0], [1972.0, 62.0], [1968.0, 61.0], [1924.0, 62.0], [1957.0, 60.0], [1934.0, 62.0], [1983.0, 61.0], [1995.0, 61.0], [2008.0, 60.0], [1993.0, 60.0], [2035.0, 60.0], [2000.0, 60.0], [2014.0, 60.0], [1989.0, 61.0], [134.0, 16.0], [2072.0, 61.0], [2078.0, 60.0], [2063.0, 60.0], [2115.0, 61.0], [2088.0, 61.0], [421.0, 41.0], [436.0, 36.0], [499.0, 57.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 2115.0, "title": "Response Time Vs Request"}},
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
    data: {"result": {"minY": 15.5, "minX": 60.0, "maxY": 73.0, "series": [{"data": [[701.0, 40.0], [774.0, 57.0], [806.0, 60.0], [945.0, 60.0], [60.0, 15.5], [1063.0, 58.0], [1160.0, 60.0], [1263.0, 73.0], [1247.0, 60.0], [1355.0, 60.0], [1437.0, 61.0], [1552.0, 60.0], [1545.0, 59.0], [1637.0, 69.0], [1656.0, 61.0], [1712.0, 61.0], [1749.0, 66.0], [1838.0, 60.0], [1904.0, 61.0], [1918.0, 60.0], [1972.0, 62.0], [1968.0, 61.0], [1924.0, 62.0], [1957.0, 60.0], [1934.0, 62.0], [1983.0, 61.0], [1995.0, 61.0], [2008.0, 60.0], [1993.0, 60.0], [2035.0, 60.0], [2000.0, 60.0], [2014.0, 60.0], [1989.0, 61.0], [134.0, 16.0], [2072.0, 61.0], [2078.0, 60.0], [2063.0, 60.0], [2115.0, 61.0], [2088.0, 61.0], [421.0, 41.0], [436.0, 36.0], [499.0, 57.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 2115.0, "title": "Latencies Vs Request"}},
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
        data: {"result": {"minY": 1066.6666666666667, "minX": 1.74476688E12, "maxY": 1066.6666666666667, "series": [{"data": [[1.74476688E12, 1066.6666666666667]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.74476688E12, "title": "Hits Per Second"}},
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
        data: {"result": {"minY": 1066.6666666666667, "minX": 1.74476688E12, "maxY": 1066.6666666666667, "series": [{"data": [[1.74476688E12, 1066.6666666666667]], "isOverall": false, "label": "200", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.74476688E12, "title": "Codes Per Second"}},
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
        data: {"result": {"minY": 1066.6666666666667, "minX": 1.74476688E12, "maxY": 1066.6666666666667, "series": [{"data": [[1.74476688E12, 1066.6666666666667]], "isOverall": false, "label": "GetResortSkiers-success", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.74476688E12, "title": "Transactions Per Second"}},
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
        data: {"result": {"minY": 1066.6666666666667, "minX": 1.74476688E12, "maxY": 1066.6666666666667, "series": [{"data": [[1.74476688E12, 1066.6666666666667]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.74476688E12, "title": "Total Transactions Per Second"}},
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

