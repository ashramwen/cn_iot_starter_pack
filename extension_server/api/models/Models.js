module.exports = {

  attributes: {  	
  	appID: {
      type: 'string',
      required: true
    },
    name: {
      type: 'string',
      required: true
    },
    description: {
      type: 'string',
      required: true
    },
    uuid: {
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