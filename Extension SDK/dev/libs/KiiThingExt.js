    /**
     * Thing request
     */
    root.KiiThingQuery = (function(_super){

        __inherits(KiiThingQuery, _super);
        KiiThingQuery.prototype.constructor = KiiThingQuery;

        function KiiThingQuery(query){
            /*
            var _this = this;
            __each(KiiPortalFirmware.prototype, function(value, key){
                if(__isFunction(value))
                    _this[key] = __bind(value, _this);
            });

            return this._clone(query);
            */
        };

        KiiThingQuery.queryName = 'thingQuery';

        /**
         * override
         * @param  {[type]} kiiApp [description]
         * @param  {[type]} spec   [description]
         * @return {[type]}        [description]
         */
        KiiThingQuery._getRequest = function(kiiApp, spec){
            spec.headers = spec.headers || {};
            spec.headers["Content-Type"] = "application/vnd.kii.thingqueryrequest+json";

            return new KiiPortalRequest(kiiApp, spec);
        };

        /**
         * override
         * @param  {[type]} kiiApp [description]
         * @return {[type]}        [description]
         */
        KiiThingQuery._generatePath = function(kiiApp){
            return _super._generatePath.call(this, kiiApp) + '/things';
        };

        /**
         * override
         * @param  {[type]} data [description]
         * @return {[type]}      [description]
         */
        KiiThingQuery._instantiate = function(data){
            return new KiiThing(data);
        };

        return KiiThingQuery;
    })(KiiPortalQuery);

    KiiThing._withApp = function(kiiApp, callbacks, order){
        return new Promise(function(resolve, reject){
            var query;
            query = KiiThingQuery.queryWithClause();
            if(order){
                var orderBy, desc;

                desc = order.desc;
                orderBy = order.by;

                if(desc){
                    query.sortByDesc(orderBy);
                }else {
                    query.sortByAsc(orderBy);
                }
            }

            var queryCallbacks = {
                success: function(query, things){
                    kiiApp._setThings(things);

                    if(callbacks && callbacks.success){
                        callbacks.success.apply(callbacks.success, arguments);
                    }
                    resolve(query, things);
                },
                failure: function(query, error){
                    if(callbacks && callbacks.failure){
                        callbacks.failure.apply(callbacks.failure, arguments);
                    }
                    reject(query, error);
                }
            };

            return KiiThingQuery.executeQuery(kiiApp, query, queryCallbacks);
        });
    };

