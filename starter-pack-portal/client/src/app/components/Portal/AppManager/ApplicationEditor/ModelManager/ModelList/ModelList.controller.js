'use strict';

angular.module('StarterPack.Portal.AppManager.ModelManager')
  .controller('ModelListController', ['$scope', '$rootScope', '$state', 'AppUtils', 'ModelService', '$uibModal', 'AppConfig', function($scope, $rootScope, $state, AppUtils, ModelService, $uibModal, AppConfig) {
    
    $scope.viewModel = function(model){
        $state.go('app.Portal.AppManager.ApplicationEditor.ModelManager.ModelInfo',{modelId: model.getUUID()});
    };

    $scope.openCreateModal = function(){
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'app.Portal.AppManager.ApplicationEditor.ModelManager.CreateModal',
            resolve: {
                app: $scope.myApp
            },
            controller: 'ModelListController.CreateModel',
            size: 'md'
        });

        modalInstance.result.then(function (model) {
            $scope.myModels = $scope.myApp.getModels();
        }, function () {
            
        });
    };


  }])
  .controller('ModelListController.CreateModel', ['ApplicationService', 'AppUtils', '$scope', '$uibModalInstance', 'app', function(ApplicationService, AppUtils, $scope, $uibModalInstance, app){
    
    $scope.modelBO = {};

    $scope.ok = function(){
        AppUtils.showLoading();
       
        ModelService.createModel(app, $scope.modelBO).then(function(model){
            $uibModalInstance.close(model);
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
