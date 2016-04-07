'use strict';
// var KiiPackage = require('/bower_components/kii-storage/KiiSDK');
(function(){
    var root = ((typeof exports) !== "undefined") && (exports !== null) ? new Object() : window;

    
    /**
     * constants
     */
    var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;


    // Added to SDK by build script.
    // Object.keys() is defined in Javascript 1.8.5
    // This code will be used when the environment doen't support Object.keys()
    // For details refer to:
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys
    if (!Object.keys) {
        Object.keys = (function () {
            var hasOwnProperty = Object.prototype.hasOwnProperty,
                hasDontEnumBug = !({toString: null}).propertyIsEnumerable('toString'),
                dontEnums = [
                    'toString',
                    'toLocaleString',
                    'valueOf',
                    'hasOwnProperty',
                    'isPrototypeOf',
                    'propertyIsEnumerable',
                    'constructor'
                ],
                dontEnumsLength = dontEnums.length;

            return function (obj) {
                if (typeof obj !== 'object' && typeof obj !== 'function' || obj === null) throw new TypeError('Object.keys called on non-object')

                var result = []

                for (var prop in obj) {
                    if (hasOwnProperty.call(obj, prop)) result.push(prop)
                }

                if (hasDontEnumBug) {
                    for (var i=0; i < dontEnumsLength; i++) {
                        if (hasOwnProperty.call(obj, dontEnums[i])) result.push(dontEnums[i])
                    }
                }
                return result
            }
        })();
    }
    var __bind, __hasProp, __extends, __cast, __isFunction, __each,__remove, __optimizeCb, __clone, __isArray,
        __isArrayLike, __inherits, __ajax, __nativeKeys, __keys, __isObject, __has, __bindMethod,
        __hasOwnProperty, __hasEnumBug;

    __hasEnumBug = !{toString: null}.propertyIsEnumerable('toString');
    __hasOwnProperty =  Object.prototype.hasOwnProperty;
    __has = function(obj, key) { return obj != null && __hasOwnProperty.call(obj, key); };
    __nativeKeys = Object.keys;
    __isArrayLike = function(collection) {
        var length = collection.length;
        return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
    };
    __optimizeCb = function(func, context, argCount) {
        if (context === void 0) return func;
        switch (argCount == null ? 3 : argCount) {
            case 1: return function(value) {
                return func.call(context, value);
            };
            case 2: return function(value, other) {
                return func.call(context, value, other);
            };
            case 3: return function(value, index, collection) {
                return func.call(context, value, index, collection);
            };
            case 4: return function(accumulator, value, index, collection) {
                return func.call(context, accumulator, value, index, collection);
            };
        }
        return function() {
            return func.apply(context, arguments);
        };
    };

    __clone = function(obj) {
        if (null == obj || "object" != typeof obj) return obj;
        var copy = new obj.constructor;
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
        }
        return copy;
    };

    __bind = function(fn, me){ return function(){
        return fn.apply(me, arguments);
    }; };
    __keys = function(obj) {
        if (!__isObject(obj)) return [];
        if (__nativeKeys) return __nativeKeys(obj);
        var keys = [];
        for (var key in obj) if (_.has(obj, key)) keys.push(key);
        // Ahem, IE < 9.
        if (hasEnumBug) collectNonEnumProps(obj, keys);
        return keys;
    };
    __isObject = function(obj) {
        var type = typeof obj;
        return type === 'function' || type === 'object' && !!obj;
    };
    __extends = function(child, parent) { for (var key in parent) { if (__hasOwnProperty.call(parent, key)) child[key] = parent[key]; }function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };
    __each =  function(obj, iteratee, context) {
        iteratee = __optimizeCb(iteratee, context);
        var i, length;
        if (__isArrayLike(obj)) {
            for (i = 0, length = obj.length; i < length; i++) {
                iteratee(obj[i], i, obj);
            }
        } else {
            var keys = __keys(obj);
            for (i = 0, length = keys.length; i < length; i++) {
                iteratee(obj[keys[i]], keys[i], obj);
            }
        }
        return obj;
    };
    __isFunction = function(value){return typeof value == 'function'};/**@license MIT-promiscuous library-©2013 Ruben Verborgh*/
    if(typeof Promise === 'undefined') {
        /**@license MIT-promiscuous-©Ruben Verborgh*/
        !function(n,t){function c(n,t){return(typeof t)[0]==n}function u(i,o){return o=function f(e,h,l,a,s,p){function y(n){return function(t){s&&(s=0,f(c,n,t))}}if(a=f.q,e!=c)return u(function(n,t){a.push({p:this,r:n,j:t,1:e,0:h})});if(l&&c(n,l)|c(t,l))try{s=l.then}catch(j){h=0,l=j}if(c(n,s))try{s.call(l,y(1),h=y(0))}catch(j){h(j)}else for(o=function(t,o){return c(n,t=h?t:o)?u(function(n,c){r(this,n,c,l,t)}):i},p=0;p<a.length;)s=a[p++],c(n,e=s[h])?r(s.p,s.r,s.j,l,e):(h?s.r:s.j)(l)},o.q=[],i.call(i={then:function(n,t){return o(n,t)},"catch":function(n){return o(0,n)}},function(n){o(c,1,n)},function(n){o(c,0,n)}),i}function r(u,r,i,o,f){setTimeout(function(){try{o=f(o),f=o&&c(t,o)|c(n,o)&&o.then,c(n,f)?o==u?i(TypeError()):f.call(o,r,i):r(o)}catch(e){i(e)}})}function i(n){return u(function(t){t(n)})}Promise=u,u.resolve=i,u.reject=function(n){return u(function(t,c){c(n)})},u.all=function(n){return u(function(t,c,u,r){r=[],u=n.length||t(r),n.map(function(n,o){i(n).then(function(n){r[o]=n,--u||t(r)},c)})})}}("f","o");
    }

    __isArray = function(obj) {
        return toString.call(obj) === '[object Array]';
    };

    __remove = function(arr, obj){
        __each(arr, function(child, index){
            if(child == obj){
                arr.splice(index, 1);
            }
        });
    };

    __cast = function(child, parent){
        __each(parent, function(value, key){
            if(!__isFunction(value)){
                child[key] = value;
            }
        });
    };

    __inherits = function (child, parent) {
        var keys = Object.keys(parent.prototype);
        __each(keys, function(key){
            child.prototype[key] = parent.prototype[key];
        });
        keys = Object.keys(parent);
        __each(keys, function(key){
            child[key] = parent[key];
            if(__isFunction(child[key])){
                child[key] = __bind(child[key], child);
            }
        });
    };

    __bindMethod = (function(){
        var noEnumMethod = ['valueOf', 'isPrototypeOf', 'toString', 'constructor',
            'propertyIsEnumerable', 'hasOwnProperty', 'toLocaleString'];

        function __bindMethod(child){
            __each(child.constructor.prototype, function(value, key){
                if(noEnumMethod.indexOf(key)==-1 && __isFunction(value))
                    child[key] = __bind(value, child);
            });
        }

        return __bindMethod;
    })();




    __ajax = function(settings){
        return new Promise(function (resolve, reject) {
            var method, url, data, success, failure, params, headers;

            method = settings.method.toUpperCase();
            url = settings.url;
            params = settings.params;
            data = JSON.stringify(settings.data);
            headers = settings.headers;
            success = settings.success;
            failure = settings.failure;

            if (method == "POST" && params) {
                data = new FormData();
                for (var key in params) {
                    data.append(key, params[key]);
                }
            }


            var xmlhttp = new XMLHttpRequest();
            xmlhttp.open(method, url);

            if(!headers || !headers['Content-Type'])
                xmlhttp.setRequestHeader("Content-type", "application/json");
            if(headers){
                __each(headers, function(value, key){
                    xmlhttp.setRequestHeader(key, value);
                });
            }

            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == XMLHttpRequest.DONE) {
                    if (xmlhttp.status >= 200 && xmlhttp.status < 400) {
                        var response, status, data;

                        status = xmlhttp.statusText;
                        if(xmlhttp.status !== 204) {
                            try{
                                data = JSON.parse(xmlhttp.responseText);
                            }catch(e){
                                console.log(e);
                                reject(e);
                                return;
                            }
                        }
                        response = {status: status, data: data, code: xmlhttp.status};
                        if (success) {
                            success(response);
                        }
                        resolve(response);
                    } else {
                        var response, status, data;

                        status = xmlhttp.statusText;
                        try{
                            data = JSON.parse(xmlhttp.responseText);
                        }catch(e){
                            data = {};
                            console.log(e);
                        }
                        
                        response = {status: status, data: data, code: xmlhttp.status};
                        if (failure) {
                            failure(response);
                        }
                        reject(response);
                    }
                }
            };
            xmlhttp.send(data);
        });
    };


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


        /**
     * class KiiLogger
     */
    root.KiiLogger = (function(){
        function KiiLogger(){

        }

        KiiLogger.log = function(e){
            if(KiiPortalDevSettings.log){
                console.log(e);
            }
        }

        KiiLogger.debug = function(e){
            if(KiiPortalDevSettings.debug){
                console.log(e);
            }
        };


        return KiiLogger;
    })();

        

    root.KiiObjectRequest = (function(){
        function KiiObjectRequest(kiiApp, spec){
            this._appID = kiiApp.getAppID();
            this._appKey = kiiApp.getAppKey();
            this._token = kiiApp.getAdminContext()._token;
            this._url = spec.url;
            this._data = spec.data;
            this._method = spec.method;
            this._headers = {};
            this._extHeaders = spec.headers;
        }


        KiiObjectRequest.prototype.getAppID = function(){
            return this._appID;
        };

        KiiObjectRequest.prototype.getAppKey = function(){
            return this._appKey;
        };

        KiiObjectRequest.prototype.getToken = function(){
            return 'Bearer ' + this._token;
        };

        KiiObjectRequest.prototype.execute = function(callbacks){
            this.setKiiHeaders();
            this._disableCacheURL();

            var settings = {
                headers: this._headers,
                method: this._method,
                data: this._data,
                url: this._url
            };

            callbacks = callbacks || {};
            settings.success = callbacks.success;
            settings.failure = callbacks.failure;

            return __ajax(settings);
        };

        KiiObjectRequest.prototype._disableCacheURL = function(){
            if (this._url.indexOf('?') !== -1) {
                this._url += "&disable_cache=";
            } else {
                this._url += "?disable_cache=";
            }
            this._url += new Date().getTime();
        };

        KiiObjectRequest.prototype.setKiiHeaders = function() {
            this._headers = {
                "x-kii-appid": this.getAppID(),
                "x-kii-appkey": this.getAppKey(),
                "x-kii-sdk": KiiSDKClientInfo.getSDKClientInfo(),
                "Authorization": this.getToken()
            };
            __extends(this._headers, this._extHeaders);
        };

        return KiiObjectRequest;
    })();




    /**
     * class KiiPortalExceptions
     */
    root.KiiPortalException = (function () {
        function KiiPortalException(e){
            __extends(this, e);
        }

        return KiiPortalException;
    })();

    /**
     * abstract class
     */
    root.KiiPortalObject = function(KiiObject, KiiObjectAdmin){
        var _super;

        _super = KiiObjectAdmin;

        KiiPortalObject.prototype = new _super();

        __inherits(KiiPortalObject, KiiObject);
        __inherits(KiiPortalObject, KiiObjectAdmin);

        KiiPortalObject.prototype.constructor = KiiPortalObject;

        function KiiPortalObject(){
            var _this = this;
            this._kiiApp = null;
        }

        /**
         * kiiApp getter setter
         */
        KiiPortalObject.prototype.getKiiApp = function() {
            return this._kiiApp;
        };
        KiiPortalObject.prototype.setKiiApp = function(kiiApp) {
            this._kiiApp = kiiApp;
        };

        KiiPortalObject.prototype._getBucketName = function(){
            return this.constructor._getBucketName();
        };

        KiiPortalObject.prototype._getUriByID = function(id){
            return 'kiicloud://buckets/' + this.constructor._getBucketName() + '/objects/' + id;
        };

        /**
         * @abstract
         * @private
         */
        KiiPortalObject.prototype.init = function(){
            //TODO
        };

        KiiPortalObject.prototype.renew = function(kiiObject){
            return this._renew(kiiObject);
        };

        KiiPortalObject.prototype._renew = function(kiiObject){
            __cast(this, kiiObject);
            this.init();
        };

        KiiPortalObject.prototype._cast = function(kiiObject){
            var portalObject = this.constructor.factory(this.getKiiApp());
            __cast(portalObject, kiiObject);
            __cast(this, portalObject);
            this.init();
        };

        KiiPortalObject.prototype.enableRead = function(callbacks){
            var _this = this;
            return new Promise(function(resolve, reject){
                var acl = _this._generateACL(new KiiAnyAuthenticatedUser(), KiiACLAction.KiiACLObjectActionRead);

                // Save the ACL to the server
                acl.save({
                    success: function() {
                        if(callbacks && callbacks.success){
                            callbacks.success();
                        }
                        resolve();
                        console.log("Object ACL updated!");
                    },
                    failure: function(theObject, errorString) {
                        if(callbacks && callbacks.failure()){
                            callbacks.failure();
                        }
                        reject();
                        console.log("Error updating object ACL: " + errorString);
                    }
                });
            });
        };

        KiiPortalObject.prototype.disableRead = function(callbacks){
            var _this = this;
            return new Promise(function(resolve, reject){

                var acl = _this._generateACL(new KiiAnyAuthenticatedUser(), KiiACLAction.KiiACLObjectActionRead, true);

                // Save the ACL to the server
                acl.save({
                    success: function() {
                        if(callbacks && callbacks.success){
                            callbacks.success();
                        }
                        resolve();
                        console.log("Object ACL updated!");
                    },
                    failure: function(theObject, errorString) {
                        if(callbacks && callbacks.failure()){
                            callbacks.failure();
                        }
                        reject();
                        console.log("Error updating object ACL: " + errorString);
                    }
                });
            });
        };



        KiiPortalObject.prototype.enableWrite = function(callbacks){
            var _this = this;
            return new Promise(function(resolve, reject){
                var acl = _this._generateACL(new KiiAnyAuthenticatedUser(), KiiACLAction.KiiACLObjectActionWrite);
                // Save the ACL to the server
                acl.save({
                    success: function() {
                        if(callbacks && callbacks.success){
                            callbacks.success();
                        }
                        resolve();
                        console.log("Object ACL updated!");
                    },
                    failure: function(theObject, errorString) {
                        if(callbacks && callbacks.failure()){
                            callbacks.failure();
                        }
                        reject();
                        console.log("Error updating object ACL: " + errorString);
                    }
                });
            });
        };

        KiiPortalObject.prototype.disableWrite = function(callbacks){
            var _this = this;
            return new Promise(function(resolve, reject){
                var acl = _this._generateACL(new KiiAnyAuthenticatedUser(), KiiACLAction.KiiACLObjectActionWrite, true);

                // Save the ACL to the server
                acl.save({
                    success: function() {
                        if(callbacks && callbacks.success){
                            callbacks.success();
                        }
                        resolve();
                        console.log("Object ACL updated!");
                    },
                    failure: function(theObject, errorString) {
                        if(callbacks && callbacks.failure()){
                            callbacks.failure();
                        }
                        reject();
                        console.log("Error updating object ACL: " + errorString);
                    }
                });
            });
        };

        /**
         * generate ACL of object
         * @param UserType
         * @param action
         * @param add
         * @returns {*}
         * @private
         */
        KiiPortalObject.prototype._generateACL = function(UserType, action, remove){
            var entry = KiiACLEntry.entryWithSubject(UserType, action);

            if(remove){
                entry.setGrant(false);
            }

            // Get the ACL handle and put the rule in the handle
            var acl = this.objectACL();
            acl.putACLEntry(entry);

            return acl;
        };

        KiiPortalObject.prototype.refresh = function(callbacks){
            return this._refresh(callbacks);
        }


        KiiPortalObject.prototype._refresh = function(callbacks){
            var _this = this;

            return new Promise(function( resolve, reject){
                var refreshCallbacks;
                refreshCallbacks = {
                    success: function(kiiObject){

                        _this._cast(kiiObject);
                        if(callbacks && callbacks.success){
                            callbacks.success(_this);
                        }
                        resolve(_this);
                    },
                    failure: function(response){
                        if(callbacks && callbacks.failure){
                            callbacks.failure(response);
                        }
                        reject(response);
                    }
                };
                _super.prototype.refresh.call(_this, refreshCallbacks);
            });
        };


        KiiPortalObject.refreshByID = function (kiiApp, id, callbacks){
            return this.constructor._refreshByID(kiiApp, id, callbacks);
        };

        KiiPortalObject._refreshByID = function(kiiApp, id, callbacks){
            var _this = this;
            return new Promise(function(resolve, reject){
                var refreshCallbacks = {
                    success: function(obj){
                        var portalObject = _this.factory(app);
                        portalObject._cast(obj);

                        if(callbacks && callbacks.success){
                            callbacks.success(portalObject);
                        }
                        resolve(portalObject);
                    },
                    failure: function(response){
                        if(callbacks && callbacks.failure){
                            callbacks.failure(response);
                        }
                        reject(response);
                    }
                };

                _this.objectWithID(kiiApp, id)
                    .then(refreshCallbacks.success, refreshCallbacks.failure);
            });
        };

        /**
         * create or update Object
         * @param callbacks
         * @returns {*}
         */
        KiiPortalObject.prototype.save = function(callbacks){
            return this._save(callbacks);
        };

        /**
         * create or update Object
         * @param callbacks
         * @returns {Promise|*}
         */
        KiiPortalObject.prototype._save = function (callbacks) {
            var _this = this;

            return new Promise(function(resolve, reject){
                var saveCallbacks = {
                    success: function(obj){
                        _this._cast(obj);
                        if(callbacks && callbacks.success){
                            callbacks.success(_this);
                        }
                        resolve(_this);
                    },
                    failure: function(response){
                        if(callbacks && callbacks.failure){
                            callbacks.failure(response);
                        }
                        reject(response);
                    }
                };
                _super.prototype.save.call(_this, saveCallbacks);
            });
        };

        /**
         * delete firmware
         * @param callbacks
         * @returns {Promise|*}
         */
        KiiPortalObject.prototype.delete = function (callbacks) {
            return this._delete(callbacks);
        };

        /**
         * delete firmware
         * @param callbacks
         * @returns {Promise|*}
         */
        KiiPortalObject.prototype._delete = function (callbacks) {
            var _this = this;
            return new Promise(function(resolve, reject){
                var deleteCallbacks = {
                    success: function(){
                        if(callbacks && callbacks.success){
                            callbacks.success(_this);
                        }
                        resolve(_this);
                    },
                    failure: function(response){
                        reject(response);
                    }
                };

                _super.prototype.delete.call(_this, deleteCallbacks);
            });
        };

        /**
         * static, abstract
         * @type {null}
         * @private
         */
        KiiPortalObject._bucketName = null;

        /**
         * get bucket name of this class of object
         * @returns {String}
         * @private
         */
        KiiPortalObject._getBucketName = function(){
            return this._bucketName;
        };

        KiiPortalObject.prototype.clone = function(){
            var _this = this;
            var obj = this.constructor.factory(this.getKiiApp());
            __each(this, function(value, key){
                if(!__isFunction(value))
                    obj[key] = _this[key];
            });
            return obj;
        };

        KiiPortalObject.factory = function(kiiApp){
            return this._factory(kiiApp);
        };

        /**
         * {this} refers to constructor function
         * @param kiiApp
         * @returns {root.KiiPortalObject|*}
         * @private
         */
        KiiPortalObject._factory = function(kiiApp){
            var adminContext, bucket, kiiObject, portalObject, bucketName;

            bucketName = this._getBucketName();
            adminContext = kiiApp.getAdminContext();
            bucket = adminContext.bucketWithName(bucketName);

            portalObject = new this();
            kiiObject = bucket.createObject();
            portalObject._renew(kiiObject);

            portalObject._setObjectType(null);
            portalObject.setKiiApp(kiiApp);

            return portalObject;
        };

        /**
         *
         * @param kiiApp
         * @param bucketName
         * @param id
         * @returns {*|u}
         */
        KiiPortalObject.objectWithID = function(kiiApp, id){
            var _this = this;
            return new Promise(function(resolve, reject){
                var findCallbacks, portalObject, kiiObject;
                findCallbacks = {
                    success: function(kiiObject){
                        portalObject._renew(kiiObject);
                        resolve(portalObject);
                    },
                    failure: function(response){
                        reject(response);
                    }
                };

                portalObject = _this.factory(kiiApp);
                kiiObject = _super.objectWithURI(portalObject._getUriByID(id));
                kiiObject.refresh(findCallbacks);
            });
        };

        /**
         * query kii portal objects by given query
         * @param kiiApp
         * @param query
         * @param callbacks
         * @returns {*|u}
         */
        KiiPortalObject.executeQuery = function(kiiApp, query, callbacks){
            var _this = this;
            return new Promise(function(resolve, reject){
                var executeCallbacks, bucket;

                bucket = kiiApp.getAdminContext().bucketWithName(_this._getBucketName());

                executeCallbacks = {
                    success: function(query, objects, nextQuery) {
                        __each(objects, function (object, index) {
                            var tmpObj = _this.factory(kiiApp);
                            tmpObj._cast(object);
                            objects[index] = tmpObj;
                        });

                        if (callbacks) {
                            callbacks.success.call(callbacks, query ,objects, nextQuery);
                        }
                        resolve(query ,objects, nextQuery);
                    },
                    failure: function(error) {
                        if (callbacks != null && callbacks.failure) {
                            return callbacks.failure(query ,error);
                        }
                        reject(query, error);
                    }
                };

                bucket.executeQuery(query, executeCallbacks);
            });
        };

        return KiiPortalObject;
    }(KiiObject, KiiObjectAdmin);    
    /**
     * Portal Query
     */
    root.KiiPortalQuery = (function(KiiQuery){
        var _super = KiiQuery;

        __inherits(KiiPortalQuery, _super);

        KiiPortalQuery.prototype.constructor = KiiPortalQuery;

        function KiiPortalQuery(query){
            var _this = this;
        };

        KiiPortalQuery.prototype._dictValue = function() {
            var portalQuery, data;

            data = {};
            data.bestEffortLimit = this._limit;
            if (this._paginationKey != null) {
                data.paginationKey = this._paginationKey;
            }

            portalQuery = {
                descending: this._sortDescending
            };
            if (this._clause != null) {
                portalQuery.clause = this._clause._getDictValue();
            } else {
                portalQuery.clause = this.constructor._emptyDictValue();
            }
            if (this._sortField != null) {
                portalQuery.orderBy = this._sortField;
            }
            data[this.constructor.queryName] = portalQuery;
            return data;
        };

        KiiPortalQuery.queryWithClause = function(clause) {
            var query;
            query = new this;
            query._setClause(clause);
            return query;
        };

        KiiPortalQuery.prototype.setDict = function(dictVal){
            if(dictVal){
                if(dictVal.limit){
                    this.setLimit(dictVal.limit);
                }

                if(dictVal.paginationKey){
                    this.setPaginationKey(dictVal.paginationKey);
                }

                if(dictVal.orderBy){
                    if(dictVal.desc){
                        this.sortByDesc(dictVal.orderBy);
                    }else {
                        this.sortByAsc(dictVal.orderBy);
                    }
                }
            }
        };

        
        /**
         * abstract
         * @param  {[type]} kiiApp [description]
         * @param  {[type]} spec   [description]
         * @return {[type]}        [description]
         */
        KiiPortalQuery._getRequest = function(kiiApp, spec) {

            spec.headers = spec.headers || {};

            return new KiiObjectRequest(kiiApp, spec);
        };

        /**
         * abstract
         * @param  {[type]} kiiApp [description]
         * @return {[type]}        [description]
         */
        KiiPortalQuery._generatePath = function(kiiApp){
            return kiiApp.getSiteURL()+ '/apps/' + kiiApp.getAppID();
        };

        /**
         * abstract
         * @return {[type]} [description]
         */
        KiiPortalQuery._instantiate = function(){
            // Empty
        };

        /**
         * [executeQuery description]
         * @param  {[type]} kiiApp    [description]
         * @param  {[type]} query     [description]
         * @param  {[type]} callbacks [description]
         * @return {[type]}           [description]
         */
        KiiPortalQuery.executeQuery = function(kiiApp, query, callbacks){
            var _this = this;
            return new Promise(function(resolve, reject){
                var data, executeCallbacks, path, spec, request;
                path = _this._generatePath(kiiApp) + "/query";
                data = {};

                if (query != null) {
                    data = query._dictValue();
                } else {
                    data[_this.queryName] = {
                        "clause": KiiQuery._emptyDictValue()
                    };
                }

                spec = {
                    data: data,
                    url: path,
                    method: 'POST'
                };

                request = _this._getRequest(kiiApp, spec);

                executeCallbacks = {
                    success: function(response) {
                        var result, resultSet, _i, _len, _ref;
                        query.setPaginationKey(response.data.nextPaginationKey);

                        resultSet = [];
                        _ref = response.data.results;
                        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                            result = _ref[_i];
                            resultSet.push(_this._instantiate(result));
                        }

                        if (callbacks != null && callbacks.success) {
                            callbacks.success(query, resultSet);
                        }
                        resolve({nextQuery:query ,resultSet: resultSet});
                    },
                    failure: function(error) {
                        if (callbacks != null && callbacks.failure) {
                            callbacks.failure(error);
                        }
                        reject({query:query, error:error});
                    }
                };

                request.execute(executeCallbacks);
            });
        };

        return KiiPortalQuery;
    })(KiiQuery);
    
    root.KiiPortalRequest = (function(){

        function KiiPortalRequest(spec, kiiApp){
            if(kiiApp){
                spec.headers = spec.headers || {};
                spec.headers['x-app-id'] = kiiApp.getAppID();
                spec.headers['x-app-key'] = kiiApp.getAppKey();
                spec.headers['Authorization'] = kiiApp.getAdmin().getTokenType() + ' ' + kiiApp.getAdminContext()._token;
                spec.headers['x-app-site'] = kiiApp.getSite();
            }
            return __ajax(spec);
        }
        
        return KiiPortalRequest;
    })();root.KiiPortalUtilities = (function() {
  function KiiPortalUtilities() {}

  KiiPortalUtilities.MAX_DATE_IN_MILLIS = 100000000 * 24 * 60 * 60 * 1000;

  KiiPortalUtilities.MIN_DATE_IN_MILLIS = -100000000 * 24 * 60 * 60 * 1000;

  KiiPortalUtilities._validateEmail = function(value) {
    var pattern;
    value = KiiPortalUtilities._trim(value);
    pattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,6}$/i;
    if ((typeof value).toLowerCase() !== "string") {
      root.Kii.logger("Not string");
      return false;
    } else if (value.match(pattern)) {
      return true;
    } else {
      return false;
    }
  };

  KiiPortalUtilities._validatePhoneNumber = function(value) {
    var pattern;
    value = KiiPortalUtilities._trim(value);
    pattern = /^[\\+]?[0-9]{10,}$/i;
    if ((typeof value).toLowerCase() !== "string") {
      root.Kii.logger("Not string");
      return false;
    } else if (value.match(pattern)) {
      return true;
    } else {
      return false;
    }
  };

  KiiPortalUtilities._isGlobalPhoneNumber = function(value) {
    var pattern;
    value = KiiPortalUtilities._trim(value);
    pattern = /^[\\+]{1}[0-9]{2}/;
    if ((typeof value).toLowerCase() !== "string") {
      root.Kii.logger("Not string");
      return false;
    } else if (value.match(pattern)) {
      return true;
    } else {
      return false;
    }
  };

  KiiPortalUtilities._validateLocalPhone = function(value) {
    var pattern;
    value = KiiPortalUtilities._trim(value);
    pattern = /^\d+$/;
    if ((typeof value).toLowerCase() !== "string") {
      root.Kii.logger("Not string");
      return false;
    } else if (value.match(pattern)) {
      return true;
    } else {
      root.Kii.logger("Invalid format");
      return false;
    }
  };

  KiiPortalUtilities._assertLocalPhoneIsValid = function(value) {
    if (!KiiPortalUtilities._validateLocalPhone(value)) {
      throw new root.InvalidLocalPhoneNumberException;
    }
  };

  KiiPortalUtilities._validateCountryCode = function(value) {
    var pattern;
    value = KiiPortalUtilities._trim(value);
    pattern = /^[a-z]{2}$/i;
    if ((typeof value).toLowerCase() !== "string") {
      root.Kii.logger("Not string");
      return false;
    } else if (value.match(pattern)) {
      root.Kii.logger("Is true");
      return true;
    } else {
      return false;
    }
  };

  KiiPortalUtilities._assertCountryCodeIsValid = function(value) {
    if (!KiiPortalUtilities._validateCountryCode(value)) {
      throw new root.InvalidCountryException;
    }
  };

  KiiPortalUtilities._validatePassword = function(value) {
    var pattern;
    root.Kii.logger("Validating password: " + value);
    pattern = /^[\x20-\x7E]{4,50}$/;
    if ((typeof value).toLowerCase() !== "string") {
      root.Kii.logger("not string");
      return false;
    } else if (value.match(pattern)) {
      root.Kii.logger("matched");
      return true;
    } else {
      root.Kii.logger("other exception");
      return false;
    }
  };

  KiiPortalUtilities._assertPasswordIsValid = function(value) {
    if (!KiiPortalUtilities._validatePassword(value)) {
      throw new root.InvalidPasswordException;
    }
  };

  KiiPortalUtilities._validateUsername = function(value) {
    var pattern;
    pattern = /^[a-zA-Z0-9-_\\.]{3,64}$/i;
    if ((typeof value).toLowerCase() !== "string") {
      return false;
    } else if (value.match(pattern)) {
      return true;
    } else {
      return false;
    }
  };

  KiiPortalUtilities._validateGroupID = function(value) {
    var pattern;
    pattern = /^[a-z0-9-_.]{1,30}$/;
    if ((typeof value).toLowerCase() !== "string") {
      return false;
    } else if (value.match(pattern)) {
      return true;
    } else {
      return false;
    }
  };

  KiiPortalUtilities._validateDisplayName = function(value) {
    var _ref;
    return KiiPortalUtilities._type(value) === "string" && (1 <= (_ref = value.length) && _ref <= 50);
  };

  KiiPortalUtilities._trim = function(value) {
    var pattern;
    pattern = /^(\s|\u00A0)+|(\s|\u00A0)+$/g;
    return (value || "").replace(pattern, "");
  };

  KiiPortalUtilities._safeAddTicks = function(left, right) {
    if ((isNaN(parseInt(left, 10))) || (isNaN(parseInt(right, 10)))) {
      throw new root.InvalidArgumentException('Parameters should be a number');
    }
    if ((Math.abs(left + right)) > KiiPortalUtilities.MAX_DATE_IN_MILLIS) {
      throw new root.ArithmeticException("Addition of " + left + " and " + right + " result in long overflow");
    }
    return left + right;
  };

  KiiPortalUtilities._safeMultiplyTicks = function(left, right) {
    if ((isNaN(parseInt(left, 10))) || (isNaN(parseInt(right, 10)))) {
      throw new root.InvalidArgumentException('Parameters should be a number');
    }
    if ((Math.abs(left * right)) > KiiPortalUtilities.MAX_DATE_IN_MILLIS) {
      throw new root.ArithmeticException("Multiplication of " + left + " and " + right + " result in long overflow");
    }
    return left * right;
  };

  KiiPortalUtilities._safeCalculateExpiresAtAsNumber = function(expirationInSeconds, baseUnixTimeInMills) {
    var e, expirationInMillis, expiresAt;
    expiresAt = 0;
    try {
      expirationInMillis = KiiPortalUtilities._safeMultiplyTicks(expirationInSeconds, 1000);
      expiresAt = KiiPortalUtilities._safeAddTicks(baseUnixTimeInMills, expirationInMillis);
    } catch (_error) {
      e = _error;
      if (e instanceof root.ArithmeticException) {
        expiresAt = KiiPortalUtilities.MAX_DATE_IN_MILLIS;
      } else {
        throw e;
      }
    }
    return expiresAt;
  };

  KiiPortalUtilities._safeCalculateExpiresAtAsDate = function(expirationInSeconds, baseUnixTimeInMills) {
    var e, expirationInMillis, expiresAt;
    expiresAt = 0;
    try {
      expirationInMillis = KiiPortalUtilities._safeMultiplyTicks(expirationInSeconds, 1000);
      expiresAt = KiiPortalUtilities._safeAddTicks(baseUnixTimeInMills, expirationInMillis);
    } catch (_error) {
      e = _error;
      if (e instanceof root.ArithmeticException) {
        expiresAt = KiiPortalUtilities.MAX_DATE_IN_MILLIS;
      } else {
        throw e;
      }
    }
    return new Date(expiresAt);
  };

  KiiPortalUtilities._isJSONType = function(contentType) {
    var pattern;
    pattern = /\+?json(;.*)?$/i;
    return contentType.match(pattern);
  };

  KiiPortalUtilities._type = function(obj) {
    var classToType;
    if (obj === void 0 || obj === null) {
      return String(obj);
    }
    classToType = {
      '[object Boolean]': 'boolean',
      '[object Number]': 'number',
      '[object String]': 'string',
      '[object Function]': 'function',
      '[object Array]': 'array',
      '[object Date]': 'date',
      '[object RegExp]': 'regexp',
      '[object Object]': 'object'
    };
    return classToType[Object.prototype.toString.call(obj)];
  };

  KiiPortalUtilities._disableCacheURL = function(url) {
    if (url.indexOf('?') !== -1) {
      url += "&disable_cache=";
    } else {
      url += "?disable_cache=";
    }
    url += new Date().getTime();
    return url;
  };

  KiiPortalUtilities._validateServerCodeEntryName = function(value) {
    var pattern;
    pattern = /^[a-zA-Z][_a-zA-Z0-9]*$/i;
    return KiiPortalUtilities._type(value) === "string" && value.match(pattern);
  };

  KiiPortalUtilities._validateServerCodeEntryArgument = function(value) {
    return KiiPortalUtilities._type(value) === "null" || (KiiPortalUtilities._type(value) === "object" && Object.keys(value).length > 0);
  };

  KiiPortalUtilities._validateServerCodeEnryVersion = function(value) {
    return KiiPortalUtilities._type(value) === 'string' && value !== "";
  };

  KiiPortalUtilities._isNonEmptyString = function(s) {
    if (typeof s !== "string") {
      return false;
    }
    return s.length > 0;
  };

  KiiPortalUtilities._Error = function(message, target) {
    var e;
    e = Error(message);
    e.target = target;
    return e;
  };

  KiiPortalUtilities.logger = {};
  KiiPortalUtilities.logger.debug = function(e){
    if(KiiPortalDevSettings.debug)
      console.log(e);
  };

  return KiiPortalUtilities;

})();

    
    root.KiiPortalAdmin = (function(){

        function KiiPortalAdmin(){
            var _this = this;
            this._apps = [];
            this._adminContenxt = null;
            this._accessToken = null;
            this._tokenType = null;

            this.setApps = function(apps){
                _this._apps = apps;
            };

            this.getApps = function(){
                return _this._apps;
            };

            this.setAdminContext = function(adminContext){
                _this._adminContenxt = adminContext;
                KiiportalAdmin.setCurrentAdminContext(adminContext);
            };
            
            this.getAdminContext = function(){
                return _this._adminContenxt;
            };

            this.setAccessToken = function(accessToken){
                _this._accessToken = accessToken;
            };

            this.getAccessToken = function(){
                return _this._accessToken;
            };

            this.getTokenType = function(){
                return _this._tokenType;
            };
            this.setTokenType = function(tokenType){
                _this._tokenType = tokenType;
            };
        }

        KiiPortalAdmin.getCurrentApp = function(){
            return this._currentApp;
        };

        KiiPortalAdmin.setCurrentAdminContext = function(context){
            KiiPortalAdmin._currentAdminContext = context;
        };

        KiiPortalAdmin.getCurrentAdminContext = function(){
            return KiiPortalAdmin._currentAdminContext;
        };

        /**
         * get admin's app by Application ID
         * @param appID
         * @returns {*}
         */
        KiiPortalAdmin.prototype.getAppByID = function(appID){
            var apps = this.getApps();
            var myApp = null;
            __each(apps, function(app){
                myApp = app.getAppID() == appID? app: myApp;
            });
            return myApp;
        }

        KiiPortalAdmin.prototype.refreshApps = function(){
            return this._refreshApps();
        };

        KiiPortalAdmin.prototype._refreshApps = function(callbacks){
            var _this = this;
            return new Promise(function (resolve, reject){
                var refreshAppsCallbacks = {
                    success: function(apps){
                        _this.setApps(apps);
                        if(callbacks){
                            callbacks.success.call(callbacks, apps);
                        }
                        resolve(apps);
                    },
                    failure: function(response){
                        if(callbacks && callbacks.failure) {
                            callbacks.failure.call(callbacks, response);
                        }
                        reject(response);
                    }
                };
                KiiPortalApp._withAdmin(_this, refreshAppsCallbacks).catch(function(e){
                    console.log(e);
                });
            });
        };

        KiiPortalAdmin.login = function(userName, password, callbacks){
            return new Promise(function (resolve, reject) {
                var loginCallbacks = {
                    success: function (response) {
                        var portalAdmin = new KiiPortalAdmin();
                        portalAdmin.setAccessToken(response.data['access_token']);
                        portalAdmin.setTokenType(response.data['token_type']);

                        if (callbacks) {
                            callbacks.success.call(callbacks, portalAdmin);
                        }
                        resolve(portalAdmin);
                    },
                    failure: function () {
                        if (callbacks) {
                            callbacks.failure.apply(callbacks, arguments);
                        }
                        reject.apply(reject, arguments);
                    }
                };

                // Execute the query
                //return _bucket.executeQuery(all_query, loginCallbacks);


                /*
                loginCallbacks.success({apps:[
                    {
                        "appID": "5f59f57d",
                        "appKey": "78e36a49a4c8b734299253417bc91fc9",
                        "clientID": "d97aa9b1e29dc6cdefe2c62cebc43f28",
                        "clientSecret": "84502cac7ad0a5868c84a507864877ff5d0d2502be45b7d13aa7464a66d215f0",
                        "site": KiiSite.CN3
                    }
                ]});
                */
                var setting = {
                    url: root._apis.AUTHENTIC,
                    method: 'POST',
                    data:{
                        username: userName,
                        password: password,
                        'grant_type': 'password'
                    }
                };
                KiiPortalRequest(setting).then(loginCallbacks.success, loginCallbacks.failure);

            });
        };

        KiiPortalAdmin.prototype._addApp = function(app){
            this._apps.push(app);
        };

        KiiPortalAdmin.prototype.useApp = function(app, callbacks){
            return this._useApp(app, callbacks);
        };

        KiiPortalAdmin.prototype._useApp = function(app, callbacks){
            return new Promise(function (resolve, reject) {
                var refreshAppCallbacks = {
                    success: function (app) {
                        var adminCallbacks = {
                            success: function(adminContext) {
                                app.setAdminContext(adminContext);
                                KiiPortalAdmin._currentApp = app;
                                if(callbacks){
                                    callbacks.success.call(callbacks, app);
                                }
                                resolve(app);
                            },
                            failure: function(error, statusCode) {
                                if(callbacks){
                                    callbacks.failure.apply(callbacks,arguments);
                                }
                                reject(arguments);
                            }
                        };

                        /**
                         * init site with app info
                         */
                        Kii.initializeWithSite(app.getAppID(), app.getAppKey(), app.getSiteURL());

                        /**
                         * get addmin context
                         */
                        return Kii.authenticateAsAppAdmin(app.getClientID(), app.getClientSecret(), adminCallbacks);
                    },
                    failure: function (response) {
                        reject(response);
                    }
                };
                app._refresh(refreshAppCallbacks);
            });
        };

        KiiPortalAdmin.prototype.createApp = function(){
            return KiiPortalApp.factory(this);
        };

        return KiiPortalAdmin;
    })();

    /**
     * class KiiPortalApp
     */
    root.KiiPortalApp = (function() {
        /**
         * constructor of class KiiPortalApp
         * @constructor
         */
          function KiiPortalApp () {
            var _this = this;
            this._appName = null;
            this._adminContext = null;
            this._appID = null;
            this._appKey = null;
            this._clientID = null;
            this._clientSecret = null;
            this._site = null;
            this._platforms = null;
            this._country = null;
            this._created = null;
            this._id = null;
            this._inactive = false;
            this._owner = false;
            this._plan = null;
            this._appSites = null;
            this._admin = null;
            this._firmwares = [];
            this._models = [];
            this._tags = [];
            this._server = null;

            this.getModels = function(){
                return _this._models;
            };
            this.setModels = function(models){
                _this._models = models;
            };

            this.getFirmwareNamespaces = function(){
                return _this._firmwareNamespaces;
            };

            this.setFirmwareNamespaces = function(firmwareNamespaces){
                _this._firmwareNamespaces = firmwareNamespaces;
            };

            this.getSiteURL = function(){
                switch (_this._site){
                    case 'cn':
                        return KiiSite.CN;
                    case 'cn3':
                        return KiiSite.CN3;
                    case 'us':
                        return KiiSite.US;
                    case 'jp':
                        return KiiSite.JP;
                    case 'devjp':
                        return KiiSite.DEV;
                    case 'qa':
                        return KiiSite.QA;
                    default:
                        return KiiSite.CN3;
                }
            };
            this.setAdmin = function(admin){
                _this._admin = admin;
            };
            this.getAdmin = function(){
                return _this._admin;
            };

            this.setAppName = function(name){
                _this._appName = name;
            };
            this.getAppName = function(){
                return _this._appName;
            };

            this.setPlan = function(plan){
                _this._plan = plan;
            };
            this.getPlan = function(){
                return _this._plan;
            };
            this.setAppSites = function(appSites){
                _this._appSites = appSites;
            };
            this.getAppSites = function(){
                return _this._appSites;
            };

            this.setPlatforms = function(platforms){
                var myPlatforms = [];
                __each(platforms, function(platform){
                    if(KiiPortalApp.Platform_Enum.indexOf(platform)>-1){
                        myPlatforms.push(platform);
                    }
                });
                _this._platforms = myPlatforms;
            };
            this.setServer = function(server){
                _this._server =  server;
                // TODO
                // enum site url for api calls;
            };
            this.getServer = function(){
                return _this._server;
            };
            this.getPlatforms = function(){
                return _this._platforms;
            };
            this.setCountry = function(country){
                _this._country = country;
            };
            this.getCountry = function(){
                return _this._country;
            };
            this.setCreated = function(created){
                _this._created = created;
            };
            this.getCreated = function(){
                return _this._created;
            };
            this.setID = function(id){
                _this._id = id;
            };
            this.getID = function(){
                return _this._id;
            };

            this.setInactive = function(inactive){
                _this._inactive = inactive;
            };
            this.getInactive = function(){
                return _this._inactive;
            };

            this.setOwner = function(owner){
                _this._owner = owner;
            };
            this.getOwner = function(){
                return _this.owner;
            };

            this.setAppID = function (appID) {
                _this._appID = appID;
            };
            this.getAppID = function () {
                return _this._appID;
            };

            this.setAppKey = function (appKey) {
                _this._appKey = appKey;
            };
            this.getAppKey = function (appKey) {
                return _this._appKey;
            };

            this.setClientID = function (clientID) {
                _this._clientID = clientID;
            };
            this.getClientID = function () {
                return _this._clientID;
            };

            this.setClientSecret = function (clientSecret) {
                _this._clientSecret = clientSecret;
            };
            this.getClientSecret = function () {
                return _this._clientSecret;
            };

            this.setSite = function(site) {
                this._site = site;
            };
            this.getSite = function(){
                return this._site;
            };

            this.setAdminContext = function(adminContext){
                _this._adminContext = adminContext;
            };
            this.getAdminContext = function(){
                return _this._adminContext;
            }
        }

        KiiPortalApp.factory = function(admin){
            var app = new this();
            app.setAdmin(admin);

            return app;
        };

        KiiPortalApp.prototype.extRequest = function(spec){
            var _this = this;

            var headers = {
                "x-kii-appid": _this.getAppID(),
                "x-kii-appkey": _this.getAppKey(),
                "x-app-site": _this.getSite(),
                "Authorization": _this.getTokenType() + ' ' + _this.getAccessToken()
            };

            __extends(headers, spec.headers);

            var settings = {
                headers: headers,
                method: spec.method,
                data: spec.data,
                url: root._extensionUrl + spec.path
            };

            callbacks = callbacks || {};
            settings.success = callbacks.success;
            settings.failure = callbacks.failure;

            return KiiPortalRequest(settings);
        }


        KiiPortalApp.prototype.save = function(callbacks){

            var _this = this;
            return new Promise(function(resolve, reject){
                var settings, accessToken, tokenType, createAppCallbacks;
                accessToken = _this.getAdmin().getAccessToken();
                tokenType = _this.getAdmin().getTokenType();

                settings = {
                    method: 'POST',
                    url: root._apis.APP,
                    headers: {
                        'Authorization': tokenType + ' ' +accessToken
                    },
                    data: {
                        name: _this.getAppName(),
                        server: _this.getServer(),
                        platforms: _this.getPlatforms()
                    }
                };

                createAppCallbacks = {
                    success: function(response){
                        var appData = response.data;
                        KiiPortalApp.fromJson(_this, appData);

                        if(callbacks && callbacks.success){
                            callbacks.success(_this);
                        }
                        resolve(_this);
                    },
                    failure: function(response){
                        if(callbacks && callbacks.failure){
                            callbacks.failure(response);
                        }
                        reject(response);
                    }
                };

                KiiPortalRequest(settings).then(createAppCallbacks.success, createAppCallbacks.failure);
            });
        };

        KiiPortalApp.Platform_Enum = ['ios', 'android', 'unity', 'html5'];

        /**
         * refresh this app
         * @param callbacks
         * @returns {*|u}
         * @private
         */
        KiiPortalApp.prototype._refresh = function(callbacks){
            var _this = this;
            return new Promise(function(resolve, reject){
                var appID, accessToken, tokenType, setting, refreshAppCallbacks, getAppCallbacks;
                appID = _this.getAppID();
                accessToken = _this.getAdmin().getAccessToken();
                tokenType = _this.getAdmin().getTokenType();

                setting = {
                    method: 'GET',
                    url: root._apis.APP + '/' + appID,
                    headers: {
                        'Authorization': tokenType + ' ' + accessToken
                    }
                };

                getAppCallbacks = {
                    success: function(response){
                        var appData = response.data.app;
                        KiiPortalApp.fromJson(_this, appData);
                        _this._putSecret(appData);
                        if(callbacks){
                            callbacks.success.call(callbacks, _this);
                        }
                        resolve(_this);

                        /*
                        setting = {
                            method: 'GET',
                            url: root._apis.APP + '/' + appID + '/secret',
                            headers: {
                                'Authorization': tokenType + ' ' + accessToken
                            }
                        };

                        refreshAppCallbacks = {
                            success: function(response){
                                var appData = response.data;
                                //KiiPortalApp.fromJson(_this, appData);
                                _this._putSecret(appData);
                                if(callbacks){
                                    callbacks.success.call(callbacks, _this);
                                }
                                resolve(_this);
                            },
                            failure: function(response){
                                if(callbacks){
                                    callbacks.failure.apply(callbacks, arguments);
                                }
                                reject(response);
                            }
                        };

                        KiiPortalRequest(setting).then(refreshAppCallbacks.success, refreshAppCallbacks.failure);
                        */
                    },
                    failure: function(response){
                        if(callbacks){
                            callbacks.failure.apply(callbacks, arguments);
                        }
                        reject(response);
                    }
                };

                KiiPortalRequest(setting).then(getAppCallbacks.success, getAppCallbacks.failure);
            });
        };

        /**
         * get all apps of an administrator
         * @param admin
         * @param callbacks
         * @returns {*|u}
         * @private
         */
        KiiPortalApp._withAdmin = function(admin, callbacks){
            return new Promise(function (resolve, reject){
                var accessToken, tokenType, setting, refreshAppsCallbacks;

                tokenType = admin.getTokenType();
                accessToken = admin.getAccessToken();
                setting = {
                    url: root._apis.APP,
                    method: 'GET',
                    headers:{
                        Authorization: tokenType + ' ' + accessToken
                    }
                };

                refreshAppsCallbacks = {
                    success: function(response){
                        var data, appsData, apps;
                        apps = [];
                        data = response.data;
                        appsData = data.apps;
                        __each(appsData, function(appData, index){
                            var app = new KiiPortalApp;
                            app = KiiPortalApp.fromJson(app, appData);
                            app.setAdmin(admin);
                            apps.push(app);
                        });

                        if(callbacks){
                            callbacks.success.call(callbacks, apps);
                        }
                        resolve(apps);
                    },
                    failure: function(response){
                        if(callbacks.failure) {
                            callbacks.failure.call(callbacks, response);
                        }
                        reject(response);
                    }
                };
                KiiPortalRequest(setting).then(refreshAppsCallbacks.success, refreshAppsCallbacks.failure);
            });
        };

        /**
         * put client id and client secret
         * @param json
         * @private
         */

        KiiPortalApp.prototype._putSecret = function(json){
            this.setClientID(json['client_id']);
            this.setClientSecret(json['client_secret']);
        };

        /**
         * produce KiiPortalApp instance from json data
         * @param json
         * @returns {KiiPortalApp|*}
         */
        KiiPortalApp.fromJson = function(app ,json){
            var appProperty;
            appProperty = json;

            app.setAppID(appProperty['app_id']);
            app.setAppKey(appProperty['app_key']);
            app.setCountry(appProperty['country']);
            app.setCreated(appProperty['created']);
            app.setID(appProperty['id']);
            app.setInactive(appProperty['inactive']);
            app.setAppName(appProperty['name']);
            app.setOwner(appProperty['owner']);
            app.setPlatforms(appProperty['platforms']);
            app.setSite(appProperty['site_name']);
            app.setClientID(appProperty['client_id']);
            app.setClientSecret(appProperty['client_secret']);
            app.setPlan(appProperty['plan']);
            app.setAppSites(appProperty['app_sites']);

            return app;
        };

        /* =============================== model related ========================================== */

        /**
         * add a model to this app
         * @param model
         * @private
         */
        KiiPortalApp.prototype._addModel = function(model){
            this._models.push(model);
        };

        /**
         * remove a model from this app
         * @param model
         * @private
         */
        KiiPortalApp.prototype._removeModel = function(model){
            __remove(this._models, model);
        };

        /**
         * create a new model
         * @returns {KiiPortalModel|*}
         */
        KiiPortalApp.prototype.createModel = function(){
            return KiiPortalModel.factory(this);
        };

        /**
         * get all models of this app
         * @param callbacks
         * @returns {*|u}
         */
        KiiPortalApp.prototype.refreshModels = function(callbacks){
            return KiiPortalModel._getAll(this, callbacks);
        };

        /**
         * get one model by its id in this app
         * @param callbacks
         */
        KiiPortalApp.prototype.getModelByID = function(id, callbacks){
            var model = KiiPortalModel.refreshByID(this, id, callbacks);
            return model;
        };
        /* ==================================== end of model ==============================================*/


        /* ====================================== firmware related =======================================*/
        /**
         * get firmware from application by firmware's UUID
         * @param UUID
         * @returns {*}
         */
        KiiPortalApp.prototype.getFirmwareNamespaceByID = function(id, callbacks){
            return KiiPortalFirmwareNamespace.refreshByID(this, id, callbacks);
        };


        /**
         * Add a firmware to this app
         * @param firmware
         * @returns {Array|*}
         * @private
         */
        KiiPortalApp.prototype._addFirmwareNamespace = function(firmwareNamespace){
            this._firmwareNamespaces.push(firmwareNamespace);
            return this._firmwareNamespaces;
        };

        /**
         * remove a firmware from this app
         * @param firmware
         * @returns {Array|*}
         * @private
         */
        KiiPortalApp.prototype._removeFirmwareNamespace = function(firmwareNamespace){
            __remove(this._firmwareNamespaces, firmwareNamespace);
            return this._firmwareNamespaces;
        };



        /**
         * create a firmware
         * @returns {KiiPortalFirmware}
         */
        KiiPortalApp.prototype.createFirmwareNamespace = function(){
            return KiiPortalFirmwareNamespace.factory(this);
        };

        /**
         * get all firmwares of this app
         * @param callbacks
         * @returns {Promise}
         */
        KiiPortalApp.prototype.refreshFirmwareNamespaces = function(callbacks){
            return KiiPortalFirmwareNamespace._getAll(this, callbacks);
        };

        /* =================================== end of firmware ===================================================== */

        /* =================================== tag related ========================================================= */
        KiiPortalApp.prototype.refreshTags = function(callbacks){
            return KiiPortalTag._getAll(this, callbacks);
        };

        KiiPortalApp.prototype._setTags = function(tags){
            return this._tags = tags;
        };

        KiiPortalApp.prototype._addTag  =function(tag){
            this._tags.push(tag);
        };

        KiiPortalApp.prototype.getTags = function(){
            return this._tags;
        };

        KiiPortalApp.prototype.getTagByID = function(id, callbacks){
            return KiiPortalTag.refreshByID(this, id, callbacks);
        };

        KiiPortalApp.prototype.createTag = function(){
            return KiiPortalTag.factory(this);
        };

        KiiPortalApp.prototype._removeTag = function(tag){
            __remove(this._tags, tag);
            return this._tags;
        };


        /* =================================== end of tag ========================================================== */

        /* =================================== user related ======================================================== */
        KiiPortalApp.prototype.getUserList = function(callbacks, queryClause, dictVal){
            return KiiPortalUser.getUserList(callbacks, queryClause, dictVal);
        };
        KiiPortalApp.prototype.findUserByUserID = function(callbacks, queryClause, dictVal){
            return KiiPortalUser.findUserByUserID(callbacks, queryClause, dictVal);
        };
        /* =================================== end of tag ========================================================== */


        /* =================================== things related ====================================================== */

        KiiPortalApp.prototype.queryThings = function(callbacks, queryClause, dictVal){
            return KiiThingAdmin.query(this, callbacks, queryClause, dictVal);
        };

        KiiPortalApp.prototype.nextThings = function(callbacks, nextQuery){
            return KiiThingAdmin.nextThings = KiiThingAdmin._nextWithApp(this, callbacks, nextQuery);
        };

        KiiPortalApp.prototype._setThings = function(things){
            this._things = things;
        };

        KiiPortalApp.prototype.getThings = function(things){
            return this._things;
        };

        KiiPortalApp.prototype.addThing = function(thing){
            return this._things.splice(0, 0, thing);
        }

        KiiPortalApp.prototype.addThings = function(things){
            var _this = this;
            this._things = this._things || [];

            __each(things, function(thingToAdd){
                var flag = true;

                __each(_this._things, function(thing){
                    if(thing.getThingID() == thingToAdd.getThingID()){
                        flag = false;
                    }
                });

                if(flag){
                    _this._things.push(thingToAdd);
                }
            });
        };

        KiiPortalApp.prototype.removeThing = function(thing){
            __remove(this._things, thing);
        };

        /* =================================== end of things ======================================================= */
        return KiiPortalApp;
    })();


    /**
     @class Firmware class
     */
    root.KiiPortalFirmware = (function (KiiPortalObject) {
        var _super;

        _super = KiiPortalObject;

        KiiPortalFirmware.prototype = new _super();
        __inherits(KiiPortalFirmware, _super);
        KiiPortalFirmware.prototype.constructor = KiiPortalFirmware;

        function KiiPortalFirmware() {
            var _this = this;
            __bindMethod(_this);

            this._name = null;
            this._models = [];
            this._state = null;
            this._downloadURL = null;
            this._description = null;
            this._namespace = null;
            this.namespace = null;
            this._initialSchema = null;

            this.setNamespace = function(namespace){
                this._namespace = namespace;
                _this.set('namespace', namespace);
            };

            this.getNamespace = function(){
                return _this.get('namespace');
            };


            this.setDownloadURL = function(url){
                _this._downloadURL = url;
                _this.set('downloadURL', url);
            };

            this.getDownloadURL = function(url){
                return _this.get('downloadURL');
            };

            /** get name of this firmware
             @return {String} name of this topic.
             */
            this.getName = function () {
                return _this.get('name');
            };

            /** set name of this firmware
             @return void.
             */
            this.setName = function (name) {
                _this._name = name;
                _this.set('name', name);
            };


            this.setState = function(state){
                _this._state = state;
                _this.set('state',state);
            };
            this.getState = function(){
                return _this.get('state');
            }

            this.setDescription = function(description){
                _this.description = description;
                _this.set('description', description);
            };

            this.getDescription = function(){
                return _this.get('description');
            };

            this.setInitialSchema = function(){

            };
            this.getInitialSchema = function(){
                return _this.get('initialSchema');
            }
        }

        KiiPortalFirmware._bucketName = root.KiiExtensionBuckets.FIRMWARE;

        /**
         * add firmware to model
         * @param model
         * @param callbacks
         * @returns {*}
         */
        KiiPortalFirmware.prototype.addModel = function(model, callbacks){
            var _this = this;
            if(this._models.indexOf(model.getName())>-1) return null;
            this._models.push(model.getName());
            var addFirmwarePromise = model.addFirmware(this);

            return new Promise(function(resolve, reject){
                var saveCallbacks = {
                    success: function(response){
                        if(callbacks && callbacks.success){
                            callbacks.success.apply(callbacks.success, arguments);
                        }
                        resolve(response);
                    },
                    failure: function(error){
                        if(callbacks && callbacks.failure){
                            callbacks.failure.apply(callbacks.failure, arguments);
                        }
                        reject(reject)
                    }
                };

                _this.set('models', _this._models);
                _this.save(saveCallbacks);
            });
        };
        KiiPortalFirmware.prototype.getModels = function(){
            return this._models;
        };
        KiiPortalFirmware.prototype.setModels = function(models){
            this._models = models || [];
            this.set('models', this._models);
        };
        KiiPortalFirmware.prototype.deleteModel = function(model, callbacks){
            var _this = this;
            var id = model.getName();

            var index = this._models.indexOf(id);
            if(index < 0)return null;

            this._models.splice(index, 1);

            var deleteModelPromise = model.deleteFirmware(this);

            return new Promise(function(resolve, reject){
                var saveCallbacks = {
                    success: function(response){
                        if(callbacks && callbacks.success){
                            callbacks.success.apply(callbacks.success, arguments);
                        }
                        resolve(response);
                    },
                    failure: function(error){
                        if(callbacks && callbacks.failure){
                            callbacks.failure.apply(callbacks.failure, arguments);
                        }
                        reject(error);
                    }
                };


                _this.set('models' ,_this._models);
                _this.save(saveCallbacks);
            });
        };

        /**
         * In normal case is not needed. For pushing firmware using only.
         * @param modelName
         * @private
         */
        KiiPortalFirmware.prototype._setUpdateInfoBucketName = function(modelName){
            this.set('updateInfoBucketName', root.ReservedBucketPrefix.MODEL_UPDATE_INFO  + modelName);
        };

        KiiPortalFirmware.StateEnum = {
            CREATED: 'CREATED', // when firmware is created; firmware is invisible for end users
            PUBLISHED: 'PUBLISHED', // when firmware is published; firmware is visible for end users and can be downloaded
            PUSHED: 'PUSHED', // when firmware is pushed to end users, all things receive the firmware installation request
            DISABLED: 'DISABLED' // firmware is no longer in use, invisible for end users
        };

        /**
         * delete firmwareFile
         * @param callbacks
         * @returns {*|u}
         */
        KiiPortalFirmware.prototype.deleteFirmwareFile = function(callbacks){
            var _this = this;
            return new Promise(function(resolve, reject){
                var deleteFirmwareFileCallbacks = {
                    success: function(){
                        /**
                         * save firmware object to kii cloud if firmware file is deleted
                         * @type {{success: firmwareSaveCallbacks.success, failure: firmwareSaveCallbacks.failure}}
                         */
                        var firmwareSaveCallbacks = {
                            success: function(){
                                if(callbacks && callbacks.success){
                                    callbacks.success(_this);
                                }
                                resolve(_this);
                            },
                            failure: function(response){
                                if(callbacks && callbacks.failure){
                                    callbacks.failure(response);
                                }
                                reject(response);
                            }
                        };

                        _this.setDownloadURL('');
                        _this.save(firmwareSaveCallbacks);

                    },
                    failure: function(response){
                        if(callbacks && callbacks.failure){
                            callbacks.failure.apply(callbacks, response);
                        }
                        reject(response);
                    }
                };

                _this.deleteBody(deleteFirmwareFileCallbacks);
            });
        };

        /**
         * upload a firmware file. the new file will cover the old file.
         * @param firmwareFile
         * @param callbacks
         * @returns {*|u}
         */
        KiiPortalFirmware.prototype.uploadFirmwareFile = function(firmwareFile, callbacks){
            var _this = this;
            return new Promise(function(resolve, reject){

                /**
                 * the process of uploading firmware file contains 3 steps.
                 * step 1. upload file
                 * step 2. publish file
                 * step 3. save firmware
                 */


                /**
                 * if failed in any process
                 * @param response
                 */
                var failure = function(response){
                    if(callbacks && callbacks.failure){
                        callbacks.failure.apply(callbacks, response);
                    }
                    reject(response);
                };

                /**
                 * publish firmware body, to enable end users' access to this file's url
                 */
                var publishBody = function(){
                    _this.publishBody({
                        success: function(obj, url){
                            saveChanges(url);
                        },
                        failure: function(response){
                            failure(response)
                        }
                    });
                };

                /**
                 * save all changes
                 * @param url
                 */
                var saveChanges = function(url){
                    /**
                     * save firmware object to kii cloud if file is uploaded
                     * @type {{success: firmwareSaveCallbacks.success, failure: firmwareSaveCallbacks.failure}}
                     */
                    var firmwareSaveCallbacks = {
                        success: function(){
                            if(callbacks && callbacks.success){
                                callbacks.success(_this);
                            }
                            resolve(_this);
                        },
                        failure: function(response){
                            if(callbacks && callbacks.failure){
                                callbacks.failure(response);
                            }
                            reject(response);
                        }
                    };

                    _this.setDownloadURL(url);
                    _this.save(firmwareSaveCallbacks);
                };

                /**
                 * upload firmware file
                 */
                _super.prototype.uploadBody.call(_this, firmwareFile).then(publishBody, failure);
            });
        };

        /**
         * push firmware to public
         * can push to one model or all its models.
         * arg0: models, arg1: callbacks ||
         * arg0: callbacks
         * 2 steps of implementation:
         *  1) create an object, copy firmware field value to this object,
         *      set a bucket name to field [updateInfoBucket] of this object
         *      and push to application scope buckets named after models who use this firmware.
         *
         *  2) if all request finished, change state and save the firmware object to kii cloud,
         *      otherwise, raise exception
         *
         *  Note:
         *      The bucket name stored in updateInfoBucket indicates the location
         *      where the update debugging info goes
         *
         *      bucket name for device to subscribe is __MODEL_[model name]
         *          ReservedBucketPrefix.MODEL + modelName;
         *
         *      bucket name for update debugging info is MODEL_UPDATE_INFO_[model name]
         *          ReservedBucketPrefix.MODEL_UPDATE_INFO  + modelName;
         * @param *| model | callbacks
         * @returns {*|u}
         */
        KiiPortalFirmware.prototype.push = function (){
            var models, _this, callbacks;
            _this = this;
            models = this._models;

            if(arguments.length>0){
                if(arguments[0] instanceof KiiPortalModel){
                    models = [arguments[0]];
                    callbacks = arguments[1];
                }else{
                    callbacks = arguments[0];
                }
            }

            return new Promise(function(resolve, reject){
                var finishedCount = 0;

                if(models.length == 0){
                    reject('No model uses this firmware, push command is rejected!');
                }
                __each(models, function(modelName){
                    var bucketName, bucket, firmware;

                    firmware = _this.clone();

                    bucketName = ReservedBucketPrefix.MODEL + modelName;
                    bucket = _this.getKiiApp().getAdminContext().bucketWithName(bucketName);
                    firmware._setBucket(bucket);
                    firmware._setUUID(null);
                    firmware._setUpdateInfoBucketName(modelName);

                    firmware.save({
                        success: function(){
                            finishedCount++;
                            if(finishedCount == models.length){
                                _this.save().then(function(){
                                    if(callbacks && callbacks.success){
                                        callbacks.success(true);
                                    }
                                    resolve(true);
                                }, function(error){
                                    reject(error);
                                });
                            }
                        },
                        failure: function(error){
                            if(callbacks && callbacks.failure){
                                callbacks.failure(error);
                            }
                            reject(error);
                        }
                    });
                });

                _this.setState(KiiPortalFirmware.StateEnum.PUSHED);

            });

        };

        /**
         * disable this firmware
         */
        KiiPortalFirmware.prototype.disable = function (callbacks){
            var _this = this;
            return new Promise(function(resolve, reject){
                _this.setState(KiiPortalFirmware.StateEnum.DISABLED);
                _this.save({
                    success: function(){
                        if(callbacks && callbacks.success){
                            callbacks.success();
                        }
                        resolve();
                    },
                    failure: function(error){
                        if(callbacks && callbacks.failure){
                            callbacks.failure(error);
                        }
                        reject(error);
                    }
                });
            });
        };

        /**
         * publish this firmware
         */
        KiiPortalFirmware.prototype.publish = function (callbacks){
            var _this = this;
            return new Promise(function(resolve, reject){
                _this.setState(KiiPortalFirmware.StateEnum.PUBLISHED);
                _this.save({
                    success: function(){
                        if(callbacks && callbacks.success){
                            callbacks.success();
                        }
                        resolve();
                    },
                    failure: function(error){
                        if(callbacks && callbacks.failure){
                            callbacks.failure(error);
                        }
                        reject(error);
                    }
                });
            });
        };


        /**
         * delete firmware
         * @param callbacks
         * @returns {Promise|*}
         */
        KiiPortalFirmware.prototype.delete = function (callbacks) {
            var _this = this;
            return new Promise(function(resolve, reject){
                var deleteCallbacks = {
                    success: function(){
                        _this.namespace._removeFirmware(_this);
                        if(callbacks && callbacks.success){
                            callbacks.success(_this);
                        }
                        resolve(_this);
                    },
                    failure: function(response){
                        reject(response);
                    }
                };

                _super.prototype.delete.call(_this, deleteCallbacks);
            });
        };

        /**
         * create or update firmware
         * @param callbacks
         * @returns {Promise|*}
         */
        KiiPortalFirmware.prototype.save = function (callbacks) {
            var _this = this;
            var createFlag = _this.getUUID()? false : true;

            return new Promise(function(resolve, reject){
                var saveCallbacks = {
                    success: function(firmware){
                        if(createFlag){
                            _this.namespace._addFirmware(_this);
                        }
                        if(callbacks && callbacks.success){
                            callbacks.success(_this);
                        }
                        resolve(_this);
                    },
                    failure: function(response){
                        if(callbacks && callbacks.failure){
                            callbacks.failure(response);
                        }
                        reject(response);
                    }
                };
                _super.prototype.save.call(_this, saveCallbacks);
            });
        };

        /**
         * factory an instance of KiiFirmware
         * @override
         * @returns {KiiPortalFirmware}
         */
        KiiPortalFirmware.factory = function (kiiApp, firmwareNamespace) {
            var firmware;
            firmware = _super.factory.call(this, kiiApp);
            firmware.setState(KiiPortalFirmware.StateEnum.CREATED);
            if(firmwareNamespace){
                firmware.setNamespace(firmwareNamespace.getName());
                firmware.namespace = firmwareNamespace;
            }
        
            return firmware;
        };

        /**
         * This is called in KiiPortalObject factory process.
         * @override
         * @public
         */
        KiiPortalFirmware.prototype.init = function(){
            this.setName(this.get('name'));
            this.setNamespace(this.get('namespace'));
            this.setState(this.get('state'));
            this.setModels((this.get('models')));
        };


        KiiPortalFirmware._withFirmwareNamespace = function(firmwareNamespace, callbacks, pageIndex, numberPerPage){
            var _this = this;
            return new Promise(function(resolve, reject){
                var all_query, getAllCallbacks, clause, app;


                app = firmwareNamespace.getKiiApp();
                clause = KiiClause.equals("namespace", firmwareNamespace.getName());
                // Build "all" query
                all_query = KiiQuery.queryWithClause(clause);

                getAllCallbacks = {
                    success: function(query, firmwares, nextQuery){
                        firmwareNamespace.setFirmwares(firmwares);
                        __each(firmwares, function(firmware){
                            firmware.namespace = firmwareNamespace;
                        });
                        if(callbacks && callbacks.success){
                            callbacks.success(query, firmwares, nextQuery);
                        }
                        resolve(query, firmwares, nextQuery);
                    },
                    failure: function(query, error){
                        reject(query, error)
                    }
                };
                // execute query
                return _this.executeQuery(app ,all_query, getAllCallbacks);
            });
        };


        /**
         * get all firmware instances
         * @param app
         * @param callbacks
         * @param pageIndex
         * @param numberPerPage
         * @returns {*|u}
         * @private
         */
        KiiPortalFirmware._getAll = function (app, callbacks, pageIndex, numberPerPage) {
            var _this = this;
            return new Promise(function(resolve, reject){
                var all_query, getAllCallbacks;
                // Build "all" query
                all_query = KiiQuery.queryWithClause();

                getAllCallbacks = {
                    success: function(query, firmwares, nextQuery){
                        app.setFirmwares(firmwares);
                        if(callbacks && callbacks.success){
                            callbacks.success(query, firmwares, nextQuery);
                        }
                        resolve(query, firmwares, nextQuery);
                    },
                    failure: function(query, error){
                        reject(query, error)
                    }
                };
                // execute query
                return _this.executeQuery(app ,all_query, getAllCallbacks);
            });
        };

        return KiiPortalFirmware;
    })(KiiPortalObject);

    
    /**
     @class Firmware class
     */
    root.KiiPortalFirmwareNamespace = (function (KiiPortalObject) {
        var _super;

        _super = KiiPortalObject;

        KiiPortalFirmwareNamespace.prototype = new _super();
        __inherits(KiiPortalFirmwareNamespace, _super);
        KiiPortalFirmwareNamespace.prototype.constructor = KiiPortalFirmwareNamespace;

        function KiiPortalFirmwareNamespace() {
            var _this = this;
            __bindMethod(_this);

            this._name = '';
            this._versionName = null;
            this._firmwares = [];

            this.setName = function(name){
                _this._name = name;
                _this.set('name', name);
            };

            this.getName = function(name){
                return _this.get('name');
            };

            this.getFirmwares = function(){
                return _this._firmwares;
            };

            this.setFirmwares = function(firmwares){
                _this._firmwares = firmwares;
            };

            this._addFirmware = function(firmware){
                _this._firmwares.push(firmware);
            };

            this._removeFirmware = function(firmware){
                _this._firmwares.splice(_this._firmwares.indexOf(firmware), 1);
            };

            /** get current version of this firmware
             @return {[KiiPortalFirmware]} of this firmware.
             */
            this.getVersionName = function () {
                return _this.get('versionName');
            };

            /** set current version of this firmware
             @return {String} name of this firmware.
             */
            this.setVersionName = function (currentVersion) {
                _this._versionName = currentVersion;
                _this.set('versionName', currentVersion);
            };

        }

        KiiPortalFirmwareNamespace._bucketName = root.KiiExtensionBuckets.FIRMWARE_NAMESPACE;

        KiiPortalFirmwareNamespace.prototype.refreshFirmwares = function(callbacks, pageIndex, numberPerPage){
            return KiiPortalFirmware._withFirmwareNamespace(this, callbacks, pageIndex, numberPerPage);
        };

        /**
         * [createFirmware description]
         * @return {[type]} [description]
         */
        KiiPortalFirmwareNamespace.prototype.createFirmware = function(){
            return KiiPortalFirmware.factory(this.getKiiApp(), this);
        };

        /**
         * delete firmware
         * @param callbacks
         * @returns {Promise|*}
         */
        KiiPortalFirmwareNamespace.prototype.delete = function (callbacks) {
            var _this = this;
            return new Promise(function(resolve, reject){
                var deleteCallbacks = {
                    success: function(){
                        _this._kiiApp._removeFirmwareNamespace(_this);
                        if(callbacks && callbacks.success){
                            callbacks.success(_this);
                        }
                        resolve(_this);
                    },
                    failure: function(response){
                        reject(response);
                    }
                };

                _super.prototype.delete.call(_this, deleteCallbacks);
            });
        };

        /**
         * create or update firmware
         * @param callbacks
         * @returns {Promise|*}
         */
        KiiPortalFirmwareNamespace.prototype.save = function (callbacks) {
            var _this = this;
            var createFlag = _this.getUUID()? false : true;

            return new Promise(function(resolve, reject){
                var saveCallbacks = {
                    success: function(firmware){
                        if(createFlag){
                            _this._kiiApp._addFirmwareNamespace(_this);
                        }
                        if(callbacks && callbacks.success){
                            callbacks.success(_this);
                        }
                        resolve(_this);
                    },
                    failure: function(response){
                        if(callbacks && callbacks.failure){
                            callbacks.failure(response);
                        }
                        reject(response);
                    }
                };
                _super.prototype.save.call(_this, saveCallbacks);
            });
        };

        /**
         * factory an instance of KiiFirmware
         * @override
         * @returns {KiiPortalFirmware}
         */
        KiiPortalFirmwareNamespace.factory = function (kiiApp) {
            var firmwareNamespace = _super.factory.call(this, kiiApp);

            return firmwareNamespace;
        };

        /**
         * This is called in KiiPortalObject factory process.
         * @override
         * @public
         */
        KiiPortalFirmwareNamespace.prototype.init = function(){
            this.setName(this.get('name'));
            this.setVersionName(this.get('versionName'));
        };


        /**
         * get all firmware namespace instances
         * bucket is defined as KiiPortalFirmwareNamespace._bucketName
         * @param app
         * @param callbacks
         * @param pageIndex
         * @param numberPerPage
         * @returns {*|u}
         * @private
         */
        KiiPortalFirmwareNamespace._getAll = function (app, callbacks, pageIndex, numberPerPage) {
            var _this = this;
            return new Promise(function(resolve, reject){
                var all_query, getAllCallbacks;
                // Build "all" query
                all_query = KiiQuery.queryWithClause();

                getAllCallbacks = {
                    success: function(query, firmwareNamespaces, nextQuery){
                        app.setFirmwareNamespaces(firmwareNamespaces);
                        if(callbacks && callbacks.success){
                            callbacks.success(query, firmwares, nextQuery);
                        }
                        resolve(query, firmwareNamespaces, nextQuery);
                    },
                    failure: function(query, error){
                        reject(query, error)
                    }
                };
                // execute query
                return _this.executeQuery(app ,all_query, getAllCallbacks);
            });
        };

        return KiiPortalFirmwareNamespace;
    })(KiiPortalObject);    /**
     * class KiiPortalModel
     */
    root.KiiPortalModel = (function (KiiPortalObject) {
        var _super;

        _super = KiiPortalObject;

        KiiPortalModel.prototype = new _super();
        __inherits(KiiPortalModel, _super);
        KiiPortalModel.prototype.constructor = KiiPortalModel;

        function KiiPortalModel() {
            var _this = this;

            __bindMethod(_this);
            this._name = null;
            this._things = null;
            this._imageUrl = null;
            this._firmwares = [];
            this._firmwareNamespace = null;
            this._portalSchemas = null;


            this.getImageUrl = function(){
                return _this._imageUrl;
            };
            this.setImageUrl = function(imageUrl){
                _this._imageUrl = imageUrl;
                _super.prototype.set.call(_this, 'imageUrl', imageUrl);
            };

            this.setName = function(name){
                _this._name = name;
                _this.set('name', name);
            };

            this.getName = function(){
                return _this.get('name');
            };


            this.getFirmwares = function(){
                return _this._firmwares;
            };
            this.setFirmwares = function(firmwares){
                _this._firmwares = firmwares || [];
                _this.set('firmwares', _this._firmwares);
            };

            this.setFirmwareNamespace = function(firmwareNamespace){
                _this._firmwareNamespace = firmwareNamespace;
                _this.set('firmwareNamespace' ,firmwareNamespace);
            };
            this.getFirmwareNamespace = function(){
                return _this.get('firmwareNamespace');
            };

            this.getPortalSchemas = function(){
                return _this._portalSchemas;
            };
            this.setPortalSchemas = function(schemas){
                _this._portalSchemas = schemas;
            };

        }

        KiiPortalModel._bucketName = root.KiiExtensionBuckets.MODEL;

        /**
         * init after data is ready
         * override
         * @private
         */
        KiiPortalModel.prototype.init = function(){
            this.setName(_super.prototype.get.call(this, 'name'));
            this.setImageUrl(_super.prototype.get.call(this, 'imageUrl'));
            this.setFirmwareNamespace(_super.prototype.get.call(this, 'firmwareNamespace'));
            this.setFirmwares(_super.prototype.get.call(this, 'firmwares'));
        };

        /**
         * factory a kii portal model instance
         * @param app
         * @returns {KiiPortalModel|*}
         */
        KiiPortalModel.factory = function(kiiApp){
            var model = _super.factory.call(this, kiiApp);
            return model;
        };

        /**
         * delete firmware
         * @param firmware
         * @param callbacks
         * @returns {*|u}
         */
        KiiPortalModel.prototype.deleteFirmware = function(firmware, callbacks){
            var _this = this;
            var id = firmware.getUUID();
            var index = this._firmwares.indexOf(id);
            if(index < 0)return null;

            this._firmwares.splice(index, 1);

            var deleteFirmwarePromise = firmware.deleteModel(this);

            return new Promise(function(resolve, reject){
                var saveCallbacks = {
                    success: function(response){
                        if(callbacks && callbacks.success){
                            callbacks.success.apply(callbacks.success, arguments);
                        }
                        resolve(response);
                    },
                    failure: function(error){
                        if(callbacks && callbacks.failure){
                            callbacks.failure.apply(callbacks.failure, arguments);
                        }
                        reject(error);
                    }
                };

                if(deleteFirmwarePromise){
                    deleteFirmwarePromise.then(function(){
                        _this.set('firmwares' ,_this._firmwares);
                        _this.save(saveCallbacks);
                    },function(error){
                        saveCallbacks.failure(error);
                        reject(error);
                    });
                }else{
                    _this.set('firmwares' ,_this._firmwares);
                    _this.save(saveCallbacks);
                }
            });
        };

        /**
         * add firmware
         * @param firmware
         * @param callbacks
         * @returns {*|u}
         */
        KiiPortalModel.prototype.addFirmware = function(firmware, callbacks){
            var _this = this;
            if(this._firmwares.indexOf(firmware.getUUID())>-1) return null;
            this._firmwares.push(firmware.getUUID());
            var addModelPromise = firmware.addModel(this);
            
            return new Promise(function(resolve, reject){

                var saveCallbacks = {
                    success: function(response){
                        if(callbacks && callbacks.success){
                            callbacks.success.apply(callbacks.success, arguments);
                        }
                        resolve(response);
                    },
                    failure: function(error){
                        if(callbacks && callbacks.failure){
                            callbacks.failure.apply(callbacks.failure, arguments);
                        }
                        reject(error);
                    }
                };

                if(addModelPromise){
                    addModelPromise.then(function(){
                        _this.set('firmwares', _this._firmwares);
                        _this.save(saveCallbacks);
                    },function(error){
                        saveCallbacks.failure(error);
                        reject(error);
                    });
                }else{
                    _this.set('firmwares', _this._firmwares);
                    _this.save(saveCallbacks);
                }
            });
        };

        /**
         * get all kii portal models from app
         * @param app
         * @param callbacks
         * @param pageIndex
         * @param numberPerPage
         * @returns {*|u}
         * @private
         */
        KiiPortalModel._getAll = function(app, callbacks, pageIndex, numberPerPage){
            return new Promise(function(resolve, reject){
                var all_query, getAllCallbacks;
                // Build "all" query
                all_query = KiiQuery.queryWithClause();

                getAllCallbacks = {
                    success: function(query, models, nextQuery){
                        app.setModels(models);
                        if(callbacks && callbacks.success){
                            callbacks.success(query, models, nextQuery);
                        }
                        resolve(query, models, nextQuery);
                    },
                    failure: function(query, error){
                        reject(query, error)
                    }
                };
                // execute query
                return KiiPortalModel.executeQuery(app ,all_query, getAllCallbacks);
            });
        };

        /**
         * remove a model
         * @param callbacks
         * @returns {*|u}
         */
        KiiPortalModel.prototype.delete = function(callbacks){
            var _this = this;

            return new Promise(function(resolve, reject){
                var removeModelCallbacks, kiiApp;
                removeModelCallbacks = {
                    success: function(response){
                        kiiApp = _this.getKiiApp();
                        kiiApp._removeModel(_this);
                        if(callbacks && callbacks.success){
                            callbacks.success(_this);
                        }
                        resolve(_this);
                    },
                    failure: function(response){
                        if(callbacks && callbacks.failure){
                            callbacks.failure(response);
                        }
                        reject(response);
                    }
                };

                _super.prototype.delete.call(_this, removeModelCallbacks);
            });
        };

        /**
         * get a model by its ID
         * @param app
         * @param id
         * @param callbacks
         */
        KiiPortalModel.refreshByID = function(kiiApp, id, callbacks){
            return new Promise(function(resolve, reject){
                var refreshModelCallbacks;
                refreshModelCallbacks = {
                    success: function(model){
                        if(callbacks && callbacks.success){
                            callbacks.success(model);
                        }
                        resolve(model);
                    },
                    failure: function(response){
                        if(callbacks && callbacks.failure){
                            callbacks.failure(response);
                        }
                        reject(response);
                    }
                };

                KiiPortalModel.objectWithID(kiiApp, id)
                    .then(refreshModelCallbacks.success, refreshModelCallbacks.failure);
            });
        };

        KiiPortalModel.prototype.createSchema = function(){
            return KiiPortalSchema.create(this);
        }

        KiiPortalModel.prototype.uploadImage = function(imageFile ,callbacks){
            var _this = this;
            return new Promise(function(resolve, reject){

                /**
                 * the process of uploading image file contains 3 steps.
                 * step 1. upload file
                 * step 2. publish file
                 * step 3. save model
                 */


                /**
                 * if failed in any process
                 * @param response
                 */
                var failure = function(response){
                    if(callbacks && callbacks.failure){
                        callbacks.failure.apply(callbacks, response);
                    }
                    reject(response);
                };

                /**
                 * publish firmware body, to enable end users' access to this file's url
                 */
                var publishBody = function(){
                    _this.publishBody({
                        success: function(obj, url){
                            saveChanges(url);
                        },
                        failure: function(response){
                            failure(response)
                        }
                    });
                };

                /**
                 * save all changes
                 * @param url
                 */
                var saveChanges = function(url){
                    /**
                     * save firmware object to kii cloud if file is uploaded
                     * @type {{success: firmwareSaveCallbacks.success, failure: firmwareSaveCallbacks.failure}}
                     */
                    var modelSaveCallbacks = {
                        success: function(){
                            if(callbacks && callbacks.success){
                                callbacks.success(_this);
                            }
                            resolve(_this);
                        },
                        failure: function(response){
                            if(callbacks && callbacks.failure){
                                callbacks.failure(response);
                            }
                            reject(response);
                        }
                    };

                    _this.setImageUrl(url);
                    _this.save(modelSaveCallbacks);
                };

                /**
                 * upload firmware file
                 */
                _super.prototype.uploadBody.call(_this, imageFile).then(publishBody, failure);
            });
        };

        /**
         * save a model
         * @param callbacks
         * @returns {*|u}
         */
        KiiPortalModel.prototype.save = function(callbacks){
            var _this = this;
            var createFlag = _this.getUUID()? false : true;

            return new Promise(function(resolve, reject){
                var modelSaveCallbacks, kiiApp;

                modelSaveCallbacks = {
                    success: function(model){
                        kiiApp = _this.getKiiApp();

                        if(createFlag){
                            kiiApp._addModel(_this);
                        }

                        if(callbacks && callbacks.success){
                            callbacks.success(_this);
                        }
                        resolve(_this);
                    },
                    failure: function(response){
                        if(callbacks && callbacks.failure){
                            callbacks.failure(response);
                        }
                        reject(response);
                    }
                };

                _super.prototype.save.call(_this, modelSaveCallbacks);

            });
        };

        KiiPortalModel.prototype.refreshPortalSchemas = function(callbacks){
            return KiiPortalSchema._withModel(this, callbacks);
        };

        /**
         * get firmware bucket
         * @returns {KiiBucket|*}
         */
        KiiPortalModel.prototype.getModelBucket = function(){
            return this.getKiiApp().getAdminContext().bucketWithName(KiiPortalModel._getBucketName() + this.getUUID());
        };

        KiiPortalModel.prototype.saveSchema = function(schema, callbacks){
            var _this = this;
            return new Promise(function(resolve, reject){
                var saveSchemaCallbacks = {
                    success: function(schema){
                        var schemas = _this.getPortalSchemas();
                        if(schemas.indexOf(schema)){
                            schemas.push(schema);
                        }
                        resolve(schema);
                        if(callbacks && callbacks.success){
                            callbacks.success(schema);
                        }
                    },
                    failure: function(error){
                        if(callbacks && callbacks.failure){
                            callbacks.failure(error);
                        }
                        reject(error);
                    }
                };

                schema.save(saveSchemaCallbacks);
            });
        };


        return KiiPortalModel;
    })(root.KiiPortalObject);

    root.KiiPortalSchema = (function(){

        function KiiPortalSchema(schema, model){
            var _this = this;
            this.id = null;
            this._modelId = model.getUUID();
            this._version = null;
            this.properties = [];
            this._kiiApp = model.getKiiApp();
            this._model = model;
            this.createdAt = null;
            this.updatedAt = null;


            this.getProperties = function(){
                return _this.properties;
            };

            this.getKiiApp = function(){
                return _this._kiiApp;
            }

            this.getModelId = function(){
                return _this._modelId;
            };

            this.setModelId = function(modelId){
                _this._modelId = modelId;
            }

            this.getVersion = function(){
                return _this._version;
            };

            this.setVersion = function(version){
                _this._version = version;
            };

            this.init(schema);
        }

        KiiPortalSchema.prototype.init = function(schema, model){
            var _this = this;
            if(schema){
                _this.id = schema.id;
                _this.setVersion(schema.version);
                _this.setModelId(schema.modelId);
                _this.createdAt = schema.createdAt;
                _this.updatedAt = schema.updatedAt;
                if(schema.properties){
                    __each(schema.properties, function(property){
                        _this.properties.push(new KiiPortalSchemaProperty(property));
                    });
                }
            }
            _this._model = model || _this._model;
        };

        KiiPortalSchema.prototype.createProperty = function(){
            var property = new KiiPortalSchemaProperty;
            this.addProperty(property);
            return property;
        }

        KiiPortalSchema.prototype.addProperty = function(property){
            this.properties.push(property);
        };

        KiiPortalSchema.prototype.removeProperty = function(property){
            this.properties.splice(this.properties.indexOf(property), 1);
        };

        KiiPortalSchema._withModel = function(model, callbacks){
            var tokenType, accessToken, setting, kiiApp;
            kiiApp = model.getKiiApp();

            return new Promise(function(resolve, reject){
                setting = {
                    method: 'GET',
                    url: root._apis.MODEL + '/' + model.getUUID() + '/schemas',
                    success: function(response){
                        var schemasData = response.data.schemas || [];
                        var schemas = [];

                        __each(schemasData, function(schema){
                            schemas.push(KiiPortalSchema.factory(schema, model));
                        });

                        model.setPortalSchemas(schemas);
                        if(callbacks && callbacks.success){
                            callbacks.success(schemas);
                        }
                        resolve(schemas);
                    },
                    failure: function(error){
                        if(callbacks && callbacks.failure){
                            callbacks.failure(error);
                        }
                        reject(error);
                    }
                };

                KiiPortalRequest(setting, kiiApp);
            });
        };

        KiiPortalSchema.prototype.refresh = function(property){
            var setting = {
                method: 'GET',
                url: root._apis.MODEL + '/' + this.getModelId() + '/schemas/' + this.getVersion(),
                headers: {
                    'Authorization': tokenType + ' ' + accessToken
                },
                success: function(response){

                },
                failure: function(error){

                }
            };

            KiiPortalRequest(setting, this.getKiiApp());
        };

        KiiPortalSchema.prototype.save = function(callbacks){
            var id, createFlag, setting, _this, tokenType, accessToken, properties;
            tokenType = this.getKiiApp().getAdmin().getTokenType();
            accessToken = this.getKiiApp().getAdmin().getAccessToken();
            properties = [];

            __each(this.getProperties(), function(property){
                properties.push(property.purify());
            });

            _this = this;
            id = this.id;

            if(!id){
                createFlag = true;
            }

            return new Promise(function(resolve, reject){
                if(createFlag){
                    setting = {
                        method: 'POST',
                        url: root._apis.MODEL + '/' + _this.getModelId() + '/schemas',
                        data: {
                            modelId: _this.getModelId(),
                            properties: properties,
                            version: _this.getVersion()
                        },
                        headers: {
                            'Authorization': tokenType + ' ' + accessToken
                        },
                        success: function(response){
                            _this.init(response.data, _this._model);

                            if(callbacks && callbacks.success){
                                callbacks.success(_this);
                            }
                            resolve(_this);
                        },
                        failure: function(error){
                            if(callbacks && callbacks.failure){
                                callbacks.failure(error);
                                reject(error);
                            }
                        }
                    };
                }else{
                    /**
                     * for now, update is not allowed
                     * @type {Object}
                     */
                    setting = {
                        method: 'POST',
                        data: {
                            id: _this.id,
                            modelId: _this.getModelId(),
                            properties: properties,
                            version: _this.getVersion()
                        },
                        url: root._apis.MODEL + '/' + _this._model.getUUID() + '/schemas/' + _this.getVersion(),
                        headers: {
                            'Authorization': tokenType + ' ' + accessToken
                        },
                        success: function(response){
                            _this.init(response.data, this._model);
                            if(callbacks && callbacks.success){
                                callbacks.success(_this);
                            }
                            resolve(_this);
                        },
                        failure: function(error){
                            if(callbacks && callbacks.failure){
                                callbacks.failure(error);
                            }
                            reject(error);
                        }
                    };
                }

                KiiPortalRequest(setting, _this.getKiiApp()).catch(function(e){
                    KiiLogger.debug(new KiiPortalException(e));
                });
            });
        };

        KiiPortalSchema.create = function(model){
            var schema = KiiPortalSchema.factory(null, model);
            schema.setModelId(model.getUUID());
            return schema;
        };

        KiiPortalSchema.factory = function(schema, model){
            return new KiiPortalSchema(schema, model);
        };

        return KiiPortalSchema;
    })();

    root.KiiPortalSchemaProperty = (function(){

        function KiiPortalSchemaProperty(property){
            this.key = null;
            this.displayName = null;
            this.type = null;
            this.controllable = null;
            this.unit = null;
            this.min = null;
            this.max = null

            if(property){
                __extends(this, property);
            }
        }

        KiiPortalSchemaProperty.KeyEnum = ['key', 'displayName', 'type', 
            'controllable', 'unit', 'min', 'max'];

        KiiPortalSchemaProperty.Schema_Type_Enum = {
            BOOLEAN: 'boolean',
            INT: 'integer',
            FLOAT: 'float',
            STRING: 'string'
        };

        KiiPortalSchemaProperty.prototype.purify = function(){
            var data = {},
                _this = this;
            __each(KiiPortalSchemaProperty.KeyEnum, function(val){
                if(_this[val]){
                    data[val] = _this[val];
                }
            });
            return data;
        };

        return KiiPortalSchemaProperty;
    })();root.KiiPortalMqtt = (function() {
    function KiiPortalMqtt(config, messageHandler, disconnectHandler) {
        this.config = config;
        this.messageHandler = messageHandler;
        this.disconnectHandler = disconnectHandler;
    }
    // subscribes to the topic
    KiiPortalMqtt.prototype.subscribe = function(topic) {
        this.client.subscribe(topic);
    }

    // connects to broker and subscribes to clientID topic
    KiiPortalMqtt.prototype.connect = function() {
        return new Promise(function(resolve, reject) {
            try {
                this.client = new Paho.MQTT.Client(this.config.host, this.config.port, this.config.clientID);
                // connect the client
                this.client.connect({
                    onSuccess: function() {
                        // auto subscribe to the topic
                        // this.client.subscribe(this.config.clientID);
                        resolve();
                    },
                    onFailure: function(err) { deferred.reject(err) },
                    userName: this.config.username,
                    password: this.config.password
                });
                this.client.onConnectionLost = this.disconnectHandler;
                this.client.onMessageArrived = this.messageHandler;
            } catch (err) {
                reject(err);
            }
        });
    }

    // disconnects
    KiiPortalMqtt.prototype.disconnect = function() {
        this.client.disconnect();
    }

    // endpoints

    // send message to topic
    KiiPortalMqtt.prototype.sendMessage = function(topic, message) {
        console.log("send message", topic, message);

        var message = new Paho.MQTT.Message(message);
        message.destinationName = topic;
        this.client.send(message);
    }

    KiiPortalMqtt.prototype.onboardThing = function(appID, vendorThingID, thingPassword, userID, token) {

        // fill onboarding message
        var onboardingMessage = 'POST\n';
        onboardingMessage += 'Content-type:application/vnd.kii.OnboardingWithVendorThingIDByOwner+json\n';
        onboardingMessage += 'Authorization:Bearer ' + token + '\n';
        // TODO: generate ID to check it back
        onboardingMessage += 'X-Kii-RequestID:asdf1234\n';
        // mandatory blank line
        onboardingMessage += '\n';
        // payload
        var payload = {
            vendorThingID: vendorThingID,
            thingPassword: thingPassword,
            owner: 'USER:' + userID
        }
        onboardingMessage += JSON.stringify(payload);
        var topic = 'p/' + this.config.clientID + '/thing-if/apps/' + appID + '/onboardings';
        this.sendMessage(topic, onboardingMessage);

    }

    KiiPortalMqtt.prototype.sendCommand = function(appID, payload, thingID, token) {

        // fill onboarding message
        var commandMessage = 'POST\n';
        commandMessage += 'Content-type:application/json\n';
        commandMessage += 'Authorization:Bearer ' + token + '\n';
        // TODO: generate ID to check it back
        commandMessage += 'X-Kii-RequestID:asdf1234\n';
        // mandatory blank line
        commandMessage += '\n';
        // payload
        commandMessage += JSON.stringify(payload);
        var topic = 'p/' + this.config.clientID + '/thing-if/apps/' + appID + '/targets' + '/THING:' + thingID + '/commands';
        this.sendMessage(topic, commandMessage);

    }

    KiiPortalMqtt.prototype.updateState = function(appID, state, thingID, token) {
        // fill message
        var stateMessage = 'PUT\n';
        stateMessage += 'Content-type:application/json\n';
        stateMessage += 'Authorization:Bearer ' + token + '\n';
        // mandatory blank line
        stateMessage += '\n';
        // state
        stateMessage += state;

        // fill topic
        var topic = 'p/' + this.config.clientID + '/thing-if/apps/' + appID + '/targets/THING:' + thingID + '/states';

        // send out the message to topic
        this.sendMessage(topic, stateMessage);
    }

    KiiPortalMqtt.prototype.updateActionResults = function(appID, actionResults, thingID, commandID, token) {
        // fill message
        var actionResultsMessage = 'PUT\n';
        actionResultsMessage += 'Content-type:application/json\n';
        actionResultsMessage += 'Authorization:Bearer ' + token + '\n';
        // mandatory blank line
        actionResultsMessage += '\n';
        // payload
        var payload = {
            actionResults: JSON.parse(actionResults)
        };
        actionResultsMessage += JSON.stringify(payload);

        // fill topic
        var topic = 'p/' + this.config.clientID + '/thing-if/apps/' + appID + '/targets/THING:' + thingID + '/commands/' + commandID + '/action-results';

        // send out the message to topic
        this.sendMessage(topic, actionResultsMessage);
    }

    KiiPortalMqtt.prototype.parseResponse = function(messageToParse) {

        console.log("messageToParse", messageToParse);

        var message = messageToParse.payloadString;
        var topic = messageToParse.destinationName;

        var parsed = {
            code: '',
            headers: [],
            payload: {},
            type: parseType(topic)
        }

        // in the case of no header
        if (message.charAt(0) == "{") {
            parsed.payload = JSON.parse(message);
            return parsed;
        }

        // in the case of header
        var lines = message.split('\n');

        parsed.code = lines[0].replace('\r', '');

        for (var i = 1; i < lines.length; i++) {
            // console.log(lines[i], lines[i].length);
            if (lines[i] != '{') {
                parsed.headers.push(lines[i].replace('\r', ''));
            } else {
                var payload = '';
                for (var j = i; j < lines.length; j++) {
                    payload += lines[j];
                }
                console.log(payload);
                parsed.payload = JSON.parse(payload);
                return parsed;
            }
        }

        return parsed;
    }

    function parseType(topic) {

        // if(topic.search('p\/\w+\/thing-if\/apps\/\w+\/targets\/\w+:[\w\-\.]+\/commands\/[\w\-\.]+\/action\-results')){
        //   return 'UPDATE_ACTION_RESULTS';
        // }  else if(topic.search('p\/\w+\/thing-if\/apps\/\w+\/targets\/\w+:[\w\-\.]*\/commands')){
        //  return 'SEND_COMMAND';
        // } else if(topic.search('p\/\w+/thing-if\/apps\/\w+:\w+\/targets\/\w+:[\w\-\.]*\/states')){
        //  return 'UPDATE_STATE';
        // } else if(topic.search('p\/\w+\/thing-if\/apps\/\w+:\w+\/onboardings')){
        //   return 'ONBOARD_THING';
        // } else {
        //   return 'PUSH_MESSAGE';
        // }

        if (topic.lastIndexOf('action-results') > 0) {
            return 'UPDATE_ACTION_RESULTS';
        } else if (topic.lastIndexOf('commands') > 0) {
            return 'SEND_COMMAND';
        } else if (topic.lastIndexOf('states') > 0) {
            return 'UPDATE_STATE';
        } else if (topic.lastIndexOf('onboardings') > 0) {
            return 'ONBOARD_THING';
        } else {
            return 'PUSH_MESSAGE';
        }

    }
    return KiiPortalMqtt;
})();
    /**
     * class KiiPortalTag.js
     */
    root.KiiPortalTag = (function (KiiPortalObject) {
        var _super;

        _super = KiiPortalObject;

        KiiPortalTag.prototype = new _super();
        __inherits(KiiPortalTag, _super);
        KiiPortalTag.prototype.constructor = KiiPortalTag;

        function KiiPortalTag() {
            var _this = this;
            __bindMethod(_this);

            this._name = null;
            this._description = null;
            this._thingIDs = [];
            this.set('thingIDs', this._thingIDs);
            this._things = [];
            this._nextThingQuery = null;
            this._customData = {};

            this.setCustomData = function(data){
                _this._customData = data;
                _this.set('customData', data);
            };

            this.getCustomData = function(){
                return _this._customData;
            };

            this.setNextThingQuery = function(query){
                return _this._nextThingQuery = query;
            };

            this.getNextThingQuery = function(){
                return _this._nextThingQuery;
            }

            this.getThings = function(){
                return _this._things;
            };

            this.setThings = function(things){
                _this._things = things;
            };

            this.setThingIDs = function(thingIDs){
                _this._thingIDs = thingIDs;
                _this.set('thingIDs', thingIDs);
            };

            this.getThingIDs = function(){
                return _this.get('thingIDs');
            }

            this.setName = function(name){
                _this._name = name;
                _this.set('name' ,name);
            };

            this.getName = function(){
                return _this.get('name');
            };

            this.getDescription = function(){
                return _this.get('description');
            };

            this.setDescription = function(description){
                _this._description = description;
                _this.set('description', description);
            };
        }

        KiiPortalTag._bucketName = root.KiiExtensionBuckets.TAG;

        /**
         * save object
         * @param callbacks
         * @returns {*|u}
         */
        KiiPortalTag.prototype.save = function(callbacks){
            var _this = this;
            var createFlag = _this.getUUID()? false : true;

            return new Promise(function(resolve, reject){
                var saveCallbacks = {
                    success: function(tag){
                        if(createFlag){
                            _this._kiiApp._addTag(_this);
                        }
                        if(callbacks && callbacks.success){
                            callbacks.success(_this);
                        }
                        resolve(_this);
                    },
                    failure: function(response){
                        if(callbacks && callbacks.failure){
                            callbacks.failure(response);
                        }
                        reject(response);
                    }
                };
                _super.prototype.save.call(_this, saveCallbacks);
            });
        };

        /**
         * get all kii portal tags from app
         * @param app
         * @param callbacks
         * @param pageIndex
         * @param numberPerPage
         * @returns {*|u}
         * @private
         */
        KiiPortalTag._getAll = function(app, callbacks, pageIndex, numberPerPage){
            return new Promise(function(resolve, reject){
                var all_query, getAllCallbacks;
                // Build "all" query
                all_query = KiiQuery.queryWithClause();

                getAllCallbacks = {
                    success: function(query, tags, nextQuery){
                        app._setTags(tags);
                        if(callbacks && callbacks.success){
                            callbacks.success(query, tags, nextQuery);
                        }
                        resolve(query, tags, nextQuery);
                    },
                    failure: function(query, error){
                        reject(query, error)
                    }
                };

                // execute query
                return KiiPortalTag.executeQuery(app ,all_query, getAllCallbacks);
            });
        };


        /**
         * refresh a tag
         * @param callbacks
         * @returns {*|u}
         */
        KiiPortalTag.prototype.refresh = function(callbacks){
            return this._refresh(callbacks);
        };


        /**
         * remove a tag
         * @param callbacks
         * @returns {*|u}
         */
        KiiPortalTag.prototype.delete = function(callbacks){
            var _this = this;

            return new Promise(function(resolve, reject){
                var removeCallbacks, kiiApp;
                removeCallbacks = {
                    success: function(response){
                        kiiApp = _this.getKiiApp();
                        kiiApp._removeTag(_this);
                        if(callbacks && callbacks.success){
                            callbacks.success(_this);
                        }
                        resolve(_this);
                    },
                    failure: function(response){
                        if(callbacks && callbacks.failure){
                            callbacks.failure(response);
                        }
                        reject(response);
                    }
                };

                _super.prototype.delete.call(_this, removeCallbacks);
            });
        };

        /**
         * init KiiPortalTag
         * @return null
         */
        KiiPortalTag.prototype.init = function(){
            this.setName(this.get('name'));
            this.setDescription(this.get('description'));
            this.setThingIDs(this.get('thingIDs'));
            this.setCustomData(this.get('customData'));
        };

        KiiPortalTag.prototype.addThing = function(kiiThing){
            if(!this._things){
                this._things = [];
            }
            if(this.getThingIDs().indexOf(kiiThing.getThingID())>-1) return;
            this._things.push(kiiThing);
            this.addThingID(kiiThing.getThingID());
        };

        KiiPortalTag.prototype.addThingID = function(kiiThingID){
            if(!this._thingIDs){
                this._thingIDs = [];
                this.setThingIDs(this._thingIDs);
            }
            this._thingIDs.push(kiiThingID);
        };

        KiiPortalTag.prototype.removeThing = function(kiiThing){
            if(this.getThingIDs().indexOf(kiiThing.getThingID())==-1)return;
            this.removeThingID(kiiThing.getThingID());
            __remove(this._things, kiiThing);
        };

        KiiPortalTag.prototype.removeThingID = function(kiiThingID){
            __remove(this._thingIDs, kiiThingID);
        }

        KiiPortalTag.prototype.refreshThings = function(callbacks){
            var kiiApp, queryClause, inClause, _this, thingIDs;

            _this = this;
            kiiApp = this.getKiiApp();
            thingIDs = this.getThingIDs() || [];

            if(thingIDs.length == 0){
                return new Promise(function(resolve, reject){
                    _this.setThings([]);
                    _this.setNextThingQuery(null);

                    if(callbacks && callbacks.success){
                        callbacks.success([]);
                    }
                    resolve([]);
                });
            }

            inClause = KiiClause['in']('_thingID', thingIDs);

            return new Promise(function(resolve, reject){
                var tagThingCallbacks = {
                    success: function(response){

                        var things, query;
                        things = response.things;
                        query = response.query;

                        _this.setNextThingQuery(query);
                        _this.setThings(things);

                        if(callbacks && callbacks.failure){
                            callbacks.success(things);
                        }
                        resolve(things);
                    },
                    failure: function(error){
                        if(callbacks && callbacks.failure){
                            callbacks.failure(error);
                        }
                        reject(error);
                    }
                };

                KiiThingAdmin.query(kiiApp, null, inClause)
                    .then(tagThingCallbacks.success, tagThingCallbacks.failure);
            });
        };

        KiiPortalTag.prototype.nextThings = function(callbacks){
            var _this = this;

            return new Promise(function(){
                var kiiApp, nextThingQuery;

                kiiApp = _this.getKiiApp();
                nextThingQuery = {
                    success: function(response){
                        var things, query;
                        things = response.things;
                        nextQuery = response.query;

                        _this.setNextThingQuery(nextQuery);
                        _this.setThings(things);

                        if(callbacks && callbacks.failure){
                            callbacks.success(things);
                        }
                        resolve(things);
                    },
                    failure: function(error){
                        if(callbacks && callbacks.failure){
                            callbacks.failure(error);
                        }
                        reject(error);
                    }
                };

                KiiThingAdmin.query(kiiApp, callbacks, _this.getNextThingQuery())
                    .then(nextThingQuery.success, nextThingQuery.failure);
            });
        };

        return KiiPortalTag;
    })(KiiPortalObject);

