angular
  .module('adventureMap.controllers', [])
  .controller('userSessionController', userSessionController)
  .controller('activitiesController', activitiesController)
  .controller('createActivitiesController', createActivitiesController)
  .controller('userController', userController);


function userSessionController($scope, $auth, $ionicLoading, $state, API_URL) {
  console.log($scope.user);
  $scope.loginData = {};
  $scope.userSignIn = function () {
    $auth.getConfig().apiUrl = API_URL;
    $ionicLoading.show({
      template: 'Logging in...'
    });
    $auth.submitLogin($scope.loginData)
      .then(function (response) {
        $scope.user = response;
        $state.go('app.activities');
        $ionicLoading.hide();
      })
      .catch(function (response) {
        $ionicLoading.hide();
        $scope.errorMessage = response.errors.toString();
      })
  };

  $scope.facebookSignIn = function () {
    $auth.getConfig().apiUrl = API_URL.replace(/^https:\/\//i, 'http://');
    $ionicLoading.show({
      template: 'Logging in with Facebook...'
    });
    $auth.authenticate('facebook')
      .then(function (response) {
        console.log(response);
        $state.go('app.activities');
        $ionicLoading.hide();
      })
      .catch(function (ev, response) {
        // handle errors
        $ionicLoading.hide();
      });
  }

  $scope.signOut = function () {
    ;
    $ionicLoading.show({
      template: 'Signing out...'
    });
    $auth.signOut()
      .then(function (response) {
        $state.go('app.activities');
        $ionicLoading.hide();
      })
  };


}

function activitiesController($scope, $auth,  $state, $ionicLoading, Activity) {
  //$scope.$on('$ionicView.enter', function () {
  //  $auth.validateUser().then(function(resp){
  //    console.log(resp)
  //  }).catch(function(resp){
  //    console.log(resp);
  //    $state.go('home')
  //  });
  //});

  $scope.message = 'This is the Activities View for ' + $scope.user.email;

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
    $state.go('app.create_activity');
  }

  $scope.viewProfile = function () {
    $state.go('app.profile');
  }
}

function createActivitiesController($scope, $ionicLoading, $state, Activity) {
  debugger;
  $scope.activityData = {};
  $scope.categories = ['Hiking', 'Cross country skiing', 'Back country skiing', 'Paddling', 'Mountain biking', 'Horse riding', 'Climbing', 'Snow mobiling', 'Cross country ice skating', 'Foraging'];

  $scope.createActivity = function () {
    $ionicLoading.show({
      template: 'Saving...'
    });
    Activity.save($scope.activityData, function (resp) {
      $state.go('app.activities');
      $ionicLoading.hide();
      console.log(resp);
    }, function (resp) {
      console.log(resp);
    });
  }
}

function userController($scope, $state) {


}


