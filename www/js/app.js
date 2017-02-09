// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('adventureMap', ['ionic', 'ui.router', 'adventureMap.controllers', 'adventureMap.services', 'ngCordova', 'ng-token-auth', 'ngResource'])
  .constant('API_URL', 'https://adventuremap-dev.herokuapp.com/api/v1')
  //.constant('API_URL', 'http://localhost:3000/api/v1')

  .config(function ($authProvider, API_URL) {
    $authProvider.configure({
      apiUrl: API_URL,
      omniauthWindowType: widowType(),
      storage: 'localStorage',
      forceHardRedirect: true
    });

    function widowType() {
      var IONIC_APP_ID = '7e351a02';
      if (window.location.href.indexOf('com.ionic.viewapp') > -1 || window.location.href.indexOf(IONIC_APP_ID) > -1) {
        return 'newWindow'
      }
      if (window.cordova == undefined) {
        return 'newWindow'
      } else {
        return 'inAppBrowser'
      }
    }
  })

  .run(function ($ionicPlatform, $rootScope, $state, $auth) {
    $ionicPlatform.ready(function () {
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

        cordova.plugins.Keyboard.disableScroll(true);
      }
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }
    });

    $rootScope.$on('$stateChangeStart', function (event, toState) {
      var requireLogin = toState.data.requireLogin;
      if (requireLogin && isLoggedIn($rootScope)) {
        event.preventDefault();
        $state.go('home');
      }
    });

    function isLoggedIn(scope){
      if (typeof $rootScope.user === 'undefined' || Object.getOwnPropertyNames($rootScope.user).length == 0){
        return true;
      }
    }
  })


  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: 'templates/login.html',
        controller: 'userSessionController',
        data: {
          requireLogin: false
        },
        cache: false
      })
      .state('app', {
        url: '/app',
        abstract: true,
        template: '<ion-nav-view>',
        data: {
          requireLogin: true // this property will apply to all children of 'app'
        },
        resolve: {
          auth: function ($auth, $state) {
            return $auth.validateUser().catch(function () {
              $state.go('home');
            });
          }
        }
      })
      .state('app.activities', {
        url: '/activities',
        templateUrl: 'templates/activities.html',
        controller: 'activitiesController'
      })
      .state('app.create_activity', {
        url: '/create_activity',
        authenticate: true,
        templateUrl: 'templates/create_activity.html',
        controller: 'createActivitiesController'
      })
      .state('app.profile', {
        url: '/profile',
        templateUrl: 'templates/profile.html',
        controller: 'userController'

      });
    $urlRouterProvider.otherwise('/home');
  });
