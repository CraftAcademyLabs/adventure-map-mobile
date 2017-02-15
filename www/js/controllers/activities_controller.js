function activitiesController($scope, $state, $ionicLoading, Activity) {
  $scope.activityData = $scope.activityData || {activityData: {}};
  $scope.activityData.filters = {};
  $scope.activityData.filters.category = [];
  $scope.activityData.message = undefined;
  $scope.stars = [true, false, false, false, false];
  const categories = ['Hiking', 'Cross-country skiing', 'Back country skiing', 'Paddling', 'Mountain biking', 'Horse riding', 'Climbing', 'Snow mobiling', 'Cross country ice skating', 'foraging'];

  let values;
  let options;

  $scope.$on("$ionicView.enter", function (scopes, states) {
    if (states.stateName == "app.activities") {
      $ionicLoading.show({
        template: 'Getting activities...'
      });
      Activity.query(function (response) {
        console.log(response);
        $scope.activityData.activityList = response.data.reverse();
        $scope.activityData.cachedActivities = $scope.activityData.activityList; // This keeps the entire activity list so users can un-filter.


        // values = {
        //   activityList: response.data.reverse()
        // };
        // $scope.activityData.activityList = [...(new List('activity-list', values).activityList)];

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
    // reset no-results-found message
    $scope.activityData.message = undefined;

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
    $scope.activityData.filters.rating = rating;

    console.log($scope.activityData.filters);

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
    let categoryArray = [];

    var tempList = $scope.activityData.cachedActivities;

    // Difficulty filters
    // We could get rid of this outer 'if' if we figure out how to auto-check the difficulty boxes.
    if ($scope.activityData.filters.difficulty1 || $scope.activityData.filters.difficulty2 || $scope.activityData.filters.difficulty3) {
      tempList = tempList.filter(function (activity) {
        if ($scope.activityData.filters.difficulty1 && activity.difficulty == 1) {
          return activity;
        }
        if ($scope.activityData.filters.difficulty2 && activity.difficulty == 2) {
          return activity;
        }
        if ($scope.activityData.filters.difficulty3 && activity.difficulty == 3) {
          return activity;
        }
      });
    }

    // Category filters
    tempList.filter(function (activity) {
      const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

      array.forEach(num => {
        if ($scope.activityData.filters.category[num] && activity.category == categories[num - 1]) {
          categoryArray.push(activity);
        }
      });
      categoryArray.forEach(activity => activity);
    });

    $scope.activityData.activityList = categoryArray;

    console.log($scope.activityData.activityList);

    // Show users a message instead of a blank screen if there are no activities that match their search.
    if ($scope.activityData.activityList.length == 0) {
      $scope.activityData.message = 'Your search returned no results. Try adding some categories, difficulties or looking for activities from strangers.'
    }

    console.log('activities: ' + $scope.activityData.activityList.length);

  }
}
