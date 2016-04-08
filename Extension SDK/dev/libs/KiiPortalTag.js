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
            this._thingIDs = [];
            this.set('thingIDs', this._thingIDs);
            this._things = [];
            this._nextThingQuery = null;
            this._customData = {};

            this.setCustomData = function(data){
                _this._customData = data;
                _this.set('customData', data);
            };

            this.getCustomData = function(){
                return _this._customData;
            };

            this.setNextThingQuery = function(query){
                return _this._nextThingQuery = query;
            };

            this.getNextThingQuery = function(){
                return _this._nextThingQuery;
            }

            this.getThings = function(){
                return _this._things;
            };

            this.setThings = function(things){
                _this._things = things;
            };

            this.setThingIDs = function(thingIDs){
                _this._thingIDs = thingIDs;
                _this.set('thingIDs', thingIDs);
            };

            this.getThingIDs = function(){
                return _this.get('thingIDs');
            }

            this.setName = function(name){
                _this._name = name;
                _this.set('name' ,name);
            };

            this.getName = function(){
                return _this.get('name');
            };

            this.getDescription = function(){
                return _this.get('description');
            };

            this.setDescription = function(description){
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

        /**
         * init KiiPortalTag
         * @return null
         */
        KiiPortalTag.prototype.init = function(){
            this.setName(this.get('name'));
            this.setDescription(this.get('description'));
            this.setThingIDs(this.get('thingIDs'));
            this.setCustomData(this.get('customData'));
        };

        KiiPortalTag.prototype.addThing = function(kiiThing){
            if(!this._things){
                this._things = [];
            }
            if(this.getThingIDs().indexOf(kiiThing.getThingID())>-1) return;
            this._things.push(kiiThing);
            this.addThingID(kiiThing.getThingID());
        };

        KiiPortalTag.prototype.addThingID = function(kiiThingID){
            if(!this._thingIDs){
                this._thingIDs = [];
                this.setThingIDs(this._thingIDs);
            }
            this._thingIDs.push(kiiThingID);
        };

        KiiPortalTag.prototype.removeThing = function(kiiThing){
            if(this.getThingIDs().indexOf(kiiThing.getThingID())==-1)return;
            this.removeThingID(kiiThing.getThingID());
            __remove(this._things, kiiThing);
        };

        KiiPortalTag.prototype.removeThingID = function(kiiThingID){
            __remove(this._thingIDs, kiiThingID);
        }

        KiiPortalTag.prototype.refreshThings = function(callbacks){
            var kiiApp, queryClause, inClause, _this, thingIDs;

            _this = this;
            kiiApp = this.getKiiApp();
            thingIDs = this.getThingIDs() || [];

            if(thingIDs.length == 0){
                return new Promise(function(resolve, reject){
                    _this.setThings([]);
                    _this.setNextThingQuery(null);

                    if(callbacks && callbacks.success){
                        callbacks.success([]);
                    }
                    resolve([]);
                });
            }

            inClause = KiiClause['in']('_thingID', thingIDs);

            return new Promise(function(resolve, reject){
                var tagThingCallbacks = {
                    success: function(response){

                        var things, query;
                        things = response.things;
                        query = response.query;

                        _this.setNextThingQuery(query);
                        _this.setThings(things);

                        if(callbacks && callbacks.failure){
                            callbacks.success(things);
                        }
                        resolve(things);
                    },
                    failure: function(error){
                        if(callbacks && callbacks.failure){
                            callbacks.failure(error);
                        }
                        reject(error);
                    }
                };

                KiiThingAdmin.query(kiiApp, null, inClause)
                    .then(tagThingCallbacks.success, tagThingCallbacks.failure);
            });
        };

        KiiPortalTag.prototype.nextThings = function(callbacks){
            var _this = this;

            return new Promise(function(){
                var kiiApp, nextThingQuery;

                kiiApp = _this.getKiiApp();
                nextThingQuery = {
                    success: function(response){
                        var things, query;
                        things = response.things;
                        nextQuery = response.query;

                        _this.setNextThingQuery(nextQuery);
                        _this.setThings(things);

                        if(callbacks && callbacks.failure){
                            callbacks.success(things);
                        }
                        resolve(things);
                    },
                    failure: function(error){
                        if(callbacks && callbacks.failure){
                            callbacks.failure(error);
                        }
                        reject(error);
                    }
                };

                KiiThingAdmin.query(kiiApp, callbacks, _this.getNextThingQuery())
                    .then(nextThingQuery.success, nextThingQuery.failure);
            });
        };

        return KiiPortalTag;
    })(KiiPortalObject);

