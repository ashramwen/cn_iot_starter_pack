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
        KiiPortalApp.prototype.queryUsers = function(callbacks, queryClause, dictVal){
            return KiiPortalUser.queryUsers(this, callbacks, queryClause, dictVal);
        };
        KiiPortalApp.prototype.queryUserByID = function(callbacks, queryClause, dictVal){
            return KiiPortalUser.queryUserByID(this, callbacks, queryClause, dictVal);
        };
        KiiPortalApp.prototype.addUser = function(data){
            return KiiPortalUser.addUser(this, data);
        };
        KiiPortalApp.prototype.updateUser = function(userID, data){
            return KiiPortalUser.updateUser(this, userID, data);
        };
        KiiPortalApp.prototype.suspendUser = function(userID, data){
            return KiiPortalUser.suspendUser(this, userID, data);
        };
        KiiPortalApp.prototype.resetPasswordBySms = function(userID, data){
            return KiiPortalUser.resetPasswordBySms(this, userID, data);
        };
        KiiPortalApp.prototype.resetPasswordByEmail = function(userID, data){
            return KiiPortalUser.resetPasswordByEmail(this, userID, data);
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

        KiiPortalApp.prototype.addThings = function(things){
            this._things = this._things || [];
            this._things = this._things.concat(things);
        };

        /* =================================== end of things ======================================================= */
        return KiiPortalApp;
    })();

