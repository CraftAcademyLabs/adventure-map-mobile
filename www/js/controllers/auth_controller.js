function authController($scope, $auth, $ionicLoading, $state, $rootScope, API_URL) {
  console.log($scope.user);
  $scope.credentials = {};
  $scope.signupForm = {};
  $scope.errorMessage = null;

  $scope.skipIntro = function(){
    $state.go('intro.login');
  };

  $scope.login = function () {
    $auth.getConfig().apiUrl = API_URL;
    $ionicLoading.show({
      template: 'Logging in...'
    });
    $auth.submitLogin($scope.credentials)
      .then(function (response) {
        $scope.user = response;
        $state.go('app.activities');
        $ionicLoading.hide();
      })
      .catch(function (response) {
        $ionicLoading.hide();
        $scope.errorMessage = response.errors.toString();
      });
  };

  $scope.signup = function() {
    $auth.getConfig().apiUrl = API_URL;
    $ionicLoading.show({
      template: 'Signing up...'
    });

    $auth.submitRegistration($scope.signupForm)
      .then(function (response) {
        $state.go('app.activities');
        $ionicLoading.hide();
      })
      .catch(function(response) {
        $ionicLoading.hide();
        $scope.errorMessage = response.data.errors.full_messages.toString();
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
  };

  $scope.performSignOut = function () {
    $ionicLoading.show({
      template: 'Signing out...'
    });
    $auth.signOut()
      .then(function (response) {
        $state.go('intro.walkthrough');
        $ionicLoading.hide();
      })
  };

  $scope.cancelAuth = function(){
    $state.go('intro.walkthrough');
  };

  $scope.requestPassword = function() {
    $ionicLoading.show({
      template: 'Requesting new password...'
    });
    $auth.requestPasswordReset($scope.credentials)
      .then(function(response) {
        console.log(response);
        $scope.successMessage = response.data.message
        $ionicLoading.hide();
      })
      .catch(function(response) {
        console.log(response)
        $scope.errorMessage = response.data.errors.toString();
        $ionicLoading.hide();
      });
  }
}
