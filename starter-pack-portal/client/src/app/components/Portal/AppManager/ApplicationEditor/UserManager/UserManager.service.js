angular.module('StarterPack.Portal.AppManager.UserManager')
    .factory('userValidateService', [function() {
        return {
            validateEmpty: function(user) {
                if (!user.loginName) return false;
                if (!user.emailAddress) return false;
                if (!user.phoneNumber) return false;
                return true;
            },
            validateLogin: function(loginName) {
                return KiiPortalUtilities._validateUsername(loginName);
            },
            validatePassword: function(password) {
                return KiiPortalUtilities._validatePassword(password);
            },
            validateEmail: function(email) {
                return KiiPortalUtilities._validateEmail(email);
            },
            validatePhone: function(phone) {
                return KiiPortalUtilities._validatePhoneNumber(phone);
            }
        }
    }]);