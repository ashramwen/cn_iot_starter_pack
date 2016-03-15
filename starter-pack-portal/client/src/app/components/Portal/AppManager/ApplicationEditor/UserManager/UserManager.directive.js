angular.module('StarterPack.Portal.AppManager.UserManager')
    .directive('validateMessage', ['$timeout', function($timeout) {
        var timer;
        return {
            restrict: 'EA',
            replace: true,
            templateUrl: 'app/components/Portal/AppManager/ApplicationEditor/UserManager/UserManager.template.html',
            scope: {
                status: '='
            },
            link: function(scope, element, attrs) {
                // scope.$watchCollection('status', function(newStatus, oldStatus) {
                //     if (scope.status) {
                //         if (timer)
                //             $timeout.cancel(timer);
                //         timer = $timeout(function() {
                //             if (scope.status)
                //                 scope.status = undefined;
                //         }, 5000);
                //     } else {
                //         if (timer)
                //             $timeout.cancel(timer);
                //     }
                // });
            }
        }
    }]);