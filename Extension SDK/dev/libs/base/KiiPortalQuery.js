    
    /**
     * Portal Query
     */
    root.KiiPortalQuery = (function(KiiQuery){
        var _super = KiiQuery;

        __inherits(KiiPortalQuery, _super);

        KiiPortalQuery.prototype.constructor = KiiPortalQuery;

        function KiiPortalQuery(query){
            var _this = this;
        };

        KiiPortalQuery.prototype._dictValue = function() {
            var portalQuery, data;

            data = {};
            data.bestEffortLimit = this._limit;
            if (this._paginationKey != null) {
                data.paginationKey = this._paginationKey;
            }

            portalQuery = {
                descending: this._sortDescending
            };
            if (this._clause != null) {
                portalQuery.clause = this._clause._getDictValue();
            } else {
                portalQuery.clause = this.constructor._emptyDictValue();
            }
            if (this._sortField != null) {
                portalQuery.orderBy = this._sortField;
            }
            data[this.constructor.queryName] = portalQuery;
            return data;
        };

        KiiPortalQuery.queryWithClause = function(clause) {
            var query;
            query = new this;
            query._setClause(clause);
            return query;
        };

        KiiPortalQuery.prototype.setDict = function(dictVal){
            if(dictVal){
                if(dictVal.limit){
                    this.setLimit(dictVal.limit);
                }

                if(dictVal.paginationKey){
                    this.setPaginationKey(dictVal.paginationKey);
                }

                if(dictVal.orderBy){
                    if(dictVal.desc){
                        this.sortByDesc(dictVal.orderBy);
                    }else {
                        this.sortByAsc(dictVal.orderBy);
                    }
                }
            }
        };

        
        /**
         * abstract
         * @param  {[type]} kiiApp [description]
         * @param  {[type]} spec   [description]
         * @return {[type]}        [description]
         */
        KiiPortalQuery._getRequest = function(kiiApp, spec) {

            spec.headers = spec.headers || {};

            return new KiiObjectRequest(kiiApp, spec);
        };

        /**
         * abstract
         * @param  {[type]} kiiApp [description]
         * @return {[type]}        [description]
         */
        KiiPortalQuery._generatePath = function(kiiApp){
            return (DevelopmentSettings.SERVER_ADDRESS || kiiApp.getSiteURL())+ '/apps/' + kiiApp.getAppID();
        };

        /**
         * abstract
         * @return {[type]} [description]
         */
        KiiPortalQuery._instantiate = function(){
            // Empty
        };

        /**
         * [executeQuery description]
         * @param  {[type]} kiiApp    [description]
         * @param  {[type]} query     [description]
         * @param  {[type]} callbacks [description]
         * @return {[type]}           [description]
         */
        KiiPortalQuery.executeQuery = function(kiiApp, query, callbacks){
            var _this = this;
            return new Promise(function(resolve, reject){
                var data, executeCallbacks, path, spec, request;
                path = _this._generatePath(kiiApp) + "/query";
                data = {};

                if (query != null) {
                    data = query._dictValue();
                } else {
                    data[_this.queryName] = {
                        "clause": KiiQuery._emptyDictValue()
                    };
                }

                spec = {
                    data: data,
                    url: path,
                    method: 'POST'
                };

                request = _this._getRequest(kiiApp, spec);

                executeCallbacks = {
                    success: function(response) {
                        var result, resultSet, _i, _len, _ref;
                        query.setPaginationKey(response.data.nextPaginationKey);

                        resultSet = [];
                        _ref = response.data.results;
                        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                            result = _ref[_i];
                            resultSet.push(_this._instantiate(result));
                        }

                        if (callbacks != null && callbacks.success) {
                            callbacks.success(query, resultSet);
                        }
                        resolve({nextQuery:query ,resultSet: resultSet});
                    },
                    failure: function(error) {
                        if (callbacks != null && callbacks.failure) {
                            callbacks.failure(error);
                        }
                        reject({query:query, error:error});
                    }
                };

                request.execute(executeCallbacks);
            });
        };

        return KiiPortalQuery;
    })(KiiQuery);
