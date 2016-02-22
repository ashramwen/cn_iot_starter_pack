module.exports = {

  attributes: {  	
  	appID: {
      type: 'string',
      required: true
    },
    version: {
      type: 'integer',
      required: true
    },
    properties: {
      type: 'array',
      required: true
    },
    uuid: {
      type: 'string',
      required: true,
      unique: true,
      primaryKey: true
    },
    bindedWith: {
      model: 'models'
    }
  }
};