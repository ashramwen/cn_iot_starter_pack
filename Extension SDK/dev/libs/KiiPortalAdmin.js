
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
                KiiPortalApp._withAdmin(_this, refreshAppsCallbacks);
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
                        Kii.initializeWithSite(app.getAppID(), app.getAppKey(), DevelopmentSettings.SERVER_ADDRESS || app.getSiteURL());

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

