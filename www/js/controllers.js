angular.module('adventure-map.controllers', [])

  .controller('UserSession', function ($scope,
                                       $auth,
                                       $ionicLoading,
                                       $ionicModal,
                                       $state,
                                       $location) {

    $scope.userSignIn = function () {
      $ionicLoading.show({
        template: 'Logging in...'
      });
      $auth.submitLogin($scope.loginData)
        .then(function (response) {
          console.log(response);
          $scope.user = response;
          $ionicLoading.hide()
            .then(function () {
              console.log('wtf?');
              // debugger;
              $state.go('activity_feed');
            })
        })
        .catch(function (response) {
          $ionicLoading.hide();
          console.dir(response);
        })
    }
  })

.controller('ActivitiesController', function() {

});
