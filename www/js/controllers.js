angular.module('adventure-map.controllers', [])

  .controller('UserSession', function ($scope, $auth, $ionicLoading) {
    $scope.string = 'this is a variable';

    $scope.userSignIn = function () {
      $ionicLoading.show({
        template: 'Logging in...'
      });
      $auth.submitLogin($scope.loginData)
        .then(function (response) {
          console.log(response);
          $scope.user = response;
          $ionicLoading.hide();
        })
        .catch(function (response) {
          $ionicLoading.hide();
          console.dir(response);
        })
    }


  })
