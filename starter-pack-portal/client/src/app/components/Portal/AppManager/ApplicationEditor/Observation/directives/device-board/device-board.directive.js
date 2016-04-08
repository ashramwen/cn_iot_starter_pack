angular.module('StarterPack.Portal.AppManager.Observation')
  .directive('deviceBoard', [function(){
    return {
        restrict: 'E',
        templateUrl: 'app/components/Portal/AppManager/ApplicationEditor/Observation/directives/device-board/device-board.template.html',
        scope:{
            tag: '=?',
            myApp: '=?'
        },
        replace: true,
        link: function(scope, element, attr){
            scope.refresher = $(element).find('.fa-refresh');  
        },
        controller: ['$scope', 'AppUtils', '$uibModal', '$interval', function($scope, AppUtils, $uibModal, $interval){

            var myTimer = null;
            $scope.init = function(){
                $scope.loadThings();
            };

            $scope.loadThings = function(){
                var thingIDs = $scope.tag.getThingIDs();
                if(!thingIDs || thingIDs.length == 0){
                    return;
                } else{
                    AppUtils.doLoading();
                    $scope.tag.refreshThings().then(function(){
                        AppUtils.whenLoaded();
                        initTimer();
                        $scope.$apply();
                    }, function(){
                        AppUtils.whenLoaded();
                        $scope.$apply();
                    });
                }
            };

            $scope.loadMore = function(){
                $scope.tag.nextThings();
            };

            $scope.editTag = function(){
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'app/components/Portal/AppManager/ApplicationEditor/Observation/directives/device-board/device-board-editor.template.html',
                    controller: 'deviceBoard.editController',
                    size: 'lg',
                    resolve: {
                        tag: $scope.tag,
                        myApp: $scope.myApp
                    }
                });

                modalInstance.result.then(function(){
                    initTimer();
                });
            };

            $scope.refreshThings = function(){
                $scope.refresher.addClass('start');
                $scope.tag.refreshThings().then(function(){
                    $scope.refresher.removeClass('start');
                },function(){
                    $scope.refresher.removeClass('start');
                });
            };

            function initTimer(){
                var tag = $scope.tag;
                destroyTimer();
                if(tag.getRefreshInterval() && tag.getRefreshInterval() > 0){
                    myTimer = $interval($scope.refreshThings, tag.getRefreshInterval() * 1000);
                }
            }

            function destroyTimer(){
                if(myTimer){
                    $interval.cancel(myTimer);
                }
            }

            $scope.$on('$destroy',function(){
                destroyTimer();
            });
        }]
    }
  }])
  .controller('deviceBoard.editController', ['$scope', 'myApp', 'tag', 'AppUtils', '$uibModalInstance', function($scope, myApp, tag, AppUtils, $uibModalInstance){

    $scope.things = [];

    $scope.tagBO = {

    };

    $scope.init = function(){
        $scope.myApp = myApp;
        $scope.tag = tag;
        $scope.editingFields = _.clone($scope.tag.getFields()) || [];
        if(!_.isArray($scope.editingFields)){
            $scope.editingFields = [];
        }
        _.extend($scope.tagBO, {
            name: $scope.tag.getName(),
            description: $scope.tag.getDescription(),
            refreshInterval: $scope.tag.getRefreshInterval()
        }); 
    };

    $scope.addField = function(){
        $scope.editingFields.push({fieldName:'', displayName: ''});
    };

    $scope.removeField = function(field){
        $scope.editingFields.remove(field);
    };

    $scope.addThings = function(things){

        _.each(things, function(thing){
            $scope.tag.addThing(thing);
        });

        AppUtils.doLoading();
        $scope.tag.save().then(function(){
            $scope.$apply();
            AppUtils.whenLoaded();
        }, function(){
            AppUtils.whenLoaded();
        });
    };

    $scope.removeThing = function(thing){
        $scope.tag.removeThing(thing);

        AppUtils.doLoading();
        $scope.tag.save().then(function(){
            $scope.$apply();
            AppUtils.whenLoaded();
        }, function(){
            AppUtils.whenLoaded();
        });
    };

    $scope.saveTag = function(){

        $scope.tag.setName($scope.tagBO.name);
        $scope.tag.setDescription($scope.tagBO.description);
        $scope.tag.setRefreshInterval($scope.tagBO.refreshInterval);

        var customData = $scope.tag.getCustomData();
        customData.fields = $scope.editingFields;

        AppUtils.doLoading();
        $scope.tag.save().then(function(){
            AppUtils.whenLoaded();
            $scope.fields = customData.fields;
            $scope.$apply();
            $uibModalInstance.close(tag);
        }, function(){
            AppUtils.whenLoaded();
        });
    };

    $scope.cancel = function(){
        $uibModalInstance.dismiss();
    };

  }]);