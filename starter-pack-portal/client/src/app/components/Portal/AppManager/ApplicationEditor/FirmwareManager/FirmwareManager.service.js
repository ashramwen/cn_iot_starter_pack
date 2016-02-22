'use strict';

angular.module('StarterPack.Portal.AppManager.FirmwareManager')
  .factory('FirmwareService', [function(){
    var FirmwareService = {};

    FirmwareService.createFirmwareNamespace = function(myapp, firmwareNamespaceBO){
        var firmwareNamespace = myapp.createFirmwareNamespace();
        firmwareNamespace.setName(firmwareNamespaceBO.firmwareNamespaceName);

        return firmwareNamespace.save();
    };

    FirmwareService.createFirmware = function(firmwareNamespace, firmwareBO){
        var firmware = firmwareNamespace.createFirmware();
        firmware.setName(firmwareBO.firmwareName);
        firmware.setDescription(firmwareBO.description);

        return firmware.save();
    };

    FirmwareService.saveFirmware = function(firmware, firmwareBO){
        firmware.setName(firmwareBO.firmwareName);
        firmware.setDescription(firmwareBO.description);
        return firmware.save();
    };

    FirmwareService.uploadFirmwareFile = function(firmware, file){
        return firmware.uploadFirmwareFile(file);
    };

    return FirmwareService;
  }]);