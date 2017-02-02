angular
  .module('adventureMap.controllers', [])
  .controller('userSessionController', userSessionController)
  .controller('activitiesController', activitiesController)
  .controller('createActivitiesController', createActivitiesController);


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
  $scope.addActivity = function () {
    $state.go('create_activity');
  }
}

function createActivitiesController($scope) {
  $scope.activityData = {};
  $scope.categories = ['Hiking', 'Cross country skiing', 'Back country skiing', 'Paddling', 'Mountain biking', 'Horse riding', 'Climbing', 'Snow mobiling', 'Cross country ice skating', 'Foraging'];

  $scope.createActivity = function() {
    $scope.activityData.user_id = $scope.user.id;
    $scope.activityData.difficulty = parseInt($scope.activityData.difficulty);
    console.log($scope.activityData);
  }
}
