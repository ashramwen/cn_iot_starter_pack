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

        $scope.addUser = function(user) {
            AppUtils.doLoading();
            $scope.myApp.addUser(user).then(function(result) {
                queryUsers();
                AppUtils.whenLoaded();
            }, _ajaxError);
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
            }, _ajaxError);
        }

        $scope.toggleEdit = function(user) {
            if (user._onEdit) {
                delete user._field;
            } else {
                user._field = angular.copy(user._info);
            }
            user._onEdit = !user._onEdit;
        };

        $scope.updateUser = function(user, index) {
            var _data = {};
            for (var name in $scope.newUser) {
                if (user._info[name] !== user._field[name])
                    _data[name] = user._field[name];
            }
            AppUtils.doLoading();
            $scope.myApp.updateUser(user._info.userID, _data).then(function(result) {
                $scope.myApp.queryUserByID(user._info.userID).then(function(result) {
                    user._info = result._info;
                    $scope.$apply();
                    AppUtils.whenLoaded();
                }, _ajaxError);
            }, _ajaxError);
        };

        function queryUsers() {
            AppUtils.doLoading();
            $scope.myApp.queryUsers({}, null, {
                limit: 5
            }).then(function(result) {
                $scope.query = result.query;
                $scope.users = result.users;
                $scope.$apply();
                AppUtils.whenLoaded();
            }, _ajaxError);
        }

        function User() {
            this.loginName = '';
            this.password = '';
            this.displayName = '';
            this.emailAddress = '';
            this.phoneNumber = '';
            this.country = '';
        }

        function _ajaxError(error) {
            console.log(error);
            AppUtils.whenLoaded();
        }
    }]);