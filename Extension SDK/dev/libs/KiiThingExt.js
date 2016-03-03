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

            return new KiiPortalRequest(kiiApp, spec);
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
                    __each(things, function(thing){
                        thing._kiiApp = kiiApp;
                    });

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

    KiiThingAdmin._withApp = function(kiiApp, callbacks){
        return new Promise(function(resolve, reject){

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

            KiiThingAdmin.query(kiiApp, queryCallbacks, null);
        });
    };

    KiiThingAdmin.prototype.save = function(callbacks){
        var _this = this;
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

            spec = {
                data: data,
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/vnd.kii.ThingUpdateRequest+json',
                },
                url: Kii.getBaseURL() + '/apps/' + kiiApp.getAppID() + '/things/' + _this.getThingID()
            };

            var request = new KiiPortalRequest(kiiApp, spec);

            request.execute().then(function(response){
                resolve(response);
            }, function(error){
                reject(error);
            });
        });
    };

