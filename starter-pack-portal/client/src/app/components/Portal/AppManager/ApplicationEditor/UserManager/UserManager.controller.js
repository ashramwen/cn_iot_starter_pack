'use strict';

angular.module('StarterPack.Portal.AppManager.UserManager')
    .controller('UserManagerController', ['$scope', '$rootScope', '$state', '$filter', 'AppUtils', 'country', function($scope, $rootScope, $state, $filter, AppUtils, country) {
        $scope.init = function() {
            $scope.$watch('appReady', function(ready) {
                if (!ready) return;
                $scope.countryList = country;
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

        $scope.toggleEdit = function(user) {
            if (user._onEdit) {
                delete user._field;
            } else {
                user._field = angular.copy(user._info);
            }
            user._onEdit = !user._onEdit;
        };
    }]);