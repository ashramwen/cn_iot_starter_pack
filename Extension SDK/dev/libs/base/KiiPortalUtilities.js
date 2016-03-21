root.KiiPortalUtilities = (function() {
  function KiiPortalUtilities() {}

  KiiPortalUtilities.MAX_DATE_IN_MILLIS = 100000000 * 24 * 60 * 60 * 1000;

  KiiPortalUtilities.MIN_DATE_IN_MILLIS = -100000000 * 24 * 60 * 60 * 1000;

  KiiPortalUtilities._validateEmail = function(value) {
    var pattern;
    value = KiiPortalUtilities._trim(value);
    pattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,6}$/i;
    if ((typeof value).toLowerCase() !== "string") {
      root.Kii.logger("Not string");
      return false;
    } else if (value.match(pattern)) {
      return true;
    } else {
      return false;
    }
  };

  KiiPortalUtilities._validatePhoneNumber = function(value) {
    var pattern;
    value = KiiPortalUtilities._trim(value);
    pattern = /^[\\+]?[0-9]{10,}$/i;
    if ((typeof value).toLowerCase() !== "string") {
      root.Kii.logger("Not string");
      return false;
    } else if (value.match(pattern)) {
      return true;
    } else {
      return false;
    }
  };

  KiiPortalUtilities._isGlobalPhoneNumber = function(value) {
    var pattern;
    value = KiiPortalUtilities._trim(value);
    pattern = /^[\\+]{1}[0-9]{2}/;
    if ((typeof value).toLowerCase() !== "string") {
      root.Kii.logger("Not string");
      return false;
    } else if (value.match(pattern)) {
      return true;
    } else {
      return false;
    }
  };

  KiiPortalUtilities._validateLocalPhone = function(value) {
    var pattern;
    value = KiiPortalUtilities._trim(value);
    pattern = /^\d+$/;
    if ((typeof value).toLowerCase() !== "string") {
      root.Kii.logger("Not string");
      return false;
    } else if (value.match(pattern)) {
      return true;
    } else {
      root.Kii.logger("Invalid format");
      return false;
    }
  };

  KiiPortalUtilities._assertLocalPhoneIsValid = function(value) {
    if (!KiiPortalUtilities._validateLocalPhone(value)) {
      throw new root.InvalidLocalPhoneNumberException;
    }
  };

  KiiPortalUtilities._validateCountryCode = function(value) {
    var pattern;
    value = KiiPortalUtilities._trim(value);
    pattern = /^[a-z]{2}$/i;
    if ((typeof value).toLowerCase() !== "string") {
      root.Kii.logger("Not string");
      return false;
    } else if (value.match(pattern)) {
      root.Kii.logger("Is true");
      return true;
    } else {
      return false;
    }
  };

  KiiPortalUtilities._assertCountryCodeIsValid = function(value) {
    if (!KiiPortalUtilities._validateCountryCode(value)) {
      throw new root.InvalidCountryException;
    }
  };

  KiiPortalUtilities._validatePassword = function(value) {
    var pattern;
    root.Kii.logger("Validating password: " + value);
    pattern = /^[\x20-\x7E]{4,50}$/;
    if ((typeof value).toLowerCase() !== "string") {
      root.Kii.logger("not string");
      return false;
    } else if (value.match(pattern)) {
      root.Kii.logger("matched");
      return true;
    } else {
      root.Kii.logger("other exception");
      return false;
    }
  };

  KiiPortalUtilities._assertPasswordIsValid = function(value) {
    if (!KiiPortalUtilities._validatePassword(value)) {
      throw new root.InvalidPasswordException;
    }
  };

  KiiPortalUtilities._validateUsername = function(value) {
    var pattern;
    pattern = /^[a-zA-Z0-9-_\\.]{3,64}$/i;
    if ((typeof value).toLowerCase() !== "string") {
      return false;
    } else if (value.match(pattern)) {
      return true;
    } else {
      return false;
    }
  };

  KiiPortalUtilities._validateGroupID = function(value) {
    var pattern;
    pattern = /^[a-z0-9-_.]{1,30}$/;
    if ((typeof value).toLowerCase() !== "string") {
      return false;
    } else if (value.match(pattern)) {
      return true;
    } else {
      return false;
    }
  };

  KiiPortalUtilities._validateDisplayName = function(value) {
    var _ref;
    return KiiPortalUtilities._type(value) === "string" && (1 <= (_ref = value.length) && _ref <= 50);
  };

  KiiPortalUtilities._trim = function(value) {
    var pattern;
    pattern = /^(\s|\u00A0)+|(\s|\u00A0)+$/g;
    return (value || "").replace(pattern, "");
  };

  KiiPortalUtilities._safeAddTicks = function(left, right) {
    if ((isNaN(parseInt(left, 10))) || (isNaN(parseInt(right, 10)))) {
      throw new root.InvalidArgumentException('Parameters should be a number');
    }
    if ((Math.abs(left + right)) > KiiPortalUtilities.MAX_DATE_IN_MILLIS) {
      throw new root.ArithmeticException("Addition of " + left + " and " + right + " result in long overflow");
    }
    return left + right;
  };

  KiiPortalUtilities._safeMultiplyTicks = function(left, right) {
    if ((isNaN(parseInt(left, 10))) || (isNaN(parseInt(right, 10)))) {
      throw new root.InvalidArgumentException('Parameters should be a number');
    }
    if ((Math.abs(left * right)) > KiiPortalUtilities.MAX_DATE_IN_MILLIS) {
      throw new root.ArithmeticException("Multiplication of " + left + " and " + right + " result in long overflow");
    }
    return left * right;
  };

  KiiPortalUtilities._safeCalculateExpiresAtAsNumber = function(expirationInSeconds, baseUnixTimeInMills) {
    var e, expirationInMillis, expiresAt;
    expiresAt = 0;
    try {
      expirationInMillis = KiiPortalUtilities._safeMultiplyTicks(expirationInSeconds, 1000);
      expiresAt = KiiPortalUtilities._safeAddTicks(baseUnixTimeInMills, expirationInMillis);
    } catch (_error) {
      e = _error;
      if (e instanceof root.ArithmeticException) {
        expiresAt = KiiPortalUtilities.MAX_DATE_IN_MILLIS;
      } else {
        throw e;
      }
    }
    return expiresAt;
  };

  KiiPortalUtilities._safeCalculateExpiresAtAsDate = function(expirationInSeconds, baseUnixTimeInMills) {
    var e, expirationInMillis, expiresAt;
    expiresAt = 0;
    try {
      expirationInMillis = KiiPortalUtilities._safeMultiplyTicks(expirationInSeconds, 1000);
      expiresAt = KiiPortalUtilities._safeAddTicks(baseUnixTimeInMills, expirationInMillis);
    } catch (_error) {
      e = _error;
      if (e instanceof root.ArithmeticException) {
        expiresAt = KiiPortalUtilities.MAX_DATE_IN_MILLIS;
      } else {
        throw e;
      }
    }
    return new Date(expiresAt);
  };

  KiiPortalUtilities._isJSONType = function(contentType) {
    var pattern;
    pattern = /\+?json(;.*)?$/i;
    return contentType.match(pattern);
  };

  KiiPortalUtilities._type = function(obj) {
    var classToType;
    if (obj === void 0 || obj === null) {
      return String(obj);
    }
    classToType = {
      '[object Boolean]': 'boolean',
      '[object Number]': 'number',
      '[object String]': 'string',
      '[object Function]': 'function',
      '[object Array]': 'array',
      '[object Date]': 'date',
      '[object RegExp]': 'regexp',
      '[object Object]': 'object'
    };
    return classToType[Object.prototype.toString.call(obj)];
  };

  KiiPortalUtilities._disableCacheURL = function(url) {
    if (url.indexOf('?') !== -1) {
      url += "&disable_cache=";
    } else {
      url += "?disable_cache=";
    }
    url += new Date().getTime();
    return url;
  };

  KiiPortalUtilities._validateServerCodeEntryName = function(value) {
    var pattern;
    pattern = /^[a-zA-Z][_a-zA-Z0-9]*$/i;
    return KiiPortalUtilities._type(value) === "string" && value.match(pattern);
  };

  KiiPortalUtilities._validateServerCodeEntryArgument = function(value) {
    return KiiPortalUtilities._type(value) === "null" || (KiiPortalUtilities._type(value) === "object" && Object.keys(value).length > 0);
  };

  KiiPortalUtilities._validateServerCodeEnryVersion = function(value) {
    return KiiPortalUtilities._type(value) === 'string' && value !== "";
  };

  KiiPortalUtilities._isNonEmptyString = function(s) {
    if (typeof s !== "string") {
      return false;
    }
    return s.length > 0;
  };

  KiiPortalUtilities._Error = function(message, target) {
    var e;
    e = Error(message);
    e.target = target;
    return e;
  };

  return KiiPortalUtilities;

})();