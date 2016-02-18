'use strict';

angular.module('StarterPack.Portal.AppManager')
  .controller('ApplicationListController', ['$scope', '$rootScope', '$state', 'AppUtils', 'ApplicationService', '$uibModal', function($scope, $rootScope, $state, AppUtils, ApplicationService, $uibModal) {
    
    $rootScope.portalNavs = [];

    $scope.viewApp = function(app){
        $state.go('app.Portal.AppManager.ApplicationEditor.ApplicationInfo',{appId: app.getAppID()});
    };

    /**
     * create application
     * @return {[type]} [description]
     */
    $scope.openCreateModal = function(){
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'app.Portal.AppManager.ApplcationList.CreateModal',
            controller: 'ApplicationListController.CreateApplication',
            size: 'md'
        });

        modalInstance.result.then(function (app) {
            $scope.myApps = $scope.portalAdmin.getApps();
        }, function () {
            
        });
    };
    
  }])
  .controller('ApplicationListController.CreateApplication', ['ApplicationService', 'AppUtils', '$scope', '$uibModalInstance', function(ApplicationService, AppUtils, $scope, $uibModalInstance){
    $scope.appBO = {};

    $scope.serverOptions = [
        {text: 'Japan', value: 'jp'},
        {text: 'China', value: 'cn3'},
        {text: 'America', value: 'us'}
    ];

    $scope.platforms = [
        {text: 'Android', value: 'android'},
        {text: 'iOS', value: 'ios'},
        {text: 'HTML 5', value: 'html5'}
    ];

    $scope.ok = function(){
        AppUtils.showLoading();
        $scope.appBO.platforms = _.pluck(_.where($scope.platforms, {_checked: true}), 'value');
        ApplicationService.createApp($scope.appBO).then(function(app){
            $uibModalInstance.close(app);
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
