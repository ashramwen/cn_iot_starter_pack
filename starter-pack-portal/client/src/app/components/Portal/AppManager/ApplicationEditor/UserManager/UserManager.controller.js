'use strict';

angular.module('StarterPack.Portal.AppManager.UserManager')
    .controller('UserManagerController', ['$scope', '$rootScope', '$state', 'AppUtils', function($scope, $rootScope, $state, AppUtils) {
        $scope.init = function() {
            $scope.$watch('appReady', function(ready) {
                if (!ready) return;
                AppUtils.doLoading();
                $scope.myApp.queryUsers({}, null, {
                    limit: 5
                }).then(function(result) {
                    $scope.users = result.users;
                    $scope.$apply();
                    AppUtils.whenLoaded();
                }, function(error) {
                    console.log(error);
                    AppUtils.whenLoaded();
                });;
            });
        };
    }]);