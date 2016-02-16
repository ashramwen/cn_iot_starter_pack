'use strict';

angular.module('StarterPack')
  .controller('AppController', ['$scope', '$rootScope', '$state', 'AppUtils', 'SessionService', function($scope, $rootScope, $state, AppUtils, SessionService) {
    SessionService.restore()
    if($rootScope.userSession){
        $state.go('app.Portal.AppManager.ApplicationList');
    }
  }]);
