'use strict';

angular.module('StarterPack.Portal.AppManager.FirmwareManager')
  .controller('FirmwareManagerController', ['$scope', '$rootScope', '$state', 'AppUtils', 'AppConfig', function($scope, $rootScope, $state, AppUtils, AppConfig) {
    
    $scope.firmwareNamespacesReady = false;

    $scope.init = function(){
        $scope.$watch('appReady', function(ready){
            if(!ready)return;

            AppUtils.doLoading();
            $scope.myApp.refreshFirmwareNamespaces().then(function(firmwareNamespaces){
                AppUtils.whenLoaded();
                $scope.myFirmwareNamespaces = $scope.myApp.getFirmwareNamespaces();
                if($state.params['firmwareNamespaceId']){
                    var firmwareNamespace = _.find($scope.myFirmwareNamespaces, function(firmwareNamespace){
                        return firmwareNamespace.getUUID() == $state.params['firmwareNamespaceId'];
                    });
                    AppUtils.setLocalStorageItem(AppConfig.NavNames.FIRMWARE_NAMESPACE_NAME, firmwareNamespace.getName()); 
                }
                $scope.firmwareNamespacesReady = true;
                $scope.$apply();
            }, function(){
                AppUtils.whenLoaded();
            });
        });
    };
  }]);
