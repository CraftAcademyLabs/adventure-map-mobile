angular
  .module('adventureMap.controllers', [])
  .controller('userSessionController', userSessionController)
  .controller('activitiesController', activitiesController)
  .controller('createActivityController', createActivityController)
  .controller('showActivityController', showActivityController)
  .controller('mapController', mapController)
  .controller('userController', userController)

  .controller('WalkthroughController', function($scope, $state, $ionicLoading, $auth, API_URL) {
    $scope.skipIntro = function(){
      console.log('wtf??');
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
  });
function userController($scope, $state) {

}
