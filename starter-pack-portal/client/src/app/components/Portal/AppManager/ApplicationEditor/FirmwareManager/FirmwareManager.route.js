'use strict';

angular.module('StarterPack.Portal.AppManager.FirmwareManager')
  .config(['$stateProvider', '$urlRouterProvider', 'AppConfig', function($stateProvider, $urlRouterProvider, AppConfig) {
      $stateProvider
        .state('app.Portal.AppManager.ApplicationEditor.FirmwareManager.FirmwareNamespaceList', {
          url: '/FirmwareNamespaceList',
          templateUrl: 'app/components/Portal/AppManager/ApplicationEditor/FirmwareManager/FirmwareNamespaceList/FirmwareNamespaceList.html',
          controller: 'FirmwareNamespaceListController',
          getName: function(){
            return 'FirmwareNamespaces';
          },
          previous: 'app.Portal.AppManager.ApplicationEditor.FirmwareManager'
        })
        .state('app.Portal.AppManager.ApplicationEditor.FirmwareManager.FirmwareNamespaceInfo', {
          url: ':firmwareNamespaceId/FirmwareNamespaceInfo',
          templateUrl: 'app/components/Portal/AppManager/ApplicationEditor/FirmwareManager/FirmwareNamespaceInfo/FirmwareNamespaceInfo.html',
          controller: 'FirmwareNamespaceInfoController',
          getName: function(){
            var firmwareNamespaceName = app.utils.getLocalStorageItem(AppConfig.NavNames.FIRMWARE_NAMESPACE_NAME);
            return firmwareNamespaceName;
          },
          previous: 'app.Portal.AppManager.ApplicationEditor.FirmwareManager.FirmwareNamespaceList'
        });
    }]);
