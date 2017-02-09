function activitiesController($scope, $state, $ionicLoading, Activity) {
  $scope.filters = {};
  [$scope.star1, $scope.star2, $scope.star3, $scope.star4, $scope.star5] = [true, false, false, false, false];

  $scope.$on("$ionicView.enter", function (scopes, states) {
    if (states.stateName == "app.activities") {
      $ionicLoading.show({
        template: 'Getting activities...'
      });
      Activity.query(function (response) {
        $scope.activities = response.activities.reverse();
        $scope.cachedActivities = $scope.activities; // This keeps the entire activity list so users can un-filter.
        $ionicLoading.hide();
      });
    }
  });

  $scope.addActivity = function () {
    $state.go('app.create_activity');
  };

  $scope.viewProfile = function () {
    $state.go('app.profile');
  }

  $scope.setFilters = function () {
    var rating = 1;
    if ($scope.star5) {
      rating = 5
    } else if ($scope.star4) {
      rating = 4
    } else if ($scope.star3) {
      rating = 3
    } else if ($scope.star2) {
      rating = 2
    } else {
      rating = 1
    }
    $scope.filters.rating = rating;
    console.log($scope.filters);

  };

  $scope.toggleStars = function (star_id) {
    switch (star_id) {
      case 1:
        [$scope.star1, $scope.star2, $scope.star3, $scope.star4, $scope.star5] = [true, false, false, false, false];
        break;
      case 2:
        [$scope.star1, $scope.star2, $scope.star3, $scope.star4, $scope.star5] = [true, true, false, false, false];
        break;
      case 3:
        [$scope.star1, $scope.star2, $scope.star3, $scope.star4, $scope.star5] = [true, true, true, false, false];
        break;
      case 4:
        [$scope.star1, $scope.star2, $scope.star3, $scope.star4, $scope.star5] = [true, true, true, true, false];
        break;
      case 5:
        [$scope.star1, $scope.star2, $scope.star3, $scope.star4, $scope.star5] = [true, true, true, true, true];
        break;
      default:
        [$scope.star1, $scope.star2, $scope.star3, $scope.star4, $scope.star5] = [false, false, false, false, false];

    }
  };
}
