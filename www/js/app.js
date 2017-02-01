// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('adventure-map', ['ionic', 'adventure-map.controllers', 'ng-token-auth'])
  .constant('API_URL', 'https://adventuremap-dev.herokuapp.com/api/v1')

  .config(function ($authProvider) {
    $authProvider.configure({
      apiUrl: 'https://adventuremap-dev.herokuapp.com/api/v1'
    });
  })

  .run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

        cordova.plugins.Keyboard.disableScroll(true);
      }
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  })

  .config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('activity_feed', {
        url: "/activity_feed",
        templateUrl: "templates/activity_feed.html",
        controller: "ActivitiesController"
      });
    // $urlRouterProvider.otherwise('/');
  });
