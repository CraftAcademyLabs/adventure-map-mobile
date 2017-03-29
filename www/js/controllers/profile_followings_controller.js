function profileFollowingsController($scope, $ionicLoading, $ionicPlatform, $localStorage, MyFollowers, md5) {
  const user = $localStorage.user;

  showFollowings = function () {
    console.log(user);
    $ionicLoading.show({
      template: 'Getting users I follow...'
    });
    MyFollowers.get({request: 'followings'}, function (resp) {
      // console.log(resp);
      $ionicLoading.hide();
      if (resp.status == 'success') {
        // Sort by name --> actually get this working!!
        $scope.myFollowings = resp.users.sort(function (a, b) {
          return b.name - a.name;
        });

        console.log($scope.myFollowings);
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
    showFollowings();
  });

  $scope.profileImage = function (index) {
    if ($scope.myFollowings[index] !== undefined) {
      if ($scope.myFollowings[index].image) {
        return $scope.myFollowings[index].image;
      } else {
        var options = {size: 50, format: 'svg'};

        var hashedName = md5.createHash($scope.myFollowings[index].name);
        return 'data:image/svg+xml;base64,' + new Identicon(hashedName, options).toString();
      }
    }
  };
}
