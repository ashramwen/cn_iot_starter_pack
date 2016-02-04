'use strict'

var MyApp = angular.module('StarterPack', [
  'ui.router',  'rzModule',
  'StarterPack.Secure', 'StarterPack.AppManager', 'StarterPack.Portal', 'StarterPack.AppShared'
]).
config(function($httpProvider) {
    var requestCount = 0;
    //$httpProvider.defaults.withCredentials = true;
    delete $httpProvider.defaults.headers.common["X-Requested-With"];
    $httpProvider.defaults.headers.common['Access-Control-Allow-Headers'] = '*';

    $httpProvider.defaults.headers.common['Content-Type'] = 'application/json';
    $httpProvider.defaults.headers.common['accessToken'] = 'Bearer super_token';
    $httpProvider.defaults.headers.common['Authorization'] = 'Bearer d31032a0-8ebf-11e5-9560-00163e02138f';
    $httpProvider.interceptors.push(function($q) {
      return {
        request: function(request) {
            $('#spinner').show();
            requestCount++;
            if(request.url.indexOf('api/users')>-1){
                request.headers['Authorization'] = 'Bearer d31032a0-8ebf-11e5-9560-00163e02138f';
            }
            return request;
        },
        response: function(response){
          hideLoading();
          return response;
        },
        responseError: function(response){
            hideLoading();
            $('#spinner').hide();
            if(response.status == 401){
              //window.location = 'index.html#/app/secure/UserLogin';
            }
            return $q.reject(response);
        }
      };
    });

    /*
     * hide loading 
     */
    function hideLoading(){
      requestCount--;
      if(requestCount==0){
        $('#spinner').hide();
      }
    }

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
