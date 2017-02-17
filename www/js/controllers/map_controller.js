function mapController($cordovaGeolocation, $cordovaBackgroundGeolocation, $ionicLoading) {

  var posOptions = {maximumAge: 3000, timeout: 5000, enableHighAccuracy: true};

  ionic.Platform.ready(function () {
    $ionicLoading.show({
      template: 'Loading current location...'
    });
    debugger;
    $cordovaGeolocation
      .getCurrentPosition(posOptions)
      .then(function (position) {
        var lat = position.coords.latitude;
        var long = position.coords.longitude;
        console.log(lat + ', ' + long);
        addmap(lat, long);
        $ionicLoading.hide();
      }, function (err) {
        // error
      });

    var watchOptions = {
      timeout: 3000,
      enableHighAccuracy: false // may cause errors if true
    };

    var watch = $cordovaGeolocation.watchPosition(watchOptions);
    watch.then(
      null,
      function (err) {
        // error
      },
      function (position) {
        var lat = position.coords.latitude;
        var long = position.coords.longitude;
        console.log(lat + ', ' + long);
        L.marker([lat, long]).addTo(myMap);
      });


    watch.clearWatch();
  });


  function addmap(lat, long) {
    const myMap = L.map('mapContainer', {
        zoomControl: false
      })
      .setView([lat, long], 13);

    // A marker example
    L.marker([lat, long]).addTo(myMap);

    // The map "tile layer"
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      attribution: '',
      maxZoom: 18,
      id: 'mapbox.outdoors',
      accessToken: 'pk.eyJ1IjoiYXF1YWFtYmVyIiwiYSI6ImNpejVreGVxNzAwNTEyeXBnbWc5eXNlcTYifQ.ah37yE5P2LH9LVzNelgymQ'
    }).addTo(myMap);

    L.control.scale({
      imperial: false
    }).addTo(myMap);

  }

}
