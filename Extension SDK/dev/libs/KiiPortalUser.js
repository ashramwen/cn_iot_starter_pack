/**
 * class user request
 */

root.KiiPortalUserQuery = (function(_super) {
    __inherits(KiiPortalUserQuery, _super);
    KiiPortalUserQuery.prototype.constructor = KiiPortalUserQuery;

    function KiiPortalUserQuery() {}

    KiiPortalUserQuery.queryName = 'userQuery';

    /**
     * override
     * @param  {[type]} kiiApp [description]
     * @param  {[type]} spec   [description]
     * @return {[type]}        [description]
     */
    KiiPortalUserQuery._getRequest = function(kiiApp, spec) {
        spec.headers = spec.headers || {};
        spec.headers['Content-Type'] = 'application/vnd.kii.userqueryrequest+json';

        return new KiiObjectRequest(kiiApp, spec);
    };

    /**
     * override
     * @param  {[type]} kiiApp [description]
     * @return {[type]}        [description]
     */
    KiiPortalUserQuery._generatePath = function(kiiApp) {
        return _super._generatePath.call(this, kiiApp) + '/users';
    };

    /**
     * override
     * @param  {[type]} data [description]
     * @return {[type]}      [description]
     */
    KiiPortalUserQuery._instantiate = function(data) {
        if (data !== null) {
            return new KiiPortalUser(data);
        } else {
            return null;
        }
    };

    return KiiPortalUserQuery;
})(KiiPortalQuery);

root.KiiPortalUserRequest = (function(_super) {
    __inherits(KiiPortalUserRequest, _super);
    KiiPortalUserRequest.prototype.constructor = KiiPortalUserRequest;

    function KiiPortalUserRequest(kiiApp, spec) {
        KiiPortalUserRequest.prototype = new _super(kiiApp, spec);
        var _spec = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        };
        __extends(_spec, spec);
        this._appID = kiiApp.getAppID();
        this._appKey = kiiApp.getAppKey();
        this._token = kiiApp.getAdminContext()._token;
        this._url = Kii.getBaseURL() + '/apps/' + kiiApp.getAppID() + spec.extraUrl;
        this._data = _spec.data;
        this._method = _spec.method;
        this._headers = {};
        this._extHeaders = _spec.headers;
    }

    // KiiPortalUserRequest.prototype.execute = function(callbacks){
    //     _super.prototype.execute.call(this, callbacks);
    // };

    return KiiPortalUserRequest;
})(KiiObjectRequest);

root.KiiPortalUser = (function(_super) {
    __inherits(KiiPortalUser, _super);
    KiiPortalUser.prototype.constructor = KiiPortalUser;

    function KiiPortalUser(data) {
        var _this = this;
        __bindMethod(_this);
        this._info = {};
        this._info.userID = data.userID;
        this._info.internalUserID = data.internalUserID;
        this._info.loginName = data.loginName;
        this._info.displayName = data.displayName;
        this._info.country = data.country;
        this._info.emailAddress = data.emailAddress;
        this._info.emailAddressVerified = data.emailAddressVerified;
        this._info.phoneNumber = data.phoneNumber;
        this._info.phoneNumberVerified = data.phoneNumberVerified;
        this._info.disabled = data.disabled;
        this._info.createdAt = data.createdAt;
        this._info.modifiedAt = data.modifiedAt;
        this._info.passwordChangedAt = data.passwordChangedAt;
        this._info._disabled = data._disabled;
        this._info._hasPassword = data._hasPassword;
    };
    return KiiPortalUser;
})(KiiUserAdmin);

KiiPortalUser.queryUsers = function(kiiApp, callbacks, queryClause, dictVal) {
    return new Promise(function(resolve, reject) {
        var query;

        query = KiiPortalUserQuery.queryWithClause(queryClause);
        query.setDict(dictVal);

        var queryCallbacks = {
            success: function(query, users) {
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

        return KiiPortalUserQuery.executeQuery(kiiApp, query, queryCallbacks);
    });
};

KiiPortalUser.queryUserByID = function(kiiApp, userID) {
    return new Promise(function(resolve, reject) {
        var spec = {
            extraUrl: '/users/' + userID
        };

        var request = new KiiPortalUserRequest(kiiApp, spec);
        request.execute().then(function(response) {
            resolve(new KiiPortalUser(response.data));
        }, function(error) {
            reject(error);
        });
    });
};

KiiPortalUser.addUser = function(kiiApp, data) {
    return new Promise(function(resolve, reject) {
        var _data = {
            'loginName': data.loginName,
            'password': data.password,
            'displayName': data.displayName,
            'emailAddress': data.emailAddress,
            'phoneNumber': data.phoneNumber,
            'country': data.country,
            'phoneNumberVerified': null,
            'emailAddressVerified': null,
            'createdAt': null,
            'modifiedAt': null
        };
        if (!_data.country) delete _data.country;

        var spec = {
            data: _data,
            method: 'POST',
            headers: {
                'Content-Type': 'application/vnd.kii.RegistrationRequest+json',
            },
            extraUrl: '/users'
        };

        var request = new KiiPortalUserRequest(kiiApp, spec);
        request.execute().then(function(response) {
            resolve(response);
        }, function(error) {
            reject(error);
        });
    });
};

KiiPortalUser.updateUser = function(kiiApp, userID, data) {
    return new Promise(function(resolve, reject) {
        var spec = {
            data: data,
            method: 'POST',
            headers: {
                'Content-Type': 'application/vnd.kii.UserUpdateRequest+json',
            },
            extraUrl: '/users/' + userID
        };

        var request = new KiiPortalUserRequest(kiiApp, spec);
        request.execute().then(function(response) {
            resolve(response);
        }, function(error) {
            reject(error);
        });
    });
};

KiiPortalUser.toggleUserStatus = function(kiiApp, userID, data) {
    return new Promise(function(resolve, reject) {
        var spec = {
            data: data,
            method: 'PUT',
            headers: {
                'Content-Type': 'application/vnd.kii.UserStatusUpdateRequest+json',
            },
            extraUrl: '/users/' + userID + '/status'
        };

        var request = new KiiPortalUserRequest(kiiApp, spec);
        request.execute().then(function(response) {
            resolve(response);
        }, function(error) {
            reject(error);
        });
    });
};

KiiPortalUser.resetPassword = function(kiiApp, userID, data) {
    return new Promise(function(resolve, reject) {
        var _data = {
            'notificationMethod': data
        };

        var spec = {
            data: _data,
            method: 'POST',
            headers: {
                'Content-Type': 'application/vnd.kii.ResetPasswordRequest+json',
            },
            extraUrl: '/users/' + userID + '/password/request-reset'
        };

        var request = new KiiPortalUserRequest(kiiApp, spec);
        request.execute().then(function(response) {
            resolve(response);
        }, function(error) {
            reject(error);
        });
    });
};