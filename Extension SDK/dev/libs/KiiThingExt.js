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

    KiiThingAdmin._baseUrl = '/things'; 

    KiiThingAdmin.getBaseURL = function(){
        return KiiPortalAdmin.getCurrentApp().getBaseURL() + KiiThingAdmin._baseUrl;
    };

    KiiThingAdmin.getThingIFURL = function(){
        return KiiPortalAdmin.getCurrentApp().getThingIFURL();
    };

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
            var spec, kiiApp;

            kiiApp = KiiPortalAdmin.getCurrentApp();
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

