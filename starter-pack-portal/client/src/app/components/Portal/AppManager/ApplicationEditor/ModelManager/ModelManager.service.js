angular.module('StarterPack.Portal.AppManager.ModelManager')
  .factory('ModelService', function () {

    var ModelService = {};
    ModelService.createModel = function(myapp, modelBO){
        var model = myapp.createModel();
        model.setName(modelBO.modelName);
        return model.save();
    };

    return ModelService;
  });