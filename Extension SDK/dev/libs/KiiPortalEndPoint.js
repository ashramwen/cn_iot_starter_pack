    root.KiiPortalEndPoint = (function(){

        function KiiPortalEndPoint(endPoint){

        }

        KiiPortalEndPoint.prototype.getName = function(){
            return this._endPoint;
        };

        KiiPortalEndPoint.prototype.setName = function(name){
            this._endPoint = name;
        };

        KiiPortalEndPoint.prototype.setParams = function(params){
            this._parameters = params;
        };

        KiiPortalEndPoint.prototype.getParams = function(){
            return this._parameters;
        };

        KiiPortalEndPoint.prototype._purify = function(){
            var _this = this;
            return {
                endPoint: _this.getName(),
                parameters: _this.getParams()
            };
        };

        return KiiPortalEndPoint;
    }());
