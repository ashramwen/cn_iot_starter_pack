
    /**
     * constants
     */
    var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;


    // Added to SDK by build script.
    // Object.keys() is defined in Javascript 1.8.5
    // This code will be used when the environment doen't support Object.keys()
    // For details refer to:
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys
    if (!Object.keys) {
        Object.keys = (function () {
            var hasOwnProperty = Object.prototype.hasOwnProperty,
                hasDontEnumBug = !({toString: null}).propertyIsEnumerable('toString'),
                dontEnums = [
                    'toString',
                    'toLocaleString',
                    'valueOf',
                    'hasOwnProperty',
                    'isPrototypeOf',
                    'propertyIsEnumerable',
                    'constructor'
                ],
                dontEnumsLength = dontEnums.length;

            return function (obj) {
                if (typeof obj !== 'object' && typeof obj !== 'function' || obj === null) throw new TypeError('Object.keys called on non-object')

                var result = []

                for (var prop in obj) {
                    if (hasOwnProperty.call(obj, prop)) result.push(prop)
                }

                if (hasDontEnumBug) {
                    for (var i=0; i < dontEnumsLength; i++) {
                        if (hasOwnProperty.call(obj, dontEnums[i])) result.push(dontEnums[i])
                    }
                }
                return result
            }
        })();
    }
    var __bind, __hasProp, __extends, __cast, __isFunction, __each,__remove, __optimizeCb, __clone, __isArray,
        __isArrayLike, __inherits, __ajax, __nativeKeys, __keys, __isObject, __has, __bindMethod,
        __hasOwnProperty, __hasEnumBug;

    __hasEnumBug = !{toString: null}.propertyIsEnumerable('toString');
    __hasOwnProperty =  Object.prototype.hasOwnProperty;
    __has = function(obj, key) { return obj != null && __hasOwnProperty.call(obj, key); };
    __nativeKeys = Object.keys;
    __isArrayLike = function(collection) {
        var length = collection.length;
        return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
    };
    __optimizeCb = function(func, context, argCount) {
        if (context === void 0) return func;
        switch (argCount == null ? 3 : argCount) {
            case 1: return function(value) {
                return func.call(context, value);
            };
            case 2: return function(value, other) {
                return func.call(context, value, other);
            };
            case 3: return function(value, index, collection) {
                return func.call(context, value, index, collection);
            };
            case 4: return function(accumulator, value, index, collection) {
                return func.call(context, accumulator, value, index, collection);
            };
        }
        return function() {
            return func.apply(context, arguments);
        };
    };

    __clone = function(obj) {
        if (null == obj || "object" != typeof obj) return obj;
        var copy = new obj.constructor;
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
        }
        return copy;
    };

    __bind = function(fn, me){ return function(){
        return fn.apply(me, arguments);
    }; };
    __keys = function(obj) {
        if (!__isObject(obj)) return [];
        if (__nativeKeys) return __nativeKeys(obj);
        var keys = [];
        for (var key in obj) if (_.has(obj, key)) keys.push(key);
        // Ahem, IE < 9.
        if (hasEnumBug) collectNonEnumProps(obj, keys);
        return keys;
    };
    __isObject = function(obj) {
        var type = typeof obj;
        return type === 'function' || type === 'object' && !!obj;
    };
    __extends = function(child, parent) { for (var key in parent) { if (__hasOwnProperty.call(parent, key)) child[key] = parent[key]; }function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };
    __each =  function(obj, iteratee, context) {
        iteratee = __optimizeCb(iteratee, context);
        var i, length;
        if (__isArrayLike(obj)) {
            for (i = 0, length = obj.length; i < length; i++) {
                iteratee(obj[i], i, obj);
            }
        } else {
            var keys = __keys(obj);
            for (i = 0, length = keys.length; i < length; i++) {
                iteratee(obj[keys[i]], keys[i], obj);
            }
        }
        return obj;
    };
    __isFunction = function(value){return typeof value == 'function'};/**@license MIT-promiscuous library-©2013 Ruben Verborgh*/
    if(typeof Promise === 'undefined') {
        /**@license MIT-promiscuous-©Ruben Verborgh*/
        !function(n,t){function c(n,t){return(typeof t)[0]==n}function u(i,o){return o=function f(e,h,l,a,s,p){function y(n){return function(t){s&&(s=0,f(c,n,t))}}if(a=f.q,e!=c)return u(function(n,t){a.push({p:this,r:n,j:t,1:e,0:h})});if(l&&c(n,l)|c(t,l))try{s=l.then}catch(j){h=0,l=j}if(c(n,s))try{s.call(l,y(1),h=y(0))}catch(j){h(j)}else for(o=function(t,o){return c(n,t=h?t:o)?u(function(n,c){r(this,n,c,l,t)}):i},p=0;p<a.length;)s=a[p++],c(n,e=s[h])?r(s.p,s.r,s.j,l,e):(h?s.r:s.j)(l)},o.q=[],i.call(i={then:function(n,t){return o(n,t)},"catch":function(n){return o(0,n)}},function(n){o(c,1,n)},function(n){o(c,0,n)}),i}function r(u,r,i,o,f){setTimeout(function(){try{o=f(o),f=o&&c(t,o)|c(n,o)&&o.then,c(n,f)?o==u?i(TypeError()):f.call(o,r,i):r(o)}catch(e){i(e)}})}function i(n){return u(function(t){t(n)})}Promise=u,u.resolve=i,u.reject=function(n){return u(function(t,c){c(n)})},u.all=function(n){return u(function(t,c,u,r){r=[],u=n.length||t(r),n.map(function(n,o){i(n).then(function(n){r[o]=n,--u||t(r)},c)})})}}("f","o");
    }

    __isArray = function(obj) {
        return toString.call(obj) === '[object Array]';
    };

    __remove = function(arr, obj){
        __each(arr, function(child, index){
            if(child == obj){
                arr.splice(index, 1);
            }
        });
    };

    __cast = function(child, parent){
        __each(parent, function(value, key){
            if(!__isFunction(value)){
                child[key] = value;
            }
        });
    };

    __inherits = function (child, parent) {
        var keys = Object.keys(parent.prototype);
        __each(keys, function(key){
            child.prototype[key] = parent.prototype[key];
        });
        keys = Object.keys(parent);
        __each(keys, function(key){
            child[key] = parent[key];
            if(__isFunction(child[key])){
                child[key] = __bind(child[key], child);
            }
        });
    };

    __bindMethod = (function(){
        var noEnumMethod = ['valueOf', 'isPrototypeOf', 'toString', 'constructor',
            'propertyIsEnumerable', 'hasOwnProperty', 'toLocaleString'];

        function __bindMethod(child){
            __each(child.constructor.prototype, function(value, key){
                if(noEnumMethod.indexOf(key)==-1 && __isFunction(value))
                    child[key] = __bind(value, child);
            });
        }

        return __bindMethod;
    })();




    __ajax = function(settings){
        return new Promise(function (resolve, reject) {
            var method, url, data, success, failure, params, headers;

            method = settings.method.toUpperCase();
            url = settings.url;
            params = settings.params;
            data = JSON.stringify(settings.data);
            headers = settings.headers;
            success = settings.success;
            failure = settings.failure;

            if (method == "POST" && params) {
                data = new FormData();
                for (var key in params) {
                    data.append(key, params[key]);
                }
            }


            var xmlhttp = new XMLHttpRequest();
            xmlhttp.open(method, url);

            if(!headers || !headers['Content-Type'])
                xmlhttp.setRequestHeader("Content-type", "application/json");
            if(headers){
                __each(headers, function(value, key){
                    xmlhttp.setRequestHeader(key, value);
                });
            }

            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == XMLHttpRequest.DONE) {
                    if (xmlhttp.status >= 200 && xmlhttp.status < 400) {
                        var response, status, data;

                        status = xmlhttp.statusText;
                        if(xmlhttp.status !== 204) {
                            try{
                                data = JSON.parse(xmlhttp.responseText);
                            }catch(e){
                                reject({status: status, data: {}, code: xmlhttp.status});
                                return;
                            }
                        }
                        response = {status: status, data: data, code: xmlhttp.status};
                        if (success) {
                            success(response);
                        }
                        resolve(response);
                    } else {
                        var response, status, data;

                        status = xmlhttp.statusText;
                        try{
                            data = JSON.parse(xmlhttp.responseText);
                        }catch(e){
                            data = {};
                            console.log(e);
                        }
                        
                        response = {status: status, data: data, code: xmlhttp.status};
                        if (failure) {
                            failure(response);
                        }
                        reject(response);
                    }
                }
            };
            xmlhttp.send(data);
        });
    };
