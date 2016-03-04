'use strict'

var MyApp = angular.module('StarterPack', [
  'ui.router',  'rzModule',
  'StarterPack.Secure', 'StarterPack.Portal', 'StarterPack.AppShared'
]).
config(function($httpProvider) {
    //$httpProvider.defaults.withCredentials = true;
    delete $httpProvider.defaults.headers.common["X-Requested-With"];

    $httpProvider.defaults.headers.common['Content-Type'] = 'application/json';
    $httpProvider.interceptors.push(function($q) {
      return {
        request: function(request) {
            app.utils.doLoading();
            return request;
        },
        response: function(response){
          app.utils.whenLoaded();
          return response;
        },
        responseError: function(response){
          app.utils.whenLoaded();
          if(response.status == 401){
            //window.location = 'index.html#/app/secure/UserLogin';
          }
          return $q.reject(response);
        }
      };
    });
}).run(
  ['$rootScope', '$state', '$stateParams', 'AppUtils',
      function($rootScope, $state, $stateParams, AppUtils) {

          // It's very handy to add references to $state and $stateParams to the $rootScope
          // so that you can access them from any scope within your applications.For example,
          // <li ng-class="{ active: $state.includes('contacts.list') }"> will set the <li>
          // to active whenever 'contacts.list' or one of its decendents is active.
          $rootScope.$state = $state;
          $rootScope.$stateParams = $stateParams;
          window.state = $state;
          /* =======================================================
           * =======================================================
           * init AppUtils
           * =======================================================
           * =======================================================
           */
          AppUtils.initialize();
          window.AppUtils = AppUtils;
      }
  ]
);
