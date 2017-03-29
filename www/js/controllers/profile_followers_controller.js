function profileFollowersController($scope, $ionicLoading, $ionicPlatform, $localStorage, MyFollowers) {
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
}
