'use strict';

angular.module('StarterPack.Portal.AppManager.UserManager')
    .controller('UserManagerController', ['$scope', '$rootScope', '$state', '$filter', 'AppUtils', 'country', 'userValidateService', function($scope, $rootScope, $state, $filter, AppUtils, country, userValidateService) {
        $scope.newUser = new User();
        $scope.init = function() {
            $scope.$watch('appReady', function(ready) {
                if (!ready) return;
                $scope.countryList = country;
                queryUsers();
            });
        };

        $scope.addUser = function(user) {
            user._status = userValidateService.validate(user);
            if (!user._status.isPass()) return;
            AppUtils.doLoading();
            $scope.myApp.addUser(user).then(function(result) {
                queryUsers();
                $scope.cancelAddUser();
                AppUtils.whenLoaded();
            }, ajaxError);
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
            }, ajaxError);
        };

        $scope.toggleEdit = function(user) {
            if (user._onEdit) {
                delete user._field;
                delete user._status;
            } else {
                user._field = angular.copy(user._info);
            }
            user._onEdit = !user._onEdit;
        };

        $scope.resetUserPassword = function(user, type) {
            AppUtils.doLoading();
            $scope.myApp.resetPassword(user._info.userID, type).then(function(result) {
                AppUtils.whenLoaded();
            }, ajaxError);
        };

        $scope.toggleUserStatus = function(user, index) {
            var _data = {
                'disabled': !user._info._disabled
            };
            AppUtils.doLoading();
            $scope.myApp.toggleUserStatus(user._info.userID, _data).then(function(result) {
                user._info._disabled = !user._info._disabled;
                $scope.toggleEdit(user);
                $scope.$apply();
                AppUtils.whenLoaded();
            }, ajaxError);
        };

        $scope.updateUser = function(user, index) {
            user._status = userValidateService.validateUpdate(user._field);
            if (!user._status.isPass()) return;
            var _data = {};
            for (var name in $scope.newUser) {
                if (user._info[name] !== user._field[name])
                    _data[name] = user._field[name];
            }
            AppUtils.doLoading();
            $scope.myApp.updateUser(user._info.userID, _data).then(function(result) {
                $scope.myApp.queryUserByID(user._info.userID).then(function(result) {
                    user._info = result._info;
                    $scope.toggleEdit(user);
                    $scope.$apply();
                    AppUtils.whenLoaded();
                }, ajaxError);
            }, ajaxError);
        };

        function ajaxError(error, callback) {
            console.log(error);
            AppUtils.whenLoaded();
            (callback && typeof(callback) === "function") && callback();
        }

        function queryUsers() {
            AppUtils.doLoading();
            $scope.myApp.queryUsers({}, null, {
                limit: 5
            }).then(function(result) {
                $scope.query = result.query;
                $scope.users = result.users;
                $scope.$apply();
                AppUtils.whenLoaded();
            }, ajaxError);
        }

        function toogleStatus(user, status) {
            // user._info.
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