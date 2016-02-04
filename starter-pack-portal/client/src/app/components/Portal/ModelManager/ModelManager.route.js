'use strict';

angular.module('StarterPack.Portal.ModelManager')
  .config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('app.Portal.ModelManager.ModelList', {
        url: '/ModelList',
        templateUrl: 'app/components/Portal/ModelManager/ModelList/ModelList.html',
        controller: 'ModelListController',
      })
      .state('app.Portal.ModelManager.ModelInfo', {
        url: '/ModelInfo',
        templateUrl: 'app/components/Portal/ModelManager/ModelInfo/ModelInfo.html',
        controller: 'ModelInfoController',
      });
  });
