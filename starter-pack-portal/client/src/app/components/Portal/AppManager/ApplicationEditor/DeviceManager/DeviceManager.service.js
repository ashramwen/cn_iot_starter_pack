angular.module('StarterPack.Portal.AppManager.DeviceManager')
  .factory('DeviceService', [function(){

    var DeviceService = {};

    DeviceService.getCustomFields = function(device){

        var existingKeys = [
            '_globalThingID', '_vendorThingID', '_vendor', '_disabled', '_created',
            '_lot', '_productName', '_thingID', '_firmwareVersion', '_thingType', 

            '_stringField1', '_numberField1', '_stringField2', '_numberField2',
            '_stringField3', '_numberField3', '_stringField4', '_numberField4',
            '_stringField5', '_numberField5', '_accessToken', 'fields', 
            

            '_onEdit', 'customFieldEditor', '$$hashKey'
        ];

        var customFields = {};

        _.each(device.fields, function(value, key){
            if(existingKeys.indexOf(key) == -1 && !_.isFunction(value)){
                customFields[key] = value;
            }
        });

        return customFields;
    };

    return DeviceService;
  }]);