'use strict';

angular.module('StarterPack.Portal.AppManager.ModelManager')
  .controller('ModelInfoController', ['$scope', '$rootScope', '$state', 'AppUtils', 'AppConfig', function($scope, $rootScope, $state, AppUtils, AppConfig) {
    
    $scope.modelInfo = {};

    $scope.init = function(){
        $scope.myModel = _.find($scope.myModels, function(model){
            return model.getUUID() == $state.params['modelId'];
        });

        $scope.modelInfo.modelName = $scope.myModel.getName();
        $scope.modelInfo.imageUrl = $scope.myModel.getImageUrl();

        AppUtils.setLocalStorageItem(AppConfig.NavNames.MODEL_NAME, $scope.myModel.getName());

        $("#modelImage").unbind('change');
        $("#modelImage").change($scope.uploadImage);
    };

    $scope.$watch('modelsReady', function(newVal){
        if(newVal){
            $scope.init();
        }
    });

    $scope.updateModel = function(modelInfo){
        $scope.myModel.setName(modelInfo.modelName);
        AppUtils.doLoading();
        $scope.myModel.save().then(function(){
            AppUtils.whenLoaded();
            $scope.init();
            $scope.$apply();
        }, function(){
            AppUtils.whenLoaded();
        });
    };

    

    $scope.uploadImage = function(){
        AppUtils.doLoading();
        $scope.myModel.uploadImage($('#modelImage')[0].files[0]).then(function(){
            $scope.init();
            $scope.$apply();
            AppUtils.whenLoaded();
        },function(){
            AppUtils.whenLoaded();
        });
    };

    
  }]);
