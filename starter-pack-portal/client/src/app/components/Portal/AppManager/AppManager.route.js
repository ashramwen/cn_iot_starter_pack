'use strict';

angular.module('StarterPack.Portal.AppManager')
  .config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('app.Portal.AppManager.ApplicationList', {
        url: '/apps',
        templateUrl: 'app/components/Portal/AppManager/ApplicationList/ApplicationList.html',
        controller: 'ApplicationListController',
        getName: function(){
          return 'Applications';
        }
      })
      .state('app.Portal.AppManager.ApplicationEditor', {
        url: '/apps/:appId',
        templateUrl: 'app/components/Portal/AppManager/ApplicationEditor/ApplicationEditor.html',
        controller: 'ApplicationEditorController'
      });
  });
