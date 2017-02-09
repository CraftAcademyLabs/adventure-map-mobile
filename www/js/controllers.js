angular
  .module('adventureMap.controllers', [])
  .controller('userSessionController', userSessionController)
  .controller('activitiesController', activitiesController)
  .controller('createActivityController', createActivityController)
  .controller('userController', userController);

function activitiesController($scope, $state, $ionicLoading, $ionicModal, $ionicSideMenuDelegate, Activity) {
  $scope.message = 'info from activitiesController';
  $scope.filters = {};
  $scope.showFilters = false;
  $scope.$on("$ionicView.enter", function () {
    $ionicLoading.show({
      template: 'Getting activities...'
    });
    Activity.query(function (response) {
      console.log('getting activities');
      $scope.activities = response.activities.reverse();
      $scope.cachedActivities = $scope.activities; // This keeps the entire activity list so users can un-filter.
      $ionicLoading.hide();
    });

  });

  $scope.$on("$ionicView.enter", function () {
    $ionicLoading.show({
      template: 'Getting activities...'
    });
    Activity.query(function (response) {
      $scope.activities = response.activities.reverse();
      $ionicLoading.hide();
    });
  });

  $scope.addActivity = function () {
    $state.go('create_activity');
  };

  $scope.setFilters = function () {
    console.log($scope.filters);

  };

  $scope.addActivity = function () {
    $state.go('create_activity');
  };
}


function userController($scope, $state) {

}


