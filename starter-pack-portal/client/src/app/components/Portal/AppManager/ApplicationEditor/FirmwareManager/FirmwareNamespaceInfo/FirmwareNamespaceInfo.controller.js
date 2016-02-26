'use strict';

angular.module('StarterPack.Portal.AppManager.FirmwareManager')
  .controller('FirmwareNamespaceInfoController', ['$scope', '$rootScope', '$state', 'AppUtils', 'AppConfig', '$uibModal', function($scope, $rootScope, $state, AppUtils, AppConfig, $uibModal) {
    
    $scope.myFirmwareNamespace = {};

    $scope.unpublishedFirmwares = [];
    $scope.publishedFirmwares = [];
    $scope.pushedFirmwares = [];

    $scope.init = function(){

        $scope.$watch('firmwareNamespacesReady', function(ready){
            if(!ready) return;

            $scope.myFirmwareNamespace = _.find($scope.myFirmwareNamespaces, function(firmwareNamespace){
                return firmwareNamespace.getUUID() == $state.params['firmwareNamespaceId'];
            });

            AppUtils.doLoading();
            $scope.myFirmwareNamespace.refreshFirmwares().then(function(){
                var firmwares = $scope.myFirmwareNamespace.getFirmwares();

                initFirmwares(firmwares);

                $scope.$apply();
                AppUtils.whenLoaded();
            }, function(){
                AppUtils.whenLoaded();
            });

            AppUtils.setLocalStorageItem(AppConfig.NavNames.FIRMWARE_NAMESPACE_NAME, $scope.myFirmwareNamespace.getName());
        });
    };

    function initFirmwares(firmwares){
        $scope.unpublishedFirmwares = _.where(firmwares, {_state: KiiPortalFirmware.StateEnum.CREATED});
        $scope.publishedFirmwares = _.filter(firmwares, function(firmware){
            return firmware.getState() == KiiPortalFirmware.StateEnum.PUBLISHED || firmware.getState() == KiiPortalFirmware.StateEnum.DISABLED;
        });
        $scope.pushedFirmwares = _.where(firmwares, {_state: KiiPortalFirmware.StateEnum.PUSHED});
    };

    $scope.publishFirmware = function(firmware){
        AppUtils.confirm('Publish Firmware', 'Are you sure to PUBLISH this firmware [' + firmware.getName() + ']?' ,function(){
            AppUtils.doLoading();
            firmware.publish().then(function(){
                initFirmwares($scope.myFirmwareNamespace.getFirmwares());
                $scope.$apply();
                AppUtils.whenLoaded();

            }, function(){
                AppUtils.whenLoaded();
            });
        });
    };

    $scope.disableFirmware = function(firmware){
        AppUtils.confirm('Publish Firmware', 'Are you sure to DISABLE this firmware [' + firmware.getName() + ']?' ,function(){
            AppUtils.doLoading();
            firmware.disable().then(function(){
                initFirmwares($scope.myFirmwareNamespace.getFirmwares());
                $scope.$apply();
                AppUtils.whenLoaded();
            }, function(){
                AppUtils.whenLoaded();
            });
        });
    };

    $scope.enableFirmware = function(firmware){
        AppUtils.confirm('Publish Firmware', 'Are you sure to ENABLE this firmware [' + firmware.getName() + ']?' ,function(){
            AppUtils.doLoading();
            firmware.publish().then(function(){
                initFirmwares($scope.myFirmwareNamespace.getFirmwares());
                $scope.$apply();
                AppUtils.whenLoaded();
            }, function(){
                AppUtils.whenLoaded();
            });
        });
    };

    $scope.pushFirmware = function(firmware){
        AppUtils.confirm('Publish Firmware', 'Are you sure to push this firmware [' + firmware.getName() + ']? This process cannot be stopped or reverted. This firmware version will be visible FOREVER!' ,function(){
            AppUtils.doLoading();
            firmware.push().then(function(){
                initFirmwares($scope.myFirmwareNamespace.getFirmwares());
                $scope.$apply();
                AppUtils.whenLoaded();
            }, function(){
                AppUtils.whenLoaded();
            });
        });
    };



    $scope.removeFirmware = function(firmware){
        AppUtils.confirm('Delete Firmware', 'Are you sure to delete this firmware [' + firmware.getName() + ']?' ,function(){
            AppUtils.doLoading();
            firmware.delete().then(function(){
                initFirmwares($scope.myFirmwareNamespace.getFirmwares());
                $scope.$apply();
                AppUtils.whenLoaded();
            }, function(){
                AppUtils.whenLoaded();
            });
        });
        
    };

    $scope.openFirmwareCreationModal = function(){
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'app.Portal.AppManager.ApplicationEditor.FirmwareManager.FirmwareCreateModal',
            resolve: {
                firmwareNamespace: $scope.myFirmwareNamespace
            },
            controller: 'FirmwareNamespaceInfoController.CreateModal',
            size: 'md'
        });

        modalInstance.result.then(function (firmware) {
            $scope.myFirmwares = $scope.myFirmwareNamespace.getFirmwares();
            initFirmwares($scope.myFirmwares);
        }, function () {
            
        });
    };

    $scope.openFirmwareEditorModal = function(firmware){
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'app.Portal.AppManager.ApplicationEditor.FirmwareManager.FirmwareEditorModal',
            resolve: {
                firmware: firmware
            },
            controller: 'FirmwareNamespaceInfoController.EditorModal',
            size: 'md'
        });

        modalInstance.result.then(function (firmware) {
            $scope.myFirmwares = $scope.myFirmwareNamespace.getFirmwares();
        }, function () {
            
        });
    }

  }])
  .controller('FirmwareNamespaceInfoController.CreateModal', 
      ['ApplicationService', 'AppUtils', '$scope', '$uibModalInstance', 'firmwareNamespace', 'FirmwareService', 
      function(ApplicationService, AppUtils, $scope, $uibModalInstance, firmwareNamespace, FirmwareService){

    $scope.firmwareBO = {};

    $scope.ok = function(){
        AppUtils.showLoading();
       
        FirmwareService.createFirmware(firmwareNamespace, $scope.firmwareBO).then(function(firmware){
            $uibModalInstance.close(firmware);
            $scope.$apply();
            AppUtils.hideLoading();
        }, function(){
            AppUtils.hideLoading();
        });
    };
    $scope.cancel = function(){
        $uibModalInstance.dismiss('cancel');
    };
  }])
  .controller('FirmwareNamespaceInfoController.EditorModal', ['ApplicationService', 'AppUtils', '$scope', '$uibModalInstance', 'firmware', 'FirmwareService',
      function(ApplicationService, AppUtils, $scope, $uibModalInstance, firmware, FirmwareService){

    $scope.firmwareBO = {};
    $scope.firmware = firmware;

    $scope.firmwareBO.firmwareName = firmware.getName();
    $scope.firmwareBO.description = firmware.getDescription();

    $scope.uploadFirmwareFile = function(){
        AppUtils.showLoading();
        FirmwareService.uploadFirmwareFile(firmware ,$('#firmwareFile')[0].files[0]).then(function(firmware){
            $scope.$apply();
            AppUtils.hideLoading();
        }, function(){
            AppUtils.hideLoading();
        });
    }

    $scope.ok = function(){
        AppUtils.showLoading();

        FirmwareService.saveFirmware(firmware, $scope.firmwareBO). then(function(firmware){
            $uibModalInstance.close(firmware);
            $scope.$apply();
            AppUtils.hideLoading();
        }, function(err){
            AppUtils.hideLoading();
        });
    };

    $scope.cancel = function(){
        $uibModalInstance.dismiss('cancel');
    };

  }]);
