'use strict';

angular.module('StarterPack.Portal.AppManager.VirtualDevice')
    .controller('VirtualDeviceController', ['$scope', '$rootScope', '$state', 'AppUtils', function($scope, $rootScope, $state, AppUtils) {
        $scope.init = function() {
            $scope.$watch('appReady', function(ready) {
                if (!ready) return;
                var mqtt = new KiiPortalMqtt();
                mqtt.init();
            });
        }
    }]);
