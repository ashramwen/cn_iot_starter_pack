'use strict';

angular.module('StarterPack.Portal')
  .factory('PortalService', ['AppUtils',function(AppUtils) {

    var PortalService = {};
    PortalService.portalNavs = [
        {name: 'Dashboard', state: 'app.Portal.Dashboard', icon:'fa-dashboard'},
        {name: 'User Management', state: 'app.Portal.UserManager', icon: 'fa-user'},
        {name: 'User Groups', state: 'app.Portal.UserGroupManager', icon: 'fa-group'},
        {
            name: 'Model Management', state: 'app.Portal.ModelManager.ModelList', icon: 'fa-cube',
            subViews: [
                {name: 'Models', state: 'app.Portal.ModelManager.ModelList'},
                {name: 'Models', state: 'app.Portal.ModelManager.ModelInfo', hidden: true}
            ]
        },
        {
            name: 'Firmware Management', state: 'app.Portal.FirmwareManager.FirmwareList', icon: 'fa-user',
            subViews: [
                {name: 'Models', state: 'app.Portal.FirmwareManager.FirmwareList'},
                {name: 'Models', state: 'app.Portal.FirmwareManager.FirmwareInfo', hidden: true}
            ]
        },
        {name: 'Device Management', state: 'app.Portal.DeviceManager', icon: 'fa-desktop'},
        {name: 'Device Simulation', state: 'app.Portal.VirtualDevice', icon: 'fa-gamepad'},
        {name: 'Settings', state: 'app.Portal.Settings', icon: 'fa-cogs'},
    ];

    PortalService.allNavs = [];

    function getSubNavs(nav, navArr){
        navArr.concat(getSubNavs(nav));
        
    }

    _.each(PortalService.portalNavs, function(){

    });
  }]);
