'use strict';

angular.module('StarterPack.Portal.AppManager.VirtualDevice')
    .controller('VirtualDeviceController', ['$scope', '$rootScope', '$state', 'AppConfig', 'AppUtils', '$uibModal', function($scope, $rootScope, $state, AppConfig, AppUtils, $uibModal) {
        function demo() {
            var demoUser = {
                'loginName': 'abc3',
                'password': '1234'
            }
            $scope.login(demoUser);
        }

        $scope.currentThing = {};
        $scope.deviceList = [];
        $scope.thingMessage = {
            receivedActions: [],
            state: "",
            actionResults: "",
            commandID: ""
        };

        $scope.init = function() {
            $scope.$watch('appReady', function(ready) {
                if (!ready) return;
                // demo();
            });
        };

        $scope.login = function(user) {
            function register(user) {
                var newUser = new KiiPortalUser({ 'loginName': user.loginName, 'password': user.password });
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
                    $scope.queryThing();
                    $scope.$apply();
                    // AppUtils.whenLoaded();
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

        $scope.queryThing = function() {
            // var clause = KiiClause.equals('_stringField5', AppConfig.VIRTUAL_DEVICE);
            $scope.myApp.queryThings({}, null, { limit: 200 }).then(function(result) {
                $scope.deviceList = result.things;
                $scope.$apply();
                AppUtils.whenLoaded();
            }, function(error) {
                console.log(error);
                AppUtils.whenLoaded();
            });
        }

        $scope.selectThing = function(thing) {
            if (thing._accessToken) {
                $scope.currentThing = thing;
                return;
            }
            $scope.newThing = thing;
            $scope.open();
        }

        var onMessageReceived = function(message) {
            $scope.$apply(function() {
                console.log('Message Received by Thing', message);

                var parsed = $scope.mqtt.parseResponse(message);
                console.log('parsed: ', parsed);

                if (parsed.type == 'PUSH_MESSAGE') {
                    $scope.thingMessage.receivedActions.push(parsed.payload);
                }
                switch (parsed.type) {
                    case 'PUSH_MESSAGE':
                        $scope.thingMessage.receivedActions.push(parsed.payload);
                        break;
                    case 'ONBOARD_THING':
                        ONBOARD_THING(parsed);
                        break;
                }
            });
        };

        function ONBOARD_THING(parsed) {
            switch (parsed.code) {
                case '200':
                    var thing = _.findWhere($scope.deviceList, { '_thingID': parsed.payload.thingID });
                    if (thing) {
                        thing._accessToken = parsed.payload.accessToken;
                        thing.payload = angular.copy(parsed.payload);
                        $scope.currentThing = thing;
                    } else {
                        thing = {
                            '_accessToken': parsed.payload.accessToken,
                            '_vendorThingID': $scope.newThing._vendorThingID,
                            '_thingID': parsed.payload.thingID,
                            'payload': angular.copy(parsed.payload)
                        }
                        $scope.deviceList.push(thing);
                        $scope.currentThing = thing;
                    }
                    $scope.cancel();
                    break;
                default:
                    $scope.newThing.message = parsed.payload.message;
                    break;
            }
        }

        var onConnectionLost = function(responseObject) {
            console.log('Conneciton Lost');
        };

        $scope.mqttInit = function(user) {
            $scope.mqtt = new KiiPortalMqtt(user, onMessageReceived, onConnectionLost);
            $scope.mqtt.init().then(function(res) {
                console.log('onConnect');
                $scope.mqttInitialed = !0;
                $scope.$apply();
            }, function(err) {
                console.log(err);
                AppUtils.whenLoaded();
            });
        };

        var modalInstance;
        $scope.open = function() {
            modalInstance = $uibModal.open({
                backdrop: 'static',
                templateUrl: 'registerThing.html',
                scope: $scope
            });

            modalInstance.result.then(function(selectedItem) {
                // $scope.selected = selectedItem;
            }, function() {
                // $log.info('Modal dismissed at: ' + new Date());
            });
        };

        $scope.onboardThing = function(newThing) {
            $scope.mqtt.onboardThing(newThing._vendorThingID, newThing.password);
        }

        $scope.cancel = function() {
            modalInstance.dismiss('cancel');
            $scope.newThing = {};
        }
    }]);