/**
 * class user request
 */

root.KiiPortalUserQuery = (function(_super) {
    __inherits(KiiPortalUserQuery, _super);
    KiiPortalUserQuery.prototype.constructor = KiiPortalUserQuery;

    function KiiPortalUserQuery() {}

    KiiPortalUserQuery.queryName = 'userQuery';

    /**
     * override
     * @param  {[type]} kiiApp [description]
     * @param  {[type]} spec   [description]
     * @return {[type]}        [description]
     */
    KiiPortalUserQuery._getRequest = function(kiiApp, spec) {
        spec.headers = spec.headers || {};
        spec.headers['Content-Type'] = 'application/vnd.kii.userqueryrequest+json';

        return new KiiObjectRequest(kiiApp, spec);
    };

    /**
     * override
     * @param  {[type]} kiiApp [description]
     * @return {[type]}        [description]
     */
    KiiPortalUserQuery._generatePath = function(kiiApp) {
        return _super._generatePath.call(this, kiiApp) + '/users';
    };

    /**
     * override
     * @param  {[type]} data [description]
     * @return {[type]}      [description]
     */
    KiiPortalUserQuery._instantiate = function(data) {
        if (data === null) {
            return null;
        } else {
            return new KiiPortalUser(data);
        }
    };

    return KiiPortalUserQuery;
})(KiiPortalQuery);

