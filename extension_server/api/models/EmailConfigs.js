/**
* Email.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {  	
  	emailConfigID: {
  		type: 'string',
  		primaryKey: true,
  		required: true,
  		unique: true
  	},
  	emailAddr: {
  		type: 'string',
  		required: true
  	},
  	username: {
  		type: 'string',
  		required: true
  	},
  	password: {
  		type: 'string',
  		required: true
  	},
  	smtpHost: {
  		type: 'string',
  		required: true
  	}
  }
};

