'use strict';

angular.module('StarterPack.Portal.AppManager.UserManager')
    .controller('UserManagerController', ['$scope', '$rootScope', '$state', '$filter', '$document', 'AppUtils', 'country', 'userValidateService', function($scope, $rootScope, $state, $filter, $document, AppUtils, country, userValidateService) {
        var MessageType = {
            Created: 1,
            Updated: 2,
            Suspend: 3,
            Activated: 4,
            SendSms: 5,
            SendEmail: 6,
            Deleted: 7,
            ConfirmDelete: 8
        };

        $scope.newUser = new User();
        $scope.message = {};

        $scope.init = function() {
            cleanMessage();
            $scope.$watch('appReady', function(ready) {
                if (!ready) return;
                $scope.countryList = country;
                queryUsers();
            });
        };

        $scope.addUser = function(user) {
            cleanMessage();
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
            cleanMessage();
            $scope.newUser = new User();
            $scope.isExpanded = !1;
        };

        $scope.cancelAddUser = function() {
            cleanMessage();
        };

        $scope.confirmDeleteUser = function(user, index) {
            cleanMessage();
            $document[0].body.scrollTop = 0;
            $scope.message = {
                'user': user._info.loginName,
                'userID': user._info.userID,
                'index': index,
                'status': MessageType.ConfirmDelete
            };
        };

        $scope.deleteUser = function() {
            var userID = $scope.message.userID;
            var index = $scope.message.index;
            cleanMessage();
            AppUtils.doLoading();
            $scope.myApp.deleteUser(userID).then(function(result) {
                $scope.message = {
                    'status': MessageType.Deleted
                };
                if ($scope.users[index]._info.userID === userID) {
                    $scope.users.splice(index, 1);
                    $scope.$apply();
                }
                AppUtils.whenLoaded();
            }, ajaxError);
        };

        $scope.loadMore = function(query) {
            cleanMessage();
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
            cleanMessage();
            if (user._onEdit) {
                delete user._field;
                delete user._status;
            } else {
                user._field = angular.copy(user._info);
            }
            user._onEdit = !user._onEdit;
        };

        $scope.resetUserPassword = function(user, type) {
            cleanMessage();
            AppUtils.doLoading();
            $scope.myApp.resetPassword(user._info.userID, type).then(function(result) {
                AppUtils.whenLoaded();
            }, ajaxError);
        };

        $scope.toggleUserStatus = function(user, index) {
            cleanMessage();
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
            cleanMessage();
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

        function cleanMessage() {
            $scope.message = {};
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

        function User() {
            this.loginName = '';
            this.password = '';
            this.displayName = '';
            this.emailAddress = '';
            this.phoneNumber = '';
            this.country = '';
        }
    }]);