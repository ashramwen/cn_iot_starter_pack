angular.module('StarterPack.Portal.AppManager.UserManager')
    .filter('dateOnly', ['$filter', function($filter) {
        return function(input) {
            var angularDateFilter = $filter('date');
            return function(theDate) {
                return angularDateFilter(theDate, 'yyyy-MM-dd');
            }
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