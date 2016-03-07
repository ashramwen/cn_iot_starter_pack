/**
 * class user request
 */
root.KiiPortalUser = (function(_super) {
    __inherits(KiiPortalUser, _super);
    KiiPortalUser.prototype.constructor = KiiPortalUser;

    function KiiPortalUser() {
        /*
        var _this = this;
        __each(KiiPortalFirmware.prototype, function(value, key){
            if(__isFunction(value))
                _this[key] = __bind(value, _this);
        });

        return this._clone(query);
        */
    };

    KiiPortalUser.queryName = 'userQuery';

    /**
     * override
     * @param  {[type]} kiiApp [description]
     * @param  {[type]} spec   [description]
     * @return {[type]}        [description]
     */
    KiiPortalUser._getRequest = function(kiiApp, spec) {
        spec.headers = spec.headers || {};
        spec.headers['Content-Type'] = 'application/vnd.kii.userqueryrequest+json';

        return new KiiObjectRequest(kiiApp, spec);
    };

    /**
     * override
     * @param  {[type]} kiiApp [description]
     * @return {[type]}        [description]
     */
    KiiPortalUser._generatePath = function(kiiApp) {
        return _super._generatePath.call(this, kiiApp) + '/users';
    };

    /**
     * override
     * @param  {[type]} data [description]
     * @return {[type]}      [description]
     */
    KiiPortalUser._instantiate = function(data) {
        if (data != null) {
            var user = new root.KiiUser();
            user._info = {
                'userID': data.userID,
                'internalUserID': data.internalUserID,
                'loginName': data.loginName,
                'displayName': data.displayName,
                'country': data.country,
                'emailAddress': data.emailAddress,
                'emailAddressVerified': data.emailAddressVerified,
                'phoneNumber': data.phoneNumber,
                'phoneNumberVerified': data.phoneNumberVerified,
                'disabled': data.disabled,
                'createdAt': data.createdAt,
                'modifiedAt': data.modifiedAt,
                'passwordChangedAt': data.passwordChangedAt,
                '_disabled': data._disabled,
                '_hasPassword': data._hasPassword
            };
            return user;
        } else {
            return null;
        }
    };

    return KiiPortalUser;
})(KiiPortalQuery);

KiiPortalUser.query = function(kiiApp, callbacks, queryClause, dictVal) {
    return new Promise(function(resolve, reject) {
        var query;

        query = KiiPortalUser.queryWithClause(queryClause);
        query.setDict(dictVal);

        var queryCallbacks = {
            success: function(query, users) {
                kiiApp._setUsers(users);
                if (callbacks && callbacks.success) {
                    callbacks.success.apply(callbacks.success, arguments);
                }
                resolve({
                    query: query,
                    users: users
                });
            },
            failure: function(query, error) {
                if (callbacks && callbacks.failure) {
                    callbacks.failure.apply(callbacks.failure, arguments);
                }
                reject({
                    query: query,
                    error: error
                });
            }
        };

        return KiiPortalUser.executeQuery(kiiApp, query, queryCallbacks);
    });
};