    root.KiiPortalCommand = (function(){

        function KiiPortalCommand(command){
            this._kiiApp = null;
            this._thing = null;

            __extend(this, {
                'commandID': '',
                'issuer': 'user:',
                'target': 'thing:',
                'actions': [],
                'commandState': 'DONE',
                'schema': '',
                'schemaVersion': '',
                'title': '',
                'description': '',
                'metadata': {},
                'created': null,
                'modified': null
            })

            if(command){
                __extend(this, command);
            }
        }

        KiiPortalCommand.prototype.init = function(command){
            __extend(this, command);
        };

        KiiPortalCommand.prototype.addAction = function(action){

        };

        return KiiPortalCommand;
    })();

    root.KiiPortalCommandAction = (function(){

        function KiiPortalCommandAction(){
            this.actionName = '';
        }

        return KiiPortalCommandAction;
    })();


    root.KiiPortalCommandResult = (function(){

        function KiiPortalCommandResult(){
            this.succeeded = false; // required. Specify if the action execution was a success.
            this.errorMessage = ''; // An additional message for describing the cause of action execution failure.
            this.data = null; // A custom data.
        }

        return KiiPortalCommandResult;
    })();