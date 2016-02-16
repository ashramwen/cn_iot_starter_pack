'use strict';

angular.module('StarterPack.Portal.AppManager.FirmwareManager')
  .config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('app.Portal.AppManager.ApplicationEditor.FirmwareManager.FirmwareList', {
        url: '/FirmwareList',
        templateUrl: 'app/components/Portal/AppManager/ApplicationEditor/FirmwareManager/FirmwareList/FirmwareList.html',
        controller: 'FirmwareListController',
        getName: function(){
          return 'Firmwares';
        },
        previous: 'app.Portal.AppManager.ApplicationEditor.FirmwareManager'
      })
      .state('app.Portal.AppManager.ApplicationEditor.FirmwareManager.FirmwareInfo', {
        url: '/FirmwareInfo',
        templateUrl: 'app/components/Portal/AppManager/ApplicationEditor/FirmwareManager/FirmwareInfo/FirmwareInfo.html',
        controller: 'FirmwareInfoController',
        getName: function(){
          var firmwareName = app.utils.getLocalStorageItem('myFirmwareName');
          return firmwareName;
        },
        previous: 'app.Portal.AppManager.ApplicationEditor.FirmwareManager.FirmwareList'
      });
  });
