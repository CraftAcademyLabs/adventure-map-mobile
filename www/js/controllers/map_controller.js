function mapController($scope, $cordovaGeolocation, $ionicLoading, $document) {

  var posOptions = {
    maximumAge: 3000,
    timeout: 5000,
    enableHighAccuracy: true
  };

  var watchOptions = {
    maximumAge: 3000,
    timeout: 5000,
    enableHighAccuracy: true // may cause errors if true
  };

  var polOptions = {
    color: 'blue',
    weight: 3,
    opacity: 0.5,
    smoothFactor: 1
  };

  var lat, long;

  const map = L.map('map-container', {
    zoomControl: true
  });
  const geolocation = $cordovaGeolocation.getCurrentPosition(posOptions);
  const watch = $cordovaGeolocation.watchPosition(watchOptions);

  $scope.watching = true;


  $ionicLoading.show({
    template: 'Loading current location...'
  });

  geolocation.then(function (position) {
    lat = position.coords.latitude;
    long = position.coords.longitude;
    console.log(lat + ', ' + long);

    map.setView([lat, long], 13);
    addToMap(lat, long, map);
    $ionicLoading.hide();


  }, function (err) {
    // error
  });

  $scope.startTracking = function () {
    $scope.watching = true;
  };

  if ($scope.watching) {
    watch.then(
      null,
      function (err) {
        // error
        console.log(err);
      },
      function (position) {
        debugger;
        var old_lat = lat;
        var old_long = long;
        lat = position.coords.latitude;
        long = position.coords.longitude;
        console.log(lat + ', ' + long);
        drawLine(lat, long, old_lat, old_long, map)
      });
  }


  $scope.stopTracking = function () {
    clearLines(map);
    $cordovaGeolocation.clearWatch(watch);
  };


  function addToMap(lat, long, map) {

    // A marker example
    L.marker([lat, long]).addTo(map);

    // The map "tile layer"
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      attribution: '',
      maxZoom: 18,
      id: 'mapbox.outdoors',
      accessToken: 'pk.eyJ1IjoiYXF1YWFtYmVyIiwiYSI6ImNpejVreGVxNzAwNTEyeXBnbWc5eXNlcTYifQ.ah37yE5P2LH9LVzNelgymQ'
    }).addTo(map);

    L.control.scale({
      imperial: false
    }).addTo(map);

  }

  function drawLine(lat, long, old_lat, old_long, map) {
    var pointA = new L.LatLng(old_lat, old_long);
    var pointB = new L.LatLng(lat, long);
    var pointList = [pointA, pointB];

    var polyline = new L.polyline(pointList, polOptions);
    polyline.addTo(map);
    map.setView([lat, long], 13);

  }

  function clearLines(map) {
    for(i in map._layers) {
      if(map._layers[i]._path != undefined) {
        try {
          map.removeLayer(map._layers[i]);
        }
        catch(e) {
          console.log("problem with " + e + map._layers[i]);
        }
      }
    }
  }

}
