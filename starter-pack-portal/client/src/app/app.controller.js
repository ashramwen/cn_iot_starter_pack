'use strict';

angular.module('StarterPack')
  .controller('AppController', ['$scope', '$rootScope', '$state', 'AppUtils', 'SessionService', function($scope, $rootScope, $state, AppUtils, SessionService) {
    
    /**
     * global tools
     */
    
    $scope.getTime = function(time){
        var t = new Date(time)
        return t.getFullYear() + '-' + $scope.paddingLeft(t.getMonth() + 1, '0', 2) + '-' + $scope.paddingLeft(t.getDate(), '0', 2);
    };

    $scope.paddingLeft = function (str, paddingValue, length) {
        str = str.toString();

        var paddingLength = length - str.length;
        var paddingStr = '';
        while(paddingLength>0){
            paddingStr += paddingValue;
            paddingLength--;
        }
        return paddingStr + str;
    };


    SessionService.restore();
    if($rootScope.userSession){
        $state.go('app.Portal.AppManager.ApplicationList');
    }
  }]);
