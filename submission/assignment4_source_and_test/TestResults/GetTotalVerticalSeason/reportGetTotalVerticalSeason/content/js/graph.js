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
        data: {"result": {"minY": 11.0, "minX": 0.0, "maxY": 335.0, "series": [{"data": [[0.0, 11.0], [0.1, 13.0], [0.2, 14.0], [0.3, 14.0], [0.4, 15.0], [0.5, 15.0], [0.6, 16.0], [0.7, 16.0], [0.8, 17.0], [0.9, 17.0], [1.0, 18.0], [1.1, 18.0], [1.2, 19.0], [1.3, 19.0], [1.4, 20.0], [1.5, 20.0], [1.6, 20.0], [1.7, 20.0], [1.8, 20.0], [1.9, 21.0], [2.0, 21.0], [2.1, 21.0], [2.2, 21.0], [2.3, 21.0], [2.4, 22.0], [2.5, 22.0], [2.6, 22.0], [2.7, 22.0], [2.8, 22.0], [2.9, 22.0], [3.0, 23.0], [3.1, 23.0], [3.2, 23.0], [3.3, 23.0], [3.4, 23.0], [3.5, 24.0], [3.6, 24.0], [3.7, 24.0], [3.8, 24.0], [3.9, 25.0], [4.0, 26.0], [4.1, 27.0], [4.2, 28.0], [4.3, 29.0], [4.4, 30.0], [4.5, 31.0], [4.6, 32.0], [4.7, 33.0], [4.8, 34.0], [4.9, 35.0], [5.0, 35.0], [5.1, 36.0], [5.2, 36.0], [5.3, 36.0], [5.4, 37.0], [5.5, 37.0], [5.6, 37.0], [5.7, 37.0], [5.8, 37.0], [5.9, 37.0], [6.0, 37.0], [6.1, 37.0], [6.2, 38.0], [6.3, 38.0], [6.4, 38.0], [6.5, 38.0], [6.6, 38.0], [6.7, 38.0], [6.8, 38.0], [6.9, 38.0], [7.0, 38.0], [7.1, 38.0], [7.2, 38.0], [7.3, 38.0], [7.4, 38.0], [7.5, 38.0], [7.6, 38.0], [7.7, 39.0], [7.8, 39.0], [7.9, 39.0], [8.0, 39.0], [8.1, 39.0], [8.2, 39.0], [8.3, 39.0], [8.4, 39.0], [8.5, 39.0], [8.6, 39.0], [8.7, 39.0], [8.8, 39.0], [8.9, 39.0], [9.0, 39.0], [9.1, 39.0], [9.2, 39.0], [9.3, 39.0], [9.4, 39.0], [9.5, 39.0], [9.6, 39.0], [9.7, 39.0], [9.8, 39.0], [9.9, 39.0], [10.0, 39.0], [10.1, 40.0], [10.2, 40.0], [10.3, 40.0], [10.4, 40.0], [10.5, 40.0], [10.6, 40.0], [10.7, 40.0], [10.8, 40.0], [10.9, 40.0], [11.0, 40.0], [11.1, 40.0], [11.2, 40.0], [11.3, 40.0], [11.4, 40.0], [11.5, 40.0], [11.6, 40.0], [11.7, 40.0], [11.8, 40.0], [11.9, 40.0], [12.0, 40.0], [12.1, 40.0], [12.2, 40.0], [12.3, 40.0], [12.4, 40.0], [12.5, 40.0], [12.6, 40.0], [12.7, 40.0], [12.8, 40.0], [12.9, 40.0], [13.0, 40.0], [13.1, 40.0], [13.2, 40.0], [13.3, 40.0], [13.4, 41.0], [13.5, 41.0], [13.6, 41.0], [13.7, 41.0], [13.8, 41.0], [13.9, 41.0], [14.0, 41.0], [14.1, 41.0], [14.2, 41.0], [14.3, 41.0], [14.4, 41.0], [14.5, 41.0], [14.6, 41.0], [14.7, 41.0], [14.8, 41.0], [14.9, 41.0], [15.0, 41.0], [15.1, 41.0], [15.2, 41.0], [15.3, 41.0], [15.4, 41.0], [15.5, 41.0], [15.6, 41.0], [15.7, 41.0], [15.8, 41.0], [15.9, 41.0], [16.0, 41.0], [16.1, 41.0], [16.2, 41.0], [16.3, 41.0], [16.4, 41.0], [16.5, 41.0], [16.6, 42.0], [16.7, 42.0], [16.8, 42.0], [16.9, 42.0], [17.0, 42.0], [17.1, 42.0], [17.2, 42.0], [17.3, 42.0], [17.4, 42.0], [17.5, 42.0], [17.6, 42.0], [17.7, 42.0], [17.8, 42.0], [17.9, 42.0], [18.0, 42.0], [18.1, 42.0], [18.2, 42.0], [18.3, 42.0], [18.4, 42.0], [18.5, 42.0], [18.6, 42.0], [18.7, 42.0], [18.8, 43.0], [18.9, 43.0], [19.0, 43.0], [19.1, 43.0], [19.2, 43.0], [19.3, 43.0], [19.4, 43.0], [19.5, 43.0], [19.6, 43.0], [19.7, 43.0], [19.8, 43.0], [19.9, 43.0], [20.0, 43.0], [20.1, 44.0], [20.2, 44.0], [20.3, 44.0], [20.4, 44.0], [20.5, 44.0], [20.6, 44.0], [20.7, 44.0], [20.8, 44.0], [20.9, 44.0], [21.0, 45.0], [21.1, 45.0], [21.2, 45.0], [21.3, 45.0], [21.4, 46.0], [21.5, 46.0], [21.6, 46.0], [21.7, 47.0], [21.8, 47.0], [21.9, 47.0], [22.0, 48.0], [22.1, 48.0], [22.2, 48.0], [22.3, 49.0], [22.4, 49.0], [22.5, 49.0], [22.6, 49.0], [22.7, 50.0], [22.8, 50.0], [22.9, 50.0], [23.0, 51.0], [23.1, 51.0], [23.2, 51.0], [23.3, 52.0], [23.4, 52.0], [23.5, 52.0], [23.6, 53.0], [23.7, 53.0], [23.8, 53.0], [23.9, 53.0], [24.0, 54.0], [24.1, 54.0], [24.2, 54.0], [24.3, 54.0], [24.4, 54.0], [24.5, 55.0], [24.6, 55.0], [24.7, 55.0], [24.8, 55.0], [24.9, 55.0], [25.0, 55.0], [25.1, 55.0], [25.2, 55.0], [25.3, 56.0], [25.4, 56.0], [25.5, 56.0], [25.6, 56.0], [25.7, 56.0], [25.8, 56.0], [25.9, 56.0], [26.0, 56.0], [26.1, 56.0], [26.2, 56.0], [26.3, 56.0], [26.4, 56.0], [26.5, 56.0], [26.6, 56.0], [26.7, 56.0], [26.8, 56.0], [26.9, 57.0], [27.0, 57.0], [27.1, 57.0], [27.2, 57.0], [27.3, 57.0], [27.4, 57.0], [27.5, 57.0], [27.6, 57.0], [27.7, 57.0], [27.8, 57.0], [27.9, 57.0], [28.0, 57.0], [28.1, 57.0], [28.2, 57.0], [28.3, 57.0], [28.4, 57.0], [28.5, 57.0], [28.6, 57.0], [28.7, 57.0], [28.8, 57.0], [28.9, 57.0], [29.0, 57.0], [29.1, 57.0], [29.2, 57.0], [29.3, 57.0], [29.4, 57.0], [29.5, 57.0], [29.6, 57.0], [29.7, 57.0], [29.8, 57.0], [29.9, 57.0], [30.0, 57.0], [30.1, 58.0], [30.2, 58.0], [30.3, 58.0], [30.4, 58.0], [30.5, 58.0], [30.6, 58.0], [30.7, 58.0], [30.8, 58.0], [30.9, 58.0], [31.0, 58.0], [31.1, 58.0], [31.2, 58.0], [31.3, 58.0], [31.4, 58.0], [31.5, 58.0], [31.6, 58.0], [31.7, 58.0], [31.8, 58.0], [31.9, 58.0], [32.0, 58.0], [32.1, 58.0], [32.2, 58.0], [32.3, 58.0], [32.4, 58.0], [32.5, 58.0], [32.6, 58.0], [32.7, 58.0], [32.8, 58.0], [32.9, 58.0], [33.0, 58.0], [33.1, 58.0], [33.2, 58.0], [33.3, 58.0], [33.4, 58.0], [33.5, 58.0], [33.6, 58.0], [33.7, 58.0], [33.8, 58.0], [33.9, 58.0], [34.0, 58.0], [34.1, 58.0], [34.2, 58.0], [34.3, 58.0], [34.4, 58.0], [34.5, 58.0], [34.6, 58.0], [34.7, 58.0], [34.8, 58.0], [34.9, 58.0], [35.0, 58.0], [35.1, 58.0], [35.2, 58.0], [35.3, 58.0], [35.4, 58.0], [35.5, 58.0], [35.6, 58.0], [35.7, 58.0], [35.8, 58.0], [35.9, 59.0], [36.0, 59.0], [36.1, 59.0], [36.2, 59.0], [36.3, 59.0], [36.4, 59.0], [36.5, 59.0], [36.6, 59.0], [36.7, 59.0], [36.8, 59.0], [36.9, 59.0], [37.0, 59.0], [37.1, 59.0], [37.2, 59.0], [37.3, 59.0], [37.4, 59.0], [37.5, 59.0], [37.6, 59.0], [37.7, 59.0], [37.8, 59.0], [37.9, 59.0], [38.0, 59.0], [38.1, 59.0], [38.2, 59.0], [38.3, 59.0], [38.4, 59.0], [38.5, 59.0], [38.6, 59.0], [38.7, 59.0], [38.8, 59.0], [38.9, 59.0], [39.0, 59.0], [39.1, 59.0], [39.2, 59.0], [39.3, 59.0], [39.4, 59.0], [39.5, 59.0], [39.6, 59.0], [39.7, 59.0], [39.8, 59.0], [39.9, 59.0], [40.0, 59.0], [40.1, 59.0], [40.2, 59.0], [40.3, 59.0], [40.4, 59.0], [40.5, 59.0], [40.6, 59.0], [40.7, 59.0], [40.8, 59.0], [40.9, 59.0], [41.0, 59.0], [41.1, 59.0], [41.2, 59.0], [41.3, 59.0], [41.4, 59.0], [41.5, 59.0], [41.6, 59.0], [41.7, 59.0], [41.8, 59.0], [41.9, 59.0], [42.0, 59.0], [42.1, 59.0], [42.2, 59.0], [42.3, 59.0], [42.4, 59.0], [42.5, 59.0], [42.6, 59.0], [42.7, 59.0], [42.8, 59.0], [42.9, 59.0], [43.0, 59.0], [43.1, 59.0], [43.2, 59.0], [43.3, 59.0], [43.4, 59.0], [43.5, 59.0], [43.6, 59.0], [43.7, 59.0], [43.8, 59.0], [43.9, 59.0], [44.0, 59.0], [44.1, 59.0], [44.2, 59.0], [44.3, 59.0], [44.4, 59.0], [44.5, 59.0], [44.6, 59.0], [44.7, 59.0], [44.8, 59.0], [44.9, 59.0], [45.0, 59.0], [45.1, 59.0], [45.2, 59.0], [45.3, 59.0], [45.4, 59.0], [45.5, 59.0], [45.6, 59.0], [45.7, 59.0], [45.8, 59.0], [45.9, 59.0], [46.0, 59.0], [46.1, 59.0], [46.2, 59.0], [46.3, 59.0], [46.4, 60.0], [46.5, 60.0], [46.6, 60.0], [46.7, 60.0], [46.8, 60.0], [46.9, 60.0], [47.0, 60.0], [47.1, 60.0], [47.2, 60.0], [47.3, 60.0], [47.4, 60.0], [47.5, 60.0], [47.6, 60.0], [47.7, 60.0], [47.8, 60.0], [47.9, 60.0], [48.0, 60.0], [48.1, 60.0], [48.2, 60.0], [48.3, 60.0], [48.4, 60.0], [48.5, 60.0], [48.6, 60.0], [48.7, 60.0], [48.8, 60.0], [48.9, 60.0], [49.0, 60.0], [49.1, 60.0], [49.2, 60.0], [49.3, 60.0], [49.4, 60.0], [49.5, 60.0], [49.6, 60.0], [49.7, 60.0], [49.8, 60.0], [49.9, 60.0], [50.0, 60.0], [50.1, 60.0], [50.2, 60.0], [50.3, 60.0], [50.4, 60.0], [50.5, 60.0], [50.6, 60.0], [50.7, 60.0], [50.8, 60.0], [50.9, 60.0], [51.0, 60.0], [51.1, 60.0], [51.2, 60.0], [51.3, 60.0], [51.4, 60.0], [51.5, 60.0], [51.6, 60.0], [51.7, 60.0], [51.8, 60.0], [51.9, 60.0], [52.0, 60.0], [52.1, 60.0], [52.2, 60.0], [52.3, 60.0], [52.4, 60.0], [52.5, 60.0], [52.6, 60.0], [52.7, 60.0], [52.8, 60.0], [52.9, 60.0], [53.0, 60.0], [53.1, 60.0], [53.2, 60.0], [53.3, 60.0], [53.4, 60.0], [53.5, 60.0], [53.6, 60.0], [53.7, 60.0], [53.8, 60.0], [53.9, 60.0], [54.0, 60.0], [54.1, 60.0], [54.2, 60.0], [54.3, 60.0], [54.4, 60.0], [54.5, 60.0], [54.6, 60.0], [54.7, 60.0], [54.8, 60.0], [54.9, 60.0], [55.0, 60.0], [55.1, 60.0], [55.2, 60.0], [55.3, 60.0], [55.4, 60.0], [55.5, 60.0], [55.6, 60.0], [55.7, 60.0], [55.8, 60.0], [55.9, 60.0], [56.0, 60.0], [56.1, 60.0], [56.2, 60.0], [56.3, 60.0], [56.4, 60.0], [56.5, 60.0], [56.6, 60.0], [56.7, 60.0], [56.8, 60.0], [56.9, 60.0], [57.0, 60.0], [57.1, 60.0], [57.2, 60.0], [57.3, 60.0], [57.4, 60.0], [57.5, 60.0], [57.6, 60.0], [57.7, 60.0], [57.8, 60.0], [57.9, 61.0], [58.0, 61.0], [58.1, 61.0], [58.2, 61.0], [58.3, 61.0], [58.4, 61.0], [58.5, 61.0], [58.6, 61.0], [58.7, 61.0], [58.8, 61.0], [58.9, 61.0], [59.0, 61.0], [59.1, 61.0], [59.2, 61.0], [59.3, 61.0], [59.4, 61.0], [59.5, 61.0], [59.6, 61.0], [59.7, 61.0], [59.8, 61.0], [59.9, 61.0], [60.0, 61.0], [60.1, 61.0], [60.2, 61.0], [60.3, 61.0], [60.4, 61.0], [60.5, 61.0], [60.6, 61.0], [60.7, 61.0], [60.8, 61.0], [60.9, 61.0], [61.0, 61.0], [61.1, 61.0], [61.2, 61.0], [61.3, 61.0], [61.4, 61.0], [61.5, 61.0], [61.6, 61.0], [61.7, 61.0], [61.8, 61.0], [61.9, 61.0], [62.0, 61.0], [62.1, 61.0], [62.2, 61.0], [62.3, 61.0], [62.4, 61.0], [62.5, 61.0], [62.6, 61.0], [62.7, 61.0], [62.8, 61.0], [62.9, 61.0], [63.0, 61.0], [63.1, 61.0], [63.2, 61.0], [63.3, 61.0], [63.4, 61.0], [63.5, 61.0], [63.6, 61.0], [63.7, 61.0], [63.8, 61.0], [63.9, 61.0], [64.0, 61.0], [64.1, 61.0], [64.2, 61.0], [64.3, 61.0], [64.4, 61.0], [64.5, 61.0], [64.6, 61.0], [64.7, 61.0], [64.8, 61.0], [64.9, 61.0], [65.0, 61.0], [65.1, 61.0], [65.2, 61.0], [65.3, 61.0], [65.4, 61.0], [65.5, 61.0], [65.6, 61.0], [65.7, 61.0], [65.8, 61.0], [65.9, 61.0], [66.0, 61.0], [66.1, 61.0], [66.2, 62.0], [66.3, 62.0], [66.4, 62.0], [66.5, 62.0], [66.6, 62.0], [66.7, 62.0], [66.8, 62.0], [66.9, 62.0], [67.0, 62.0], [67.1, 62.0], [67.2, 62.0], [67.3, 62.0], [67.4, 62.0], [67.5, 62.0], [67.6, 62.0], [67.7, 62.0], [67.8, 62.0], [67.9, 62.0], [68.0, 62.0], [68.1, 62.0], [68.2, 62.0], [68.3, 62.0], [68.4, 62.0], [68.5, 62.0], [68.6, 62.0], [68.7, 62.0], [68.8, 62.0], [68.9, 62.0], [69.0, 62.0], [69.1, 62.0], [69.2, 62.0], [69.3, 62.0], [69.4, 62.0], [69.5, 62.0], [69.6, 62.0], [69.7, 62.0], [69.8, 62.0], [69.9, 62.0], [70.0, 62.0], [70.1, 62.0], [70.2, 62.0], [70.3, 62.0], [70.4, 62.0], [70.5, 62.0], [70.6, 63.0], [70.7, 63.0], [70.8, 63.0], [70.9, 63.0], [71.0, 63.0], [71.1, 63.0], [71.2, 63.0], [71.3, 63.0], [71.4, 63.0], [71.5, 63.0], [71.6, 63.0], [71.7, 63.0], [71.8, 63.0], [71.9, 63.0], [72.0, 63.0], [72.1, 63.0], [72.2, 63.0], [72.3, 63.0], [72.4, 63.0], [72.5, 63.0], [72.6, 63.0], [72.7, 63.0], [72.8, 63.0], [72.9, 63.0], [73.0, 64.0], [73.1, 64.0], [73.2, 64.0], [73.3, 64.0], [73.4, 64.0], [73.5, 64.0], [73.6, 64.0], [73.7, 64.0], [73.8, 64.0], [73.9, 64.0], [74.0, 64.0], [74.1, 64.0], [74.2, 64.0], [74.3, 64.0], [74.4, 64.0], [74.5, 64.0], [74.6, 64.0], [74.7, 65.0], [74.8, 65.0], [74.9, 65.0], [75.0, 65.0], [75.1, 65.0], [75.2, 65.0], [75.3, 65.0], [75.4, 65.0], [75.5, 65.0], [75.6, 65.0], [75.7, 65.0], [75.8, 66.0], [75.9, 66.0], [76.0, 66.0], [76.1, 66.0], [76.2, 66.0], [76.3, 66.0], [76.4, 66.0], [76.5, 66.0], [76.6, 66.0], [76.7, 66.0], [76.8, 67.0], [76.9, 67.0], [77.0, 67.0], [77.1, 67.0], [77.2, 67.0], [77.3, 67.0], [77.4, 67.0], [77.5, 67.0], [77.6, 67.0], [77.7, 68.0], [77.8, 68.0], [77.9, 68.0], [78.0, 68.0], [78.1, 68.0], [78.2, 68.0], [78.3, 68.0], [78.4, 68.0], [78.5, 69.0], [78.6, 69.0], [78.7, 69.0], [78.8, 69.0], [78.9, 69.0], [79.0, 69.0], [79.1, 69.0], [79.2, 70.0], [79.3, 70.0], [79.4, 70.0], [79.5, 70.0], [79.6, 70.0], [79.7, 70.0], [79.8, 70.0], [79.9, 71.0], [80.0, 71.0], [80.1, 71.0], [80.2, 71.0], [80.3, 71.0], [80.4, 72.0], [80.5, 72.0], [80.6, 72.0], [80.7, 72.0], [80.8, 72.0], [80.9, 72.0], [81.0, 72.0], [81.1, 72.0], [81.2, 73.0], [81.3, 73.0], [81.4, 73.0], [81.5, 73.0], [81.6, 73.0], [81.7, 73.0], [81.8, 73.0], [81.9, 74.0], [82.0, 74.0], [82.1, 74.0], [82.2, 74.0], [82.3, 74.0], [82.4, 74.0], [82.5, 74.0], [82.6, 74.0], [82.7, 74.0], [82.8, 74.0], [82.9, 74.0], [83.0, 74.0], [83.1, 75.0], [83.2, 75.0], [83.3, 75.0], [83.4, 75.0], [83.5, 75.0], [83.6, 75.0], [83.7, 75.0], [83.8, 75.0], [83.9, 75.0], [84.0, 75.0], [84.1, 75.0], [84.2, 75.0], [84.3, 75.0], [84.4, 76.0], [84.5, 76.0], [84.6, 76.0], [84.7, 76.0], [84.8, 76.0], [84.9, 76.0], [85.0, 76.0], [85.1, 76.0], [85.2, 76.0], [85.3, 76.0], [85.4, 76.0], [85.5, 76.0], [85.6, 76.0], [85.7, 76.0], [85.8, 76.0], [85.9, 77.0], [86.0, 77.0], [86.1, 77.0], [86.2, 77.0], [86.3, 77.0], [86.4, 77.0], [86.5, 77.0], [86.6, 77.0], [86.7, 77.0], [86.8, 77.0], [86.9, 77.0], [87.0, 77.0], [87.1, 77.0], [87.2, 77.0], [87.3, 77.0], [87.4, 77.0], [87.5, 77.0], [87.6, 78.0], [87.7, 78.0], [87.8, 78.0], [87.9, 78.0], [88.0, 78.0], [88.1, 78.0], [88.2, 78.0], [88.3, 78.0], [88.4, 78.0], [88.5, 78.0], [88.6, 78.0], [88.7, 78.0], [88.8, 78.0], [88.9, 78.0], [89.0, 78.0], [89.1, 78.0], [89.2, 79.0], [89.3, 79.0], [89.4, 79.0], [89.5, 79.0], [89.6, 79.0], [89.7, 79.0], [89.8, 79.0], [89.9, 79.0], [90.0, 79.0], [90.1, 79.0], [90.2, 79.0], [90.3, 79.0], [90.4, 79.0], [90.5, 79.0], [90.6, 79.0], [90.7, 79.0], [90.8, 79.0], [90.9, 79.0], [91.0, 79.0], [91.1, 80.0], [91.2, 80.0], [91.3, 80.0], [91.4, 80.0], [91.5, 80.0], [91.6, 80.0], [91.7, 80.0], [91.8, 80.0], [91.9, 80.0], [92.0, 80.0], [92.1, 80.0], [92.2, 80.0], [92.3, 80.0], [92.4, 80.0], [92.5, 80.0], [92.6, 80.0], [92.7, 80.0], [92.8, 80.0], [92.9, 81.0], [93.0, 81.0], [93.1, 81.0], [93.2, 81.0], [93.3, 81.0], [93.4, 81.0], [93.5, 81.0], [93.6, 81.0], [93.7, 81.0], [93.8, 81.0], [93.9, 81.0], [94.0, 81.0], [94.1, 81.0], [94.2, 81.0], [94.3, 81.0], [94.4, 82.0], [94.5, 82.0], [94.6, 82.0], [94.7, 82.0], [94.8, 82.0], [94.9, 82.0], [95.0, 82.0], [95.1, 82.0], [95.2, 83.0], [95.3, 83.0], [95.4, 83.0], [95.5, 83.0], [95.6, 83.0], [95.7, 84.0], [95.8, 84.0], [95.9, 84.0], [96.0, 85.0], [96.1, 85.0], [96.2, 86.0], [96.3, 86.0], [96.4, 86.0], [96.5, 87.0], [96.6, 87.0], [96.7, 88.0], [96.8, 88.0], [96.9, 88.0], [97.0, 89.0], [97.1, 89.0], [97.2, 90.0], [97.3, 90.0], [97.4, 91.0], [97.5, 91.0], [97.6, 91.0], [97.7, 92.0], [97.8, 93.0], [97.9, 93.0], [98.0, 94.0], [98.1, 95.0], [98.2, 95.0], [98.3, 96.0], [98.4, 97.0], [98.5, 98.0], [98.6, 98.0], [98.7, 100.0], [98.8, 101.0], [98.9, 104.0], [99.0, 110.0], [99.1, 118.0], [99.2, 149.0], [99.3, 178.0], [99.4, 184.0], [99.5, 185.0], [99.6, 186.0], [99.7, 197.0], [99.8, 260.0], [99.9, 286.0], [100.0, 335.0]], "isOverall": false, "label": "GetTotalVerticalSeason", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 100.0, "title": "Response Time Percentiles"}},
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
        data: {"result": {"minY": 52.0, "minX": 0.0, "maxY": 63165.0, "series": [{"data": [[0.0, 63165.0], [300.0, 52.0], [100.0, 661.0], [200.0, 122.0]], "isOverall": false, "label": "GetTotalVerticalSeason", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 300.0, "title": "Response Time Distribution"}},
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
        data: {"result": {"minY": 5815.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1,500ms"], [2, "Requests having \nresponse time > 1,500ms"], [3, "Requests in error"]], "maxY": 58185.0, "series": [{"data": [[0.0, 58185.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1,500ms", "isController": false}, {"data": [], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1,500ms", "isController": false}, {"data": [[3.0, 5815.0]], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 3.0, "title": "Synthetic Response Times Distribution"}},
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
        data: {"result": {"minY": 111.27214062500126, "minX": 1.74476676E12, "maxY": 111.27214062500126, "series": [{"data": [[1.74476676E12, 111.27214062500126]], "isOverall": false, "label": "GetTotalVerticalSeason", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.74476676E12, "title": "Active Threads Over Time"}},
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
        data: {"result": {"minY": 15.315789473684207, "minX": 1.0, "maxY": 96.93164556962022, "series": [{"data": [[3.0, 23.074074074074076], [4.0, 15.694444444444443], [5.0, 16.548387096774192], [6.0, 15.545454545454545], [7.0, 18.942857142857143], [8.0, 15.315789473684207], [9.0, 15.730158730158735], [10.0, 24.32142857142857], [11.0, 24.9795918367347], [12.0, 38.589743589743584], [13.0, 32.03738317757009], [14.0, 39.20895522388059], [15.0, 29.047619047619047], [16.0, 39.86842105263158], [17.0, 42.428571428571416], [18.0, 33.672727272727286], [19.0, 30.551020408163264], [20.0, 53.732394366197184], [21.0, 46.40000000000001], [22.0, 34.83076923076923], [23.0, 56.06250000000001], [24.0, 47.42105263157895], [25.0, 45.49152542372881], [26.0, 54.91249999999998], [27.0, 40.92248062015504], [28.0, 35.13114754098361], [29.0, 42.865079365079374], [30.0, 54.6875], [31.0, 51.48000000000001], [32.0, 57.08333333333334], [33.0, 62.216666666666676], [34.0, 55.3780487804878], [35.0, 61.6747967479675], [36.0, 48.74210526315792], [37.0, 48.56637168141593], [38.0, 52.22222222222222], [39.0, 52.6260162601626], [40.0, 48.29245283018871], [41.0, 44.766169154228876], [42.0, 41.60714285714285], [43.0, 48.13333333333333], [44.0, 57.109375], [45.0, 46.438461538461546], [46.0, 51.57954545454545], [47.0, 52.62857142857142], [48.0, 63.17283950617282], [49.0, 52.662162162162176], [50.0, 51.81725888324875], [51.0, 59.846153846153825], [52.0, 50.69565217391306], [53.0, 54.83870967741936], [54.0, 58.21739130434783], [55.0, 47.662650602409656], [56.0, 62.03124999999999], [57.0, 46.199999999999996], [58.0, 51.9491525423729], [59.0, 51.578124999999986], [60.0, 62.29836065573768], [61.0, 61.83750000000001], [62.0, 54.81560283687941], [63.0, 50.83333333333333], [64.0, 52.78082191780825], [65.0, 62.43349753694581], [66.0, 57.339449541284395], [67.0, 60.061538461538476], [68.0, 62.36423841059601], [69.0, 55.13445378151259], [70.0, 96.93164556962022], [71.0, 51.814371257485], [72.0, 61.23809523809522], [73.0, 77.18018018018016], [74.0, 57.118110236220474], [75.0, 51.33529411764706], [76.0, 51.046783625730995], [77.0, 42.30546623794212], [78.0, 59.83539094650204], [79.0, 64.00857142857139], [80.0, 60.727272727272734], [81.0, 49.67142857142856], [82.0, 57.743999999999986], [83.0, 56.86460807600945], [84.0, 62.989473684210544], [85.0, 60.578231292517025], [86.0, 56.59668508287292], [87.0, 53.15822784810129], [88.0, 55.83453237410073], [89.0, 61.881188118811885], [90.0, 59.10344827586206], [91.0, 59.15018315018315], [92.0, 61.167832167832174], [93.0, 52.61290322580645], [94.0, 55.88709677419355], [95.0, 50.01612903225808], [96.0, 51.23630136986304], [97.0, 57.371165644171775], [98.0, 62.078512396694244], [99.0, 69.70569620253163], [100.0, 49.05306122448979], [101.0, 62.78684807256238], [102.0, 62.064705882352946], [103.0, 63.19999999999999], [104.0, 64.35817805383027], [105.0, 61.517162471395906], [106.0, 61.6258064516129], [107.0, 65.07821229050285], [108.0, 60.208904109589035], [109.0, 59.44077961019491], [110.0, 60.58449074074079], [111.0, 62.89787234042549], [112.0, 55.13100436681221], [113.0, 59.79159935379643], [114.0, 53.02352941176474], [115.0, 62.359223300970896], [116.0, 60.3470588235294], [117.0, 60.013123359580035], [118.0, 55.00369003690039], [119.0, 60.35437881873728], [120.0, 55.40099009900992], [121.0, 61.240673886883215], [122.0, 61.047619047619044], [123.0, 54.20195439739415], [124.0, 67.3253968253968], [125.0, 62.47612551159619], [126.0, 64.09273182957396], [127.0, 61.71062618595828], [128.0, 62.13320753685042], [1.0, 16.75]], "isOverall": false, "label": "GetTotalVerticalSeason", "isController": false}, {"data": [[111.27215625000058, 60.04403124999986]], "isOverall": false, "label": "GetTotalVerticalSeason-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 128.0, "title": "Time VS Threads"}},
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
        data : {"result": {"minY": 109162.71666666666, "minX": 1.74476676E12, "maxY": 213214.93333333332, "series": [{"data": [[1.74476676E12, 109162.71666666666]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.74476676E12, 213214.93333333332]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.74476676E12, "title": "Bytes Throughput Over Time"}},
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
        data: {"result": {"minY": 60.04403124999986, "minX": 1.74476676E12, "maxY": 60.04403124999986, "series": [{"data": [[1.74476676E12, 60.04403124999986]], "isOverall": false, "label": "GetTotalVerticalSeason", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.74476676E12, "title": "Response Time Over Time"}},
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
        data: {"result": {"minY": 60.037593749999644, "minX": 1.74476676E12, "maxY": 60.037593749999644, "series": [{"data": [[1.74476676E12, 60.037593749999644]], "isOverall": false, "label": "GetTotalVerticalSeason", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.74476676E12, "title": "Latencies Over Time"}},
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
        data: {"result": {"minY": 0.0278437500000003, "minX": 1.74476676E12, "maxY": 0.0278437500000003, "series": [{"data": [[1.74476676E12, 0.0278437500000003]], "isOverall": false, "label": "GetTotalVerticalSeason", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.74476676E12, "title": "Connect Time Over Time"}},
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
        data: {"result": {"minY": 11.0, "minX": 1.74476676E12, "maxY": 335.0, "series": [{"data": [[1.74476676E12, 335.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.74476676E12, 79.0]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.74476676E12, 105.0]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.74476676E12, 83.0]], "isOverall": false, "label": "95th percentile", "isController": false}, {"data": [[1.74476676E12, 11.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.74476676E12, 60.0]], "isOverall": false, "label": "Median", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.74476676E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
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
    data: {"result": {"minY": 15.0, "minX": 1.0, "maxY": 67.0, "series": [{"data": [[554.0, 58.0], [602.0, 58.0], [848.0, 49.0], [849.0, 59.0], [897.0, 60.0], [957.0, 59.0], [1078.0, 58.0], [1139.0, 60.0], [1308.0, 60.0], [1437.0, 60.0], [1520.0, 60.0], [1562.0, 67.0], [1593.0, 61.0], [1694.0, 59.0], [1775.0, 60.0], [1916.0, 60.0], [1871.0, 60.0], [1866.0, 60.0], [1963.0, 61.0], [125.0, 15.0], [2024.0, 61.0], [2044.0, 61.0], [2002.0, 61.0], [2015.0, 60.0], [2110.0, 60.0], [2052.0, 60.0], [2118.0, 60.0], [2149.0, 60.0], [2130.0, 60.0], [2094.0, 60.0], [2080.0, 61.0], [2050.0, 61.0], [2049.0, 60.0], [2102.0, 60.0], [2223.0, 60.0], [2194.0, 60.0], [2178.0, 61.0], [1.0, 18.0], [412.0, 19.0], [417.0, 35.0]], "isOverall": false, "label": "Successes", "isController": false}, {"data": [[554.0, 39.0], [602.0, 41.0], [848.0, 40.0], [849.0, 40.5], [897.0, 42.0], [957.0, 40.5], [1078.0, 41.0], [1139.0, 41.0], [1308.0, 41.0], [1437.0, 41.0], [1520.0, 42.0], [1562.0, 53.0], [1593.0, 43.5], [1694.0, 41.0], [1775.0, 44.0], [1916.0, 41.0], [1871.0, 42.0], [1866.0, 42.0], [1963.0, 44.0], [125.0, 16.0], [2024.0, 43.0], [2044.0, 41.0], [2002.0, 42.0], [2015.0, 42.0], [2110.0, 42.0], [2052.0, 42.5], [2118.0, 42.0], [2149.0, 42.0], [2130.0, 42.0], [2094.0, 43.0], [2080.0, 44.0], [2050.0, 43.0], [2049.0, 43.0], [2102.0, 42.0], [2223.0, 43.0], [2194.0, 42.0], [2178.0, 43.0], [412.0, 22.0], [417.0, 22.0]], "isOverall": false, "label": "Failures", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 2223.0, "title": "Response Time Vs Request"}},
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
    data: {"result": {"minY": 15.0, "minX": 1.0, "maxY": 67.0, "series": [{"data": [[554.0, 58.0], [602.0, 58.0], [848.0, 49.0], [849.0, 59.0], [897.0, 60.0], [957.0, 59.0], [1078.0, 58.0], [1139.0, 60.0], [1308.0, 60.0], [1437.0, 60.0], [1520.0, 60.0], [1562.0, 67.0], [1593.0, 61.0], [1694.0, 59.0], [1775.0, 60.0], [1916.0, 60.0], [1871.0, 60.0], [1866.0, 60.0], [1963.0, 61.0], [125.0, 15.0], [2024.0, 61.0], [2044.0, 61.0], [2002.0, 61.0], [2015.0, 60.0], [2110.0, 60.0], [2052.0, 60.0], [2118.0, 60.0], [2149.0, 60.0], [2130.0, 60.0], [2094.0, 60.0], [2080.0, 61.0], [2050.0, 61.0], [2049.0, 60.0], [2102.0, 60.0], [2223.0, 60.0], [2194.0, 60.0], [2178.0, 61.0], [1.0, 18.0], [412.0, 19.0], [417.0, 35.0]], "isOverall": false, "label": "Successes", "isController": false}, {"data": [[554.0, 39.0], [602.0, 41.0], [848.0, 40.0], [849.0, 40.5], [897.0, 42.0], [957.0, 40.0], [1078.0, 41.0], [1139.0, 41.0], [1308.0, 41.0], [1437.0, 41.0], [1520.0, 42.0], [1562.0, 53.0], [1593.0, 43.5], [1694.0, 41.0], [1775.0, 44.0], [1916.0, 41.0], [1871.0, 42.0], [1866.0, 42.0], [1963.0, 44.0], [125.0, 16.0], [2024.0, 43.0], [2044.0, 41.0], [2002.0, 42.0], [2015.0, 42.0], [2110.0, 42.0], [2052.0, 42.5], [2118.0, 42.0], [2149.0, 42.0], [2130.0, 42.0], [2094.0, 43.0], [2080.0, 44.0], [2050.0, 43.0], [2049.0, 43.0], [2102.0, 42.0], [2223.0, 43.0], [2194.0, 42.0], [2178.0, 43.0], [412.0, 22.0], [417.0, 22.0]], "isOverall": false, "label": "Failures", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 2223.0, "title": "Latencies Vs Request"}},
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
        data: {"result": {"minY": 1066.6666666666667, "minX": 1.74476676E12, "maxY": 1066.6666666666667, "series": [{"data": [[1.74476676E12, 1066.6666666666667]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.74476676E12, "title": "Hits Per Second"}},
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
        data: {"result": {"minY": 96.91666666666667, "minX": 1.74476676E12, "maxY": 969.75, "series": [{"data": [[1.74476676E12, 969.75]], "isOverall": false, "label": "200", "isController": false}, {"data": [[1.74476676E12, 96.91666666666667]], "isOverall": false, "label": "404", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.74476676E12, "title": "Codes Per Second"}},
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
        data: {"result": {"minY": 96.91666666666667, "minX": 1.74476676E12, "maxY": 969.75, "series": [{"data": [[1.74476676E12, 96.91666666666667]], "isOverall": false, "label": "GetTotalVerticalSeason-failure", "isController": false}, {"data": [[1.74476676E12, 969.75]], "isOverall": false, "label": "GetTotalVerticalSeason-success", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.74476676E12, "title": "Transactions Per Second"}},
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
        data: {"result": {"minY": 96.91666666666667, "minX": 1.74476676E12, "maxY": 969.75, "series": [{"data": [[1.74476676E12, 969.75]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [[1.74476676E12, 96.91666666666667]], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.74476676E12, "title": "Total Transactions Per Second"}},
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

