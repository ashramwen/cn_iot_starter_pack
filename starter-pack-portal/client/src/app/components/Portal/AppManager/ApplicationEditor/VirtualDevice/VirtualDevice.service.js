angular.module('StarterPack.Portal.AppManager.VirtualDevice').factory('thingService', ['$http', function($http) {
    var kiiApp;
    return {
        setApp: function(app) {
            kiiApp = app;
        },
        getState: function(thing) {
            var baseUrl = Kii.getBaseURL().slice(0, -3);
            var spec = {
                method: 'GET',
                headers: {
                    "x-kii-appid": Kii.getAppID(),
                    "x-kii-appkey": Kii.getAppKey(),
                    "Authorization": 'Bearer ' + thing._accessToken,
                    'Content-Type': 'application/json',
                },
                url: baseUrl + 'thing-if/apps/' + Kii.getAppID() + '/targets/thing:' + thing._thingID + '/states'
            };
            return $http(spec);
        }
    }
}]);
