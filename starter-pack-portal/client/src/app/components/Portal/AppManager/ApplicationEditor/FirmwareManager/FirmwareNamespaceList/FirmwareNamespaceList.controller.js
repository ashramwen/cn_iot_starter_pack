'use strict';

angular.module('StarterPack.Portal.AppManager.FirmwareManager')
  .controller('FirmwareNamespaceListController', ['$scope', '$rootScope', '$state', 'AppUtils', '$uibModal', function($scope, $rootScope, $state, AppUtils, $uibModal) {
    
    $scope.viewFirmwareNamespace = function(firmwareNamespace){
        $state.go('app.Portal.AppManager.ApplicationEditor.FirmwareManager.FirmwareNamespaceInfo', {firmwareNamespaceId: firmwareNamespace.getUUID()});
    };

    $scope.openCreateModal = function(){
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'app.Portal.AppManager.ApplicationEditor.FirmwareManager.CreateModal',
            resolve: {
                app: $scope.myApp
            },
            controller: 'FirmwareNamespaceListController.CreateModel',
            size: 'md'
        });

        modalInstance.result.then(function (firmwareNamespace) {
            $scope.myFirmwareNamespaces = $scope.myApp.getFirmwareNamespaces();
        }, function () {
            
        });
    };

  }])
  .controller('FirmwareNamespaceListController.CreateModel', ['ApplicationService', 'AppUtils', '$scope', '$uibModalInstance', 'app', 'FirmwareService',function(ApplicationService, AppUtils, $scope, $uibModalInstance, app, FirmwareService){
    
    $scope.firmwareNamespaceBO = {};

    $scope.ok = function(){
        AppUtils.showLoading();
       
        FirmwareService.createFirmwareNamespace(app, $scope.firmwareNamespaceBO).then(function(firmwareNamespace){
            $uibModalInstance.close(firmwareNamespace);
            $scope.$apply();
            AppUtils.hideLoading();
        }, function(){
            AppUtils.hideLoading();
        });
    };
    $scope.cancel = function(){
        $uibModalInstance.dismiss('cancel');
    };
  }]);
