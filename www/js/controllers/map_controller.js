function mapController($scope, $cordovaGeolocation, $ionicLoading, $ionicPlatform, MapService) {


  $ionicPlatform.ready(function() {
    // called when ready
    var posOptions = {
      maximumAge: 30000,
      timeout: 5000,
      enableHighAccuracy: false
    };

    var lat, long;

    const map = L.map('map-container', {
      zoomControl: false
    });
    const geolocation = $cordovaGeolocation.getCurrentPosition(posOptions);
    document.getElementById("stop-tracking").addEventListener('tap', MapService.stopTracking(map), true);


    $ionicLoading.show({
      template: 'Loading current location...'
    });

    geolocation.then(function (position) {
      lat = position.coords.latitude;
      long = position.coords.longitude;
      console.log(lat + ', ' + long);

      map.setView([lat, long], 13);
      MapService.addToMap(lat, long, map);
      $ionicLoading.hide();
      document.getElementById("start-tracking").addEventListener('tap', MapService.startTracking(lat, long, map), true);
    }, function (err) {
      // error
    });
  });


}
