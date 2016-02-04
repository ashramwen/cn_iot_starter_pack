'use strict';

angular.module('StarterPack.Portal.FirmwareManager')
  .config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('app.Portal.FirmwareManager.FirmwareList', {
        url: '/FirmwareList',
        templateUrl: 'app/components/Portal/FirmwareManager/FirmwareList/FirmwareList.html',
        controller: 'FirmwareListController',
      })
      .state('app.Portal.FirmwareManager.FirmwareInfo', {
        url: '/FirmwareInfo',
        templateUrl: 'app/components/Portal/FirmwareManager/FirmwareInfo/FirmwareInfo.html',
        controller: 'FirmwareInfoController',
      });
  });
