angular.module('StarterPack.Portal.AppManager.UserManager')
    .filter('country', ['country', function(country) {
        return function(input) {
            var result = _.findWhere(country, {
                'code': input
            });
            return result ? result.name : '';
        };
    }]);
