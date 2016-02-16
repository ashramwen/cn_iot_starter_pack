'use strict';

angular.module('StarterPack.Portal.AppManager.ModelManager')
  .config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('app.Portal.AppManager.ApplicationEditor.ModelManager.ModelList', {
        url: '/ModelList',
        templateUrl: 'app/components/Portal/AppManager/ApplicationEditor/ModelManager/ModelList/ModelList.html',
        controller: 'ModelListController',
        getName: function(){
          return 'Models';
        },
        previous: 'app.Portal.AppManager.ApplicationEditor.ModelManager'
      })
      .state('app.Portal.AppManager.ApplicationEditor.ModelManager.ModelInfo', {
        url: '/ModelInfo',
        templateUrl: 'app/components/Portal/AppManager/ApplicationEditor/ModelManager/ModelInfo/ModelInfo.html',
        controller: 'ModelInfoController',
        getName: function(){
          return 'Model Info';
        },
        previous: 'app.Portal.AppManager.ApplicationEditor.ModelManager.ModelList'
      });
  });
