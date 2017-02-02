angular
  .module('adventureMap.controllers', [])
  .controller('userSessionController', userSessionController)
  .controller('activitiesController', activitiesController);


function userSessionController($scope, $rootScope, $auth, $ionicLoading, $state) {
  $scope.loginData = {};
  $scope.userSignIn = function () {
    $ionicLoading.show({
      template: 'Logging in...'
    });
    $auth.submitLogin($scope.loginData)
      .then(function () {
        $state.go('activities');
        $ionicLoading.hide();
      })
      .catch(function (response) {
        $ionicLoading.hide();
        $scope.errorMessage = response.errors.toString();
      })
  }

  $scope.facebookSignIn = function() {
    $ionicLoading.show({
      template: 'Logging in with Facebook...'
    });
    $auth.authenticate('facebook')
      .then(function(response) {
        $state.go('activities');
        $ionicLoading.hide();
      })
      .catch(function(ev, response) {
        // handle errors
        $ionicLoading.hide();
      });
  }

}

function activitiesController($scope, $rootScope) {
  $scope.user = $rootScope.user;
  $scope.message = 'This is the Activities View for ' + $scope.user.email;
}
