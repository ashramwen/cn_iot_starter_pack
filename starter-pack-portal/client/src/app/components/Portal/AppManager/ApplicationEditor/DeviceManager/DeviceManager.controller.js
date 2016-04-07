'use strict';

angular.module('StarterPack.Portal.AppManager.DeviceManager')
  .controller('DeviceManagerController', ['$scope', '$rootScope', '$state', 'AppUtils', '$timeout', 'DeviceService', 'AppConfig', function($scope, $rootScope, $state, AppUtils, $timeout, DeviceService, AppConfig) {
    
    $scope.myDevices = [];
    $scope.deviceEdit = {};
    $scope.collapseIndex = -1;
    $scope.hideNewDevice = true;
    $scope.newDevice = {};
    $scope.searchParam = {};

    var jsonEditor = null;

    /**
     * thing search options
     * @type {Array}
     */
    $scope.searchOptions = [
        {type: 'string', text: '_vendorThingID', value: '_vendorThingID'},
        {type: 'string', text: '_thingID', value: '_thingID'},
        {type: 'boolean', text: '_disabled', value: '_disabled'},
        {type: 'string', text: '_vendor', value: '_vendor'},
        {type: 'boolean', text: '_created', value: '_created'},
        {type: 'string', text: '_lot', value: '_lot'},
        {type: 'string', text: '_productName', value: '_lot'},
        {type: 'string', text: '_firmwareVersion', value: '_firmwareVersion'},
        {type: 'string', text: '_stringField1', value: '_stringField1'},
        {type: 'float', text: '_numberField1', value: '_numberField1'},
        {type: 'string', text: '_stringField2', value: '_stringField2'},
        {type: 'float', text: '_numberField2', value: '_numberField2'},
        {type: 'string', text: '_stringField3', value: '_stringField3'},
        {type: 'float', text: '_numberField3', value: '_numberField3'},
        {type: 'string', text: '_stringField4', value: '_stringField4'},
        {type: 'float', text: '_numberField4', value: '_numberField4'},
        {type: 'string', text: '_stringField5', value: '_stringField5'},
        {type: 'float', text: '_numberField5', value: '_numberField5'}
    ];

    $scope.searchDevices = function(searchParam){

        var whereClauses = [],
            baseClause = KiiClause.and();

        if(searchParam){
            var fieldName = searchParam.field,
                fieldValue = searchParam.value;

            if(fieldName && fieldValue){
                var searchClause = KiiClause.equals(fieldName, fieldValue);
                whereClauses = [searchClause];
            }
        }

        whereClauses.push(KiiClause.notEquals('_stringField5', AppConfig.VIRTUAL_DEVICE));

        baseClause._setWhereClauses(whereClauses);
        AppUtils.doLoading();

        $scope.myApp.queryThings({}, baseClause, {limit: 5}).then(function(result){
            $scope.myDevices = result.things;
            $scope.nextQuery = result.query;

            $scope.$apply();

            AppUtils.whenLoaded();
        }, function(){
            AppUtils.whenLoaded();
        });
    };

    $scope.init = function(){
        $scope.$watch('appReady', function(ready){
            if(!ready) return;
            $scope.searchDevices();
        });
        activateJsonEditor();
    };

    function activateJsonEditor (){
        $timeout(function(){
            var options = {
                mode: 'code'
            };

            jsonEditor = $('#new-device').find('.json-editor')[0];
            jsonEditor = new JSONEditor(jsonEditor, options);
        });
    };

    /**
     * Add device button onclick
     */
    $scope.addDevice = function(){
        $scope.newDevice = new KiiThingAdmin({});
        $scope.hideNewDevice = false;
    };

    $scope.saveDevice = function(device){
        var myDevice = _.clone(device);
        $scope.customFields = jsonEditor.get();

        _.extend(device.fields, $scope.customFields);
        
        AppUtils.doLoading();
        KiiThingAdmin.prototype.save.apply(myDevice).then(function(device){

            AppUtils.whenLoaded();
            $scope.myDevices = $scope.myApp.getThings();
            $scope.hideNewDevice = true;
            $scope.$apply();
        }, function(response){
            AppUtils.whenLoaded();
            console.log(response);
            $scope.hideNewDevice = true;
            $scope.$apply();
        });
    };

    $scope.cancelNewDevice = function(){
        $scope.newDevice = {};
        $scope.hideNewDevice = true;
    };

    $scope.loadMore = function(){
        AppUtils.doLoading();
        $scope.myApp.nextThings(null, $scope.nextQuery).then(function(response){
            $scope.nextQuery = response.query;
            var devices = response.things;

            $scope.myDevices = $scope.myApp.getThings();

            $scope.$apply();
            AppUtils.whenLoaded();
        }, function(){
            AppUtils.whenLoaded();
        });
    };
  }])
  .directive('deviceDetail', ['AppUtils', '$timeout', 'DeviceService', function(AppUtils, $timeout, DeviceService){
    return {
        scope:{
            device: '=?',
            isCollapse: '=?'
        },
        replace: true,
        restrict: 'E',
        templateUrl: 'app/components/Portal/AppManager/ApplicationEditor/DeviceManager/DeviceDetailContent.template.html',
        link: function($scope, element, attr){
            var jsonEditor = null;

            $scope.init = function(){
                if($scope.isCollapse === undefined){
                    $scope.isCollapse = true;
                }

                $scope.customFields = DeviceService.getCustomFields($scope.device);

                activateJsonEditor($scope.device);
            };

            function activateJsonEditor (){
                $timeout(function(){
                    var options = {
                        mode: 'code'
                    };

                    jsonEditor = $(element).find('.json-editor')[0];
                    jsonEditor = new JSONEditor(jsonEditor, options);
                    jsonEditor.set($scope.customFields);
                });
            };

            /**
             * save device
             * @param  {[type]} device [description]
             * @return {[type]}        [description]
             */
            $scope.saveDevice = function (device){

                var myDevice = _.clone(device);
                $scope.customFields = jsonEditor.get();

                _.extend(device.fields, $scope.customFields);
                
                AppUtils.doLoading();
                KiiThingAdmin.prototype.save.apply(myDevice).then(function(response){
                    console.log(response);
                    AppUtils.whenLoaded();
                }, function(response){
                    AppUtils.whenLoaded();
                    console.log(response);
                });
            };

            $scope.deleteDevice = function(device){
                var title = 'Delete Thing',
                    message = 'Do you want to remove this device?',
                    func = function(){
                        device.remove().then(function(){
                            $scope.myDevices.remove(device);
                            $scope.$apply();
                        });
                    };

                AppUtils.confirm(title, message, func);
            };

            $scope.init();
        }
    };
  }]);
