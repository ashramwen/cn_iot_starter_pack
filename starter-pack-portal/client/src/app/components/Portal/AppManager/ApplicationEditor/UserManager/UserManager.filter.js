angular.module('StarterPack.Portal.AppManager.UserManager')
    .filter('dateOnly', ['$filter', function($filter) {
        var angularDateFilter = $filter('date');
        return function(input) {
            return angularDateFilter(input, 'yyyy-MM-dd');
        };
    }])
    .filter('country', ['country', function(country) {
        return function(input) {
            var result = _.findWhere(country, {
                'code': input
            });
            return result ? result.name : '';
        };
    }]);
