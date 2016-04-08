'use strict';

angular.module('StarterPack.Portal.AppManager.VirtualDevice')
    .controller('VirtualDeviceController', ['$scope', '$rootScope', '$state', 'AppConfig', 'AppUtils', '$uibModal', 'thingService', function($scope, $rootScope, $state, AppConfig, AppUtils, $uibModal, thingService) {
        function demo() {
            var demoUser = {
                'loginName': 'abc3',
                'password': '1234'
            }
            $scope.login(demoUser);
        }

        $scope.currentThing = {};
        $scope.newThing = {};
        $scope.deviceList = [];
        $scope.selectedActions = [];
        $scope.thingMessage = {
            receivedActions: [],
            state: '',
            actionResults: '',
            commandID: ''
        };
        $scope.userMessage = {
            actions: [],
            receivedActionResults: []
        };

        $scope.init = function() {
            $scope.$watch('appReady', function(ready) {
                if (!ready) return;
                thingService.init();
                // demo();
            });
        };

        $scope.login = function(user) {
            $scope.loginMessage = '';
            function register(user) {
                var newUser = KiiUser.userWithUsername(user.loginName, user.password);
                newUser.register({
                    success: function(theUser) {
                        $scope.myApp.user = theUser;
                        $scope.mqttInit(theUser);
                        $scope.$apply();
                    },
                    failure: function(theUser, errorString) {
                        $scope.loginMessage = errorString;
                        AppUtils.whenLoaded();
                        $scope.$apply();
                    }
                });
            }

            AppUtils.doLoading();
            KiiUser.authenticate(user.loginName, user.password, {
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
            var clause = KiiClause.equals('_stringField5', AppConfig.VIRTUAL_DEVICE);
            $scope.myApp.queryThings({}, clause, { limit: 200 }).then(function(result) {
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
                    case 'ONBOARD_THING':
                        ONBOARD_THING(parsed);
                        break;
                    case 'PUSH_MESSAGE':
                        $scope.thingMessage.receivedActions.push(parsed.payload);
                        break;
                    case 'SEND_COMMAND':
                        $scope.feedback = parsed;
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
                    thingService.getCommands(thing).then(function(res) {
                        console.log('thing:', res.data);
                    });
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
            var thingProperties = {
                '_stringField5': 'VIRTUAL_DEVICE',
                '_firmwareVersion': '0.0.1'
            }
            $scope.mqtt.onboardThing(newThing._vendorThingID, newThing.password, thingProperties);
        }

        $scope.cancel = function() {
            modalInstance.dismiss('cancel');
            $scope.newThing = {};
        }

        $scope.onClickAddAction = function(action) {
            if (!angular.isDefined(action.name) ||  !angular.isDefined(action.type) ||  !angular.isDefined(action.value)) {
                return;
            }

            if (action.type == 'boolean' && !(action.value == 'true' || action.value == 'false')) {
                return;
            }

            if (action.type == 'number' && !(!isNaN(parseFloat(action.value)) && isFinite(action.value))) {
                return;
            }

            var insertAction = {
                name: action.name,
                type: action.type,
                value: action.value
            }
            var actionObject = {};
            if (action.type == 'string') {
                actionObject[action.name] = action.value;
            } else if (action.type == 'number') {
                actionObject[action.name] = new Number(action.value);
            } else if (action.type == 'boolean') {
                actionObject[action.name] = new Boolean(action.value);
            }
            $scope.selectedActions.push(insertAction);
            $scope.userMessage.actions.push(actionObject);
        }

        $scope.onClickDeleteAction = function(index) {
            $scope.selectedActions.splice(index, 1);
            $scope.userMessage.actions.splice(index, 1);
        }

        $scope.onClickSendCommand = function() {
            $scope.feedback = undefined;
            // payload
            var payload = {
                actions: $scope.userMessage.actions,
                issuer: 'USER:' + $scope.myApp.user._uuid,
                schema: 'SmartLight',
                schemaVersion: 1
            };
            $scope.mqtt.sendCommand(payload, $scope.currentThing._thingID);
        }
    }]);
