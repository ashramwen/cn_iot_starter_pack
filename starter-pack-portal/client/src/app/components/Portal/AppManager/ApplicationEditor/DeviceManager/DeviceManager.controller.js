'use strict';

angular.module('StarterPack.Portal.AppManager.DeviceManager')
  .controller('DeviceManagerController', ['$scope', '$rootScope', '$state', 'AppUtils', '$timeout', function($scope, $rootScope, $state, AppUtils, $timeout) {
    
    $scope.myDevices = [];
    $scope.deviceEdit = {};
    $scope.collapseIndex = -1;

    $scope.init = function(){
        $scope.$watch('appReady', function(ready){
            if(!ready) return;
            AppUtils.doLoading();
            $scope.myApp.queryThings({}, null, {limit: 5}).then(function(result){

                $scope.myDevices = result.things;
                $scope.nextQuery = result.query;

                $scope.initDevices($scope.myDevices);

                $scope.$apply();

                AppUtils.whenLoaded();
            }, function(error){
                console.log(error);
                AppUtils.whenLoaded();
            });;
        });
    };

    $scope.initDevices = function(devices){
        _.each(devices, function(thing){
            thing.customFieldEditor = {
                customFields:{},
                options: {
                    mode: 'code'
                }
            };
        });
    };

    $scope.getCustomFields = function(device){
        var existingKeys = [
            '_globalThingID', '_vendorThingID', '_vendor', '_disabled', '_created',
            '_lot', '_productName', '_thingID', '_firmwareVersion', '_thingType', 

            '_stringField1', '_numberField1', '_stringField2', '_numberField2',
            '_stringField3', '_numberField3', '_stringField4', '_numberField4',
            '_stringField5', '_numberField5', '_accessToken', 'fields', 
            

            '_onEdit', 'customFieldEditor', '$$hashKey'
        ];

        device.customFieldEditor.customFields = {};

        _.each(device.fields, function(value, key){
            if(existingKeys.indexOf(key) == -1 && !_.isFunction(value)){
                device.customFieldEditor.customFields[key] = value;
            }
        });

        $timeout(function(){
            device._customActive = true;
        });
    };

    $scope.updateDevice = function(device){

        AppUtils.doLoading();

        var myDevice = _.clone(device);

        _.extend(device.fields, device.customFieldEditor.customFields);
        

        KiiThingAdmin.prototype.save.apply(myDevice).then(function(response){

            console.log(response);
            AppUtils.whenLoaded();
        }, function(response){

            AppUtils.whenLoaded();
            console.log(response);
        });
    };

    $scope.loadMore = function(){
        AppUtils.doLoading();
        $scope.myApp.nextThings(null, $scope.nextQuery).then(function(response){
            $scope.nextQuery = response.query;
            var devices = response.things;
            $scope.initDevices(devices);

            $scope.myDevices = $scope.myApp.getThings();

            $scope.$apply();
            AppUtils.whenLoaded();
        }, function(){
            AppUtils.whenLoaded();
        });
    }


  }]);
