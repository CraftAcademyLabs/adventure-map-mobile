angular
  .module('adventureMap.controllers', [])
  .controller('userSessionController', userSessionController)
  .controller('activitiesController', activitiesController)
  .controller('createActivityController', createActivityController)
  .controller('userController', userController);

function activitiesController($scope, $state, $ionicLoading, $ionicModal, $ionicSideMenuDelegate, Activity) {
  $scope.filters = {};
  $scope.showFilters = false;
  $scope.$on("$ionicView.enter", function () {
    $ionicLoading.show({
      template: 'Getting activities...'
    });
    Activity.query(function (response) {
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

  $scope.toggleFilters = function () {
    $scope.showFilters = !$scope.showFilters;
    console.dir(Object);
    // debugger;
    $ionicSideMenuDelegate.toggleLeft();
    // $ionicModal.fromTemplateUrl('templates/filters.html', {
    //   scope: $scope,
    //   animation: 'slide-in-up'
    // }).then(function(modal) {
    //   $scope.modal = modal;
    //   $scope.openModal();
    // });

    $scope.openModal = function () {
      $scope.modal.show();
    }
  };

  $scope.setFilters = function () {
    console.log($scope.filters);
    $ionicSideMenuDelegate.toggleLeft();
    $scope.showFilters = !$scope.showFilters;
    $scope.activities = $scope.activities.filter(function (activity) {
      if ($scope.filters.difficulty1) {
        if (activity.difficulty == 1) {
          console.log(activity);
          return activity;
        }
      }
      if ($scope.filters.difficulty2) {
        if (activity.difficulty == 2) {
          console.log(activity);
          return activity;

        }
      }
      if ($scope.filters.difficulty3) {
        if (activity.difficulty == 3) {
          console.log(activity);
          return activity;

        }
      }
    })
  };

  $scope.addActivity = function () {
    $state.go('create_activity');
  };
}


function userController($scope, $state) {

}


