'use strict';

angular.module('StarterPack.Portal.AppManager')
  .controller('ApplicationInfoController', ['$scope', '$rootScope', '$state', 'AppUtils', 'AppManagerService',function($scope, $rootScope, $state, AppUtils, AppManagerService) {
    $rootScope.portalNavs = AppManagerService.portalNavs;
  }]);
