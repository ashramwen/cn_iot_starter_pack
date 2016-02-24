module.exports = {

  attributes: {  	
  	appID: {
      type: 'string',
      required: true
    },
    modelID: {
      type: 'string',
      required: true,
      unique: true,
      primaryKey: true
    },
    schemas: {
      collection: 'schemas',
      via: 'bindedWith'
    }
  }
};