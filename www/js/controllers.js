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
        console.log(response);
        debugger;
        $state.go('activities');
        $ionicLoading.hide();
      })
      .catch(function(ev, response) {
        console.log(response);
        debugger;
        $ionicLoading.hide();
        $scope.errorMessage = response.errors.toString();
      });
  }

  $rootScope.$on('auth:login-error', function(ev, reason) {
    console.log('auth failed because', reason.errors[0]);
  });
}

function activitiesController($scope) {
  $scope.message = 'This is the Activities View'
}
