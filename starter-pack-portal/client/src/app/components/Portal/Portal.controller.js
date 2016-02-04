'use strict';

angular.module('StarterPack.Portal')
  .controller('PortalController', ['$scope', '$rootScope', '$state', 'AppUtils', 'PortalService', function($scope, $rootScope, $state, AppUtils, PortalService) {
    $scope.portalNavs = PortalService.portalNavs;
  }]);
