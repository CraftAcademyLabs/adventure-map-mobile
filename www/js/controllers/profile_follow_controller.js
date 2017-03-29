function profileFollowController($scope, $ionicLoading, $ionicPlatform, $localStorage, MyFollowers, md5) {
  const user = $localStorage.user;

  showFollow = function (request) {
    console.log(user);
    console.log(request);
    $ionicLoading.show({
      template: 'Getting users I follow...'
    });
    MyFollowers.get({request: request}, function (resp) {
      // console.log(resp);
      $ionicLoading.hide();
      if (resp.status == 'success') {
        // Sort by name
        $scope.myFollow = resp.users.sort(function(a, b){
          if(a.name < b.name) return -1;
          if(a.name > b.name) return 1;
          return 0;
        });

        console.log($scope.myFollow);
      } else {
        console.log('error ' + resp.message[0]);
        $ionicPopup.alert({
          title: resp.message[0]
        });
      }
    }, function (resp) {
      $ionicLoading.hide();
    });
  };

  $scope.loadFollows = function(request) {
    $ionicPlatform.ready(function () {
      // $window.location.reload(true);
      showFollow(request);
    });
  };

  $scope.profileImage = function (index) {
    if ($scope.myFollow[index] !== undefined) {
      if ($scope.myFollow[index].image) {
        return $scope.myFollow[index].image;
      } else {
        var options = {size: 50, format: 'svg'};

        var hashedName = md5.createHash($scope.myFollow[index].name);
        return 'data:image/svg+xml;base64,' + new Identicon(hashedName, options).toString();
      }
    }
  };
}
