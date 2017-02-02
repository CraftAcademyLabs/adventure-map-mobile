// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('adventureMap', ['ionic', 'adventureMap.controllers', 'ng-token-auth'])
  .constant('API_URL', 'http://adventuremap-dev.herokuapp.com/api/v1')
  //.constant('API_URL', 'http://localhost:3000/api/v1')
  .config(function ($authProvider) {
    $authProvider.configure({
      apiUrl: 'http://adventuremap-dev.herokuapp.com/api/v1',
      //apiUrl: 'http://localhost:3000/api/v1',
      omniauthWindowType: window.cordova == undefined ? 'newWindow' : 'inAppBrowser'
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
      .state('home', {
        url: '/home',
        templateUrl: 'templates/login.html',
        controller: 'userSessionController'
      })
      .state('activities', {
        url: '/activities',
        templateUrl: 'templates/activities.html',
        controller: 'activitiesController'
      });
    $urlRouterProvider.otherwise('home');
  });
