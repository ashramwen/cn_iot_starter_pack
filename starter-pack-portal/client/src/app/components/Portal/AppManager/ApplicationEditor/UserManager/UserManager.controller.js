'use strict';

angular.module('StarterPack.Portal.AppManager.UserManager')
    .controller('UserManagerController', ['$scope', '$rootScope', '$state', '$filter', 'AppUtils', 'country', function($scope, $rootScope, $state, $filter, AppUtils, country) {
        $scope.newUser = new User();

        $scope.init = function() {
            $scope.$watch('appReady', function(ready) {
                if (!ready) return;
                $scope.countryList = country;
                queryUsers();
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

        $scope.addUser = function(user) {
            console.log(user);
            AppUtils.doLoading();
            $scope.myApp.addUser(user).then(function(result) {
                queryUsers();
                AppUtils.whenLoaded();
            }, function(error) {
                console.log(error);
                AppUtils.whenLoaded();
            });
        };

        $scope.cancelAddUser = function() {
            $scope.newUser = new User();
            $scope.isExpanded = !1;
        };

        $scope.loadMore = function(query) {
            var _option = {
                limit: 5,
                paginationKey: query._paginationKey
            };
            AppUtils.doLoading();
            $scope.myApp.queryUsers({}, null, _option).then(function(result) {
                $scope.query = result.query;
                $scope.users = $scope.users.concat(result.users);
                $scope.$apply();
                AppUtils.whenLoaded();
            }, function(error) {
                console.log(error);
                AppUtils.whenLoaded();
            });
        }

        function queryUsers() {
            AppUtils.doLoading();
            $scope.myApp.queryUsers({}, null, {
                limit: 5
            }).then(function(result) {
                console.log(result.users);
                $scope.query = result.query;
                $scope.users = result.users;
                $scope.$apply();
                AppUtils.whenLoaded();
            }, function(error) {
                console.log(error);
                AppUtils.whenLoaded();
            });
        }

        function User() {
            this.loginName = '';
            this.password = '';
            this.displayName = '';
            this.emailAddress = '';
            this.phoneNumber = '';
            this.country = '';
        }
    }]);