'use strict';

angular.module('StarterPack.Portal.AppManager')
  .factory('ApplicationService', ['$rootScope',function($rootScope) {
    var ApplicationService = {};
    ApplicationService.getApps = function(){
        return $rootScope.portalAdmin.refreshApps();
    };

    ApplicationService.createApp = function(appBO){
        var app = $rootScope.portalAdmin.createApp();
        app.setAppName(appBO.appName);
        app.setServer(appBO.server);
        app.setPlatforms(appBO.platforms);
        return app.save();
    }

    return ApplicationService;
  }]);
