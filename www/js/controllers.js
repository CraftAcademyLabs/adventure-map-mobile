angular
  .module('adventureMap.controllers', [])
  .controller('userSessionController', userSessionController)
  .controller('activitiesController', activitiesController)
  .controller('createActivityController', createActivityController)
  .controller('userController', userController);

function activitiesController($scope, $state, $ionicLoading, $ionicModal, $ionicSideMenuDelegate, Activity) {
  $scope.filters = {};
  $scope.showFilters = false;
  $scope.star1 = false;
  $scope.star2 = false;
  $scope.star3 = false;
  $scope.star4 = false;
  $scope.star5 = false;
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

  $scope.toggleStars = function (star_id) {
    switch (star_id) {
      case 1:
        $scope.star1 = true;
        $scope.star2 = false;
        $scope.star3 = false;
        $scope.star4 = false;
        $scope.star5 = false;
        break;
      case 2:
        $scope.star1 = true;
        $scope.star2 = true;
        $scope.star3 = false;
        $scope.star4 = false;
        $scope.star5 = false;
        break;
      case 3:
        $scope.star1 = true;
        $scope.star2 = true;
        $scope.star3 = true;
        $scope.star4 = false;
        $scope.star5 = false;
        break;
      case 4:
        $scope.star1 = true;
        $scope.star2 = true;
        $scope.star3 = true;
        $scope.star4 = true;
        $scope.star5 = false;
        break;
      case 5:
        $scope.star1 = true;
        $scope.star2 = true;
        $scope.star3 = true;
        $scope.star4 = true;
        $scope.star5 = true;
        break;
      default:
        $scope.star1 = false;
        $scope.star2 = false;
        $scope.star3 = false;
        $scope.star4 = false;
        $scope.star5 = false;
    }
  }
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


