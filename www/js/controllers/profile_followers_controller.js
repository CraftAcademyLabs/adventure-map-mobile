function profileFollowersController($scope, $ionicLoading, $ionicPlatform, $localStorage, MyFollowers, md5) {
  const user = $localStorage.user;

  showFollowers = function () {
    console.log(user);
    $ionicLoading.show({
      template: 'Getting followers'
    });
    MyFollowers.get({request: 'followers'}, function (resp) {
      // console.log(resp);
      $ionicLoading.hide();
      if (resp.status == 'success') {
        // Sort by date
        $scope.myFollowers = resp.users.sort(function (a, b) {
          return Date.parse(b.name) - Date.parse(a.name);
        });

        console.log($scope.myFollowers);
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

  $ionicPlatform.ready(function () {
    // $window.location.reload(true);
    showFollowers();
  });

  $scope.profileImage = function (index) {
    if ($scope.myFollowers[index] !== undefined) {
      if ($scope.myFollowers[index].image) {
        return $scope.myFollowers[index].image;
      } else {
        var options = {size: 30, format: 'svg'};

        var hashedName = md5.createHash($scope.myFollowers[index].name);
        return 'data:image/svg+xml;base64,' + new Identicon(hashedName, options).toString();
      }
    }
  };
}
