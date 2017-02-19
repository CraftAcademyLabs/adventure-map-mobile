angular.module('adventureMap.services', [])

  .factory('Activity', function ($resource, API_URL) {
    return $resource(API_URL + '/activities/:id', {}, {
      save: {method: 'POST'},
      query: {method: 'GET'},
      get: {method: 'GET'}
    });
  })

  .factory('Filters', function () {
    return {
      applyFilters: function ($scope, categories) {
        let categoryArray = [];

        var tempList = $scope.activityData.cachedActivities;

        // Difficulty filters
        // We could get rid of this outer 'if' if we figure out how to auto-check the difficulty boxes.
        if ($scope.activityData.filters.difficulty1 || $scope.activityData.filters.difficulty2 || $scope.activityData.filters.difficulty3) {
          tempList = tempList.filter(function (activity) {
            if ($scope.activityData.filters.difficulty1 && activity.difficulty == 1) {
              return activity;
            }
            if ($scope.activityData.filters.difficulty2 && activity.difficulty == 2) {
              return activity;
            }
            if ($scope.activityData.filters.difficulty3 && activity.difficulty == 3) {
              return activity;
            }
          });
        }

        // Category filters
        tempList.filter(function (activity) {
          const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

          array.forEach(num => {
            if ($scope.activityData.filters.category[num] && activity.category == categories[num - 1]) {
              categoryArray.push(activity);
            }
          });
          categoryArray.forEach(activity => activity);
        });

        $scope.activityData.activityList = categoryArray;

        // Show users a message instead of a blank screen if there are no activities that match their search.
        if ($scope.activityData.activityList.length == 0) {
          $scope.activityData.message = 'Your search returned no results. Try adding some categories, difficulties or looking for activities from strangers.'
        }

        console.log('activities: ' + $scope.activityData.activityList.length);


      }
    }
  })

  .service('MapService', function () {
    var watchOptions = {
      maximumAge: 30000,
      timeout: 5000,
      enableHighAccuracy: false // may cause errors if true
    };

    let watch = null;

    // Service methods
    var startTrackingFunction = function (lat, long, map) {
      watch = window.navigator.geolocation.watchPosition(onSuccess, onError, watchOptions);
      console.log('Initial position: ' + lat + ', ' + long);
      //$scope.watching = true;
      function onSuccess(position) {
        var old_lat = lat;
        var old_long = long;
        lat = position.coords.latitude;
        long = position.coords.longitude;
        console.log(lat + ', ' + long);
        drawLine(lat, long, old_lat, old_long, map);
      }

      function onError(err) {
        console.log(err);
      }
    };

    var stopTrackingFunction = function (map) {
      debugger;
      clearLines(map);
      window.navigator.geolocation.clearWatch(watch);
    };

    var addToMapFunction = function (lat, long, map) {

      L.marker([lat, long]).addTo(map);

      L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: '',
        maxZoom: 18,
        id: 'mapbox.outdoors',
        accessToken: 'pk.eyJ1IjoiYXF1YWFtYmVyIiwiYSI6ImNpejVreGVxNzAwNTEyeXBnbWc5eXNlcTYifQ.ah37yE5P2LH9LVzNelgymQ'
      }).addTo(map);

      L.control.scale({
        imperial: false
      }).addTo(map);

    };

    // Support methods



    function drawLine(lat, long, old_lat, old_long, map) {
      var polOptions = {
        color: 'blue',
        weight: 3,
        opacity: 0.5,
        smoothFactor: 1
      };
      var pointA = new L.LatLng(old_lat, old_long);
      var pointB = new L.LatLng(lat, long);
      var pointList = [pointA, pointB];

      var polyline = new L.polyline(pointList, polOptions);
      polyline.addTo(map);
      map.setView([lat, long], 13);

    }

    function clearLines(map) {
      for (i in map._layers) {
        if (map._layers[i]._path != undefined) {
          try {
            map.removeLayer(map._layers[i]);
          }
          catch (e) {
            console.log("problem with " + e + map._layers[i]);
          }
        }
      }
    }

    return {
      startTracking: startTrackingFunction,
      stopTracking: stopTrackingFunction,
      addToMap: addToMapFunction,
    };
  });
