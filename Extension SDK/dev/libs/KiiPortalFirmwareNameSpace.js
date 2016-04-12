    
    /**
     @class Firmware class
     */
    root.KiiPortalFirmwareNamespace = (function (KiiPortalObject) {
        var _super;

        _super = KiiPortalObject;

        KiiPortalFirmwareNamespace.prototype = new _super();
        __inherits(KiiPortalFirmwareNamespace, _super);
        KiiPortalFirmwareNamespace.prototype.constructor = KiiPortalFirmwareNamespace;

        function KiiPortalFirmwareNamespace() {
            var _this = this;
            __bindMethod(_this);

            this._name = '';
            this._versionName = null;
            this._firmwares = [];

            this.setName = function(name){
                _this._name = name;
                _this.set('name', name);
            };

            this.getName = function(name){
                return _this.get('name');
            };

            this.getFirmwares = function(){
                return _this._firmwares;
            };

            this.setFirmwares = function(firmwares){
                _this._firmwares = firmwares;
            };

            this._addFirmware = function(firmware){
                _this._firmwares.push(firmware);
            };

            this._removeFirmware = function(firmware){
                _this._firmwares.splice(_this._firmwares.indexOf(firmware), 1);
            };

            /** get current version of this firmware
             @return {[KiiPortalFirmware]} of this firmware.
             */
            this.getVersionName = function () {
                return _this.get('versionName');
            };

            /** set current version of this firmware
             @return {String} name of this firmware.
             */
            this.setVersionName = function (currentVersion) {
                _this._versionName = currentVersion;
                _this.set('versionName', currentVersion);
            };

        }

        KiiPortalFirmwareNamespace._bucketName = root.KiiExtensionBuckets.FIRMWARE_NAMESPACE;

        KiiPortalFirmwareNamespace.prototype.refreshFirmwares = function(callbacks, pageIndex, numberPerPage){
            return KiiPortalFirmware._withFirmwareNamespace(this, callbacks, pageIndex, numberPerPage);
        };

        /**
         * [createFirmware description]
         * @return {[type]} [description]
         */
        KiiPortalFirmwareNamespace.prototype.createFirmware = function(){
            return KiiPortalFirmware.factory(this.getKiiApp(), this);
        };

        /**
         * delete firmware
         * @param callbacks
         * @returns {Promise|*}
         */
        KiiPortalFirmwareNamespace.prototype.delete = function (callbacks) {
            var _this = this;
            return new Promise(function(resolve, reject){
                var deleteCallbacks = {
                    success: function(){
                        _this._kiiApp._removeFirmwareNamespace(_this);
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
        KiiPortalFirmwareNamespace.prototype.save = function (callbacks) {
            var _this = this;
            var createFlag = _this.getUUID()? false : true;

            return new Promise(function(resolve, reject){
                var saveCallbacks = {
                    success: function(firmware){
                        if(createFlag){
                            _this._kiiApp._addFirmwareNamespace(_this);
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
        KiiPortalFirmwareNamespace.factory = function (kiiApp) {
            var firmwareNamespace = _super.factory.call(this, kiiApp);

            return firmwareNamespace;
        };

        /**
         * This is called in KiiPortalObject factory process.
         * @override
         * @public
         */
        KiiPortalFirmwareNamespace.prototype._init = function(){
            this.setName(this.get('name'));
            this.setVersionName(this.get('versionName'));
        };


        /**
         * get all firmware namespace instances
         * bucket is defined as KiiPortalFirmwareNamespace._bucketName
         * @param app
         * @param callbacks
         * @param pageIndex
         * @param numberPerPage
         * @returns {*|u}
         * @private
         */
        KiiPortalFirmwareNamespace._getAll = function (app, callbacks, pageIndex, numberPerPage) {
            var _this = this;
            return new Promise(function(resolve, reject){
                var all_query, getAllCallbacks;
                // Build "all" query
                all_query = KiiQuery.queryWithClause();

                getAllCallbacks = {
                    success: function(query, firmwareNamespaces, nextQuery){
                        app.setFirmwareNamespaces(firmwareNamespaces);
                        if(callbacks && callbacks.success){
                            callbacks.success(query, firmwares, nextQuery);
                        }
                        resolve(query, firmwareNamespaces, nextQuery);
                    },
                    failure: function(query, error){
                        reject(query, error)
                    }
                };
                // execute query
                return _this.executeQuery(app ,all_query, getAllCallbacks);
            });
        };

        return KiiPortalFirmwareNamespace;
    })(KiiPortalObject);