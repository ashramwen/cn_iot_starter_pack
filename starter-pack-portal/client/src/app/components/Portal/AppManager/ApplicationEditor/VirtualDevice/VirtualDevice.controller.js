'use strict';

angular.module('StarterPack.Portal.AppManager.VirtualDevice')
    .controller('VirtualDeviceController', ['$scope', '$rootScope', '$state', 'AppUtils', function($scope, $rootScope, $state, AppUtils) {
        $scope.init = function() {
            $scope.$watch('appReady', function(ready) {
                if (!ready) return;
                // var mqtt = new KiiPortalMqtt();
                // mqtt.init();
            });
        };

        $scope.login = function(user) {
            function register(user) {
                var newUser = KiiUser.userWithUsername(user.loginName, user.password);
                newUser.register({
                    success: function(theUser) {
                        $scope.myApp.user = theUser;
                        $scope.$apply();
                        AppUtils.whenLoaded();
                    },
                    failure: function(errorString) {
                        console.log(errorString);
                        AppUtils.whenLoaded();
                    }
                });
            }

            AppUtils.doLoading();
            KiiPortalUser.authenticate(user.loginName, user.password, {
                success: function(theUser) {
                    $scope.myApp.user = theUser;
                    $scope.$apply();
                    AppUtils.whenLoaded();
                },
                failure: function(theUser, errorString) {
                    if (errorString === 'invalid_grant') {
                        register(user);
                    } else {
                        console.log(errorString);
                        AppUtils.whenLoaded();
                    }
                }
            });
        };
    }]);
