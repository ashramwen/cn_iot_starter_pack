(function(){
    window.SPThingGroup = (function(_super){
        function SPThingGroup(thingGroup){
            if(thingGroup){
                _.extend(this, thingGroup);
            }
            if(!this.getCustomData()){
                this.setCustomData({
                    displayed: false,
                    widgetSetting:{
                        size: {
                            x: 1,
                            y: 2
                        },
                        position: {
                            row: 1,
                            col: 1
                        }
                    },
                    fields: [],
                    refreshInterval: 60
                });
            }

            var custom = this.getCustomData();

            if(!this.getWidgetSetting()){
                this.setWidgetSetting({
                    size: {
                        x: 1,
                        y: 2
                    },
                    position: {
                        row: 1,
                        col: 1
                    }
                });
            }
        }

        SPThingGroup.prototype = new _super;

        SPThingGroup.prototype.getWidgetSetting = function(){
            return this.getCustomData().widgetSetting;
        };

        SPThingGroup.prototype.setWidgetSetting = function(setting){
            this.getCustomData().widgetSetting = setting;
        };

        SPThingGroup.prototype.getDisplayed = function(){
            return this.getCustomData().displayed;
        };

        SPThingGroup.prototype.setDisplayed = function(displayed){
            this.getCustomData().displayed = displayed;
        };

        SPThingGroup.prototype.getFields = function(){
            return this.getCustomData().fields;
        };

        SPThingGroup.prototype.setFields = function(fields){
            this.getCustomData().fields = fields;
        };

        SPThingGroup.prototype.setRefreshInterval = function(interval){
            this.getCustomData().refreshInterval = interval;
        };

        SPThingGroup.prototype.getRefreshInterval = function(interval){
            return this.getCustomData().refreshInterval;
        }

        return SPThingGroup;
    })(KiiPortalTag);
})();