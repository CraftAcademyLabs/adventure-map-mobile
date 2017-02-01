angular
  .module('adventure-map.controllers', [])
  .controller('userSessionController', userSessionController)
  .controller('activitiesController', activitiesController);


function userSessionController($scope, $auth, $ionicLoading, $state) {
  $scope.userSignIn = function () {
    $ionicLoading.show({
      template: 'Logging in...'
    });
    $auth.submitLogin($scope.loginData)
      .then(function (response) {
        $scope.user = response;
        $state.go('activities');
        $ionicLoading.hide();
      })
      .catch(function (response) {
        $ionicLoading.hide();
        $scope.errorMessage = response.errors.toString();
      })
  }
}

function activitiesController($scope){
  $scope.message = 'This is the Activities View'
}
