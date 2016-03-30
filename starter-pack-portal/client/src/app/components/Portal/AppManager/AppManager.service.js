'use strict';

angular.module('StarterPack.Portal.AppManager').factory('AppManagerService', function ($state) {

    var AppManagerService = {};

    /**
     * navigation settings
     * @type {Array}
     */
    AppManagerService.portalNavs = [
        {name: 'Dashboard', state: $state.get('app.Portal.AppManager.ApplicationEditor.Dashboard'), icon:'fa-dashboard'},
        {name: 'Users', state: $state.get('app.Portal.AppManager.ApplicationEditor.UserManager'), icon: 'fa-user'},
        {name: 'Groups', state: $state.get('app.Portal.AppManager.ApplicationEditor.UserGroupManager'), icon: 'fa-group', hidden: true},
        {
            name: 'Model Management',
            state: $state.get('app.Portal.AppManager.ApplicationEditor.ModelManager'), icon: 'fa-cube',
            subViews: [
                {name: 'Models', state: $state.get('app.Portal.AppManager.ApplicationEditor.ModelManager.ModelList')}
            ]
        },
        {
            name: 'Firmware Management',
            state: $state.get('app.Portal.AppManager.ApplicationEditor.FirmwareManager'), icon: 'fa-user',
            subViews: [
                {name:'Firmwares', state: $state.get('app.Portal.AppManager.ApplicationEditor.FirmwareManager.FirmwareNamespaceList')}
            ]
        },
        {name: 'Device Management', state: $state.get('app.Portal.AppManager.ApplicationEditor.DeviceManager'), icon: 'fa-desktop'},
        {name: 'Device Simulation', state: $state.get('app.Portal.AppManager.ApplicationEditor.VirtualDevice'), icon: 'fa-gamepad'},
        {name: 'Settings', state: $state.get('app.Portal.AppManager.ApplicationEditor.Settings'), icon: 'fa-cogs'},
    ];

    return AppManagerService;
});