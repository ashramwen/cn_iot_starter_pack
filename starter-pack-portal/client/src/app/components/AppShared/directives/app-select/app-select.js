angular.module('StarterPack.AppShared')
  .directive('appSelect',['$timeout',function($timeout){
    return {
        restrict: 'E',
        templateUrl: 'app/components/AppShared/directives/app-select/app-select.template.html',
        replace: true,
        scope:{
            options: '=',
            selectedModel: '=',
            extraSetting: '=?',
            change: '=?',
            disabled: '=?'
        },
        link: function(scope, element, attrs){
            scope.setting = {
                text: 'text',
                value: 'value'
            };
            scope.myClass = attrs.class;
            scope.setting = _.extend(scope.setting, scope.extraSetting);
            scope.selectedOption = {};

            scope.setting.text = attrs.text || scope.setting.text;

            scope.$watch('selectedModel', function(newVal){
                if(attrs.valueOnly){
                    scope.selectedOption = _.find(scope.options, function(option){
                        return option[scope.setting.value] == newVal;
                    });
                }else{
                    scope.selectedOption = _.clone(newVal);
                }
                
            });
            
            scope.selectOption = function(option){
                if(attrs.valueOnly){
                    scope.selectedModel = option[scope.setting.value];
                }else{
                    scope.selectedModel = _.clone(option);
                }
                scope.selectedOption = option;
                
                if(_.isFunction(scope.change)){
                    $timeout(function(){
                        scope.change(scope.selectedModel);    
                    });
                }
            };

            
            if(scope.options && scope.options[0]){
                var existFlag = false;
                existFlag = _.find(scope.options,function(option){
                    return angular.equals(option, scope.selectOption);
                });
                if(!existFlag)
                    scope.selectOption(scope.options[0]);
            }
        }
    }
  }])