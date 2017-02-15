function activitiesController($scope, $state, $ionicLoading, Activity) {
  $scope.activityData = $scope.activityData || {activityData: {}};
  $scope.activityData.filters = {};
  $scope.activityData.filters.category = [];
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

    // options = {
    //   difficulty: 3
    // };
    // console.log(new List('activity-list', options, values));
    // $scope.activityData.activityList = [...(new List('activity-list', values).activityList)];
    // console.log($scope.activityData.activityList);
    var tempList = $scope.activityData.cachedActivities;

    // We could get rid of this outer 'if' if we figure out how to auto-check the difficulty boxes.
    if ($scope.activityData.filters.difficulty1 || $scope.activityData.filters.difficulty2 || $scope.activityData.filters.difficulty3){
      tempList = tempList.filter(function (activity) {
        // Difficulty filters
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


      let temp2 = tempList.filter(function (activity) {
        const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

        array.forEach(num => {
          // console.log($scope.activityData.filters.category[num]);
          if ($scope.activityData.filters.category[num] && activity.category == categories[num - 1]) {
            // console.log(activity);
            categoryArray.push(activity);
          }
        });
        console.log(categoryArray);
        categoryArray.forEach(activity => activity);
      });
      console.log(temp2);

      $scope.activityData.activityList = categoryArray;

      //   // Category filters
      //   const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      //   const categories = ['Hiking', 'Cross-country skiing', 'Back country skiing', 'Paddling', 'Mountain biking', 'Horse riding', 'Climbing', 'Snow mobiling', 'Cross country ice skating', 'foraging'];
      //
      //   array.forEach(num => {
      //     console.log($scope.activityData.filters.category[num]);
      //     if ($scope.activityData.filters.category[num] && activity.category == categories[num - 1]) {
      //       console.log(activity);
      //       return activity;
      //     }
      //   });
      //   // $scope.activityData.filters.forEach(filter => {
      //   //   console.log(filter);
      //   // });
      //   // if ($scope.activityData.filters.category1 && activity.category == 1){
      //   //   return activity;
      //   // }
      // });

      console.log('activities: ' + $scope.activityData.activityList.length);

    }
  }
