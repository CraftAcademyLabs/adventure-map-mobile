function activitiesController($scope, $state, $ionicLoading, Activity) {
  $scope.filters = {};
  $scope.stars = [true, false, false, false, false];

  $scope.$on("$ionicView.enter", function (scopes, states) {
    $scope.message = 'test message';
    console.log(states.stateName == "app.activities");
    if (states.stateName == "app.activities") {
      $ionicLoading.show({
        template: 'Getting activities...'
      });
      Activity.query(function (response) {
        console.log(response);
        $scope.activities = response.data.reverse();
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
  };

  $scope.setFilters = function () {
    var rating = 1;
    if ($scope.stars[4]) {
      rating = 5
    } else if ($scope.stars[3]) {
      rating = 4
    } else if ($scope.stars[2]) {
      rating = 3
    } else if ($scope.stars[1]) {
      rating = 2
    } else {
      rating = 1
    }
    $scope.filters.rating = rating;

    console.log($scope.filters);

    applyFilters()
  };

  $scope.toggleStars = function (star_id) {
    switch (star_id) {
      case 1:
        $scope.stars = [true, false, false, false, false];
        break;
      case 2:
        $scope.stars = [true, true, false, false, false];
        break;
      case 3:
        $scope.stars = [true, true, true, false, false];
        break;
      case 4:
        $scope.stars = [true, true, true, true, false];
        break;
      case 5:
        $scope.stars = [true, true, true, true, true];
        break;
      default:
        $scope.stars = [false, false, false, false, false];
    }
  };

  function applyFilters() {
    $scope.message = 'new message';
    $scope.activities = $scope.cachedActivities.filter(function (activity) {
      if ($scope.filters.difficulty1) {
        if (activity.difficulty == 1) {
          return activity;
        }
      }
      if ($scope.filters.difficulty2) {
        if (activity.difficulty == 2) {
          return activity;

        }
      }
      if ($scope.filters.difficulty3) {
        if (activity.difficulty == 3) {
          return activity;
        }
      }
    });

    console.log('activities: ' + $scope.activities.length);
    $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
      console.log("State changed: ", toState);


    });

  }
}
