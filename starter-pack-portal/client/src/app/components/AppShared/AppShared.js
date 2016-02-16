'use strict';

angular.module('StarterPack.AppShared', ['ngAnimate', 'ngCookies', 'ngSanitize', 
    'ui.bootstrap', 'LocalStorageModule', 'awesome-context-menu'])
.constant('AppConfig', {
    StoragePrefix: 'SSP',
    Tags:{
        APP: 'APP',
        FIRMWARE: 'FIRMWARE',
        MODEL: 'MODEL'
    },
    USER_SESSION: 'USER_SESSION',
    NavNames:{
        APP_NAME: 'APP_NAME',
        FIRMWARE_NAME: 'FIRMWARE_NAME',
        MODEL_NAME: 'MODEL_NAME'
    }
})
.config(function(localStorageServiceProvider, AppConfig) {
    localStorageServiceProvider
    .setPrefix(AppConfig.StoragePrefix)
    .setStorageType('localStorage')
    .setStorageCookie(30, '/')
    .setNotify(true, true);
});