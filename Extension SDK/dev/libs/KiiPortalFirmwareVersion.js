
    /**
     * currently disabled. please don't use it.
     */
    root.KiiPortalFirmwareVersion = (function (KiiObject) {
        var _super;
        _super = KiiObject;
        /**
         @class Firmware version class
         */
        __inherits(KiiPortalFirmwareVersion, KiiObject);
        function KiiPortalFirmwareVersion() {
            var _this = this;
            this._firmwareID = null;
            this._versionCode = null;
            this._downloadUrl = null;
            this._published = null;
            this._createdDate = null;
            this._publishedDate = null;
            this._description = null;

            this.setFirmwareID = function (firmwareID) {
                _this._firmwareID = firmwareID;
                _this.set('firmwareID', firmwareID);
            }

            this.setDownloadUrl = function (downloadUrl) {
                _this._downloadUrl = downloadUrl;
                _super.prototype.set.call(_this, 'downloadUrl', downloadUrl);
            };
            this.getDownloadUrl = function () {
                return _super.prototype.get.call(_this, 'downloadUrl');
            };

            this.getVersionCode = function () {
                return _super.prototype.get.call(_this,"versionCode");
            };
            this.setVersionCode = function (versionCode) {
                _this._versionCode = versionCode;
                _super.prototype.set.call(_this, 'versionCode', versionCode);
            };

            this.setPublished = function (published) {
                _this._published = published;
                _super.prototype.set.call(_this, 'published', published);
            };
            this.getPublished = function () {
                return _super.prototype.get.call(_this, "published");
            };

            this.setCreatedDate = function (createdDate) {
                _this._createdDate = createdDate;
                _super.prototype.set.call(_this, 'createdDate', createdDate);
            };
            this.getCreatedDate = function () {
                return _super.prototype.get.call(_this, "createdDate");
            };

            this.setPublishedDate = function (publishedDate) {
                _this._publishedDate = publishedDate;
                _super.prototype.set.call(_this, 'publishedDate', publishedDate);
            };
            this.getPublishedDate = function () {
                return _super.prototype.get.call(_this, "publishedDate");
            };

            this.setDescription = function (description) {
                _this._description = description;
                _super.prototype.set.call(_this, 'description', description);
            };
            this.getDescription = function () {
                return _super.prototype.get.call(_this, "description");
            };


        }

        /**
         * get firmware version of given firmware
         * static method
         * @param firmware instance of firmware
         * @param callbacks
         * @returns {Promise|*}
         */
        KiiPortalFirmwareVersion.withFirmware = function (firmware, callbacks) {
            return new Promise((function (_this) {
                return function (resolve, reject) {
                    var getVersionsCallbacks = {
                        success: function (objects) {
                            __each(objects, function (object, index) {
                                var _version = KiiPortalFirmwareVersion._factory(firmware);
                                _version._renew(object);
                                objects[index] = _version;
                            });

                            if (callbacks) {
                                callbacks.success.call(callbacks, objects);
                            }
                            resolve(objects);
                        },
                        failed: function () {
                            if (callbacks) {
                                callbacks.failed.apply(callbacks, arguments);
                            }
                            reject(arguments);
                        }
                    };

                    var bucket, firmwareUUID, all_query;
                    firmwareUUID = firmware.getUUID();
                    bucket = KiiPortalAdmin.bucketWithName(ReservedBucketPrefix.FIRMWARE + firmwareUUID);
                    all_query = KiiQuery.queryWithClause();

                    return bucket.executeQuery(all_query, getVersionsCallbacks);
                }
            })(this));
        };

        /**
         * create instance of KiiPortalFirmwareVersion
         */
        KiiPortalFirmwareVersion.factory = function (firmware) {
            return KiiPortalFirmwareVersion._factory(firmware);
        }

        /**
         * create instance of KiiPortalFirmwareVersion
         * @param firmware
         * @returns {KiiPortalFirmwareVersion}
         * @private
         */
        KiiPortalFirmwareVersion._factory = function (firmware) {
            var version = new KiiPortalFirmwareVersion();

            var adminContext, bucket, kiiObject, firmwareUUID, kiiApp;

            firmwareUUID = firmware.getUUID();
            kiiApp = firmware.getKiiApp();
            adminContext = kiiApp.getAdminContext();
            bucket = adminContext.bucketWithName(ReservedBucketPrefix.FIRMWARE + firmwareUUID);
            kiiObject = bucket.createObject();

            __extends(version, kiiObject);
            version.setFirmwareID(firmwareUUID);

            return version;
        };

        /**
         * cast KiiObject instance to KiiPortalFirmwareVersion Object
         * @param object KiiObject
         * @private
         */
        KiiPortalFirmwareVersion.prototype._renew = function (object) {
            __extends(this, object);
            this.setVersionCode(object.get('versionCode'));
            this.setFirmwareID(object.get('firmwareID'));
            this.setDownloadUrl(object.get('downloadUrl'));
            this.setPublished(object.get('published'));
            this.setCreatedDate(object.get('createdDate'));
            this.setPublishedDate(object.get('publishedDate'));
            this.setDescription(object.get('description'));
        }

        /**
         * save portal firmware version
         * @returns {Promise|*|Promise|*}
         */
        KiiPortalFirmwareVersion.prototype.save = function () {
            return _super.prototype.save.apply(this, arguments);
        };

        return KiiPortalFirmwareVersion;
    })(KiiObject);