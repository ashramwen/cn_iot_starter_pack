'use strict';

angular.module('StarterPack.Portal')
  .controller('PortalController', ['$scope', '$rootScope', '$state', 'AppUtils', 'PortalService', 'SessionService', function($scope, $rootScope, $state, AppUtils, PortalService, SessionService) {
    $scope.getStateChan = PortalService.getStateChan;
    $scope.getStateDisplayName = PortalService.getStateDisplayName;
    $scope.isActive = PortalService.isActive;

    $scope.menuOff = false;

    $scope.logout = function(){
        SessionService.expire();
        $state.go('app.Secure');
    };

    /**
     * turn offer left side menu bar
     * @return {[type]} [description]
     */
    $scope.turnOffMenu = function(){
        $scope.menuOff = true;
    };

    /**
     * turn on left side menu bar
     * @return {[type]} [description]
     */
    $scope.turnOnMenu = function(){
        $scope.menuOff = false;
    };

    /**
     * toggle the left side menu bar
     * @return {[type]} [description]
     */
    $scope.toggleMenu = function(){
        $scope.menuOff = !$scope.menuOff;
    };

    /**
     * watch portal nav changes
     * @param  {[type]} true      [description]
     * @return {[type]}           [description]
     */
    $rootScope.$watch('portalNavs', function(newVal){
        if(!newVal || newVal.length == 0){
            $scope.turnOnMenu();
        }else{
            $scope.turnOffMenu();
        }
    }, true);
  }]);
