'use strict';

angular.module('StarterPack.Portal.AppManager.VirtualDevice')
    .controller('VirtualDeviceController', ['$scope', '$rootScope', '$state', 'AppUtils', function($scope, $rootScope, $state, AppUtils) {
        $scope.init = function() {
            $scope.$watch('appReady', function(ready) {
                if (!ready) return;

            });
        };

        $scope.login = function(user) {
            function register(user) {
                var newUser = KiiUser.userWithUsername(user.loginName, user.password);
                newUser.register({
                    success: function(theUser) {
                        $scope.myApp.user = theUser;
                        $scope.mqttInit(theUser);
                        $scope.$apply();
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
                    $scope.mqttInit(theUser);
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

        var onMessageReceived = function(message) {
            $scope.$apply(function() {
                consoleService.log('message ' + JSON.stringify(message));
                console.log('Message Received by Thing', message);

                var parsed = $scope.thingMqttClient.parseResponse(message);
                console.log('parsed ' + JSON.stringify(parsed));

                if (parsed.type == 'PUSH_MESSAGE') {
                    $scope.thingMessage.receivedActions.push(parsed.payload);
                }
            });
        };

        var onConnectionLost = function(responseObject) {
            console.log('Conneciton Lost');
        };

        $scope.mqttInit = function(user) {
            var mqtt = new KiiPortalMqtt(user, onMessageReceived, onConnectionLost);
            mqtt.init().then(function(res) {
                console.log('onConnect');
                // mqtt.connect();
            }, function(err) {
                console.log(err);
                AppUtils.whenLoaded();
            });
        }
    }]);
