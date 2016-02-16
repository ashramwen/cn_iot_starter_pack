'use strict';

angular.module('StarterPack.Portal.AppManager')
  .config(function($stateProvider, $urlRouterProvider, AppConfig) {
    $stateProvider
      .state('app.Portal.AppManager.ApplicationEditor.ApplicationInfo', {
        url: '/Applications/:appId',
        templateUrl: 'app/components/Portal/AppManager/ApplicationEditor/ApplicationInfo/ApplicationInfo.html',
        controller: 'ApplicationInfoController',
        getName: function(){
          var appName = app.utils.getLocalStorageItem(AppConfig.NavNames.APP_NAME);
          return appName;
        },
        previous: 'app.Portal.AppManager.ApplicationList'
      })
      .state('app.Portal.AppManager.ApplicationEditor.Dashboard', {
        url: '/apps/:appId/Dashboard',
        templateUrl: 'app/components/Portal/AppManager/ApplicationEditor/Dashboard/Dashboard.html',
        controller: 'DashboardController',
        getName: function(){
          return 'Dashboard';
        },
        previous: 'app.Portal.AppManager.ApplicationEditor.ApplicationInfo'
      })
      .state('app.Portal.AppManager.ApplicationEditor.UserManager', {
        url: '/apps/:appId/UserManager',
        templateUrl: 'app/components/Portal/AppManager/ApplicationEditor/UserManager/UserManager.html',
        controller: 'UserManagerController',
        getName: function(){
          return 'User Management';
        },
        previous: 'app.Portal.AppManager.ApplicationEditor.ApplicationInfo'
      })
      .state('app.Portal.AppManager.ApplicationEditor.UserGroupManager', {
        url: '/apps/:appId/UserGroupManager',
        templateUrl: 'app/components/Portal/AppManager/ApplicationEditor/UserGroupManager/UserGroupManager.html',
        controller: 'UserGroupManagerController',
        getName: function(){
          return 'Group Management';
        },
        previous: 'app.Portal.AppManager.ApplicationEditor.ApplicationInfo'
      })
      .state('app.Portal.AppManager.ApplicationEditor.ModelManager', {
        url: '/apps/:appId/ModelManager',
        templateUrl: 'app/components/Portal/AppManager/ApplicationEditor/ModelManager/ModelManager.html',
        controller: 'ModelManagerController',
        abstract: true,
        getName: function(){
          return 'Model Management';
        },
        previous: 'app.Portal.AppManager.ApplicationEditor.ApplicationInfo'
      })
      .state('app.Portal.AppManager.ApplicationEditor.FirmwareManager', {
        url: '/apps/:appId/FirmwareManager',
        templateUrl: 'app/components/Portal/AppManager/ApplicationEditor/FirmwareManager/FirmwareManager.html',
        controller: 'FirmwareManagerController',
        abstract: true,
        getName: function(){
          return 'Firmware Management';
        },
        previous: 'app.Portal.AppManager.ApplicationEditor.ApplicationInfo'
      })
      .state('app.Portal.AppManager.ApplicationEditor.DeviceManager', {
        url: '/apps/:appId/DeviceManager',
        templateUrl: 'app/components/Portal/AppManager/ApplicationEditor/DeviceManager/DeviceManager.html',
        controller: 'DeviceManagerController',
        getName: function(){
          return 'Device Management';
        },
        previous: 'app.Portal.AppManager.ApplicationEditor.ApplicationInfo'
      })
      .state('app.Portal.AppManager.ApplicationEditor.VirtualDevice', {
        url: '/apps/:appId/VirtualDevice',
        templateUrl: 'app/components/Portal/AppManager/ApplicationEditor/VirtualDevice/VirtualDevice.html',
        controller: 'VirtualDeviceController',
        getName: function(){
          return 'Device Simulation';
        },
        previous: 'app.Portal.AppManager.ApplicationEditor.ApplicationInfo'
      })
      .state('app.Portal.AppManager.ApplicationEditor.DataAnalysis', {
        url: '/apps/:appId/DataAnalysis',
        templateUrl: 'app/components/Portal/AppManager/ApplicationEditor/DataAnalysis/DataAnalysis.html',
        controller: 'DataAnalysisController',
        getName: function(){
          return 'Data Analysis';
        },
        previous: 'app.Portal.AppManager.ApplicationEditor.ApplicationInfo'
      })
      .state('app.Portal.AppManager.ApplicationEditor.Settings', {
        url: '/apps/:appId/Settings',
        templateUrl: 'app/components/Portal/AppManager/ApplicationEditor/Settings/Settings.html',
        controller: 'SettingsController',
        getName: function(){
          return 'Settings';
        },
        previous: 'app.Portal.AppManager.ApplicationEditor.ApplicationInfo'
      });
  });
