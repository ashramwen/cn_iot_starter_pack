    /**
     * class KiiPortalTag.js
     */
    root.KiiPortalTag = (function (KiiPortalObject) {
        var _super;

        _super = KiiPortalObject;

        KiiPortalTag.prototype = new _super();
        __inherits(KiiPortalTag, _super);
        KiiPortalTag.prototype.constructor = KiiPortalTag;

        function KiiPortalTag() {
            var _this = this;
            __bindMethod(_this);

            this._name = null;
            this._description = null;

            this.setName = function(name){
                _this._name = name;
                _this.set('name' ,name);
            };

            this.getName = function(){
                return _this._name;
            };

            this.getDescription = function(){
                return _this._discription;
            };
            this.setDescript = function(description){
                _this._description = description;
                _this.set('description', description);
            };
        }

        KiiPortalTag._bucketName = root.KiiExtensionBuckets.TAG;

        /**
         * save object
         * @param callbacks
         * @returns {*|u}
         */
        KiiPortalTag.prototype.save = function(callbacks){
            var _this = this;
            var createFlag = _this.getUUID()? false : true;

            return new Promise(function(resolve, reject){
                var saveCallbacks = {
                    success: function(tag){
                        if(createFlag){
                            _this._kiiApp._addTag(_this);
                        }
                        if(callbacks && callbacks.success){
                            callbacks.success(_this);
                        }
                        resolve(_this);
                    },
                    failure: function(response){
                        if(callbacks && callbacks.failure){
                            callbacks.failure(response);
                        }
                        reject(response);
                    }
                };
                _super.prototype.save.call(_this, saveCallbacks);
            });
        };

        /**
         * get all kii portal tags from app
         * @param app
         * @param callbacks
         * @param pageIndex
         * @param numberPerPage
         * @returns {*|u}
         * @private
         */
        KiiPortalTag._getAll = function(app, callbacks, pageIndex, numberPerPage){
            return new Promise(function(resolve, reject){
                var all_query, getAllCallbacks;
                // Build "all" query
                all_query = KiiQuery.queryWithClause();

                getAllCallbacks = {
                    success: function(query, tags, nextQuery){
                        app._setTags(tags);
                        if(callbacks && callbacks.success){
                            callbacks.success(query, tags, nextQuery);
                        }
                        resolve(query, tags, nextQuery);
                    },
                    failure: function(query, error){
                        reject(query, error)
                    }
                };

                // execute query
                return KiiPortalTag.executeQuery(app ,all_query, getAllCallbacks);
            });
        };


        /**
         * refresh a tag
         * @param callbacks
         * @returns {*|u}
         */
        KiiPortalTag.prototype.refresh = function(callbacks){
            return this._refresh(callbacks);
        };


        /**
         * remove a tag
         * @param callbacks
         * @returns {*|u}
         */
        KiiPortalTag.prototype.delete = function(callbacks){
            var _this = this;

            return new Promise(function(resolve, reject){
                var removeCallbacks, kiiApp;
                removeCallbacks = {
                    success: function(response){
                        kiiApp = _this.getKiiApp();
                        kiiApp._removeTag(_this);
                        if(callbacks && callbacks.success){
                            callbacks.success(_this);
                        }
                        resolve(_this);
                    },
                    failure: function(response){
                        if(callbacks && callbacks.failure){
                            callbacks.failure(response);
                        }
                        reject(response);
                    }
                };

                _super.prototype.delete.call(_this, removeCallbacks);
            });
        };

        KiiPortalTag.prototype.init = function(){
            this.setName(this.get('name'));
            this.setDescript(this.get('description'));
        };

        return KiiPortalTag;
    })(KiiPortalObject);

