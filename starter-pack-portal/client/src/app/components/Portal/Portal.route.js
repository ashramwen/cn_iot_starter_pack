'use strict';

angular.module('StarterPack.Portal')
  .config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('app.Portal.Dashboard', {
        url: '/Dashboard',
        templateUrl: 'app/components/Portal/Dashboard/Dashboard.html',
        controller: 'DashboardController',
      })
      .state('app.Portal.UserManager', {
        url: '/UserManager',
        templateUrl: 'app/components/Portal/UserManager/UserManager.html',
        controller: 'UserManagerController',
      })
      .state('app.Portal.UserGroupManager', {
        url: '/UserGroupManager',
        templateUrl: 'app/components/Portal/UserGroupManager/UserGroupManager.html',
        controller: 'UserGroupManagerController',
      })
      .state('app.Portal.ModelManager', {
        url: '/ModelManager',
        templateUrl: 'app/components/Portal/ModelManager/ModelManager.html',
        controller: 'ModelManagerController',
        abstract: true,
      })
      .state('app.Portal.FirmwareManager', {
        url: '/FirmwareManager',
        templateUrl: 'app/components/Portal/FirmwareManager/FirmwareManager.html',
        controller: 'FirmwareManagerController',
        abstract: true,
      })
      .state('app.Portal.DeviceManager', {
        url: '/DeviceManager',
        templateUrl: 'app/components/Portal/DeviceManager/DeviceManager.html',
        controller: 'DeviceManagerController',
      })
      .state('app.Portal.VirtualDevice', {
        url: '/VirtualDevice',
        templateUrl: 'app/components/Portal/VirtualDevice/VirtualDevice.html',
        controller: 'VirtualDeviceController',
      })
      .state('app.Portal.DataAnalysis', {
        url: '/DataAnalysis',
        templateUrl: 'app/components/Portal/DataAnalysis/DataAnalysis.html',
        controller: 'DataAnalysisController',
      })
      .state('app.Portal.Settings', {
        url: '/Settings',
        templateUrl: 'app/components/Portal/Settings/Settings.html',
        controller: 'SettingsController',
      });
  });