root.KiiPortalUserRequest = (function(_super) {
    __inherits(KiiPortalUserRequest, _super);
    KiiPortalUserRequest.prototype.constructor = KiiPortalUserRequest;

    function KiiPortalUserRequest(spec) {
        var kiiApp = KiiPortalAdmin.getCurrentApp();
        KiiPortalUserRequest.prototype = new _super(kiiApp, spec);
        var _spec = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        };
        __extends(_spec, spec);
        this._appID = kiiApp.getAppID();
        this._appKey = kiiApp.getAppKey();
        this._token = kiiApp.getAdminContext()._token;
        this._url = Kii.getBaseURL() + '/apps/' + kiiApp.getAppID() + spec.extraUrl;
        this._data = _spec.data;
        this._method = _spec.method;
        this._headers = {};
        this._extHeaders = _spec.headers;
    }

    // KiiPortalUserRequest.prototype.execute = function(callbacks){
    //     _super.prototype.execute.call(this, callbacks);
    // };

    return KiiPortalUserRequest;
})(KiiObjectRequest);

root.KiiPortalUser = (function(_super) {
    __inherits(KiiPortalUser, _super);
    KiiPortalUser.prototype.constructor = KiiPortalUser;

    function KiiPortalUser(data) {
        // var _this = this;
        __bindMethod(this);
        this._info = data;
        // this._info = {};
        // this._info.userID = data.userID;
        // this._info.internalUserID = data.internalUserID;
        // this._info.loginName = data.loginName;
        // this._info.displayName = data.displayName;
        // this._info.country = data.country;
        // this._info.emailAddress = data.emailAddress;
        // this._info.emailAddressVerified = data.emailAddressVerified;
        // this._info.phoneNumber = data.phoneNumber;
        // this._info.phoneNumberVerified = data.phoneNumberVerified;
        // this._info.disabled = data.disabled;
        // this._info.createdAt = data.createdAt;
        // this._info.modifiedAt = data.modifiedAt;
        // this._info.passwordChangedAt = data.passwordChangedAt;
        // this._info._disabled = data._disabled;
        // this._info._hasPassword = data._hasPassword;
    };
    return KiiPortalUser;
})(KiiUserAdmin);

