function profileController($scope, $ionicLoading,$ionicPlatform, $localStorage, MyActivities) {
  console.log('profile controller');
  const user = $localStorage.user;
  console.log(user.id);

  showMyActivities = function () {
    console.log(user);
    $ionicLoading.show({
      template: 'Getting activities'
    });
    // Scope empties out at some point!
    MyActivities.get({id: user.id}, function (resp) {
      $ionicLoading.hide();
      if (resp.status == 'success') {
        $scope.myActivities = resp.data;
        console.log(resp);
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
    console.log('ready');
    console.log(user.id);
    showMyActivities();
  });

}
