'use strict';

angular.module('StarterPack.Portal.AppManager')
  .controller('ApplicationEditorController', ['$scope', '$rootScope', '$state', 'AppUtils', 'AppManagerService', 'localStorageService', 'AppConfig', function($scope, $rootScope, $state, AppUtils, AppManagerService, localStorageService, AppConfig) {
    $rootScope.portalNavs = AppManagerService.portalNavs;

    $scope.appReady = false;
    $scope.init = function(){
        $scope.$watch('appsReady', function(newVal){
            if(newVal){
                $scope.myApp = _.find($scope.myApps, function(app){
                    return app.getAppID() == $state.params['appId'];
                });
                console.log($scope.myApp);
                AppUtils.doLoading();
                $rootScope.portalAdmin.useApp($scope.myApp).then(function(){
                    /**
                     * TEST ONLY
                     * @type {[type]}
                     */
                    window.myApp = $scope.myApp;

                    /**
                     * END OF TEST
                     */


                    $scope.appReady = true;
                    localStorageService.set(AppConfig.NavNames.APP_NAME, $scope.myApp.getAppName());
                    $scope.turnOffMenu();
                    $scope.$apply();
                    AppUtils.whenLoaded();
                }, function(){
                    AppUtils.whenLoaded();
                });
            }
        });
    }
    
  }]);
