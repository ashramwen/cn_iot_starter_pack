angular.module('StarterPack.Portal.AppManager.Observation')
  .directive('deviceBoard', [function(){
    return {
        restrict: 'E',
        templateUrl: 'app/components/Portal/AppManager/ApplicationEditor/Observation/directives/device-board/device-board.directive.js',
        scope:{
            tag: '=?'
        },
        replace: true,
        link: function(scope, element, attr){
            $(element).draggable();
        },
        controller: ['$scope', 'AppUtils', function($scope, AppUtils){

            $scope.init = function(){
                $scope.loadThings();
                var customData = $scope.tag.getCustomData();
                if(customData && customData.fields){
                    $scope.fields = customData.fields;
                }
            };

            $scope.loadThings = function(){
                var thingIDs = $scope.tag.getThingIDs();
                if(!thingIDs || thingIDs.length == 0){
                    AppUtils.doLoading();
                    $scope.tag.refreshThings(function(){
                        AppUtils.whenLoaded();
                    }, function(){
                        AppUtils.whenLoaded();
                    });
                }
            };

            $scope.loadMore = function(){
                $scope.tag.nextThings();
            };

            $scope.editTag = function(){
                $scope.editingFields = _.clone($scope.fields);
            };


        }]
    }
  }]);