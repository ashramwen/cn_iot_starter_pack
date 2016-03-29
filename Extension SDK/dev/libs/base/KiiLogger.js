    /**
     * class KiiLogger
     */
    root.KiiLogger = (function(){
        function KiiLogger(){

        }

        KiiLogger.log = function(e){
            if(KiiPortalDevSettings.log){
                console.log(e);
            }
        }

        KiiLogger.debug = function(e){
            if(KiiPortalDevSettings.debug){
                console.log(e);
            }
        };


        return KiiLogger;
    })();

    