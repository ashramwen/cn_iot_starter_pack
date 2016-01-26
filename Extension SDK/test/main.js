var admin = null;
var app = null;
var uploader = document.getElementById('file1');
var callback = {
    success:function(result){
        admin = result;
        console.log(admin);

        getApps(admin);
    },
    failure: function(result){
        console.log(result);
    }
};
KiiPortalAdmin.login('ljz13579@gmail.com','yongt2127', callback);

var useAppCallbacks = {
    success: function(result){
        console.log('use app success');
        app = result;

    },
    failure: function(result){

    }
};

function getApps(admin){
    var refreshAppCallbacks = {
        success: function(apps){
            window.apps = apps;
            console.log(apps);
        },
        failure: function(response){
            console.log(response);
        }
    };
    admin.refreshApps().then(refreshAppCallbacks.success, refreshAppCallbacks.failure);
}

function useApp(){
    var app = apps[0];

    var callbacks = {
        success: function(app){
            window.app = app;
            console.log('done loading app!');
        },
        failure: function(){

        }
    };
    admin.useApp(app, callbacks);
}

function getFirmwares(){
    app.refreshFirmwares().then(function(firmwares){
        window.firmwares = firmwares;
        window.firmware = firmwares[0];
        console.log(firmware);
    });
}

function getModels(){
    var callbacks = {
        success: function(models){
            window.models = models;
            window.model = models[0];
        }
    };
    app.refreshModels(callbacks);
}

function uploadImage(){
    var file = document.getElementById('file1').files[0];
    model.uploadImage(file, {
        success: function(){
            console.log(model);
        }
    });
}

function createApp(name){
    var myApp = admin.createApp();
    window.myApp = myApp;
    myApp.setAppName(name);
    myApp.setServer('jp');
    myApp.setPlatforms(['ios','html5']);
    myApp.save().then(function(){
        console.log(myApp);
    });
}