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

        $scope.addUser = function(newUser) {
            cleanMessage();
            newUser._status = userValidateService.validate(newUser);
            if (!newUser._status.isPass()) return;
            AppUtils.doLoading();
            delete newUser._status;
            var user = new KiiPortalUser(newUser);
            user.register().then(function(result) {
                // queryUsers();
                $scope.cancelAddUser();
                $scope.message = {
                    'loginName': newUser.loginName,
                    'status': MessageType.Created
                };
                $scope.$apply();
                AppUtils.whenLoaded();
            }, ajaxError);
        };

        $scope.cancelAddUser = function() {
            cleanMessage();
            $scope.isExpanded = !1;
        };

        $scope.cancelDelete = function() {
            cleanMessage();
        };

        $scope.confirmDeleteUser = function(user, index) {
            cleanMessage();
            $document[0].body.scrollTop = 0;
            $scope.message = {
                'loginName': user._info.loginName,
                'user': user,
                'index': index,
                'status': MessageType.ConfirmDelete
            };
        };

        $scope.deleteUser = function() {
            var user = angular.copy($scope.message.user);
            var index = $scope.message.index;
            cleanMessage();
            AppUtils.doLoading();
            user.delete().then(function(result) {
                $scope.message = {
                    'loginName': user._info.loginName,
                    'status': MessageType.Deleted
                }
                if ($scope.users[index].getID() === user.getID()) {
                    $scope.users.splice(index, 1);
                }
                $scope.$apply();
                AppUtils.whenLoaded();
            }, ajaxError);
        };

        $scope.getCustomAttributes = function(user) {
            var existingKeys = [
                'userID', 'internalUserID', 'loginName', 'displayName',
                'country', 'emailAddress', 'emailAddressVerified', 'phoneNumber',
                'phoneNumberVerified', 'disabled', 'createdAt', 'modifiedAt',
                'passwordChangedAt', '_disabled', '_hasPassword'
            ];
            user._field.customAttributes = _.omit(user._info, existingKeys);
        };

        $scope.getGroupData = function(user) {
            AppUtils.doLoading();
            user._field.group = {};
            user.ownerOfGroups().then(function(result) {
                user._field.group.owner = result.data.groups;
                $scope.$apply();
                AppUtils.whenLoaded();
            }, ajaxError);
            user.memberOfGroups().then(function(result) {
                user._field.group.member = result.data.groups;
                $scope.$apply();
                AppUtils.whenLoaded();
            }, ajaxError);
        };

        $scope.loadMore = function(query) {
            cleanMessage();
            var _option = {
                limit: 5,
                paginationKey: query._paginationKey
            };
            queryUsers(_option, !0);
        };

        $scope.expandAddUser = function() {
            if ($scope.isExpanded === !0) return;
            $scope.isExpanded = !0;
            $scope.newUser = new User();
            cleanMessage();
        };

        $scope.resetUserPassword = function(user, type) {
            cleanMessage();
            AppUtils.doLoading();
            user.resetPassword(type).then(function(result) {
                if (type === 'SMS') {
                    $scope.message = {
                        'loginName': user._info.loginName,
                        'status': MessageType.SendSms
                    }
                } else {
                    $scope.message = {
                        'loginName': user._info.loginName,
                        'status': MessageType.SendEmail
                    }
                }
                $scope.$apply();
                AppUtils.whenLoaded();
            }, function(error) {
                ajaxError(error, function() {
                    error = angular.fromJson(error);
                    if (error.errorCode !== 'USER_DISABLED') return;
                    $scope.message = {
                        'loginName': user._info.loginName,
                        'status': MessageType.isSuspended
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
                $scope.getCustomAttributes(user);
            }
            user._onEdit = !user._onEdit;
        };

        $scope.toggleUserStatus = function(user, index) {
            cleanMessage();
            var _data = {
                'disabled': !user._info._disabled
            };
            AppUtils.doLoading();
            user.toggleUserStatus(_data).then(function(result) {
                user._info._disabled = !user._info._disabled;
                $scope.message = {
                    'loginName': user._info.loginName,
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
            _.extend(_data, user._field.customAttributes);
            AppUtils.doLoading();
            user.update(_data).then(function(result) {
                $scope.myApp.findUserByUserID(user.getID()).then(function(result) {
                    user._info = result._info;
                    $scope.message = {
                        'loginName': user._info.loginName,
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

        function queryUsers(option, concat) {
            var _option = {
                'limit': 200
            };
            angular.extend(_option, option);
            AppUtils.doLoading();
            $scope.myApp.getUserList({}, null, _option).then(function(result) {
                $scope.query = result.query;
                $scope.users = (concat ? $scope.users.concat(result.users) : result.users);
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
