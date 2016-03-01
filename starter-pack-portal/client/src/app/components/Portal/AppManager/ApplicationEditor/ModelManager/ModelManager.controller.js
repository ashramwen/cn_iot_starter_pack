'use strict';

angular.module('StarterPack.Portal.AppManager.ModelManager')
  .controller('ModelManagerController', ['$scope', '$rootScope', '$state', 'AppUtils', 'AppConfig',function($scope, $rootScope, $state, AppUtils, AppConfig) {

    $scope.modelsReady = false;
    
    $scope.init = function(){
        AppUtils.doLoading();
        $scope.myApp.refreshModels().then(function(models){
            AppUtils.whenLoaded();
            $scope.myModels = $scope.myApp.getModels();
            if($state.params['modelId']){
                var model = _.find($scope.myModels, function(model){
                    return model.getUUID() == $state.params['modelId'];
                });
                AppUtils.setLocalStorageItem(AppConfig.NavNames.MODEL_NAME, model.getName()); 
            }

            $scope.modelsReady = true;
            $scope.$apply();
        }, function(){
            AppUtils.whenLoaded();
        });
    };

    $scope.$watch('appReady', function(ready){
        if(ready){
            $scope.init();
        }
    });
    
  }]);
