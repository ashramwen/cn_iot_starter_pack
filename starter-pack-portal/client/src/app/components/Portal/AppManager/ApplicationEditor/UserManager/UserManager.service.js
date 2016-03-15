angular.module('StarterPack.Portal.AppManager.UserManager')
    .factory('userValidateService', [function() {
        var Status = function() {
            this.isEmpty = false;
            this.loginError = false;
            this.passwordError = false;
            this.emailError = false;
            this.phoneError = false;
        };
        Status.prototype.isPass = function() {
            return !this.isEmpty && !this.loginError && !this.passwordError && !this.emailError && !this.phoneError;
        }

        return {
            validateEmpty: function(user) {
                if (!KiiPortalUtilities._trim(user.loginName)) return false;
                if (!KiiPortalUtilities._trim(user.emailAddress)) return false;
                if (!KiiPortalUtilities._trim(user.phoneNumber)) return false;
                return true;
            },
            validateLogin: function(loginName) {
                return KiiPortalUtilities._validateUsername(loginName);
            },
            validatePassword: function(password) {
                return KiiPortalUtilities._validatePassword(password);
            },
            validateEmail: function(emailAddress) {
                return KiiPortalUtilities._validateEmail(emailAddress);
            },
            validatePhone: function(phoneNumber) {
                return KiiPortalUtilities._validatePhoneNumber(phoneNumber);
            },
            validate: function(user) {
                var _status = this.validateUpdate(user);
                _status.passwordError = !this.validatePassword(user.password);
                return _status;
            },
            validateUpdate: function(user) {
                var _status = new Status();
                _status.isEmpty = !this.validateEmpty(user);
                _status.loginError = !this.validateLogin(user.loginName);
                _status.emailError = !this.validateEmail(user.emailAddress);
                _status.phoneError = !this.validatePhone(user.phoneNumber);
                console.log(_status);
                return _status;
            }
        }
    }]);