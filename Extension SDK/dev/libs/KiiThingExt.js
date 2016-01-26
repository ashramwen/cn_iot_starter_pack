    /**
     * Thing request
     */
    root.KiiThingQuery = (function(KiiQuery){
        var _super = KiiQuery;

        __inherits(KiiThingQuery, _super);

        function KiiThingQuery(query){
            var _this = this;
            __each(KiiPortalFirmware.prototype, function(value, key){
                if(__isFunction(value))
                    _this[key] = __bind(value, _this);
            });

            return this._clone(query);
        };

        KiiThingQuery.prototype._dictValue = function() {
            var thingQuery, data;
            data = {};
            data.bestEffortLimit = this._limit;
            if (this._paginationKey != null) {
                data.paginationKey = this._paginationKey;
            }
            thingQuery = {
                descending: this._sortDescending
            };
            if (this._clause != null) {
                thingQuery.clause = this._clause._getDictValue();
            } else {
                thingQuery.clause = KiiThingQuery._emptyDictValue();
            }
            if (this._sortField != null) {
                thingQuery.orderBy = this._sortField;
            }
            data.thingQuery = thingQuery;
            return data;
        };

        KiiThingQuery.queryWithClause = function(clause) {
            var query;
            query = new KiiThingQuery();
            query._setClause(clause);
            return query;
        };

        return KiiThingQuery;
    })(KiiQuery);

    /**
     * Extend KiiThing class
     * @param app
     * @private
     */

    KiiThing._getRequest = function(app, spec) {

        spec.headers = spec.headers || {};
        spec.headers["Content-Type"] = "application/vnd.kii.thingqueryrequest+json";

        return new KiiPortalRequest(app, spec);
    };

    KiiThing._generatePath = function(app){
        return app.getSiteURL() + '/apps/' + app.getAppID() + '/things';
    };

    KiiThing.executeQuery = function(kiiApp, query, callbacks){
        return new Promise(function(resolve, reject){
            var data, executeCallbacks, path, spec, request;
            path = KiiThing._generatePath(app) + "/query";
            data = {};

            if (query != null) {
                data = query._dictValue();
            } else {
                data.thingQuery = {
                    "clause": KiiQuery._emptyDictValue()
                };
            }

            spec = {
                data: data,
                url: path,
                method: 'POST'
            };

            request = KiiThing._getRequest(app, spec);

            executeCallbacks = {
                success: function(response) {
                    var result, resultSet, _i, _len, _ref;

                    resultSet = [];
                    _ref = response.data;
                    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                        result = _ref[_i];
                        resultSet.push(new KiiThing(result));
                    }

                    if (callbacks != null && callbacks.success) {
                        return callbacks.success(query, resultSet);
                    }
                    resolve(query ,resultSet);
                },
                failure: function(error) {
                    if (callbacks != null && callbacks.failure) {
                        return callbacks.failure(error);
                    }
                    reject(query, error);
                }
            };

            request.execute(executeCallbacks);
        });
    };

    KiiThing._withApp = function(app, callbacks, order){
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
                    app._setThings(things);

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

            return KiiThing.executeQuery(app, query, queryCallbacks);
        });
    };

