    /**
     * class KiiPortalModel
     */
    root.KiiPortalModel = (function (KiiPortalObject) {
        var _super;

        _super = KiiPortalObject;

        KiiPortalModel.prototype = new _super();
        __inherits(KiiPortalModel, _super);
        KiiPortalModel.prototype.constructor = KiiPortalModel;

        function KiiPortalModel() {
            var _this = this;

            __bindMethod(_this);
            this._name = null;
            this._things = null;
            this._imageUrl = null;
            this._firmwares = [];
            this._firmwareNamespace = null;
            this._portalSchemas = null;


            this.getImageUrl = function(){
                return _this._imageUrl;
            };
            this.setImageUrl = function(imageUrl){
                _this._imageUrl = imageUrl;
                _super.prototype.set.call(_this, 'imageUrl', imageUrl);
            };

            this.setName = function(name){
                _this._name = name;
                _this.set('name', name);
            };

            this.getName = function(){
                return _this.get('name');
            };


            this.getFirmwares = function(){
                return _this._firmwares;
            };
            this.setFirmwares = function(firmwares){
                _this._firmwares = firmwares || [];
                _this.set('firmwares', _this._firmwares);
            };

            this.setFirmwareNamespace = function(firmwareNamespace){
                _this._firmwareNamespace = firmwareNamespace;
                _this.set('firmwareNamespace' ,firmwareNamespace);
            };
            this.getFirmwareNamespace = function(){
                return _this.get('firmwareNamespace');
            };

            this.getPortalSchemas = function(){
                return _this._portalSchemas;
            };
            this.setPortalSchemas = function(schemas){
                _this._portalSchemas = schemas;
            };

        }

        KiiPortalModel._bucketName = root.KiiExtensionBuckets.MODEL;

        /**
         * init after data is ready
         * override
         * @private
         */
        KiiPortalModel.prototype._init = function(){
            this.setName(_super.prototype.get.call(this, 'name'));
            this.setImageUrl(_super.prototype.get.call(this, 'imageUrl'));
            this.setFirmwareNamespace(_super.prototype.get.call(this, 'firmwareNamespace'));
            this.setFirmwares(_super.prototype.get.call(this, 'firmwares'));
        };

        /**
         * factory a kii portal model instance
         * @param app
         * @returns {KiiPortalModel|*}
         */
        KiiPortalModel.factory = function(kiiApp){
            var model = _super.factory.call(this, kiiApp);
            return model;
        };

        /**
         * delete firmware
         * @param firmware
         * @param callbacks
         * @returns {*|u}
         */
        KiiPortalModel.prototype.deleteFirmware = function(firmware, callbacks){
            var _this = this;
            var id = firmware.getUUID();
            var index = this._firmwares.indexOf(id);
            if(index < 0)return null;

            this._firmwares.splice(index, 1);

            var deleteFirmwarePromise = firmware.deleteModel(this);

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

                if(deleteFirmwarePromise){
                    deleteFirmwarePromise.then(function(){
                        _this.set('firmwares' ,_this._firmwares);
                        _this.save(saveCallbacks);
                    },function(error){
                        saveCallbacks.failure(error);
                        reject(error);
                    });
                }else{
                    _this.set('firmwares' ,_this._firmwares);
                    _this.save(saveCallbacks);
                }
            });
        };

        KiiPortalModel.prototype.getFirmwareUpgrateInfo = function(callbacks){
            return KiiPortalUpgradeInfo.queryByModel(this);
        };

        /**
         * add firmware
         * @param firmware
         * @param callbacks
         * @returns {*|u}
         */
        KiiPortalModel.prototype.addFirmware = function(firmware, callbacks){
            var _this = this;
            if(this._firmwares.indexOf(firmware.getUUID())>-1) return null;
            this._firmwares.push(firmware.getUUID());
            var addModelPromise = firmware.addModel(this);
            
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

                if(addModelPromise){
                    addModelPromise.then(function(){
                        _this.set('firmwares', _this._firmwares);
                        _this.save(saveCallbacks);
                    },function(error){
                        saveCallbacks.failure(error);
                        reject(error);
                    });
                }else{
                    _this.set('firmwares', _this._firmwares);
                    _this.save(saveCallbacks);
                }
            });
        };

        /**
         * get all kii portal models from app
         * @param app
         * @param callbacks
         * @param pageIndex
         * @param numberPerPage
         * @returns {*|u}
         * @private
         */
        KiiPortalModel._getAll = function(app, callbacks, pageIndex, numberPerPage){
            return new Promise(function(resolve, reject){
                var all_query, getAllCallbacks;
                // Build "all" query
                all_query = KiiQuery.queryWithClause();

                getAllCallbacks = {
                    success: function(query, models, nextQuery){
                        app.setModels(models);
                        if(callbacks && callbacks.success){
                            callbacks.success(query, models, nextQuery);
                        }
                        resolve(query, models, nextQuery);
                    },
                    failure: function(query, error){
                        reject(query, error)
                    }
                };
                // execute query
                return KiiPortalModel.executeQuery(app ,all_query, getAllCallbacks);
            });
        };

        /**
         * remove a model
         * @param callbacks
         * @returns {*|u}
         */
        KiiPortalModel.prototype.delete = function(callbacks){
            var _this = this;

            return new Promise(function(resolve, reject){
                var removeModelCallbacks, kiiApp;
                removeModelCallbacks = {
                    success: function(response){
                        kiiApp = _this.getKiiApp();
                        kiiApp._removeModel(_this);
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

                _super.prototype.delete.call(_this, removeModelCallbacks);
            });
        };

        /**
         * get a model by its ID
         * @param app
         * @param id
         * @param callbacks
         */
        KiiPortalModel.refreshByID = function(kiiApp, id, callbacks){
            return new Promise(function(resolve, reject){
                var refreshModelCallbacks;
                refreshModelCallbacks = {
                    success: function(model){
                        if(callbacks && callbacks.success){
                            callbacks.success(model);
                        }
                        resolve(model);
                    },
                    failure: function(response){
                        if(callbacks && callbacks.failure){
                            callbacks.failure(response);
                        }
                        reject(response);
                    }
                };

                KiiPortalModel.objectWithID(kiiApp, id)
                    .then(refreshModelCallbacks.success, refreshModelCallbacks.failure);
            });
        };

        KiiPortalModel.refreshByName = function(kiiApp, name, callbacks){
            return new Promise(function(resolve, reject){
                var refreshModelCallbacks;
                refreshModelCallbacks = {
                    success: function(query, models, nextQuery){
                        if(models.length > 0){
                            if(callbacks && callbacks.success){
                                callbacks.success(models[0]);
                            }
                            resolve(models[0]);
                        }else{
                            /**
                             * ::TODO
                             * empty return exception
                             * @return {[type]}
                             */
                            if(callbacks && callbacks.failure){
                                callbacks.failure(response);
                            }
                            reject(models);
                        }
                        
                    },
                    failure: function(error){
                        if(callbacks && callbacks.failure){
                            callbacks.failure(response);
                        }
                        reject(response);
                    }
                };

                var queryClause = KiiClause.equals('name', name),
                    query = KiiQuery.queryWithClause(queryClause);

                return KiiPortalModel.executeQuery(kiiApp, query, refreshModelCallbacks);
            });
        };

        KiiPortalModel.prototype.createSchema = function(){
            return KiiPortalSchema.create(this);
        }

        KiiPortalModel.prototype.uploadImage = function(imageFile ,callbacks){
            var _this = this;
            return new Promise(function(resolve, reject){

                /**
                 * the process of uploading image file contains 3 steps.
                 * step 1. upload file
                 * step 2. publish file
                 * step 3. save model
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
                    var modelSaveCallbacks = {
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

                    _this.setImageUrl(url);
                    _this.save(modelSaveCallbacks);
                };

                /**
                 * upload firmware file
                 */
                _super.prototype.uploadBody.call(_this, imageFile).then(publishBody, failure);
            });
        };

        KiiPortalModel.prototype._setThings = function(things){
            this._things = things;
        };

        KiiPortalModel.prototype.getThings = function(){
            return this._things;
        };

        KiiPortalModel.prototype.refreshThings = function(callbacks){
            var _this = this;

            return new Promise(function(resolve, reject){
                var refreshThingsCallbacks = {
                    success: function(response){
                        _this._setThings(response.things);

                        if(callbacks && callbacks.success){
                            callbacks.success(response);
                        }
                        resolve(response);
                    },
                    failure: function(response){
                        if(callbacks && callbacks.failure){
                            callbacks.failure(response);
                        }
                        reject(response);
                    }
                };

                KiiThingAdmin.getThingsByModel(_this).then(refreshThingsCallbacks.success, 
                    refreshThingsCallbacks.failure);
            });
        }

        /**
         * save a model
         * @param callbacks
         * @returns {*|u}
         */
        KiiPortalModel.prototype.save = function(callbacks){
            var _this = this;
            var createFlag = _this.getUUID()? false : true;

            return new Promise(function(resolve, reject){
                var modelSaveCallbacks, kiiApp;

                modelSaveCallbacks = {
                    success: function(model){
                        kiiApp = _this.getKiiApp();

                        if(createFlag){
                            kiiApp._addModel(_this);
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

                _super.prototype.save.call(_this, modelSaveCallbacks);

            });
        };

        KiiPortalModel.prototype.refreshPortalSchemas = function(callbacks){
            return KiiPortalSchema._withModel(this, callbacks);
        };

        /**
         * get firmware bucket
         * @returns {KiiBucket|*}
         */
        KiiPortalModel.prototype.getModelBucket = function(){
            return this.getKiiApp().getAdminContext().bucketWithName(KiiPortalModel._getBucketName() + this.getUUID());
        };

        KiiPortalModel.prototype.saveSchema = function(schema, callbacks){
            var _this = this;
            return new Promise(function(resolve, reject){
                var saveSchemaCallbacks = {
                    success: function(schema){
                        var schemas = _this.getPortalSchemas();
                        if(schemas.indexOf(schema)){
                            schemas.push(schema);
                        }
                        resolve(schema);
                        if(callbacks && callbacks.success){
                            callbacks.success(schema);
                        }
                    },
                    failure: function(error){
                        if(callbacks && callbacks.failure){
                            callbacks.failure(error);
                        }
                        reject(error);
                    }
                };

                schema.save(saveSchemaCallbacks);
            });
        };


        return KiiPortalModel;
    })(root.KiiPortalObject);

    root.KiiPortalSchema = (function(){

        function KiiPortalSchema(schema, model){
            var _this = this;
            this.id = null;
            this._modelId = model.getUUID();
            this._version = null;
            this.properties = [];
            this._kiiApp = model.getKiiApp();
            this._model = model;
            this.createdAt = null;
            this.updatedAt = null;


            this.getProperties = function(){
                return _this.properties;
            };

            this.getKiiApp = function(){
                return _this._kiiApp;
            }

            this.getModelId = function(){
                return _this._modelId;
            };

            this.setModelId = function(modelId){
                _this._modelId = modelId;
            }

            this.getVersion = function(){
                return _this._version;
            };

            this.setVersion = function(version){
                _this._version = version;
            };

            this._init(schema);
        }

        KiiPortalSchema.prototype._init = function(schema, model){
            var _this = this;
            if(schema){
                _this.id = schema.id;
                _this.setVersion(schema.version);
                _this.setModelId(schema.modelId);
                _this.createdAt = schema.createdAt;
                _this.updatedAt = schema.updatedAt;
                _this.properties = [];
                if(schema.properties){
                    __each(schema.properties, function(property){
                        _this.properties.push(new KiiPortalSchemaProperty(property));
                    });
                }
            }
            _this._model = model || _this._model;
        };

        KiiPortalSchema.prototype.createProperty = function(){
            var property = new KiiPortalSchemaProperty;
            this.addProperty(property);
            return property;
        }

        KiiPortalSchema.prototype.addProperty = function(property){
            this.properties.push(property);
        };

        KiiPortalSchema.prototype.removeProperty = function(property){
            this.properties.splice(this.properties.indexOf(property), 1);
        };

        KiiPortalSchema._withModel = function(model, callbacks){
            var tokenType, accessToken, setting, kiiApp;
            kiiApp = model.getKiiApp();

            return new Promise(function(resolve, reject){
                setting = {
                    method: 'GET',
                    url: root._apis.MODEL + '/' + model.getUUID() + '/schemas',
                    success: function(response){
                        var schemasData = response.data.schemas || [];
                        var schemas = [];

                        __each(schemasData, function(schema){
                            schemas.push(KiiPortalSchema.factory(schema, model));
                        });

                        model.setPortalSchemas(schemas);
                        if(callbacks && callbacks.success){
                            callbacks.success(schemas);
                        }
                        resolve(schemas);
                    },
                    failure: function(error){
                        if(callbacks && callbacks.failure){
                            callbacks.failure(error);
                        }
                        reject(error);
                    }
                };

                KiiPortalRequest(setting, kiiApp);
            });
        };

        KiiPortalSchema.prototype.refresh = function(property){
            var setting = {
                method: 'GET',
                url: root._apis.MODEL + '/' + this.getModelId() + '/schemas/' + this.getVersion(),
                headers: {
                    'Authorization': tokenType + ' ' + accessToken
                },
                success: function(response){

                },
                failure: function(error){

                }
            };

            KiiPortalRequest(setting, this.getKiiApp());
        };

        KiiPortalSchema.prototype.save = function(callbacks){
            var id, createFlag, setting, _this, tokenType, accessToken, properties;
            tokenType = this.getKiiApp().getAdmin().getTokenType();
            accessToken = this.getKiiApp().getAdmin().getAccessToken();
            properties = [];

            __each(this.getProperties(), function(property){
                properties.push(property.purify());
            });

            _this = this;
            id = this.id;

            if(!id){
                createFlag = true;
            }

            return new Promise(function(resolve, reject){
                if(createFlag){
                    setting = {
                        method: 'POST',
                        url: root._apis.MODEL + '/' + _this.getModelId() + '/schemas',
                        data: {
                            modelId: _this.getModelId(),
                            properties: properties,
                            version: _this.getVersion()
                        },
                        headers: {
                            'Authorization': tokenType + ' ' + accessToken
                        },
                        success: function(response){
                            _this._init(response.data, _this._model);

                            if(callbacks && callbacks.success){
                                callbacks.success(_this);
                            }
                            resolve(_this);
                        },
                        failure: function(error){
                            if(callbacks && callbacks.failure){
                                callbacks.failure(error);
                                reject(error);
                            }
                        }
                    };
                }else{
                    /**
                     * for now, update is not allowed
                     * @type {Object}
                     */
                    setting = {
                        method: 'POST',
                        data: {
                            id: _this.id,
                            modelId: _this.getModelId(),
                            properties: properties,
                            version: _this.getVersion()
                        },
                        url: root._apis.MODEL + '/' + _this._model.getUUID() + '/schemas/' + _this.getVersion(),
                        headers: {
                            'Authorization': tokenType + ' ' + accessToken
                        },
                        success: function(response){
                            _this._init(response.data, this._model);
                            if(callbacks && callbacks.success){
                                callbacks.success(_this);
                            }
                            resolve(_this);
                        },
                        failure: function(error){
                            if(callbacks && callbacks.failure){
                                callbacks.failure(error);
                            }
                            reject(error);
                        }
                    };
                }

                KiiPortalRequest(setting, _this.getKiiApp()).catch(function(e){
                    KiiLogger.debug(new KiiPortalException(e));
                });
            });
        };

        KiiPortalSchema.create = function(model){
            var schema = KiiPortalSchema.factory(null, model);
            schema.setModelId(model.getUUID());
            return schema;
        };

        KiiPortalSchema.factory = function(schema, model){
            return new KiiPortalSchema(schema, model);
        };

        return KiiPortalSchema;
    })();

    root.KiiPortalSchemaProperty = (function(){

        function KiiPortalSchemaProperty(property){
            this.key = null;
            this.displayName = null;
            this.type = null;
            this.controllable = null;
            this.unit = null;
            this.min = null;
            this.max = null

            if(property){
                __extends(this, property);
            }
        }

        KiiPortalSchemaProperty.KeyEnum = ['key', 'displayName', 'type', 
            'controllable', 'unit', 'min', 'max'];

        KiiPortalSchemaProperty.Schema_Type_Enum = {
            BOOLEAN: 'boolean',
            INT: 'integer',
            FLOAT: 'float',
            STRING: 'string'
        };

        KiiPortalSchemaProperty.prototype.purify = function(){
            var data = {},
                _this = this;
            __each(KiiPortalSchemaProperty.KeyEnum, function(val){
                if(_this[val]){
                    data[val] = _this[val];
                }
            });
            return data;
        };

        return KiiPortalSchemaProperty;
    })();