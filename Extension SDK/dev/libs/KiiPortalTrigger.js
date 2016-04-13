
    root.KiiPortalTrigger = (function(){

        function KiiPortalTrigger(user, kiiThing, trigger){
            this._thing = kiiThing;
            this._user = user;

            __extends(this, {
                _predicate: new KiiPortalTriggerPredicator(),
                _metadata: null,
                _description: '',
                _triggersWhat: 'COMMAND',
                _triggerID: null
            });

            this._init(user, kiiThing, trigger);
        }

        KiiPortalTrigger.prototype._init = function(user, kiiThing, trigger){
            this._setUser(user);
            this._setThing(kiiThing);

            if(trigger){
                this._setTriggerID(trigger.triggerID);
                this.setPredicate(new KiiPortalTriggerPredicator(trigger.predicate));
                this.setMetaData(trigger.metadata);
                this.setDescription(trigger.description);
                this._setDisabled(trigger.disabled);
                this.setTriggersWhat(trigger.triggersWhat);
                this.setTitle(trigger.title);
                this.setCommand(new KiiPortalCommand(user, kiiThing, trigger.command));
            }
        };

        KiiPortalTrigger.prototype._setThing = function(thing){
            this._thing = thing;
        };

        KiiPortalTrigger.prototype._getThing = function(){
            return this._thing;
        }

        KiiPortalTrigger.prototype._setUser = function(user){
            this._user = user;
        };

        KiiPortalTrigger.prototype._getUser = function(){
            return this._user;
        };

        KiiPortalTrigger.prototype.getFullURL = function(){
            return KiiPortalTrigger.getBaseURL() + '/' + this.getTriggerID();
        };

        KiiPortalTrigger.prototype.getBaseURL = function(){
            return KiiPortalTrigger.getBaseURL(this._thing);
        };

        KiiPortalTrigger.getBaseURL = function(thing){
            return KiiThingAdmin.getThingIFURL() + '/targets/thing:' + thing.getThingID() + '/triggers';
        };

        KiiPortalTrigger._withThing = function(thing, callbacks){
            return new Promise(function(resolve, reject){
                var kiiApp, spec, url, refreshTriggersCallbacks, request;

                kiiApp = KiiPortalAdmin.getCurrentApp();
                url = KiiPortalTrigger.getBaseURL(thing);
                spec = {
                    url: url,
                    method: 'GET'
                };

                refreshTriggersCallbacks = {
                    success: function(response){
                        console.log(response);
                    },
                    failure: function(error){
                        if(callbacks && callbacks.failure){
                            callbacks.failure(error);
                        }
                        reject(error);
                    }
                };

                request = new KiiObjectRequest(kiiApp, spec);

                request.execute().then(refreshTriggersCallbacks.success, refreshTriggersCallbacks.failure);
            });
        };

        KiiPortalTrigger.prototype._factory = function(thing){
            return new KiiPortalTrigger(thing);
        };

        KiiPortalTrigger.prototype.save = function(callbacks){
            var _this, createFlag;
            _this = this;
            createFlag = this.getTriggerID()? false: true;

            return createFlag? this._create(callbacks): this._update(callbacks);
        };

        KiiPortalTrigger.prototype._getAccessToken = function(){
            return 'Bearer ' + this._user.getAccessToken();
        }

        KiiPortalTrigger.prototype._create = function(callbacks){
            var _this = this;
            return new Promise(function(resolve, reject){
                var kiiApp, spec, url, saveTriggersCallbacks, request;

                kiiApp = KiiPortalAdmin.getCurrentApp();
                url = _this.getBaseURL();
                spec = {
                    url: url,
                    method: 'POST',
                    data: _this._purify(),
                    headers: {
                        Authorization: _this._getAccessToken()
                    }
                };

                saveTriggersCallbacks = {
                    success: function(response){
                        console.log(response);
                    },
                    failure: function(error){
                        if(callbacks && callbacks.failure){
                            callbacks.failure(error);
                        }
                        reject(error);
                    }
                };

                request = new KiiObjectRequest(kiiApp, spec);

                request.execute().then(saveTriggersCallbacks.success, saveTriggersCallbacks.failure);
            });
        };

        KiiPortalTrigger.prototype._update = function(callbacks){
            var _this = this;

            return new Promise(function(resolve, reject){
                var kiiApp, spec, url, saveCallbacks;

                kiiApp = KiiPortalAdmin.getCurrentApp();
                url = _this.getFullURL();
                spec = {
                    url: url,
                    method: 'POST',
                    data: _this.purify(),
                    headers: {
                        Authorization: _this.getAccessToken()
                    }
                };

                saveTriggersCallbacks = {
                    success: function(response){
                        console.log(response);
                    },
                    failure: function(error){
                        if(callbacks && callbacks.failure){
                            callbacks.failure(error);
                        }
                        reject(error);
                    }
                };

                request = new KiiObjectRequest(kiiApp, spec);

                request.execute().then(saveTriggersCallbacks.success, saveTriggersCallbacks.failure);
            });
        };

        KiiPortalTrigger.prototype.setPredicate = function(predicate){
            this._predicate = predicate;
        };

        KiiPortalTrigger.prototype.getPredicate = function(predicate){
            return this._predicate;
        };

        KiiPortalTrigger.prototype.setMetaData = function(metadata){
            this._metadata = metadata;
        };

        KiiPortalTrigger.prototype.getMetaData = function(){
            return this._metadata;
        };

        KiiPortalTrigger.prototype.setCommand = function(command){
            this._command = command;
        };

        KiiPortalTrigger.prototype.getCommand = function(){
            return this._command;
        };

        KiiPortalTrigger.prototype.setTitle = function(title){
            this._title = title;
        };

        KiiPortalTrigger.prototype.getTitle = function(){
            return this._title;
        };

        KiiPortalTrigger.prototype.getTriggerID = function(){
            return this._triggerID;
        };

        KiiPortalTrigger.prototype._setTriggerID = function(triggerID){
            this._triggerID = triggerID;
        };

        KiiPortalTrigger.TriggersWhatEnum = {
            'COMMAND': 'COMMAND',
            'SERVER_CODE':'SERVER_CODE'
        };

        KiiPortalTrigger.prototype.setTriggersWhat = function(triggersWhat){
            if(!KiiPortalTrigger.TriggersWhatEnum[triggersWhat]){
                // ::TODO
                throw({error: 'triggersWhat type not defined'});
            }
            this._triggersWhat = triggersWhat;
        };

        KiiPortalTrigger.prototype.getTriggersWhat = function(){
            return this._triggersWhat;
        };

        KiiPortalTrigger.prototype.setDescription = function(description){
            this._description = description;
        };

        KiiPortalTrigger.prototype.getDescription = function(){
            return this._description;
        };

        KiiPortalTrigger.prototype._setDisabled = function(flag){
            this._disabled = flag;
        };

        KiiPortalTrigger.prototype.getDisabled = function(){
            return this._disabled;
        };

        KiiPortalTrigger.prototype.setEndPoint = function(endPoint){
            this._endPoint = endPoint;
        };

        KiiPortalTrigger.prototype.getEndPoint = function(){
            return this._endPoint;
        }

        KiiPortalTrigger.prototype.disable = function(){

        };

        KiiPortalTrigger.prototype.enable = function(){

        };

        KiiPortalTrigger.prototype.remove = function(){

        };

        KiiPortalTrigger.prototype._purify = function(){
            var _this = this;

            var result = {
                "predicate": _this.getPredicate()._purify(),
                "metadata": _this.getMetaData(),
                "description": _this.getDescription(),
                "disabled": _this.getDisabled(),
                "triggersWhat": _this.getTriggersWhat(),
                "title": _this.getTitle()
            };

            switch(this.getTriggersWhat()){
                case KiiPortalTrigger.TriggersWhatEnum.COMMAND:
                    result.command = this.getCommand()._purify();
                    break;
                case KiiPortalTrigger.TriggersWhatEnum.SERVER_CODE:
                    result.servercode = this.getEndPoint()._purify();
                    break;
            }

            return result;
        };

        return KiiPortalTrigger;
    }());

    root.KiiPortalTriggerPredicator = (function(){

        function KiiPortalTriggerPredicator(predicate){

            __extends(this, {
                _condition: null,
                _triggersWhen: "CONDITION_TRUE",
                _eventSource: "STATES"
            });

            if(predicate){
                this.setCondition(new KiiPortalTriggerCondition(predicate.condition));
                this.setTriggersWhen(predicate.triggersWhen);
                this.setEventSource(predicate.eventSource);
            }
        }

        KiiPortalTriggerPredicator.TriggersWhenEnum = {
            'CONDITION_TRUE': 'CONDITION_TRUE', 
            'CONDITION_CHANGED': 'CONDITION_CHANGED',
            'CONDITION_FALSE_TO_TRUE': 'CONDITION_FALSE_TO_TRUE'
        };

        KiiPortalTriggerPredicator.EventSourceEnum = {
            'STATES': 'STATES'
        };

        KiiPortalTriggerPredicator.prototype.setCondition = function(condition){
            this._condition = condition;
        };

        KiiPortalTriggerPredicator.prototype.getCondition = function(){
            return this._condition;
        };

        KiiPortalTriggerPredicator.prototype.setTriggersWhen = function(triggersWhen){
            if(!KiiPortalTriggerPredicator.TriggersWhenEnum[triggersWhen]){
                // ::TODO
                throw({error: 'triggersWhen type not defined'});
            }
            this._triggersWhen = triggersWhen;
        };

        KiiPortalTriggerPredicator.prototype.getTriggersWhen = function(){
            return this._triggersWhen;
        };

        KiiPortalTriggerPredicator.prototype.setEventSource = function(eventSource){
            if(!KiiPortalTriggerPredicator.EventSourceEnum[eventSource]){
                // ::TODO
                throw({error: 'eventSource type not defined'});
            }
            this._eventSource = eventSource;
        };

        KiiPortalTriggerPredicator.prototype.getEventSource = function(){
            return this._eventSource;
        }


        KiiPortalTriggerPredicator.prototype._purify = function(){
            var _this = this;
            return {
                condition: _this.getCondition()._getDictValue(),
                triggersWhen: _this.getTriggersWhen(),
                eventSource: _this.getEventSource()
            };
        };

        return KiiPortalTriggerPredicator;
    }());

    root.KiiPortalTriggerCondition = (function(_super){

        KiiPortalTriggerCondition.prototype = new _super();
        __inherits(KiiPortalTriggerCondition, _super);
        KiiPortalTriggerCondition.prototype.constructor = KiiPortalTriggerCondition;

        function KiiPortalTriggerCondition(condition){
            __bindMethod(this);

            if(condition){
                this._init(condition);
                if(condition.clauses){
                    this._setWhereClauses(initCondition(condition.clauses));
                }
            }
            
            function initCondition(conditions){
                var conditions = [];
                __each(conditions, function(condition){
                    var childTriggerCondition = KiiPortalTriggerCondition._createCondition(childCondition);
                    conditions.push(childTriggerCondition);
                });

                return conditions;
            }
        }

        KiiPortalTriggerCondition.ConjunctionTypeEnum = {
            'and': 'and',
            'or': 'or',
            'not': 'not'
        };
        KiiPortalTriggerCondition.WhereTypeEnum = {
            'eq': 'eq',
            'range': 'range',
            'in': 'in',
            'prefix': 'prefix'
        };

        KiiPortalTriggerCondition._createCondition = function(conditionBO){
            var condition = new KiiPortalTriggerCondition(conditionBO);
            return condition;
        };

        KiiPortalTriggerCondition.prototype._init = function(conditionBO){
            if(KiiPortalTriggerCondition.ConjunctionTypeEnum[conditionBO.type]){
                this._setWhereType(conditionBO.type);
            }else if(KiiPortalTriggerCondition.WhereTypeEnum[conditionBO.type]){
                var _dict = {
                    field: conditionBO.field,
                    type: conditionBO.type
                };

                switch(conditionBO.type){
                    case 'eq':
                        _dict.value = conditionBO.value;
                        break;
                    case 'range':
                        _dict.upperLimit = conditionBO.upperLimit;
                        _dict.upperIncluded = conditionBO.upperIncluded;
                        _dict.lowerLimit = conditionBO.lowerLimit;
                        _dict.lowerIncluded = conditionBO.lowerIncluded;
                        break;
                    case 'in':
                        _dict.values = conditionBO.values;
                        break;
                    case 'prefix':
                        _dict.prefix = conditionBO.prefix;
                        break;
                }

                this._setWhereType(conditionBO.type);
                this._setDictValue(_dict);
            }
        }

        return KiiPortalTriggerCondition;
    }(KiiClause));
