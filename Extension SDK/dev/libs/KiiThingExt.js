    /**
     * Thing request
     */
    root.KiiThingAdminQuery = (function(_super){

        __inherits(KiiThingAdminQuery, _super);
        KiiThingAdminQuery.prototype.constructor = KiiThingAdminQuery;

        function KiiThingAdminQuery(query){
            
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

    KiiThingAdmin.getThingsByModel = function(model, callbacks){
        var queryClause = KiiClause.equals('_productName', model.getName());

        return KiiThingAdmin.query(model.getKiiApp(), callbacks, queryClause);
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
                    url: KiiThingAdmin.getBaseURL()
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
                    url: KiiThingAdmin.getBaseURL() + '/' + _this.getThingID()
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
                url: KiiThingAdmin.getBaseURL() + '/' + _this.getThingID()
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

    /**
     * enable thing
     * @return {[type]} [description]
     */
    KiiThingAdmin.prototype.enable = function(callbacks){
        var _this = this;

        return new Promise(function(resolve, reject){
            var spec, kiiApp, enableCallbacks, request;

            kiiApp = KiiPortalAdmin.getCurrentApp();
            spec = {
                headers: {
                    'Content-Type': 'application/vnd.kii.ThingStatusUpdateRequest+json'
                },
                method: 'PUT',
                url: KiiThingAdmin.getBaseURL() + '/' + _this.getThingID() + '/status',
                data: {disabled: false}
            };

            var enableCallbacks = {
                success: function(states){
                    _this._disabled = false;
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
            }

            request = new KiiObjectRequest(kiiApp, spec);
            request.execute().then(enableCallbacks.success, enableCallbacks.failure);
        });
    };

    /**
     * disable thing
     * @return {[type]} [description]
     */
    KiiThingAdmin.prototype.disable = function(callbacks){
        var _this = this;

        return new Promise(function(resolve, reject){
            var spec, kiiApp, enableCallbacks, request;

            kiiApp = KiiPortalAdmin.getCurrentApp();
            spec = {
                headers: {
                    'Content-Type': 'application/vnd.kii.ThingStatusUpdateRequest+json'
                },
                method: 'PUT',
                url: KiiThingAdmin.getBaseURL() + '/' + _this.getThingID() + '/status',
                data: {disabled: true}
            };

            var disableCallbacks = {
                success: function(states){
                    _this._disabled = true;
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
            }

            request = new KiiObjectRequest(kiiApp, spec);
            request.execute().then(disableCallbacks.success, disableCallbacks.failure);
        });
    };

    /**
     * get model's name. by protocal contract, _productName is assigned to model name.
     * @return {[String]} [model name]
     */
    KiiThingAdmin.prototype.getModelName = function(){
        return this.fields._productName;
    };

    KiiThingAdmin.prototype.getFirmwareVersion = function(){
        return this.fields._firmwareVersion;
    };

    KiiThingAdmin.prototype.getOnline = function(){
        return this.fields._online;
    };

    KiiThingAdmin.prototype.refreshModel = function(){
        return KiiPortalModel.refreshByName(KiiPortalAdmin.getCurrentApp(), this.getModelName());
    };

    KiiThingAdmin.prototype.setModelName = function(modelName){
        this.fields._productName = modelName;
    };

    KiiThingAdmin.prototype.setFirmwareVersion = function(version){
        this.fields._firmwareVersion = version;
    };

    /**
     * set thing commands
     */
    KiiThingAdmin.prototype._setCommands = function(commands){
        this._commands = commands;
    };

    /**
     * add thing command
     */
    KiiThingAdmin.prototype._addCommand = function(command){
        this._commands = this._commands || [];
        this._commands.push(command);
    };

    /**
     * get thing commands
     * @return {[KiiPortalCommand]}
     */
    KiiThingAdmin.prototype.getCommands = function(){
        return this._commands;
    };

    /**
     * refresh thing's commands
     * @return {[KiiPortalCommand]}
     */
    KiiThingAdmin.prototype.refreshCommands = function(user, callbacks){
        var _this = this;
        return new Promise(function(resolve, reject){
            var spec, kiiApp;

            kiiApp = KiiPortalAdmin.getCurrentApp();
            spec = {
                method: 'GET',
                url: KiiThingAdmin.getThingIFURL() + '/targets/thing:' + _this.getThingID() + '/commands',
                headers: {
                    Authorization: 'Bearer ' + user.getAccessToken()
                }
            };

            var request = new KiiObjectRequest(kiiApp, spec);

            request.execute().then(function(response){
                var commands = [];
                __each(response.data.commands, function(command){
                    commands.push(new KiiPortalCommand(user, _this, command));
                });
                _this._setCommands(commands);

                if(callbacks && callbacks.success){
                    callbacks.success(commands);
                }
                resolve(commands);
            }, function(error){
                if(callbacks && callbacks.failure){
                    callbacks.failure(error);
                }
                reject(error);
            });
        });
    };

    /**
     * create a blank command
     * @return KiiPortalCommand
     */
    KiiThingAdmin.prototype.createCommand = function(user, schema){
        var command = new KiiPortalCommand(user, this, null);
        command._setSchema(schema);
        return command;
    };

    /**
     * device onboarding 
     * @param  {[KiiUser]} user          [description]
     * @param  {[type]} thingPassword [description]
     * @param  {[type]} callbacks     [description]
     * @return {[type]}               [description]
     */
    KiiThingAdmin.prototype.onboard = function(user, thingPassword, callbacks){
        var _this = this;

        return new Promise(function(resolve, reject){
            var spec, url;
            url = this.getThingIFURL() + '/onboardings';
            spec = {
                url: url,
                method: 'POST',
                data: {
                    thingPassword: thingPassword,
                    owner: 'user:' + user.getUUID(),
                    vendorThingID: _this.getVendorThingID()
                }
            };

            var request = new KiiObjectRequest(kiiApp, spec);

            request.execute().then(function(response){
                if(callbacks && callbacks.success){
                    callbacks.success(response);
                }
                resolve(response);
            }, function(error){
                if(callbacks && callbacks.failure){
                    callbacks.failure(error);
                }
                reject(error);
            });
        });
    };

    /*============================= Thing State related  */

    KiiThingAdmin.prototype.setStates = function(states){
        this._states = states;
    };

    KiiThingAdmin.prototype.getStates = function(){
        if(this._states){
            return this._states.getState();
        }
        return [];
    };

    /**
     * refresh thing states
     * @return {[type]} [description]
     */
    KiiThingAdmin.prototype.refreshStates = function(callbacks){
        var _this = this;

        return new Promise(function(resolve, reject){
            var refreshCallbacks = {
                success: function(states){
                    _this.setStates(states);
                    if(callbacks && callbacks.success){
                        callbacks.success(_this.getStates());
                    }
                    resolve(_this.getStates());
                },
                failure: function(error){
                    if(callbacks && callbacks.failure){
                        callbacks.failure(error);
                    }
                    reject(error);
                }
            };

            KiiPortalThingState.refreshByThingID(_this.getThingID())
                .then(refreshCallbacks.success, refreshCallbacks.failure);
        });
    };

    /*============================= Thing Trigger related  */

    KiiThingAdmin.prototype.getTriggers = function(){
        return this._triggers;
    };

    KiiThingAdmin.prototype._setTriggers = function(triggers){
        this._triggers = triggers;
    };

    KiiThingAdmin.prototype.addTrigger = function(trigger){
        this._triggers = this._triggers || [];
    };

    KiiThingAdmin.prototype.refreshTriggers = function(callbacks){
        var _this = this;

        return new Promise(function(resolve, reject){
            var refreshCallbacks = {
                success: function(triggers){
                    _this._setTriggers(triggers);
                    if(callbacks && callbacks.success){
                        callbacks.success(triggers);
                    }
                    resolve(triggers);
                },
                failure: function(){
                    if(callbacks && callbacks.failure){
                        callbacks.failure(error);
                    }
                    reject(error);
                }
            };
        });
    };


