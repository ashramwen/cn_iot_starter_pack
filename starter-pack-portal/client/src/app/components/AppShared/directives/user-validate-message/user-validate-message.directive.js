angular.module('StarterPack.AppShared')
    .directive('userValidateMessage', ['$timeout', function($timeout) {
        var timer;
        return {
            restrict: 'EA',
            replace: true,
            templateUrl: 'app/components/AppShared/directives/user-validate-message/user-validate-message.template.html',
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