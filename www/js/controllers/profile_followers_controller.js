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
        // Sort by name
        $scope.myFollowers = resp.users.sort(function(a, b){
          if(a.name < b.name) return -1;
          if(a.name > b.name) return 1;
          return 0;
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
    if ($scope.myFollowers[index] !== undefined && $scope.myFollowers[index] !== null) {
      if ($scope.myFollowers[index].image) {
        return $scope.myFollowers[index].image;
      } else {
        var options = {size: 50, format: 'svg'};
        var hashedName = md5.createHash($scope.myFollowers[index].name);
        return 'data:image/svg+xml;base64,' + new Identicon(hashedName, options).toString();
      }
    }
  };
}
