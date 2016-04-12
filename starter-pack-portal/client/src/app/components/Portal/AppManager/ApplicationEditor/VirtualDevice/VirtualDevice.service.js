angular.module('StarterPack.Portal.AppManager.VirtualDevice').factory('thingService', ['$http', function($http) {
    var baseUrl;
    var app;
    return {
        init: function() {
            baseUrl = Kii.getBaseURL().slice(0, -3);
            app = {
                'id': Kii.getAppID(),
                'key': Kii.getAppKey()
            };
        },
        getState: function(thing) {
            var options = {
                method: 'GET',
                headers: {
                    'x-kii-appid': app.id,
                    'x-kii-appkey': app.key,
                    'Authorization': 'Bearer ' + thing._accessToken,
                    'Content-Type': 'application/json',
                },
                url: baseUrl + 'thing-if/apps/' + Kii.getAppID() + '/targets/thing:' + thing._thingID + '/states'
            };
            return $http(options);
        },
        setState: function(thing, data) {
            var options = {
                data: data,
                method: 'PUT',
                headers: {
                    'x-kii-appid': app.id,
                    'x-kii-appkey': app.key,
                    'Authorization': 'Bearer ' + thing._accessToken,
                    'Content-Type': 'application/json',
                },
                url: baseUrl + 'thing-if/apps/' + Kii.getAppID() + '/targets/thing:' + thing._thingID + '/states'
            };
            return $http(options);
        },
        getCommands: function(thing) {
            var options = {
                method: 'GET',
                headers: {
                    'x-kii-appid': app.id,
                    'x-kii-appkey': app.key,
                    'Authorization': 'Bearer ' + thing._accessToken,
                    'Content-Type': 'application/json',
                },
                url: baseUrl + 'thing-if/apps/' + Kii.getAppID() + '/targets/thing:' + thing._thingID + '/commands'
            };
            return $http(options);
        }
    }
}]);
