'use strict';

angular.module('StarterPack.Portal')
  .config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('app.Portal.AppManager', {
        url: '/AppManager',
        templateUrl: 'app/components/Portal/AppManager/AppManager.html',
        controller: 'AppManagerController',
        getName: function(){
          return 'Application Management';
        }
      });
  });
