function authController($scope, $auth, $ionicLoading, $state, $rootScope, $localStorage, API_URL, CATEGORY_WORDS, $ionicHistory, $ionicModal) {
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
        $state.go('app.activities');
        storeUser();
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
        $scope.activitiesModal.hide();
        $state.go('app.activities');
        $ionicLoading.hide();
      })
      .catch(function(response) {
        $ionicLoading.hide();
        $scope.errorMessage = response.data.errors.full_messages.toString();
      })
  };

  $ionicModal.fromTemplateUrl('templates/auth/activity_selection.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.activitiesModal = modal;
  });

  $scope.category_words = CATEGORY_WORDS;
  $scope.activity_images = ['img/activity_images/hiking.png', 'img/activity_images/cross_country_skiing.png', 'img/activity_images/back_country_skiing.png', 'img/activity_images/paddling.png', 'img/activity_images/mountain_biking.png', 'img/activity_images/horse_riding.png', 'img/activity_images/climbing.png', 'img/activity_images/snow_mobiling.png', 'img/activity_images/cross_country_ice_skating.png', 'img/activity_images/foraging.png'];

  $scope.getActivitySelection = function() {
    // "swipe" animation over to a new page with the activities
    $scope.activitiesModal.show();
    // Then use signup() on next page to actually register.
  };

  $scope.facebookSignIn = function () {
    $auth.signOut();
    $auth.getConfig().apiUrl = API_URL.replace(/^https:\/\//i, 'http://');
    $ionicLoading.show({
      template: 'Logging in with Facebook...'
    });

    $auth.authenticate('facebook')
      .then(function (response) {
        $auth.validateUser().then(function(resp){
          console.log('validateUser');
          storeUser();
          console.log(resp)
        });
        $state.go('app.activities');
        $ionicLoading.hide();
      })
      .catch(function (ev, response) {
        // handle errors
        console.log(ev);
        console.log(response);
        $ionicLoading.hide();
      });
  };

  $scope.signOut = function () {
    $ionicLoading.show({
      template: 'Signing out...'
    });
    $auth.signOut()
      .then(function (response) {
        $auth.invalidateTokens();
        $state.go('intro.walkthrough');
        $ionicLoading.hide();
      })
  };

  $scope.cancelAuth = function(){
    $scope.activitiesModal.hide();
    $state.go('intro.walkthrough');
  };

  $scope.back = function(){
    $ionicHistory.goBack();
  };

  storeUser = function() {
    $localStorage.user = $scope.user;
    console.log('storing user');
    console.log($localStorage.user);
  }
}
