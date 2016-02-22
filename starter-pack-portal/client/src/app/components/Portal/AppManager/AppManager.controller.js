'use strict';

angular.module('StarterPack.Portal.AppManager')
  .controller('AppManagerController', ['$scope', '$rootScope', '$state', 'AppUtils', 'AppManagerService', 'ApplicationService', function($scope, $rootScope, $state, AppUtils, AppManagerService, ApplicationService) {
    $rootScope.portalNavs = [];


    $scope.appsReady = false;
    $scope.myApps = [];
    /**
     * init applications
     * @return {[type]} [description]
     */
    $scope.init = function(){

        AppUtils.doLoading();
        ApplicationService.getApps().then(function(apps){
            $scope.myApps = apps;
            $scope.appsReady = true;
            $scope.$apply();

            AppUtils.whenLoaded();
        }, function(error){
            AppUtils.whenLoaded();
        });
    };
  }]);