/**
 * Retrieve a list of KiiPortalUser
 * @param  {[type]} callbacks   [description]
 * @param  {[type]} queryClause [description]
 * @param  {[type]} dictVal     [description]
 * @return {[type]}             [description]
 */
KiiPortalUser.getUserList = function(callbacks, queryClause, dictVal) {
    return new Promise(function(resolve, reject) {
        var query;

        query = KiiPortalUserQuery.queryWithClause(queryClause);
        query.setDict(dictVal);

        var queryCallbacks = {
            success: function(query, users) {
                if (callbacks && callbacks.success) {
                    callbacks.success.apply(callbacks.success, arguments);
                }
                resolve({
                    query: query,
                    users: users
                });
            },
            failure: function(query, error) {
                if (callbacks && callbacks.failure) {
                    callbacks.failure.apply(callbacks.failure, arguments);
                }
                reject({
                    query: query,
                    error: error
                });
            }
        };
        var kiiApp = KiiPortalAdmin.getCurrentApp();
        return KiiPortalUserQuery.executeQuery(kiiApp, query, queryCallbacks);
    });
};

/**
 * Find registered KiiPortalUser with userID
 * @param  {[type]} userID [description]
 * @return {[type]}        [description]
 */
KiiPortalUser.findUserByUserID = function(userID) {
    return new Promise(function(resolve, reject) {
        var spec = {
            extraUrl: '/users/' + userID
        };

        var request = new KiiPortalUserRequest(spec);
        request.execute().then(function(response) {
            resolve(new KiiPortalUser(response.data));
        }, function(error) {
            reject(error);
        });
    });
};

