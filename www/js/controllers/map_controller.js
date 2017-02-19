function mapController($scope, $cordovaGeolocation, $ionicLoading, $ionicPlatform, MapService) {
  var lat, long, map;

  $scope.inProgress = false;

  $ionicPlatform.ready(function() {
    // called when ready
    var posOptions = {
      maximumAge: 30000,
      timeout: 5000,
      enableHighAccuracy: false
    };

    map = L.map('map-container', {
      zoomControl: false
    });

    const geolocation = $cordovaGeolocation.getCurrentPosition(posOptions);
    //document.getElementById("stop-tracking").addEventListener('click', MapService.stopTracking(map));


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
      //document.getElementById("start-tracking").addEventListener('click', MapService.startTracking(lat, long, map));
    }, function (err) {
      // error
    });
  });

  $scope.startTracking = function(){
    $scope.inProgress = true;
    MapService.startTracking(lat, long, map);
  };

  $scope.stopTracking =  function(){
    $scope.inProgress = false;
    MapService.stopTracking(map);
  }


}
