module.exports = {

  attributes: {  	
  	appID: {
  		type: 'string',
  		foreignKey: true,
  		required: true,
  	},
  	name: {
  		type: 'string',
  		required: true,
      unique: true
  	},
    type: {
      type: 'string',
      enum: ['endpoint', 'function', 'hook'],
      required: true
    },
  	body: {
  		type: 'string',
  		required: true
  	}
  }
};