/**
 * Register a user
 * @param  {[type]} data [user data]
 * @return {[type]}      [description]
 */
KiiPortalUser.prototype.register = function(data) {
    var _self = this;
    return new Promise(function(resolve, reject) {
        var _data = {
            'loginName': _self._info.loginName,
            'password': _self._info.password,
            'displayName': _self._info.displayName,
            'emailAddress': _self._info.emailAddress,
            'phoneNumber': _self._info.phoneNumber,
            'country': _self._info.country,
            'phoneNumberVerified': null,
            'emailAddressVerified': null,
            'createdAt': null,
            'modifiedAt': null
        };
        if (!_data.country) delete _data.country;

        var spec = {
            data: _data,
            method: 'POST',
            headers: {
                'Content-Type': 'application/vnd.kii.RegistrationRequest+json',
            },
            extraUrl: '/users'
        };

        var request = new KiiPortalUserRequest(spec);
        request.execute().then(function(response) {
            resolve(response);
        }, function(error) {
            reject(error);
        });
    });
};

/**
 * Delete the user from the server
 * @return {[type]}      [description]
 */
KiiPortalUser.prototype.delete = function() {
    var _self = this;
    return new Promise(function(resolve, reject) {
        var spec = {
            method: 'DELETE',
            extraUrl: '/users/' + _self.getID()
        };

        var request = new KiiPortalUserRequest(spec);
        request.execute().then(function(response) {
            resolve(response);
        }, function(error) {
            reject(error);
        });
    });
};

