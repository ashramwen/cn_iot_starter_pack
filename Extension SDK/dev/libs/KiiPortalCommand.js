    root.KiiPortalCommand = (function(){

        function KiiPortalCommand(user, thing, command){
            var _this = this;
            this._kiiApp = KiiPortalAdmin.getCurrentApp();

            __extends(this, {
                '_commandID': '', // default empty
                '_issuer': 'user:', //KiiUser UUID
                '_target': 'thing:', //KiiThing ID
                '_actions': [], 
                '_schema': '', // a string
                '_schemaVersion': '', // a integer
                '_title': '',
                '_description': '',
                '_metadata': {},
                '_created': null,
                '_modified': null
            })

            this._init(user, thing, command);
        }

        KiiPortalCommand.prototype._init = function(user, thing, command){
            if(command){
                __extends(this, {
                    _commandID: command.commandID,
                    _issuer: command._issuer,
                    _target: command.target,
                    _actions: [],
                    _schema: command.schema,
                    _title: command.title,
                    _description: command.description,
                    _metadata: command.metadata,
                    _created: command._created,
                    _modified: command._modified
                });

                if(command.actions){
                    var actions = [];
                    __each(command.actions, function(action){
                        var commandAction = new KiiPortalCommandAction();
                        commandAction.dataset = action;
                        actions.push(commandAction);
                    });
                    this._actions = actions;
                }

                if(command.actionResults){
                    var actionResults = [];
                    __each(command.actionResults, function(result){
                        var actionResult = new KiiPortalActionResult(result);
                        actionResults.push(actionResult);
                    });
                    this._actionResults = actionResults;
                }
            }
            
            this._thing = thing;
            this._user = user;
        };

        KiiPortalCommand.prototype.addAction = function(action){
            this._actions = this.actions || [];
            this._actions.push(action);
        };

        /**
         * set command schema
         * @param {[KiiPortalSchema]} schema [description]
         */
        KiiPortalCommand.prototype._setSchema = function(schema){
            this._schema = schema.id;
            this._schemaVersion = schema.getVersion();
        };

        KiiPortalCommand.prototype.getSchema = function(){
            return this._schema;
        };

        KiiPortalCommand.prototype.getSchemaVersion = function(){
            return this._schemaVersion;
        };

        KiiPortalCommand.prototype.setTitle = function(title){
            this._title = title;
        };

        KiiPortalCommand.prototype.getTitle = function(){
            return this._title;
        }

        KiiPortalCommand.prototype.setDescription = function(description){
            this._description = description;
        };

        KiiPortalCommand.prototype.getDescription = function(){
            return this._description;
        };

        KiiPortalCommand.prototype.setThing = function(thing){
            this._thing = thing;
        };

        KiiPortalCommand.prototype.setMetaData = function(meta){
            this._metadata = meta;
        };

        KiiPortalCommand.prototype.getMetaData = function(){
            return this._metadata;
        };

        KiiPortalCommand.prototype.getActionResults = function(){
            return this._actionResults;
        };

        /**
         * purify data for sending
         * @return {[type]} [description]
         */
        KiiPortalCommand.prototype._purify = function(){
            var _this = this,
                actions = [];

            __each(this._actions, function(action){
                actions.push(action._purify());
            });

            return{
                'target': 'thing:' + _this._thing.getThingID(),
                'actions': actions,
                'schema': _this._schema,
                'schemaVersion': _this._schemaVersion,
                'title': _this.getTitle(),
                'description': _this.getDescription(),
                'metadata': _this.getMetaData(),
                'issuer': 'user:' + _this._user.getUUID()
            };
        };

        KiiPortalCommand._withThing = function(user, thing, callbacks){
            return new Promise(function(resolve, reject){
                var spec, kiiApp;

                kiiApp = KiiPortalAdmin.getCurrentApp();
                spec = {
                    method: 'GET',
                    url: KiiThingAdmin._getThingIFURL() + '/targets/thing:' + thing.getThingID() + '/commands',
                    headers: {
                        Authorization: 'Bearer ' + user.getAccessToken()
                    }
                };

                var request = new KiiObjectRequest(kiiApp, spec);

                request.execute().then(function(response){
                    var commands = [];
                    __each(response.data.commands, function(command){
                        commands.push(new KiiPortalCommand(user, thing, command));
                    });

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

        KiiPortalCommand.prototype._getAccessToken = function(){
            return 'Bearer ' + this._user.getAccessToken();
        };

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

                url = _this._kiiApp._getThingIFURL() + '/targets/thing:'
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
                    _this._init(_this._user, _this._thing, response.data);

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
         * send command
         * @param  {[type]} callbacks [description]
         * @return {[type]}           [description]
         */
        KiiPortalCommand.prototype.send = function(callbacks){
            var _this = this;
            return new Promise(function(resolve, reject){
                var spec, url;
                
                url = _this._kiiApp._getThingIFURL() + '/targets/thing:' + _this._thing.getThingID() + '/commands';
                spec = {
                    url: url,
                    method: 'POST',
                    data: _this._purify(),
                    headers: {
                        Authorization: _this._getAccessToken()
                    }
                };

                var request = new KiiObjectRequest(_this._kiiApp, spec);

                request.execute().then(function(response){
                    _this._init(_this._user, _this._thing, response.data);
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

    /**
     * command action
     * @param schemaProperty
     */
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

            Object.defineProperties(this, {
                dataset: {
                    set: function(data){
                        var key = Object.keys(data)[0];
                        data = data[key];
                        key = Object.keys(data)[0];
                        value = data[key];
                        this.value = value;
                        this.property = key;
                    }
                }
            });
        }

        KiiPortalCommandAction.prototype.setValue = function(value){
            this.value = value;
        };

        KiiPortalCommandAction.prototype._purify = function(){
            var actionValue = {},
                actionName = 'set' + this.property.replace(/(?:^|\s)\S/g, 
                  function(a) { return a.toUpperCase(); });

            actionValue[actionName] = {};
            actionValue[actionName][this.property] = this.value;

            return actionValue;
        };

        return KiiPortalCommandAction;
    })();


    root.KiiPortalActionResult = (function(){

        function KiiPortalActionResult(actionResult){
            __extends(this, {
                _actionName: '',
                _succeeded: false, // required. Specify if the action execution was a success.
                _errorMessage: '', // An additional message for describing the cause of action execution failure.
                _data: null // A custom data.
            });

            Object.defineProperties(this, {
                actionName:{
                    get: function(){
                        return this._actionName;
                    }
                },
                succeeded: {
                    get: function(){
                        return this._succeeded;
                    }
                },
                errorMessage: {
                    get: function(){
                        return this._errorMessage;
                    }
                },
                data: {
                    get: function(){
                        return this._data;
                    }
                },
                dataset: {
                    set: function(result){
                        var actionName = Object.keys(result)[0];
                        this._actionName = actionName;
                        this._succeeded = result[actionName].succeeded;
                        this._errorMessage = result[actionName].errorMessage;
                        this._data = result[actionName].data;
                    },
                    get: function(){
                        var result = {},
                            _this = this;
                        result[this.actionName] = {
                            succeeded: _this._succeeded,
                            errorMessage: _this._errorMessage,
                            data: _this._data
                        };

                        return result;
                    }
                }
            });

            if(actionResult){
                this.fullResult = actionResult;
            }
        }

        return KiiPortalActionResult;
    })();