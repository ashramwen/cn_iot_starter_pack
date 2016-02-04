'use strict';

angular.module('StarterPack.AppShared', ['ngAnimate', 'ngCookies', 'ngSanitize', 
    'ui.bootstrap', 'LocalStorageModule', 'awesome-context-menu'])
.config(function(localStorageServiceProvider) {
    localStorageServiceProvider
    .setPrefix("SPP")
    .setStorageType('localStorage')
    .setStorageCookie(30, '/')
    .setNotify(true, true);
});