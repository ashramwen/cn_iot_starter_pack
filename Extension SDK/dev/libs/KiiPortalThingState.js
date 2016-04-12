    root.KiiPortalThingState = (function(_super){

        KiiPortalThingState.prototype = new _super();
        __inherits(KiiPortalThingState, _super);
        KiiPortalThingState.prototype.constructor = KiiPortalThingState;

        function KiiPortalThingState(){

        }

        KiiPortalThingState._bucketName = root.KiiExtensionBuckets.STATES;

        /**
         * This is called in KiiPortalObject factory process.
         * @override
         * @public
         */
        KiiPortalThingState.prototype._init = function(){

        };

        KiiPortalThingState.prototype.getThingID = function(){
            return this.get('target').substr(6);
        };

        KiiPortalThingState.prototype.getState = function(){
            return this.get('state');
        };

        KiiPortalThingState.refreshByThingID = function(thingID, callbacks){
            return new Promise(function(resolve, reject){
                var kiiApp, query, refreshStatesCallbacks, ids;
                kiiApp = KiiPortalAdmin.getCurrentApp();
                refreshStatesCallbacks = {
                    success: function(response){
                        var query = response.query,
                            states = response.data, 
                            nextQuery = response.nextQuery;

                        if(states.length > 0){
                            var state = states[0];
                            if(callbacks && callbacks.success){
                                callbacks.success(state);
                            }

                            resolve(state);
                        }else{
                            // ::TODO
                            // object not found
                            if(callbacks.failure){
                                callbacks.failure(error);
                            }
                            reject({code: 401, errorMessage: 'Object Not Found'});
                        }
                        
                    },
                    failure: function(error){
                        if(callbacks.failure){
                            callbacks.failure(error);
                        }
                        reject(error);
                    }
                };

                var queryClause = KiiClause.equals('target', 'thing:' + thingID),
                    query = KiiQuery.queryWithClause(queryClause);

                KiiPortalThingState.executeQuery(kiiApp, query)
                    .then(refreshStatesCallbacks.success, 
                      refreshStatesCallbacks.failure);
            });
        };

        KiiPortalThingState.refreshByThingIDs = function(thingIDs, callbacks){
            return new Promise(function(resolve, reject){
                var kiiApp, query, refreshStatesCallbacks, ids;
                kiiApp = KiiPortalAdmin.getCurrentApp();
                refreshStatesCallbacks = {
                    success: function(response){
                        var query = response.query,
                            states = response.data, 
                            nextQuery = response.nextQuery;

                        if(callbacks && callbacks.success){
                            callbacks.success(states);
                        }

                        resolve(states);
                    },
                    failure: function(error){
                        if(callbacks && callbacks.failure){
                            callbacks.failure(error);
                        }
                        reject(error);
                    }
                };
                ids = [];

                __each(thingIDs, function(thingID){
                    ids.push('thing:' + thingID);
                });

                var queryClause = KiiClause.in('target', ids),
                    query = KiiQuery.queryWithClause(queryClause);

                KiiPortalThingState.executeQuery(kiiApp, query)
                    .then(refreshStatesCallbacks.success, 
                      refreshStatesCallbacks.failure);
            });
        };

        return KiiPortalThingState;
    }(KiiPortalObject));