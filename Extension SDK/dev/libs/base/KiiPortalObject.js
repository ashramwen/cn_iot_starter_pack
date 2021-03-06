    /**
     * abstract class
     */
    root.KiiPortalObject = function(KiiObject, KiiObjectAdmin){
        var _super;

        _super = KiiObjectAdmin;

        KiiPortalObject.prototype = new _super();

        __inherits(KiiPortalObject, KiiObject);
        __inherits(KiiPortalObject, KiiObjectAdmin);

        KiiPortalObject.prototype.constructor = KiiPortalObject;

        function KiiPortalObject(){
            var _this = this;
            this._kiiApp = null;
        }

        /**
         * kiiApp getter setter
         */
        KiiPortalObject.prototype.getKiiApp = function() {
            return this._kiiApp;
        };
        KiiPortalObject.prototype.setKiiApp = function(kiiApp) {
            this._kiiApp = kiiApp;
        };

        KiiPortalObject.prototype._getBucketName = function(){
            return this.constructor._getBucketName();
        };

        KiiPortalObject.prototype._getUriByID = function(id){
            return 'kiicloud://buckets/' + this.constructor._getBucketName() + '/objects/' + id;
        };

        /**
         * @abstract
         * @private
         */
        KiiPortalObject.prototype._init = function(){
            //TODO
        };

        KiiPortalObject.prototype.renew = function(kiiObject){
            return this._renew(kiiObject);
        };

        KiiPortalObject.prototype._renew = function(kiiObject){
            __cast(this, kiiObject);
            this._init();
        };

        KiiPortalObject.prototype._cast = function(kiiObject){
            var portalObject = this.constructor.factory(this.getKiiApp());
            __cast(portalObject, kiiObject);
            __cast(this, portalObject);
            this._init();
        };

        KiiPortalObject.prototype.enableRead = function(callbacks){
            var _this = this;
            return new Promise(function(resolve, reject){
                var acl = _this._generateACL(new KiiAnyAuthenticatedUser(), KiiACLAction.KiiACLObjectActionRead);

                // Save the ACL to the server
                acl.save({
                    success: function() {
                        if(callbacks && callbacks.success){
                            callbacks.success();
                        }
                        resolve();
                        console.log("Object ACL updated!");
                    },
                    failure: function(theObject, errorString) {
                        if(callbacks && callbacks.failure()){
                            callbacks.failure();
                        }
                        reject();
                        console.log("Error updating object ACL: " + errorString);
                    }
                });
            });
        };

        KiiPortalObject.prototype.disableRead = function(callbacks){
            var _this = this;
            return new Promise(function(resolve, reject){

                var acl = _this._generateACL(new KiiAnyAuthenticatedUser(), KiiACLAction.KiiACLObjectActionRead, true);

                // Save the ACL to the server
                acl.save({
                    success: function() {
                        if(callbacks && callbacks.success){
                            callbacks.success();
                        }
                        resolve();
                        console.log("Object ACL updated!");
                    },
                    failure: function(theObject, errorString) {
                        if(callbacks && callbacks.failure()){
                            callbacks.failure();
                        }
                        reject();
                        console.log("Error updating object ACL: " + errorString);
                    }
                });
            });
        };



        KiiPortalObject.prototype.enableWrite = function(callbacks){
            var _this = this;
            return new Promise(function(resolve, reject){
                var acl = _this._generateACL(new KiiAnyAuthenticatedUser(), KiiACLAction.KiiACLObjectActionWrite);
                // Save the ACL to the server
                acl.save({
                    success: function() {
                        if(callbacks && callbacks.success){
                            callbacks.success();
                        }
                        resolve();
                        console.log("Object ACL updated!");
                    },
                    failure: function(theObject, errorString) {
                        if(callbacks && callbacks.failure()){
                            callbacks.failure();
                        }
                        reject();
                        console.log("Error updating object ACL: " + errorString);
                    }
                });
            });
        };

        KiiPortalObject.prototype.disableWrite = function(callbacks){
            var _this = this;
            return new Promise(function(resolve, reject){
                var acl = _this._generateACL(new KiiAnyAuthenticatedUser(), KiiACLAction.KiiACLObjectActionWrite, true);

                // Save the ACL to the server
                acl.save({
                    success: function() {
                        if(callbacks && callbacks.success){
                            callbacks.success();
                        }
                        resolve();
                        console.log("Object ACL updated!");
                    },
                    failure: function(theObject, errorString) {
                        if(callbacks && callbacks.failure()){
                            callbacks.failure();
                        }
                        reject();
                        console.log("Error updating object ACL: " + errorString);
                    }
                });
            });
        };

        /**
         * generate ACL of object
         * @param UserType
         * @param action
         * @param add
         * @returns {*}
         * @private
         */
        KiiPortalObject.prototype._generateACL = function(UserType, action, remove){
            var entry = KiiACLEntry.entryWithSubject(UserType, action);

            if(remove){
                entry.setGrant(false);
            }

            // Get the ACL handle and put the rule in the handle
            var acl = this.objectACL();
            acl.putACLEntry(entry);

            return acl;
        };

        KiiPortalObject.prototype.refresh = function(callbacks){
            return this._refresh(callbacks);
        }


        KiiPortalObject.prototype._refresh = function(callbacks){
            var _this = this;

            return new Promise(function( resolve, reject){
                var refreshCallbacks;
                refreshCallbacks = {
                    success: function(kiiObject){

                        _this._cast(kiiObject);
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
                _super.prototype.refresh.call(_this, refreshCallbacks);
            });
        };


        KiiPortalObject.refreshByID = function (kiiApp, id, callbacks){
            return this.constructor._refreshByID(kiiApp, id, callbacks);
        };

        KiiPortalObject._refreshByID = function(kiiApp, id, callbacks){
            var _this = this;
            return new Promise(function(resolve, reject){
                var refreshCallbacks = {
                    success: function(obj){
                        var portalObject = _this.factory(app);
                        portalObject._cast(obj);

                        if(callbacks && callbacks.success){
                            callbacks.success(portalObject);
                        }
                        resolve(portalObject);
                    },
                    failure: function(response){
                        if(callbacks && callbacks.failure){
                            callbacks.failure(response);
                        }
                        reject(response);
                    }
                };

                _this.objectWithID(kiiApp, id)
                    .then(refreshCallbacks.success, refreshCallbacks.failure);
            });
        };

        /**
         * create or update Object
         * @param callbacks
         * @returns {*}
         */
        KiiPortalObject.prototype.save = function(callbacks){
            return this._save(callbacks);
        };

        /**
         * create or update Object
         * @param callbacks
         * @returns {Promise|*}
         */
        KiiPortalObject.prototype._save = function (callbacks) {
            var _this = this;

            return new Promise(function(resolve, reject){
                var saveCallbacks = {
                    success: function(obj){
                        _this._cast(obj);
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
         * delete firmware
         * @param callbacks
         * @returns {Promise|*}
         */
        KiiPortalObject.prototype.delete = function (callbacks) {
            return this._delete(callbacks);
        };

        /**
         * delete firmware
         * @param callbacks
         * @returns {Promise|*}
         */
        KiiPortalObject.prototype._delete = function (callbacks) {
            var _this = this;
            return new Promise(function(resolve, reject){
                var deleteCallbacks = {
                    success: function(){
                        if(callbacks && callbacks.success){
                            callbacks.success(_this);
                        }
                        resolve(_this);
                    },
                    failure: function(response){
                        reject(response);
                    }
                };

                _super.prototype.delete.call(_this, deleteCallbacks);
            });
        };

        /**
         * static, abstract
         * @type {null}
         * @private
         */
        KiiPortalObject._bucketName = null;

        /**
         * get bucket name of this class of object
         * @returns {String}
         * @private
         */
        KiiPortalObject._getBucketName = function(){
            if((typeof this._bucketName) == 'function'){
                return this._bucketName();
            }
            return this._bucketName;
        };

        KiiPortalObject.prototype.clone = function(){
            var _this = this;
            var obj = this.constructor.factory(this.getKiiApp());
            __each(this, function(value, key){
                if(!__isFunction(value))
                    obj[key] = _this[key];
            });
            return obj;
        };

        KiiPortalObject.factory = function(kiiApp){
            return this._factory(kiiApp);
        };

        /**
         * {this} refers to constructor function
         * @param kiiApp
         * @returns {root.KiiPortalObject|*}
         * @private
         */
        KiiPortalObject._factory = function(kiiApp){
            var adminContext, bucket, kiiObject, portalObject, bucketName;

            bucketName = this._getBucketName();
            adminContext = kiiApp.getAdminContext();
            bucket = adminContext.bucketWithName(bucketName);

            portalObject = new this();
            kiiObject = bucket.createObject();
            portalObject._renew(kiiObject);

            portalObject._setObjectType(null);
            portalObject.setKiiApp(kiiApp);

            return portalObject;
        };

        /**
         *
         * @param kiiApp
         * @param bucketName
         * @param id
         * @returns {*|u}
         */
        KiiPortalObject.objectWithID = function(kiiApp, id){
            var _this = this;
            return new Promise(function(resolve, reject){
                var findCallbacks, portalObject, kiiObject;
                findCallbacks = {
                    success: function(kiiObject){
                        portalObject._renew(kiiObject);
                        resolve(portalObject);
                    },
                    failure: function(response){
                        reject(response);
                    }
                };

                portalObject = _this.factory(kiiApp);
                kiiObject = _super.objectWithURI(portalObject._getUriByID(id));
                kiiObject.refresh(findCallbacks);
            });
        };

        /**
         * query kii portal objects by given query
         * @param kiiApp
         * @param query
         * @param callbacks
         * @returns {*|u}
         */
        KiiPortalObject.executeQuery = function(kiiApp, query, callbacks){
            var _this = this;
            return new Promise(function(resolve, reject){
                var executeCallbacks, bucket;

                bucket = kiiApp.getAdminContext().bucketWithName(_this._getBucketName());

                executeCallbacks = {
                    success: function(query, objects, nextQuery) {
                        __each(objects, function (object, index) {
                            var tmpObj = _this.factory(kiiApp);
                            tmpObj._cast(object);
                            objects[index] = tmpObj;
                        });

                        if (callbacks) {
                            callbacks.success.call(callbacks, query ,objects, nextQuery);
                        }
                        resolve({query: query ,data: objects, nextQuery: nextQuery});
                    },
                    failure: function(error) {
                        if (callbacks != null && callbacks.failure) {
                            return callbacks.failure(query ,error);
                        }
                        reject(query, error);
                    }
                };

                bucket.executeQuery(query, executeCallbacks);
            });
        };

        return KiiPortalObject;
    }(KiiObject, KiiObjectAdmin);