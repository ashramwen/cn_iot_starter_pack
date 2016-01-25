/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.bootstrap.html
 */

module.exports.bootstrap = function(cb) {
	sails.request = require('request');
	sails.uuid = require('uuid');
	sails.portalServerHost = 'kii-yubari.herokuapp.com';
	sails.fs = require('fs')

	EmailConfigs.native(function(err, collection) {
	  collection.ensureIndex(['emailConfigID'], {
	    unique: true
	  }, function(err, result) {
	    if (err) {
	      sails.log.error(err);
	    }
	  });
	});
	Templates.native(function(err, collection) {
		collection.ensureIndex(['templateID'], {
			unique: true
		}, function(err, result) {
			if (err) {
				sails.log.error(err)
			}
		})
	})
	ServerCode.native(function(err, collection) {
		collection.ensureIndex(['name'], {
			unique: true
		}, function(err, result) {
			if (err) {
				sails.log.error(err)
			}
		})
	})

	var cryptLib = require('cryptlib')

	var iv = 'LDhVNa9MDmepcNcX' //cryptLib.generateRandomIV(16)
	var key = '420b09055cb4e27a40bce8f1cde91b6a' //cryptLib.getHashSha256('burnAllTheBabies', 32)

	sails.encrypt = function(plainText) {
		return cryptLib.encrypt(plainText, key, iv)
	}

	sails.decrypt = function(cypherText) {
		return cryptLib.decrypt(cypherText, key, iv)
	}
  // It's very important to trigger this callback method when you are finished
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
  cb();
};
