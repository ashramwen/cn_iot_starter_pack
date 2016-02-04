'use strict';

angular.module('StarterPack')
  .config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('app',{
        url: '', 
        templateUrl: 'app/app.html',
        controller: 'AppController'
      })
      .state('app.Secure', {
        url: '/Secure',
        templateUrl: 'app/components/Secure/Secure.html',
        controller: 'SecureController',
      })
      .state('app.AppManager', {
        url: '/AppManager',
        templateUrl: 'app/components/AppManager/AppManager.html',
        controller: 'AppManagerController',
      })
      .state('app.Portal', {
        url: '/Portal',
        templateUrl: 'app/components/Portal/Portal.html',
        controller: 'PortalController',
      });

      $urlRouterProvider.otherwise('app/Secure/UserLogin');
  });
