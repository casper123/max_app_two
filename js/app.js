// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js

 
angular.module('starter', ['ionic', 'starter.controllers', 'Parse'])

.run(function($ionicPlatform, Parse) {
  Parse.auth.resumeSession();
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, ParseProvider) {
  ParseProvider.initialize("RAv0nLg4Rql3iQL6IY17GZno6Rcglwm1hTnDTDRp", "1Kuqo3Ru2J0yJYwAP7S70xbZeSZgeoXSm60a11gT");

  $stateProvider
    .state('user', {
      url: "/user",
      abstract: true,
      templateUrl: "templates/user.html",
      controller: 'UserCtrl'
    })

    .state('user.login', {
      url: "/login",
      views: {
        'userContent' :{
          templateUrl: "templates/login.html",
          controller: 'LoginCtrl'
        }
      }
    })

    .state('user.logout', {
      url: "/logout",
      views: {
        'userContent' :{
          templateUrl: "templates/login.html",
          controller: 'LogoutCtrl'
        }
      }
    })

    .state('user.register', {
      url: "/register",
      views: {
        'userContent' :{
          templateUrl: "templates/register.html",
          controller: 'RegisterCtrl'
        }
      }
    })

    .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "templates/menu.html",
      controller: 'AppCtrl'
    })

    .state('app.home', {
      url: "/home",
      views: {
        'menuContent' :{
          templateUrl: "templates/home.html",
          controller: 'HomeCtrl'
        }
      }
    })

    .state('app.profile', {
      url: "/profile",
      views: {
        'menuContent' :{
          templateUrl: "templates/profile.html",
          controller: 'ProfileCtrl'
        }
      }
    })

    .state('app.setting', {
      url: "/setting",
      views: {
        'menuContent' :{
          templateUrl: "templates/setting.html",
          controller: 'HomeCtrl'
        }
      }
    })

    .state('app.search', {
      url: "/search",
      views: {
        'menuContent' :{
          templateUrl: "templates/search.html"
        }
      }
    })

    .state('app.browse', {
      url: "/browse",
      views: {
        'menuContent' :{
          templateUrl: "templates/browse.html"
        }
      }
    })

    .state('app.playlists', {
      url: "/playlists",
      views: {
        'menuContent' :{
          templateUrl: "templates/playlists.html",
          controller: 'PlaylistsCtrl'
        }
      }
    })

    .state('app.single', {
      url: "/playlists/:playlistId",
      views: {
        'menuContent' :{
          templateUrl: "templates/playlist.html",
          controller: 'PlaylistCtrl'
        }
      }
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/user/login');
});