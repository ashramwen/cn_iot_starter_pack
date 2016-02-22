'use strict';

angular.module('StarterPack.Portal.AppManager.ModelManager')
  .config(function($stateProvider, $urlRouterProvider, AppConfig) {
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
        url: '/:modelId/ModelInfo',
        templateUrl: 'app/components/Portal/AppManager/ApplicationEditor/ModelManager/ModelInfo/ModelInfo.html',
        controller: 'ModelInfoController',
        getName: function(){
          var modelName = app.utils.getLocalStorageItem(AppConfig.NavNames.MODEL_NAME);
          return modelName;
        },
        previous: 'app.Portal.AppManager.ApplicationEditor.ModelManager.ModelList'
      });
  });
