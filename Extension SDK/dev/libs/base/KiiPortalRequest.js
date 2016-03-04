    
    root.KiiPortalRequest = (function(){

        function KiiPortalRequest(spec, kiiApp){
            if(kiiApp){
                spec.headers = spec.headers || {};
                spec.headers['x-app-id'] = kiiApp.getAppID();
                spec.headers['x-app-key'] = kiiApp.getAppKey();
                spec.headers['Authorization'] = kiiApp.getAdmin().getTokenType() + ' ' + kiiApp.getAdmin().getAccessToken();
                spec.headers['x-app-site'] = kiiApp.getSite();
            }
            return __ajax(spec);
        }
        
        return KiiPortalRequest;
    })();