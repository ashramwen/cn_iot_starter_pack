angular.module('StarterPack.Portal.AppManager.Observation').
  controller('ObservationController', ['$scope', '$rootScope', '$state', 'AppUtils', function($scope, $rootScope, $state, AppUtils){

    $scope.init = function(){
        $scope.$watch('appReady', function(ready){
            if(!ready) return;
            
            AppUtils.doLoading();
            $scope.myApp.refreshTags(function(tags){
                AppUtils.whenloaded();

                $scope.tags = $scope.myApp.getTags();
                $scope.displayedTags = _.filter($scope.tags, function(tag){
                    var customData = tag.getCustomData();
                    return customData && customData.displayed;
                });

            }, function(error){

            });
        });
        activateJsonEditor();
    };

  }]);