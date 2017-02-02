angular
  .module('adventureMap.controllers', [])
  .controller('userSessionController', userSessionController)
  .controller('activitiesController', activitiesController);


function userSessionController($scope, $auth, $ionicLoading, $state) {
  $scope.loginData = {};
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

function activitiesController($scope, $state) {
  $scope.message = 'This is the Activities View';
  $scope.categories = ['Hiking', 'Cross country skiing', 'Back country skiing', 'Paddling', 'Mountain biking', 'Horse riding', 'Climbing', 'Snow mobiling', 'Cross country ice skating', 'Foraging']
  console.log($scope.user);

  $scope.addActivity = function () {
    $state.go('create_activity');
  }
}
