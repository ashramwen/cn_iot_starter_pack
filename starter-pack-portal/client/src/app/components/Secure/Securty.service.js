angular.module('StarterPack.Secure')
  .factory('SecurityService', ['localStorageService', 'AppUtils', 'SessionService', function(localStorageService, AppUtils, SessionService){
    var SecurityService = {};

    SecurityService.login = function(credentials){
        return KiiPortalAdmin.login(credentials.username,credentials.password);
    };

    return SecurityService;
  }]);