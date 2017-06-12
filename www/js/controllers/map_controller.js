function mapController($scope, $cordovaGeolocation, $ionicLoading, $ionicPlatform, MapService, FileService) {
  var lat, long;

  $scope.inProgress = false;
  $scope.currentRoute = [];
  $scope.hasRecording = false;
  $scope.hasFilters = false;

  $scope.openFilters = function(value) {
    $scope.hasFilters = value === false;
  };

  $ionicPlatform.ready(function () {
    // called when ready
    var posOptions = {
      maximumAge: 30000,
      timeout: 5000,
      enableHighAccuracy: true
    };

    map = new L.Map('map-container', {
      continuousWorld: true,
      zoomControl: false
    });

    var mapproxyUrl = 'https://lacunaserver.se/mapproxy/service?';
    baseMaps = {
      combined_sweden: L.tileLayer.wms(mapproxyUrl,
        {
          layers: 'combined_sweden',
          transparent: true,
          format: 'image/png',
          attribution: "<a href='http://adventuremap.se'>AdventureMap</a>"
        }).addTo(map)
    };

    const geolocation = $cordovaGeolocation.getCurrentPosition(posOptions);

    $ionicLoading.show({
      template: 'Loading current location...'
    });

    geolocation.then(function (position) {
      $scope.currentLocation = setCurrentLocation(position);
      var lat = $scope.currentLocation.coords.lat;
      var long = $scope.currentLocation.coords.long;
      console.log(lat + ', ' + long);
      map.setView([lat, long], 12);
      MapService.addToMap(lat, long, map);
      MapService.addClusters(map);
      $ionicLoading.hide();
    }, function (err) {
      $ionicLoading.hide().then(function () {
        console.log(err);

      });
    });
  });


  //Menu navigation
  var element = angular.element(document.querySelector('.filter-btn'));

  $scope.toggleMenu = function () {

    if (element.hasClass('open')) {
      element.removeClass('open')
    } else {
      element.addClass('open');
    }
  };

  $scope.clearRoute = function () {
    MapService.clearRoute(map);
    element.removeClass('open');
    $scope.inProgress = false;
    $scope.hasRecording = false;
    $scope.currentRoute = [];
  };

  $scope.startTracking = function () {
    $scope.inProgress = true;
    $scope.currentRoute = MapService.startTracking(lat, long, map);
    element.removeClass('open');
  };

  $scope.stopTracking = function () {
    $scope.inProgress = false;
    MapService.stopTracking(map, $scope.currentRoute[$scope.currentRoute.length - 1].lat, $scope.currentRoute[$scope.currentRoute.length - 1].long);
    $scope.hasRecording = true;
    console.log($scope.currentRoute);
    element.removeClass('open');
    if (window.cordova) {
      FileService.saveToFile($scope.currentRoute[0].timestamp, $scope.currentRoute, 'Route');
    }
  };

  $scope.addWaypoint = function () {
    if (window.cordova) {
      FileService.saveToFile($scope.currentLocation.timestamp, $scope.currentLocation.coords, 'Waypoint');
    }
  };

  function setCurrentLocation(position) {
    lat = position.coords.latitude;
    long = position.coords.longitude;
    return {
      timestamp: position.timestamp,
      coords: {
        lat: lat,
        long: long
      }
    };
  }
}
