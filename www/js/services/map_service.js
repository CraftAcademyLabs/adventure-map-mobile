angular.module('adventureMap.mapService', [])
  .service('MapService', function () {
    var watchOptions = {
      maximumAge: 30000,
      timeout: 5000,
      enableHighAccuracy: false // may cause errors if true
    };

    let watch = null;

    // Service methods
    var startTrackingFunction = function (lat, long, map) {
      var route = [];
      watch = window.navigator.geolocation.watchPosition(onSuccess, onError, watchOptions);
      console.log('Initial position: ' + lat + ', ' + long);
      //$scope.watching = true;
      function onSuccess(position) {
        var old_lat = lat;
        var old_long = long;
        lat = position.coords.latitude;
        long = position.coords.longitude;
        route.push({lat: lat, long: long, timestamp: position.timestamp});
        drawLine(lat, long, old_lat, old_long, map);
        console.log(route);

      }

      function onError(err) {
        console.log(err);
      }

      return route;
    };

    var stopTrackingFunction = function (map) {
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
      addToMap: addToMapFunction
    };
  });
