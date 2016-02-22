'use strict';

angular.module('StarterPack.Portal.AppManager.ModelManager')
  .controller('ModelInfoController', ['$scope', '$rootScope', '$state', 'AppUtils', 'AppConfig', 'FirmwareService', function($scope, $rootScope, $state, AppUtils, AppConfig, FirmwareService) {
    
    $scope.modelInfo = {
        selectedNamespace: {}
    };

    /**
     * init when view loaded
     * @return {[null]} [description]
     */
    $scope.init = function(){
        $scope.$watch('modelsReady', function(newVal){
            if(newVal){
                $scope.initModel();

                AppUtils.doLoading();

                // get firmware namespace list
                $scope.myApp.refreshFirmwareNamespaces().then(function(){
                    AppUtils.whenLoaded();
                    $scope.firmwareNamespaces = $scope.myApp.getFirmwareNamespaces();

                    // get model's firmware namespace
                    $scope.modelInfo.selectedNamespace = _.find($scope.firmwareNamespaces, function(firmwareNamespace){
                        return firmwareNamespace.getName() == $scope.myModel.getFirmwareNamespace();
                    });
                    if($scope.modelInfo.selectedNamespace)
                        $scope.initModelFirmwarenamespace($scope.myModel, $scope.modelInfo.selectedNamespace);

                    $scope.$apply();
                    
                }, function(){
                    AppUtils.whenLoaded();
                });
            }
        });
    };

    /**
     * get and init firmwares when firmwareNamespace is changed
     * @param  {KiiPortalFirmwareNamespace} firmwareNamespace [description]
     * @return {[null]}                   [description]
     */
    $scope.initModelFirmwarenamespace = function(myModel, firmwareNamespace){
        // get firmwares in model's firmware namespace
        AppUtils.doLoading();
        firmwareNamespace.refreshFirmwares().then(function(){

            $scope.firmwares = firmwareNamespace.getFirmwares();
            $scope.initFirmwares(myModel.getFirmwares(), $scope.firmwares);

            $scope.$apply();
            AppUtils.whenLoaded();
        }, function(){
            AppUtils.whenLoaded();
        });
    };

    /**
     * init firmwares when firmwares changed
     * @param  {[string]} myFirmwares [description]
     * @param  {[KiiPortalFirmwares]} firmwares   [description]
     * @return {[null]}             [description]
     */
    $scope.initFirmwares = function(myFirmwares, firmwares){
        _.each(firmwares, function(firmware){
            var selectedFirmware = _.find(myFirmwares, function(myFirmware){
                return firmware.getUUID() == myFirmware;
            });
            
            if(selectedFirmware){
                firmware._selected = true;
            }
            else{
                firmware._selected = false;
            }
        });
    };



    $scope.initModel = function(){
        $scope.myModel = _.find($scope.myModels, function(model){
            return model.getUUID() == $state.params['modelId'];
        });

        $scope.modelInfo.modelName = $scope.myModel.getName();
        $scope.modelInfo.imageUrl = $scope.myModel.getImageUrl();

        AppUtils.setLocalStorageItem(AppConfig.NavNames.MODEL_NAME, $scope.myModel.getName());


        $("#modelImage").unbind('change');
        $("#modelImage").change($scope.uploadImage);
    };

    
    /**
     * update model
     * @param  {[type]} modelInfo [description]
     * @return {[type]}           [description]
     */
    $scope.updateModel = function(modelInfo){
        $scope.myModel.setName(modelInfo.modelName);
        $scope.myModel.setFirmwareNamespace(modelInfo.selectedNamespace.getName() || '');
        if($scope.myModel.getFirmwareNamespace != modelInfo.selectedNamespace.getName()){
            $scope.myModel.setFirmwares([]);
        }

        var newFirmwareNamespace = modelInfo.selectedNamespace;

        AppUtils.doLoading();
        $scope.myModel.save().then(function(){
            $scope.initModelFirmwarenamespace($scope.myModel, newFirmwareNamespace);
            AppUtils.whenLoaded();
            $scope.initModel();
            $scope.$apply();
        }, function(){
            AppUtils.whenLoaded();
        });
    };

    
    /**
     * upload model image
     * @return {[type]} [description]
     */
    $scope.uploadImage = function(){
        AppUtils.doLoading();
        $scope.myModel.uploadImage($('#modelImage')[0].files[0]).then(function(){
            $scope.initModel();
            $scope.$apply();
            AppUtils.whenLoaded();
        },function(){
            AppUtils.whenLoaded();
        });
    };

    $scope.addFirmware = function(firmware){
        AppUtils.doLoading();
        $scope.myModel.addFirmware(firmware).then(function(){
            AppUtils.whenLoaded();
            $scope.initFirmwares($scope.myModel.getFirmwares(), $scope.firmwares);
            $scope.$apply();
        }, function(erro){
            console.log(erro);
            AppUtils.whenLoaded();
        });
    };

    $scope.removeFirmware = function(firmware){
        AppUtils.doLoading();
        $scope.myModel.deleteFirmware(firmware).then(function(){
            AppUtils.whenLoaded();
            $scope.initFirmwares($scope.myModel.getFirmwares(), $scope.firmwares);
            $scope.$apply();
        }, function(){
            AppUtils.whenLoaded();
        });
    };

    
  }]);