/**
 * Get the ID of the current KiiPortalUser instance
 * @return {[type]} [description]
 */
KiiPortalUser.prototype.getID = function() {
    return this._info.userID;
};

/**
 * Retrieve a list of groups which the user is a member of
 * @return {[type]} [description]
 */
KiiPortalUser.prototype.memberOfGroups = function() {
    var _self = this;
    return new Promise(function(resolve, reject) {
        var spec = {
            headers: {
                'Content-Type': 'application/vnd.kii.GroupsRetrievalResponse+json',
            },
            extraUrl: '/groups?is_member=' + _self.getID()
        };

        var request = new KiiPortalUserRequest(spec);
        request.execute().then(function(response) {
            resolve(response);
        }, function(error) {
            reject(error);
        });
    });
};

/**
 * Retrieve the groups owned by this user
 * @param  {[type]} userID [description]
 * @return {[type]}        [description]
 */
KiiPortalUser.prototype.ownerOfGroups = function() {
    var _self = this;
    return new Promise(function(resolve, reject) {
        var spec = {
            headers: {
                'Content-Type': 'application/vnd.kii.GroupsRetrievalResponse+json',
            },
            extraUrl: '/groups?owner=' + _self.getID()
        };

        var request = new KiiPortalUserRequest(spec);
        request.execute().then(function(response) {
            resolve(response);
        }, function(error) {
            reject(error);
        });
    });
};

