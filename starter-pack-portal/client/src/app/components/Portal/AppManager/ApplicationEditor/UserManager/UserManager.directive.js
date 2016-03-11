angular.module('StarterPack.Portal.AppManager.UserManager')
    .directive('validateMessage', [function() {
        return {
            restrict: 'EA',
            replace: true,
            templateUrl: 'app/components/Portal/AppManager/ApplicationEditor/UserManager/UserManager.template.html',
            scope: {
                user: '='
            },
            link: function(scope, element, attrs) {
                scope.s1 = true;
            }
        }
    }]);