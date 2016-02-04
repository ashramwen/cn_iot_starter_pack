'use strict';

angular.module('StarterPack.Portal.Dashboard')
  .controller('DashboardController', ['$scope', '$rootScope', '$state', 'AppUtils', '$http',function($scope, $rootScope, $state, AppUtils, $http) {
    var predicatorMenu = {
            itemList: [
                {
                    text: '删除闭包',
                    callback: function(node){
                        
                    }
                },
                {
                    text: '包一层',
                    callback: function(node){
                        
                    }
                }
            ]
        };
  }]);
