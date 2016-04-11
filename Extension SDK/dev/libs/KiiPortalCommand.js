    root.KiiPortalCommand = (function(){

        function KiiPortalCommand(user, thing, command){
            var _this = this;
            this._kiiApp = KiiPortalAdmin.getCurrentApp();
            this._thing = thing || null;
            this._user = user;

            __extends(this, {
                'commandID': '', // default empty
                'issuer': 'user:', //KiiUser UUID
                'target': 'thing:', //KiiThing ID
                'actions': [], 
                'schema': '', // a string
                'schemaVersion': '', // a integer
                'title': '',
                'description': '',
                'metadata': {},
                'created': null,
                'modified': null
            })

            if(command){
                __extends(this, command);
            }
        }

        KiiPortalCommand.prototype.init = function(user, thing, command){
            __extends(this, command);
            this._thing = thing;
            this._user = user;
        };

        KiiPortalCommand.prototype.addAction = function(action){
            this.actions = this.actions || [];
            this.actions.push(action);
        };

        /**
         * set command schema
         * @param {[KiiPortalSchema]} schema [description]
         */
        KiiPortalCommand.prototype._setSchema = function(schema){
            this.schema = schema.id;
            this.schemaVersion = schema.getVersion();
        };

        KiiPortalCommand.prototype.setTitle = function(title){
            this.title = title;
        };

        KiiPortalCommand.prototype.getTitle = function(){
            return this.title;
        }

        KiiPortalCommand.prototype.setDescription = function(description){
            this.description = description;
        };

        KiiPortalCommand.prototype.getDescription = function(){
            return this.description;
        };

        KiiPortalCommand.prototype.setThing = function(thing){
            this._thing = thing;
        };

        KiiPortalCommand.prototype.setMetaData = function(meta){
            this.metadata = meta;
        };

        KiiPortalCommand.prototype.getMetaData = function(){
            return this.metadata;
        }

        /**
         * purify data for sending
         * @return {[type]} [description]
         */
        KiiPortalCommand.prototype.purify = function(){
            var _this = this,
                actions = [];

            __each(this.actions, function(action){
                actions.push(action.produce());
            });

            return{
                'target': 'thing:' + _this._thing.getThingID(),
                'actions': _this.actions,
                'schema': _this.schema,
                'schemaVersion': _this.schemaVersion,
                'title': _this.getTitle(),
                'description': _this.getDescription(),
                'metadata': _this.getMetaData(),
                'issuer': 'user:' + _this._user.getUUID()
            };
        };

        KiiPortalCommand.prototype._getAccessToken = function(){
            return 'Bearer ' + this._user.getAccessToken();
        }

        /**
         * refresh command by its ID
         * @return {[type]} [description]
         */
        KiiPortalCommand.refreshByID = function(user, thing, commandID, callbacks) {
            var command = new KiiPortalCommand(user, thing, {commandID: commandID});
            return command.refresh(callbacks);
        };

        /**
         * refresh
         * @param  {[type]} callbacks [description]
         * @return {[type]}           [description]
         */
        KiiPortalCommand.prototype.refresh = function(callbacks){
            var _this = this;
            return new Promise(function(resolve, reject){
                var spec, url, headers;

                url = _this._kiiApp.getThingIFURL() + '/targets/thing:'
                    + _this._thing.getThingID() + '/commands/' + commandID;
                headers = {
                    Authorization: _this._getAccessToken()
                };

                spec = {
                    url: url,
                    headers: headers,
                    method: 'GET'
                };

                var request = new KiiObjectRequest(_this._kiiApp, spec);

                request.execute().then(function(response){
                    _this.init(_this._user, _this._thing, response.data);

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

        KiiPortalCommand.prototype.send = function(callbacks){
            var _this = this;
            return new Promise(function(resolve, reject){
                var spec, url;
                
                url = _this._kiiApp.getThingIFURL() + '/targets/thing:' + _this._thing.getThingID() + '/commands';
                spec = {
                    url: url,
                    method: 'POST',
                    data: _this.purify(),
                    headers: {
                        Authorization: _this._getAccessToken()
                    }
                };

                var request = new KiiObjectRequest(_this._kiiApp, spec);

                request.execute().then(function(response){
                    _this.init(_this._user, _this._thing, response.data);
                    _this._thing._addCommand(_this);
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

        return KiiPortalCommand;
    })();

    root.KiiPortalCommandAction = (function(){

        function KiiPortalCommandAction(schemaProperty){
            this.property = '';
            this.value = '';
            this.type = '';
            this.min = null;
            this.max = null;

            if(schemaProperty){
                this.property = schemaProperty.key;
                this.type = schemaProperty.key;
                this.min = schemaProperty.min;
                this.max = schemaProperty.max;
            }
        }

        KiiPortalCommandAction.prototype.setValue = function(value){
            this.value = value;
        };

        KiiPortalCommandAction.prototype.produce = function(){
            var actionValue = {},
                actionName = 'set' + this.property.replace(/(?:^|\s)\S/g, 
                  function(a) { return a.toUpperCase(); });

            actionValue[actionName] = {};
            actionValue[actionName][this.property] = this.value;

            return actionValue;
        };

        return KiiPortalCommandAction;
    })();


    root.KiiPortalCommandResult = (function(){

        function KiiPortalCommandResult(commandResult){
            this.succeeded = false; // required. Specify if the action execution was a success.
            this.errorMessage = ''; // An additional message for describing the cause of action execution failure.
            this.data = null; // A custom data.

            __extends(this, commandResult);
        }

        return KiiPortalCommandResult;
    })();