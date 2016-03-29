'use strict';
// var KiiPackage = require('/bower_components/kii-storage/KiiSDK');
(function(){
    var root = ((typeof exports) !== "undefined") && (exports !== null) ? new Object() : window;

    //<!-- helper:js --><!-- injection:end -->

    /** Bucket Name constants.
     * Note: Buckets with following name here is initialized in creating application process.
     *      admin is not able to create bucket with following names.
     */
    root.KiiExtensionBuckets = {
        FIRMWARE: 'FIRMWARE_BUCKET',
        MODEL: 'MODEL_BUCKET',
        TAG: 'TAG_BUCKET',
        FIRMWARE_NAMESPACE: 'FIRMWARE_NAMESPACE'
    };

    /**
     * Reserved bucket name prefix array
     * Note: these bucket name prefix string are used in generating
     *      some buckets to store data of predefined structure,
     *      users are forbidden to create bucket with such prefix.
     *      eg. firmware bucket will be created by SDK with prefix '__FIRMWARE_'
     * @type {CONSTANTS}
     */
    root.ReservedBucketPrefix = {
        FIRMWARE: '__FIRMWARE_',
        MODEL: '__MODEL_',
        MODEL_UPDATE_INFO: '__MODEL_UPDATE_INFO_',
        TAG: '__TAG_'
    };

    /**
     * Kii portal extension SDK exceptions
     */
    root.KiiPortalExceptions = {
        UNSAVED_OBJECT:'The object has to be saved before using.'
    };

    /**
     * extension server url
     * @type {String}
     */
    root._extensionUrl = 'http://localhost:1337';

    root._extApis = {
        MODEL: '/models'
    };

    /**
     * api base path
     * @type {string}
     * @private
     */
    root._baseUrl = 'https://kii-yubari.herokuapp.com';
    root._apis = {
        AUTHENTIC: root._extensionUrl + '/login',
        APP: root._extensionUrl + '/apps',
        MODEL: root._extensionUrl + '/models'
    };

    /**
     * 
     */
    root.KiiPortalDevSettings = {
        log: true,
        debug: true,
    };

    /**
     * for developement
     */
    __extends(KiiSite, {
        DEV: 'https://api-development-jp.internal.kii.com/api',
        QA: 'https://qa21.internal.kii.com/api'
    });


    //<!-- base:js --><!-- injection:end -->

    //<!-- components:js --><!-- injection:end -->
})();