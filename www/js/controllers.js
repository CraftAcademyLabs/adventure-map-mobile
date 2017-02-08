angular
  .module('adventureMap.controllers', [])
  .controller('userSessionController', userSessionController)
  .controller('activitiesController', activitiesController)
  .controller('createActivitiesController', createActivitiesController);


function userSessionController($scope, $rootScope, $auth, $ionicLoading, $state, API_URL) {
  $scope.loginData = {};
  $scope.userSignIn = function () {
    $auth.getConfig().apiUrl = API_URL;
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
  };

  $scope.facebookSignIn = function () {
    $auth.getConfig().apiUrl = API_URL.replace(/^https:\/\//i, 'http://');
    $ionicLoading.show({
      template: 'Logging in with Facebook...'
    });
    $auth.authenticate('facebook')
      .then(function (response) {
        debugger;
        console.log(response);
        $state.go('activities');
        $ionicLoading.hide();
      })
      .catch(function (ev, response) {
        // handle errors
        $ionicLoading.hide();
      });
  }


}

function activitiesController($scope, $state, $ionicLoading, $ionicModal, $ionicSideMenuDelegate, Activity) {
  // $scope.message = 'This is the Activities View for ' + $scope.user.email;
  $scope.showFilters = false;

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

  $scope.toggleFilters = function() {
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

    $scope.openModal = function() {
      $scope.modal.show();
    }
  }
}

function createActivitiesController($scope, $ionicLoading, $state, Activity) {
  $scope.activityData = {};
  $scope.categories = ['Hiking', 'Cross country skiing', 'Back country skiing', 'Paddling', 'Mountain biking', 'Horse riding', 'Climbing', 'Snow mobiling', 'Cross country ice skating', 'Foraging'];

  $scope.createActivity = function () {
    $ionicLoading.show({
      template: 'Saving...'
    });
    Activity.save($scope.activityData, function (resp) {
      $state.go('activities');
      $ionicLoading.hide();
      console.log(resp);
    }, function (resp) {
      console.log(resp);
    });
  }
}
