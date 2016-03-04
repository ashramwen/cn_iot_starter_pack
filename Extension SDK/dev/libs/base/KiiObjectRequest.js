    

    root.KiiObjectRequest = (function(){
        function KiiObjectRequest(kiiApp, spec){
            this._appID = kiiApp.getAppID();
            this._appKey = kiiApp.getAppKey();
            this._token = kiiApp.getAdminContext()._token;
            this._url = spec.url;
            this._data = spec.data;
            this._method = spec.method;
            this._headers = {};
            this._extHeaders = spec.headers;
        }


        KiiObjectRequest.prototype.getAppID = function(){
            return this._appID;
        };

        KiiObjectRequest.prototype.getAppKey = function(){
            return this._appKey;
        };

        KiiObjectRequest.prototype.getToken = function(){
            return 'Bearer ' + this._token;
        };

        KiiObjectRequest.prototype.execute = function(callbacks){
            this.setKiiHeaders();
            this._disableCacheURL();

            var settings = {
                headers: this._headers,
                method: this._method,
                data: this._data,
                url: this._url
            };

            callbacks = callbacks || {};
            settings.success = callbacks.success;
            settings.failure = callbacks.failure;

            return __ajax(settings);
        };

        KiiObjectRequest.prototype._disableCacheURL = function(){
            if (this._url.indexOf('?') !== -1) {
                this._url += "&disable_cache=";
            } else {
                this._url += "?disable_cache=";
            }
            this._url += new Date().getTime();
        };

        KiiObjectRequest.prototype.setKiiHeaders = function() {
            this._headers = {
                "x-kii-appid": this.getAppID(),
                "x-kii-appkey": this.getAppKey(),
                "x-kii-sdk": KiiSDKClientInfo.getSDKClientInfo(),
                "Authorization": this.getToken()
            };
            __extends(this._headers, this._extHeaders);
        };

        return KiiObjectRequest;
    })();




