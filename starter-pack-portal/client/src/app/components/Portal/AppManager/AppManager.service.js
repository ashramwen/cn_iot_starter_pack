'use strict';

angular.module('StarterPack.Portal.AppManager').factory('AppManagerService', function () {

    var AppManagerService = {};

    /**
     * navigation settings
     * @type {Array}
     */
    AppManagerService.portalNavs = [
        {name: 'Dashboard', state: 'app.Portal.AppManager.ApplicationEditor.Dashboard', icon:'fa-dashboard'},
        {name: 'Users', state: 'app.Portal.AppManager.ApplicationEditor.UserManager', icon: 'fa-user'},
        {name: 'Groups', state: 'app.Portal.AppManager.ApplicationEditor.UserGroupManager', icon: 'fa-group'},
        {
            name: 'Model Management',
            state: 'app.Portal.AppManager.ApplicationEditor.ModelManager.ModelList', icon: 'fa-cube',
            subViews: [
                {name: 'Models', state: 'app.Portal.AppManager.ApplicationEditor.ModelManager.ModelList'}
            ]
        },
        {
            name: 'Firmware Management',
            state: 'app.Portal.AppManager.ApplicationEditor.FirmwareManager.FirmwareList', icon: 'fa-user',
            subViews: [
                {name:'Firmwares', state: 'app.Portal.AppManager.ApplicationEditor.FirmwareManager.FirmwareList'}
            ]
        },
        {name: 'Device Management', state: 'app.Portal.AppManager.ApplicationEditor.DeviceManager', icon: 'fa-desktop'},
        {name: 'Device Simulation', state: 'app.Portal.AppManager.ApplicationEditor.VirtualDevice', icon: 'fa-gamepad'},
        {name: 'Settings', state: 'app.Portal.AppManager.ApplicationEditor.Settings', icon: 'fa-cogs'},
    ];

    return AppManagerService;
});