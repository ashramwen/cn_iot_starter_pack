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
                        $scope.userMqttInit(theUser);
                        $scope.$apply();
                        AppUtils.whenLoaded();
                    },
                    failure: function(theUser, errorString) {
                        $scope.loginMessage = errorString;
                        $scope.$apply();
                        AppUtils.whenLoaded();
                    }
                });
            }

            AppUtils.doLoading();
            KiiUser.authenticate(user.loginName, user.password, {
                success: function(theUser) {
                    $scope.myApp.user = theUser;
                    $scope.userMqttInit(theUser);
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


        $scope.userMqttInit = function(user) {
            var onMessageReceived = function(message) {
                $scope.$apply(function() {
                    console.log('Message Received by Thing', message);

                    var parsed = $scope.userMqtt.parseResponse(message);
                    console.log('parsed: ', parsed);

                    if (parsed.type == 'PUSH_MESSAGE') {
                        $scope.thingMessage.receivedActions.push(parsed.payload);
                    }
                    switch (parsed.type) {
                        case 'ONBOARD_THING':
                            ONBOARD_THING(parsed);
                            break;
                        case 'PUSH_MESSAGE':
                            // $scope.thingMessage.receivedActions.push(parsed.payload);
                            for (var i = 0; i < $scope.userMessage.receivedActionResults.length; i++) {
                                if ($scope.userMessage.receivedActionResults[i].commandID == parsed.payload.commandID) {
                                    $scope.userMessage.receivedActionResults[i].actionResults = parsed.payload;
                                    break;
                                }
                            }
                            break;
                        case 'SEND_COMMAND':
                            $scope.feedback = parsed;
                            var actions = {
                                commandID: parsed.payload.commandID,
                                actionResults: {}
                            };
                            $scope.userMessage.receivedActionResults.push(actions);
                            break;
                        case 'UPDATE_ACTION_RESULTS':
                            break;
                        default:
                            console.log('Unknown type: ' + parsed.type, parsed);
                            break;
                    }
                });
            };

            var ONBOARD_THING = function(parsed) {
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
                            thing.isNew = true;
                            $scope.deviceList.push(thing);
                            $scope.currentThing = thing;
                        }
                        connectMQTTEndpointForThing(parsed.payload.mqttEndpoint);
                        $scope.cancel();
                        break;
                    default:
                        $scope.newThing.message = parsed.payload.message;
                        break;
                }
            }

            var onConnectionLost = function(responseObject) {
                console.log('User Mqtt Conneciton Lost');
            };

            $scope.currentThing = {};
            $scope.userMqtt = new KiiPortalMqtt(onMessageReceived, onConnectionLost);
            $scope.userMqtt.init(user).then(function(res) {
                console.log('onConnect');
                $scope.userMqttInitialed = !0;
                $scope.$apply();
            }, function(err) {
                console.log(err);
                AppUtils.whenLoaded();
            });
        };

        function connectMQTTEndpointForThing(mqttEndpointInfo) {

            var mqttClientConfig = {
                host: mqttEndpointInfo.host,
                port: mqttEndpointInfo.portWS,
                username: mqttEndpointInfo.username,
                password: mqttEndpointInfo.password,
                clientID: mqttEndpointInfo.mqttTopic
            };

            var onMessageReceived = function(message) {
                $scope.$apply(function() {
                    console.log('message ' + JSON.stringify(message));
                    // alert('Message Received by Thing', message);

                    var parsed = $scope.thingMqtt.parseResponse(message);
                    console.log('parsed ' + JSON.stringify(parsed));

                    switch (parsed.type) {
                        case 'PUSH_MESSAGE':
                            $scope.thingMessage.receivedActions.push(parsed.payload);
                            break
                        case 'UPDATE_STATE':
                            thingService.getState($scope.currentThing).then(function(res) {
                                console.log(res.data);
                                $scope.currentThing.states = res.data;
                            });
                            break;
                    }
                });
            };

            var onConnectionLost = function(responseObject) {
                alert('Thing MQTT Conneciton Lost');
            };

            $scope.thingMqtt = new KiiPortalMqtt(onMessageReceived, onConnectionLost);
            $scope.thingMqtt.connect(mqttClientConfig).then(function() {
                console.log('Thing MQTT Connected');
                $scope.thingMqtt.subscribe(mqttClientConfig.clientID);
                $scope.isMQTTConnectedForThing = true;
                if ($scope.currentThing.isNew) {
                    $scope.thingMqtt.updateState({
                        'power': true,
                        'presetTemperature': 25,
                        'fanspeed': 5,
                        'currentTemperature': 28,
                        'currentHumidity': 65
                    }, $scope.currentThing._thingID, $scope.currentThing._accessToken);
                } else {
                    thingService.getCommands($scope.currentThing);
                    thingService.getState($scope.currentThing).then(function(res) {
                        console.log(res.data);
                        $scope.currentThing.states = res.data;
                    });
                }
            }, function(err) {
                alert('Error connecting: ' + JSON.stringify(err));
                console.log('Error connecting: ' + JSON.stringify(err));
            });
        }

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
            $scope.userMqtt.onboardThing(newThing._vendorThingID, newThing.password, thingProperties);
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
            $scope.userMqtt.sendCommand(payload, $scope.currentThing._thingID);
        }

        $scope.isBoolean = function(data) {
            return typeof(data) === 'boolean';
        }

        $scope.updateState = function() {
            $scope.thingMqtt.updateState($scope.currentThing.states, $scope.currentThing._thingID, $scope.currentThing._accessToken);
        }
    }]);
