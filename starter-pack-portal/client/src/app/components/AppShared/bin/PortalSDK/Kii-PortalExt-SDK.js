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
                        response = {status: status, data: data};
                        if (success) {
                            success(response);
                        }
                        resolve(response);
                    } else {
                        var response, status, data;

                        status = xmlhttp.statusText;
                        data = JSON.parse(xmlhttp.responseText);
                        response = {status: status, data: data};
                        if (failure) {
                            failure(response);
                        }
                        reject(xmlhttp.response ,response);
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

    var DevelopmentSettings = {
        SERVER_ADDRESS: 'https://qa21.internal.kii.com/api'
    };

        

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
            return (DevelopmentSettings.SERVER_ADDRESS || kiiApp.getSiteURL())+ '/apps/' + kiiApp.getAppID();
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

  return KiiPortalUtilities;

})();

    //<!-- components:js --><!-- injection:end -->
})();