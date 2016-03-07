'use strict';

angular.module('StarterPack.AppShared')
  .filter('leftHalf', function() {
    return function(input) {
        var arr = []
        _.each(input, function(val, index){
            if(index%2 == 0) return;
            arr.push(val)
        });

        return arr;
    };
  })
  .filter('rightHalf', function() {
    return function(input) {
        var arr = []
        _.each(input, function(val, index){
            if(index%2 == 1) return;
            arr.push(val)
        });

        return arr;
    };
  })
  .filter('dateOnly', ['$filter', function($filter) {
    return function(input) {
        var angularDateFilter = $filter('date');
        return function(theDate) {
           return angularDateFilter(theDate, 'yyyy-MM-dd');
        }
    };
  }]);