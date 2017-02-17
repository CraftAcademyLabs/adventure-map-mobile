function mapController($cordovaGeolocation, $ionicLoading) {

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

  const map = L.map('mapContainer', {
    zoomControl: false
  });
  const geolocation = $cordovaGeolocation.getCurrentPosition(posOptions);
  const watch = $cordovaGeolocation.watchPosition(watchOptions);


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

  watch.then(
    null,
    function (err) {
      // error
      console.log(err);
    },
    function (position) {
      var old_lat = lat;
      var old_long = long;
      lat = position.coords.latitude;
      long = position.coords.longitude;
      console.log(lat + ', ' + long);
      addMarker(lat, long, old_lat, old_long, map)
    });


  // watch.clearWatch();


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


  function addMarker(lat, long, old_lat, old_long, map) {
    var pointA = new L.LatLng(old_lat, old_long);
    var pointB = new L.LatLng(lat, long);
    var pointList = [pointA, pointB];

    var polyline = new L.polyline(pointList, polOptions);
    polyline.addTo(map);
    map.setView([lat, long], 13);

  }

}