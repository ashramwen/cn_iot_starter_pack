
    /**
     @class Firmware class
     */
    root.KiiPortalFirmware = (function (KiiPortalObject) {
        var _super;

        _super = KiiPortalObject;

        KiiPortalFirmware.prototype = new _super();
        __inherits(KiiPortalFirmware, _super);
        KiiPortalFirmware.prototype.constructor = KiiPortalFirmware;

        function KiiPortalFirmware() {
            var _this = this;
            __bindMethod(_this);

            this._name = null;
            this._models = [];
            this._state = null;
            this._downloadURL = null;
            this._description = null;
            this._namespace = null;
            this.namespace = null;

            this.setNamespace = function(namespace){
                this._namespace = namespace;
                _this.set('namespace', namespace);
            };

            this.getNamespace = function(){
                return _this.get('namespace');
            };


            this.setDownloadURL = function(url){
                _this._downloadURL = url;
                _this.set('downloadURL', url);
            };

            this.getDownloadURL = function(url){
                return _this.get('downloadURL');
            };

            /** get name of this firmware
             @return {String} name of this topic.
             */
            this.getName = function () {
                return _this.get('name');
            };

            /** set name of this firmware
             @return void.
             */
            this.setName = function (name) {
                _this._name = name;
                _this.set('name', name);
            };


            this.setState = function(state){
                _this._state = state;
                _this.set('state',state);
            };
            this.getState = function(){
                return _this.get('state');
            }

            this.setDescription = function(description){
                _this.description = description;
                _this.set('description', description);
            };

            this.getDescription = function(){
                return _this.get('description');
            };
        }

        KiiPortalFirmware._bucketName = root.KiiExtensionBuckets.FIRMWARE;

        /**
         * add firmware to model
         * @param model
         * @param callbacks
         * @returns {*}
         */
        KiiPortalFirmware.prototype.addModel = function(model, callbacks){
            var _this = this;
            if(this._models.indexOf(model.getName())>-1) return null;
            this._models.push(model.getName());
            var addFirmwarePromise = model.addFirmware(this);

            return new Promise(function(resolve, reject){
                var saveCallbacks = {
                    success: function(response){
                        if(callbacks && callbacks.success){
                            callbacks.success.apply(callbacks.success, arguments);
                        }
                        resolve(response);
                    },
                    failure: function(error){
                        if(callbacks && callbacks.failure){
                            callbacks.failure.apply(callbacks.failure, arguments);
                        }
                        reject(reject)
                    }
                };

                _this.set('models', _this._models);
                _this.save(saveCallbacks);
            });
        };
        KiiPortalFirmware.prototype.getModels = function(){
            return this._models;
        };
        KiiPortalFirmware.prototype.setModels = function(models){
            this._models = models || [];
            this.set('models', this._models);
        };
        KiiPortalFirmware.prototype.deleteModel = function(model, callbacks){
            var _this = this;
            var id = model.getName();

            var index = this._models.indexOf(id);
            if(index < 0)return null;

            this._models.splice(index, 1);

            var deleteModelPromise = model.deleteFirmware(this);

            return new Promise(function(resolve, reject){
                var saveCallbacks = {
                    success: function(response){
                        if(callbacks && callbacks.success){
                            callbacks.success.apply(callbacks.success, arguments);
                        }
                        resolve(response);
                    },
                    failure: function(error){
                        if(callbacks && callbacks.failure){
                            callbacks.failure.apply(callbacks.failure, arguments);
                        }
                        reject(error);
                    }
                };


                _this.set('models' ,_this._models);
                _this.save(saveCallbacks);
            });
        };

        /**
         * In normal case is not needed. For pushing firmware using only.
         * @param modelName
         * @private
         */
        KiiPortalFirmware.prototype._setUpdateInfoBucketName = function(modelName){
            this.set('updateInfoBucketName', root.ReservedBucketPrefix.MODEL_UPDATE_INFO  + modelName);
        };

        KiiPortalFirmware.StateEnum = {
            CREATED: 'CREATED', // when firmware is created; firmware is invisible for end users
            PUBLISHED: 'PUBLISHED', // when firmware is published; firmware is visible for end users and can be downloaded
            PUSHED: 'PUSHED', // when firmware is pushed to end users, all things receive the firmware installation request
            DISABLED: 'DISABLED' // firmware is no longer in use, invisible for end users
        };

        /**
         * delete firmwareFile
         * @param callbacks
         * @returns {*|u}
         */
        KiiPortalFirmware.prototype.deleteFirmwareFile = function(callbacks){
            var _this = this;
            return new Promise(function(resolve, reject){
                var deleteFirmwareFileCallbacks = {
                    success: function(){
                        /**
                         * save firmware object to kii cloud if firmware file is deleted
                         * @type {{success: firmwareSaveCallbacks.success, failure: firmwareSaveCallbacks.failure}}
                         */
                        var firmwareSaveCallbacks = {
                            success: function(){
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

                        _this.setDownloadURL('');
                        _this.save(firmwareSaveCallbacks);

                    },
                    failure: function(response){
                        if(callbacks && callbacks.failure){
                            callbacks.failure.apply(callbacks, response);
                        }
                        reject(response);
                    }
                };

                _this.deleteBody(deleteFirmwareFileCallbacks);
            });
        };

        /**
         * upload a firmware file. the new file will cover the old file.
         * @param firmwareFile
         * @param callbacks
         * @returns {*|u}
         */
        KiiPortalFirmware.prototype.uploadFirmwareFile = function(firmwareFile, callbacks){
            var _this = this;
            return new Promise(function(resolve, reject){

                /**
                 * the process of uploading firmware file contains 3 steps.
                 * step 1. upload file
                 * step 2. publish file
                 * step 3. save firmware
                 */


                /**
                 * if failed in any process
                 * @param response
                 */
                var failure = function(response){
                    if(callbacks && callbacks.failure){
                        callbacks.failure.apply(callbacks, response);
                    }
                    reject(response);
                };

                /**
                 * publish firmware body, to enable end users' access to this file's url
                 */
                var publishBody = function(){
                    _this.publishBody({
                        success: function(obj, url){
                            saveChanges(url);
                        },
                        failure: function(response){
                            failure(response)
                        }
                    });
                };

                /**
                 * save all changes
                 * @param url
                 */
                var saveChanges = function(url){
                    /**
                     * save firmware object to kii cloud if file is uploaded
                     * @type {{success: firmwareSaveCallbacks.success, failure: firmwareSaveCallbacks.failure}}
                     */
                    var firmwareSaveCallbacks = {
                        success: function(){
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

                    _this.setDownloadURL(url);
                    _this.save(firmwareSaveCallbacks);
                };

                /**
                 * upload firmware file
                 */
                _super.prototype.uploadBody.call(_this, firmwareFile).then(publishBody, failure);
            });
        };

        /**
         * push firmware to public
         * can push to one model or all its models.
         * arg0: models, arg1: callbacks ||
         * arg0: callbacks
         * 2 steps of implementation:
         *  1) create an object, copy firmware field value to this object,
         *      set a bucket name to field [updateInfoBucket] of this object
         *      and push to application scope buckets named after models who use this firmware.
         *
         *  2) if all request finished, change state and save the firmware object to kii cloud,
         *      otherwise, raise exception
         *
         *  Note:
         *      The bucket name stored in updateInfoBucket indicates the location
         *      where the update debugging info goes
         *
         *      bucket name for device to subscribe is __MODEL_[model name]
         *          ReservedBucketPrefix.MODEL + modelName;
         *
         *      bucket name for update debugging info is MODEL_UPDATE_INFO_[model name]
         *          ReservedBucketPrefix.MODEL_UPDATE_INFO  + modelName;
         * @param *| model | callbacks
         * @returns {*|u}
         */
        KiiPortalFirmware.prototype.push = function (){
            var models, _this, callbacks;
            _this = this;
            models = this._models;

            if(arguments.length>0){
                if(arguments[0] instanceof KiiPortalModel){
                    models = [arguments[0]];
                    callbacks = arguments[1];
                }else{
                    callbacks = arguments[0];
                }
            }

            return new Promise(function(resolve, reject){
                var finishedCount = 0;

                if(models.length == 0){
                    reject('No model uses this firmware, push command is rejected!');
                }
                __each(models, function(modelName){
                    var bucketName, bucket, firmware;

                    firmware = _this.clone();

                    bucketName = ReservedBucketPrefix.MODEL + modelName;
                    bucket = _this.getKiiApp().getAdminContext().bucketWithName(bucketName);
                    firmware._setBucket(bucket);
                    firmware._setUUID(null);
                    firmware._setUpdateInfoBucketName(modelName);

                    firmware.save({
                        success: function(){
                            finishedCount++;
                            if(finishedCount == models.length){
                                _this.save().then(function(){
                                    if(callbacks && callbacks.success){
                                        callbacks.success(true);
                                    }
                                    resolve(true);
                                }, function(error){
                                    reject(error);
                                });
                            }
                            var firmwares = _this._namespace.getFirmwares();
                            firmwares.splice(firmwares.indexOf(firmware), 1);
                        },
                        failure: function(error){
                            if(callbacks && callbacks.failure){
                                callbacks.failure(error);
                            }
                            reject(error);
                        }
                    });
                });

                _this.setState(KiiPortalFirmware.StateEnum.PUSHED);

            });

        };

        /**
         * disable this firmware
         */
        KiiPortalFirmware.prototype.disable = function (callbacks){
            var _this = this;
            return new Promise(function(resolve, reject){
                _this.setState(KiiPortalFirmware.StateEnum.DISABLED);
                _this.save({
                    success: function(){
                        if(callbacks && callbacks.success){
                            callbacks.success();
                        }
                        resolve();
                    },
                    failure: function(error){
                        if(callbacks && callbacks.failure){
                            callbacks.failure(error);
                        }
                        reject(error);
                    }
                });
            });
        };

        /**
         * publish this firmware
         */
        KiiPortalFirmware.prototype.publish = function (callbacks){
            var _this = this;
            return new Promise(function(resolve, reject){
                _this.setState(KiiPortalFirmware.StateEnum.PUBLISHED);
                _this.save({
                    success: function(){
                        if(callbacks && callbacks.success){
                            callbacks.success();
                        }
                        resolve();
                    },
                    failure: function(error){
                        if(callbacks && callbacks.failure){
                            callbacks.failure(error);
                        }
                        reject(error);
                    }
                });
            });
        };


        /**
         * delete firmware
         * @param callbacks
         * @returns {Promise|*}
         */
        KiiPortalFirmware.prototype.delete = function (callbacks) {
            var _this = this;
            return new Promise(function(resolve, reject){
                var deleteCallbacks = {
                    success: function(){
                        _this.namespace._removeFirmware(_this);
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
         * create or update firmware
         * @param callbacks
         * @returns {Promise|*}
         */
        KiiPortalFirmware.prototype.save = function (callbacks) {
            var _this = this;
            var createFlag = _this.getUUID()? false : true;

            return new Promise(function(resolve, reject){
                var saveCallbacks = {
                    success: function(firmware){
                        if(createFlag){
                            _this.namespace._addFirmware(_this);
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
         * factory an instance of KiiFirmware
         * @override
         * @returns {KiiPortalFirmware}
         */
        KiiPortalFirmware.factory = function (kiiApp, firmwareNamespace) {
            var firmware;
            firmware = _super.factory.call(this, kiiApp);
            firmware.setState(KiiPortalFirmware.StateEnum.CREATED);
            if(firmwareNamespace){
                firmware.setNamespace(firmwareNamespace.getName());
                firmware.namespace = firmwareNamespace;
            }
        
            return firmware;
        };

        /**
         * This is called in KiiPortalObject factory process.
         * @override
         * @public
         */
        KiiPortalFirmware.prototype._init = function(){
            this.setName(this.get('name'));
            this.setNamespace(this.get('namespace'));
            this.setState(this.get('state'));
            this.setModels((this.get('models')));
        };


        KiiPortalFirmware._withFirmwareNamespace = function(firmwareNamespace, callbacks, pageIndex, numberPerPage){
            var _this = this;
            return new Promise(function(resolve, reject){
                var all_query, getAllCallbacks, clause, app;


                app = firmwareNamespace.getKiiApp();
                clause = KiiClause.equals("namespace", firmwareNamespace.getName());
                // Build "all" query
                all_query = KiiQuery.queryWithClause(clause);

                getAllCallbacks = {
                    success: function(query, firmwares, nextQuery){
                        firmwareNamespace.setFirmwares(firmwares);
                        __each(firmwares, function(firmware){
                            firmware.namespace = firmwareNamespace;
                        });
                        if(callbacks && callbacks.success){
                            callbacks.success(query, firmwares, nextQuery);
                        }
                        resolve(query, firmwares, nextQuery);
                    },
                    failure: function(query, error){
                        reject(query, error)
                    }
                };
                // execute query
                return _this.executeQuery(app ,all_query, getAllCallbacks);
            });
        };


        /**
         * get all firmware instances
         * @param app
         * @param callbacks
         * @param pageIndex
         * @param numberPerPage
         * @returns {*|u}
         * @private
         */
        KiiPortalFirmware._getAll = function (app, callbacks, pageIndex, numberPerPage) {
            var _this = this;
            return new Promise(function(resolve, reject){
                var all_query, getAllCallbacks;
                // Build "all" query
                all_query = KiiQuery.queryWithClause();

                getAllCallbacks = {
                    success: function(query, firmwares, nextQuery){
                        app.setFirmwares(firmwares);
                        if(callbacks && callbacks.success){
                            callbacks.success(query, firmwares, nextQuery);
                        }
                        resolve(query, firmwares, nextQuery);
                    },
                    failure: function(query, error){
                        reject(query, error)
                    }
                };
                // execute query
                return _this.executeQuery(app ,all_query, getAllCallbacks);
            });
        };

        return KiiPortalFirmware;
    })(KiiPortalObject);

