angular.module('StarterPack.AppShared').directive('switchery',['$timeout', function($timeout){
    return {
        restrict: 'E',
        scope: {
            ngModel: '=?',
            reverse: '=?'
        },
        templateUrl: 'app/components/AppShared/directives/switchery/switchery.template.html',
        replace: true,
        link: function(scope, element, attrs){
            scope.on = scope.on;
            scope.yesText = attrs['yesText'] || '';
            scope.noText = attrs['noText'] || '';
            scope.switch = function(){
                scope.on = !scope.on;
            }
        }
    };
}]);