/**
 * Resend the email/SMS verification code to the user
 * @param  {[string]}  [EMAIL / SMS]
 * @return {[type]}      [description]
 */
KiiPortalUser.prototype.resetPassword = function(data) {
    var _self = this;
    return new Promise(function(resolve, reject) {
        var _data = {
            'notificationMethod': data
        };

        var spec = {
            data: _data,
            method: 'POST',
            headers: {
                'Content-Type': 'application/vnd.kii.ResetPasswordRequest+json',
            },
            extraUrl: '/users/' + _self.getID() + '/password/request-reset'
        };

        var request = new KiiPortalUserRequest(spec);
        request.execute().then(function(response) {
            resolve(response);
        }, function(error) {
            reject(error);
        });
    });
};

/**
 * toggle user active/suspended status
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
KiiPortalUser.prototype.toggleUserStatus = function(data) {
    var _self = this;
    return new Promise(function(resolve, reject) {
        var spec = {
            data: data,
            method: 'PUT',
            headers: {
                'Content-Type': 'application/vnd.kii.UserStatusUpdateRequest+json',
            },
            extraUrl: '/users/' + _self.getID() + '/status'
        };

        var request = new KiiPortalUserRequest(spec);
        request.execute().then(function(response) {
            resolve(response);
        }, function(error) {
            reject(error);
        });
    });
};

/**
 * update user data
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
KiiPortalUser.prototype.update = function(data) {
    var _self = this;
    return new Promise(function(resolve, reject) {
        var spec = {
            data: data,
            method: 'POST',
            headers: {
                'Content-Type': 'application/vnd.kii.UserUpdateRequest+json',
            },
            extraUrl: '/users/' + _self.getID()
        };

        var request = new KiiPortalUserRequest(spec);
        request.execute().then(function(response) {
            resolve(response);
        }, function(error) {
            reject(error);
        });
    });
};
    /**
     * Thing request
     */
    root.KiiThingAdminQuery = (function(_super){

        __inherits(KiiThingAdminQuery, _super);
        KiiThingAdminQuery.prototype.constructor = KiiThingAdminQuery;

        function KiiThingAdminQuery(query){
            /*
            var _this = this;
            __each(KiiPortalFirmware.prototype, function(value, key){
                if(__isFunction(value))
                    _this[key] = __bind(value, _this);
            });

            return this._clone(query);
            */
        };

        KiiThingAdminQuery.queryName = 'thingQuery';

        /**
         * override
         * @param  {[type]} kiiApp [description]
         * @param  {[type]} spec   [description]
         * @return {[type]}        [description]
         */
        KiiThingAdminQuery._getRequest = function(kiiApp, spec){
            spec.headers = spec.headers || {};
            spec.headers["Content-Type"] = "application/vnd.kii.thingqueryrequest+json";

            return new KiiObjectRequest(kiiApp, spec);
        };

        /**
         * override
         * @param  {[type]} kiiApp [description]
         * @return {[type]}        [description]
         */
        KiiThingAdminQuery._generatePath = function(kiiApp){
            return _super._generatePath.call(this, kiiApp) + '/things';
        };

        /**
         * override
         * @param  {[type]} data [description]
         * @return {[type]}      [description]
         */
        KiiThingAdminQuery._instantiate = function(data){
            return new KiiThingAdmin(data);
        };

        return KiiThingAdminQuery;
    })(KiiPortalQuery);

    KiiThingAdmin.query = function(kiiApp, callbacks, queryClause, dictVal){
        return new Promise(function(resolve, reject){
            var query;

            query = KiiThingAdminQuery.queryWithClause(queryClause);
            query.setDict(dictVal);

            var queryCallbacks = {
                success: function(query, things){
                    kiiApp._setThings(things);

                    if(callbacks && callbacks.success){
                        callbacks.success.apply(callbacks.success, arguments);
                    }
                    resolve({query: query, things: things});
                },
                failure: function(query, error){
                    if(callbacks && callbacks.failure){
                        callbacks.failure.apply(callbacks.failure, arguments);
                    }
                    reject({query: query, error: error});
                }
            };

            return KiiThingAdminQuery.executeQuery(kiiApp, query, queryCallbacks);
        });
    };

    KiiThingAdmin._nextWithApp = function(kiiApp, callbacks, nextQuery){
        return new Promise(function(resolve, reject){
            var queryCallbacks = {
                success: function(query, things){
                    kiiApp.addThings(things);
                    resolve({query:query, things: kiiApp.getThings()});
                },
                failure: function(query, error){
                    reject({query:query, error: error});
                }
            };

            KiiThingAdminQuery.executeQuery(kiiApp, nextQuery, queryCallbacks);
        });
    };

    KiiThingAdmin.prototype.save = function(callbacks){
        var _this = this,
            createFlag = false;
        return new Promise(function(resolve, reject){
            var spec, request, data, kiiApp;

            var ThingKeys = [
                '_globalThingID', '_vendorThingID', '_vendor', '_disabled', '_created',
                '_Iot', '_productName', '_thingID', '_firmwareVersion', '_thingType'
            ];

            kiiApp = KiiPortalAdmin.getCurrentApp();

            data = {
                _created: _this.getCreated(),
                _disabled: _this.getDisabled(),
                _layoutPosition: "STANDALONE",
                _thingID: _this.getThingID(),
                _thingType: _this.fields._thingType,
                _vendorThingID: _this.getVendorThingID()
            };

            __each(_this.fields, function(value, key){
                data[key] = value;
            });


            if(!_this.getThingID()){
                createFlag = true;
            }

            if(createFlag){
                spec = {
                    data: data,
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/vnd.kii.ThingRegistrationAndAuthorizationRequest+json',
                    },
                    url: Kii.getBaseURL() + '/apps/' + kiiApp.getAppID() + '/things'
                };

                var request = new KiiObjectRequest(kiiApp, spec);

                request.execute().then(function(response){
                    kiiApp.addThing(_this);
                    _this._renewThingFields(response.data);
                    resolve(_this);
                }, function(error){
                    reject(error);
                });

            } else {
                spec = {
                    data: data,
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/vnd.kii.ThingUpdateRequest+json',
                    },
                    url: Kii.getBaseURL() + '/apps/' + kiiApp.getAppID() + '/things/' + _this.getThingID()
                };

                var request = new KiiObjectRequest(kiiApp, spec);

                request.execute().then(function(response){
                    resolve(response);
                }, function(error){
                    reject(error);
                });
            }

           
        });
    };

    /**
     * remove thing
     * @param  {[type]} callbacks [description]
     * @return {[type]}           [description]
     */
    KiiThingAdmin.prototype.remove = function(callbacks){
        var _this = this;
        return new Promise(function(resolve, reject){
            var spec;

            spec = {
                method: 'DELETE',
                url: Kii.getBaseURL() + '/apps/' + kiiApp.getAppID() + '/things/' + _this.getThingID()
            };

            var request = new KiiObjectRequest(kiiApp, spec);

            request.execute().then(function(response){
                kiiApp.removeThing(_this);
                if(callbacks && callbacks.success){
                    callbacks.success(_this);
                }
                resolve(_this);
            }, function(error){
                if(callbacks && callbacks.failure){
                    callbacks.failure(error);
                }
                reject(error);
            });
        });
    };


})();