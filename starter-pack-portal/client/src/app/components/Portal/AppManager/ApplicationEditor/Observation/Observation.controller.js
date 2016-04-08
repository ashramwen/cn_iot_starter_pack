angular.module('StarterPack.Portal.AppManager.Observation').
  controller('ObservationController', ['$scope', '$rootScope', '$state', 'AppUtils', '$uibModal', function($scope, $rootScope, $state, AppUtils, $uibModal){

    $scope.init = function(){
        $scope.onEdit = true;
        $scope.$watch('appReady', function(ready){
            if(!ready) return;
            
            AppUtils.doLoading();
            $scope.myApp.refreshTags().then(function(tags){
                AppUtils.whenLoaded();

                $scope.tags = [];
                _.each($scope.myApp.getTags(), function(tag){
                    $scope.tags.push(new SPThingGroup(tag));
                });

                $scope.$apply();
            }, function(error){

            });
        });
    };

    $scope.toggleTag = function(tag){
        if(tag.getDisplayed()){
            $scope.hideTag(tag);
        }else{
            $scope.showTag(tag);
        }
    };

    $scope.deleteTag = function(tag, e){
        var title = 'Delete Thing Group',
            content = 'Do you want to delete this thing group? The process cannot be reverted!',
            func = function(){
                tag.delete().then(function(){
                    $scope.tags.remove(tag);
                    $scope.$apply();
                }, function(){

                });
            };

        AppUtils.confirm(title, content, func);
        e.stopPropagation();
    };

    $scope.tagNameFilter = function(tag){
        return tag.getName().indexOf($scope.selectedTagName || '') > -1;
    };

    $scope.displayTagFilter = function(tag){
        return tag.getDisplayed() === true;
    };

    $scope.showTag = function(tag){
        tag.setDisplayed(true);
        tag.save();
    };

    $scope.hideTag = function(tag){
        tag.setDisplayed(false);
        tag.save();
    };

    $scope.createTag = function(){
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'app.Portal.AppManager.ApplcationEditor.Observation.CreateModal',
            controller: 'Observation.createTag',
            size: 'md',
            resolve: {
                tag: function(){
                    return new SPThingGroup($scope.myApp.createTag());
                }
            }
        });

        modalInstance.result.then(function (tag){
            $scope.tags.splice(0, 0, tag);
        });
    };

    $scope.customItemMap = {
        sizeX: 'tag.getWidgetSetting().size.x',
        sizeY: 'tag.getWidgetSetting().size.y',
        row: 'tag.getWidgetSetting().position.row',
        col: 'tag.getWidgetSetting().position.col'
    };

    $scope.gridsterOpts = {
        columns: 6, // the width of the grid, in columns
        pushing: true, // whether to push other items out of the way on move or resize
        floating: true, // whether to automatically float items up so they stack (you can temporarily disable if you are adding unsorted items with ng-repeat)
        swapping: false, // whether or not to have items of the same size switch places instead of pushing down if they are the same size
        width: 'auto', // can be an integer or 'auto'. 'auto' scales gridster to be the full width of its containing element
        colWidth: 'auto', // can be an integer or 'auto'.  'auto' uses the pixel width of the element divided by 'columns'
        rowHeight: 'match', // can be an integer or 'match'.  Match uses the colWidth, giving you square widgets.
        margins: [10, 10], // the pixel distance between each widget
        outerMargin: true, // whether margins apply to outer edges of the grid
        isMobile: false, // stacks the grid items if true
        mobileBreakPoint: 600, // if the screen is not wider that this, remove the grid layout and stack the items
        mobileModeEnabled: true, // whether or not to toggle mobile mode when screen width is less than mobileBreakPoint
        minColumns: 1, // the minimum columns the grid must have
        minRows: 1, // the minimum height of the grid, in rows
        maxRows: 100,
        defaultSizeX: 2, // the default width of a gridster item, if not specifed
        defaultSizeY: 1, // the default height of a gridster item, if not specified
        minSizeX: 1, // minimum column width of an item
        maxSizeX: null, // maximum column width of an item
        minSizeY: 1, // minumum row height of an item
        maxSizeY: null, // maximum row height of an item
        resizable: {
            enabled: true,
            handles: ['e', 'w', 's', 'se', 'sw', 'ne', 'nw'],
            start: function(event, $element, widget) {}, // optional callback fired when resize is started,
            resize: function(event, $element, widget) {}, // optional callback fired when item is resized,
            stop: function(event, $element, widget) {
                var tagID = $($element).find('.tagID').html();
                var tag = _.find($scope.tags, function(tag){
                    return tag.getUUID() == tagID;
                });
                tag.save();
            } // optional callback fired when item is finished resizing
        },
        draggable: {
            enabled: true, // whether dragging items is supported
            //handle: '.my-class', // optional selector for resize handle
            start: function(event, $element, widget) {}, // optional callback fired when drag is started,
            drag: function(event, $element, widget) {}, // optional callback fired when item is moved,
            stop: function(event, $element, widget) {
                var tagID = $($element).find('.tagID').html();
                var tag = _.find($scope.tags, function(tag){
                    return tag.getUUID() == tagID;
                });
                tag.save();
            } // optional callback fired when item is finished dragging
        }
    };


  }])
  .controller('Observation.createTag', ['$scope', '$uibModalInstance', 'tag', 'AppUtils', function($scope, $uibModalInstance, tag, AppUtils){

    $scope.tagBO = {
        name: '',
        description: '',
        fields: [],
        widgetSetting: {
            size: {
                x: 1,
                y: 2
            },
            position: {
                row: 0,
                col: 0
            }
        }
    };

    $scope.newField = function(){
        $scope.tagBO.fields.push({fieldName: '', displayName: ''});
    };

    $scope.ok = function(){
        tag.setName($scope.tagBO.name);
        tag.setDescription($scope.tagBO.description);
        tag.setFields($scope.tagBO.fields);

        AppUtils.doLoading();

        tag.save().then(function(){
            AppUtils.whenLoaded();
            $scope.$apply();
            $uibModalInstance.close(tag);
        }, function(){
            AppUtils.whenLoaded();
        });
    }

    $scope.cancel = function(){
        $uibModalInstance.dismiss('cancel');
    }
  }]);