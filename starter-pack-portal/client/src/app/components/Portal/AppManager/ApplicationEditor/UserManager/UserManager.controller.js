'use strict';

angular.module('StarterPack.Portal.AppManager.UserManager')
    .controller('UserManagerController', ['$scope', '$rootScope', '$state', '$filter', '$document', 'AppUtils', 'country', 'userValidateService', function($scope, $rootScope, $state, $filter, $document, AppUtils, country, userValidateService) {
            var MessageType = {
                Created: 1,
                Updated: 2,
                Suspend: 3,
                Activated: 4,
                SendEmail: 5,
                SendSms: 6,
                Deleted: 7,
                ConfirmDelete: 8,
                isSuspended: 9
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
                    // queryUsers();
                    $scope.cancelAddUser();
                    $scope.message = {
                        'user': user.loginName,
                        'status': MessageType.Created
                    };
                    $scope.$apply();
                    AppUtils.whenLoaded();
                }, ajaxError);
            };

            $scope.cancelAddUser = function() {
                cleanMessage();
                $scope.newUser = new User();
                $scope.isExpanded = !1;
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
                var user = angular.copy($scope.message);
                cleanMessage();
                AppUtils.doLoading();
                $scope.myApp.deleteUser(user.userID).then(function(result) {
                    $scope.message = {
                        user: user.user,
                        status: MessageType.Deleted
                    }
                    if ($scope.users[user.index]._info.userID === userID) {
                        $scope.users.splice(user.index, 1);
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

            $scope.resetUserPassword = function(user, type) {
                cleanMessage();
                AppUtils.doLoading();
                $scope.myApp.resetPassword(user._info.userID, type).then(function(result) {
                    if (type === 'SMS') {
                        $scope.message = {
                            user: user._info.loginName,
                            status: MessageType.SendSms
                        }
                    } else {
                        $scope.message = {
                            user: user._info.loginName,
                            status: MessageType.SendEmail
                        }
                    }
                    $scope.$apply();
                    AppUtils.whenLoaded();
                }, function(error) {
                    ajaxError(error, function() {
                        error = angular.fromJson(error);
                        if (error.errorCode !== 'USER_DISABLED') return;
                        $scope.message = {
                            user: user._info.loginName,
                            status: MessageType.isSuspended
                        }
                        $scope.$apply();
                    })
                });
            };

        $scope.toggleEdit = function(user, clean) {
            if (clean !== false)
                cleanMessage();
            if (user._onEdit) {
                delete user._field;
                delete user._status;
            } else {
                user._field = angular.copy(user._info);
            }
            user._onEdit = !user._onEdit;
        };

        $scope.toggleUserStatus = function(user, index) {
            cleanMessage();
            var _data = {
                'disabled': !user._info._disabled
            };
            AppUtils.doLoading();
            $scope.myApp.toggleUserStatus(user._info.userID, _data).then(function(result) {
                user._info._disabled = !user._info._disabled;
                $scope.message = {
                    'user': user._info.loginName,
                    'status': (user._info._disabled ? MessageType.Suspend : MessageType.Activated)
                };
                $scope.toggleEdit(user, false);
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
                    $scope.message = {
                        'user': user._info.loginName,
                        'status': MessageType.Updated
                    };
                    $scope.toggleEdit(user, false);
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
                limit: 200
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