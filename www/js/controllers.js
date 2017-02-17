angular
  .module('adventureMap.controllers', [])
  .controller('userSessionController', userSessionController)
  .controller('activitiesController', activitiesController)
  .controller('createActivityController', createActivityController)
  .controller('showActivityController', showActivityController)
  .controller('mapController', mapController)
  .controller('userController', userController)

  .controller('walkthroughController', function($scope, $state, $ionicLoading, $auth, API_URL) {
    $scope.skipIntro = function(){
      $state.go('intro.login');
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

    $scope.goToLogin = function(){
      $state.go('intro.login');
    }
  });
function userController($scope, $state) {

}
