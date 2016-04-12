    root.KiiPortalUpgradeInfo = (function(_super){

        KiiPortalUpgradeInfo.prototype = new _super();
        __inherits(KiiPortalUpgradeInfo, _super);

        KiiPortalUpgradeInfo.prototype.constructor = KiiPortalUpgradeInfo;

        function KiiPortalUpgradeInfo(){
            var _this = this;
            __bindMethod(_this);

            this._vendorThingID = '';
            this._updateStatus = '';
            this._updateMessage = '';
            this._model = '';
            this._firmwareVersion = '';

            this.getVendorThingID = function(){
                return _this.get('vendorThingID');
            };

            this._setVendorThingID = function(vendorThingID){
                _this.set('vendorThingID', vendorThingID);
                _this._vendorThingID = vendorThingID;
            };

            this._setUpdateStatus = function(status){
                _this.set('updateStatus', status);
                _this.updateStatus = status;
            };

            this.getUpdateStatus = function(){
                return _this._updateStatus;
            };

            this._setUpdateMessage = function(message){
                _this._updateMessage = message;
                _this.set('updateMessage', message);
            };

            this.getUpdateMessage = function(){
                return _this.get('updateMessage');
            };

            this._setModel = function(model){
                _this._model = model;
                _this.set('model', model);
            };

            this.getModel = function(model){
                return _this.get('model');
            };

            this.getFirmwareVersion = function(){
                return _this.get('firmwareVersion');
            };

            this._setFirmwareVersion = function(firmwareVersion){
                _this.set('firmwareVersion', firmwareVersion);
                _this._firmwareVersion = firmwareVersion;
            };
        }

        KiiPortalUpgradeInfo.useModel = function(model){
            KiiPortalUpgradeInfo.currentModel = model;
        };

        KiiPortalUpgradeInfo._bucketName = function(){
            return root.ReservedBucketPrefix['MODEL_UPDATE_INFO'] + KiiPortalUpgradeInfo.currentModel.getName();
        };

        /**
         * init after data is ready
         * override
         * @private
         */
        KiiPortalUpgradeInfo._init = function(){
            this._setVendorThingID(this.get('vendorThingID'));
            this._setUpdateMessage(this.get('updateMessage'));
            this._setUpdateStatus(this.get('updateStatus'));
            this._setModel(this.get('model'));
            this._setFirmwareVersion(this.get('firmwareVersion'));
        };

        KiiPortalUpgradeInfo.queryByModel = function(model, queryClause, callbacks){
            KiiPortalUpgradeInfo.useModel(model);
            return new Promise(function(resolve, reject){
                var getAllCallbacks, query, kiiApp;

                kiiApp = model.getKiiApp();
                query = KiiQuery.queryWithClause(queryClause);

                getAllCallbacks = {
                    success: function(query, upgradeInfos, nextQuery){
                        if(callbacks && callbacks.success){
                            callbacks.success(query, upgradeInfos, nextQuery);
                        }
                        resolve(query, upgradeInfos, nextQuery);
                    },
                    failure: function(query, error){
                        reject(query, error);
                    }
                };

                // execute query
                KiiPortalModel.executeQuery(kiiApp, query, getAllCallbacks);
            });
        };

        KiiPortalUpgradeInfo.updateStatusEnum = {
            SUCCESS: 'success',
            FAILURE: 'failure'
        };

        return KiiPortalUpgradeInfo;

    })(KiiPortalObject);