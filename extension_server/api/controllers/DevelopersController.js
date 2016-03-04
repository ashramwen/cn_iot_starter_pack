module.exports = {
	login: function(req, res) {
		var username = req.body.username
		var password = req.body.password
		if (!(username && password)) {
			res.badRequest('username or password missing')
			return
		}

		var options = {
			method: 'POST',
			url: 'https://' + sails.portalServerHost + '/oauth/token',
			headers: {
				'content-type': 'application/json'
			},
			body: {
				grant_type: 'password',
				username: username,
				password: password
			},
			json: true
		};

		sails.request(options, function(error, response, body) {
			if (error){
				res.serverError()
				return
			}
			if (response.statusCode == 200)
				res.ok(body);
			else
				res.unauthorized(body);
		});
	},

	create: function(req, res) {
		res.ok('to be implemented')

	},

	find: function(req, res) {
		var authorization = req.headers['authorization']
		if (!authorization) {
			res.badRequest('miss authorization')
			return 
		}
		var options = {
			method: 'GET',
			url: 'https://' + sails.portalServerHost + '/v2ext/apps/',
			headers: {
				authorization: authorization
			}
		};

		sails.request(options, function(error, response, body) {
			if (error) {
				res.serverError()
				return
			}
			if (response.statusCode == 200) {
				res.ok(JSON.parse(body))
			} else {
				res.unauthorized()
			}
		});
	},

	findOne: function(req, res) {
		var appID = req.param('appID')
		var authorization = req.headers['authorization']

		if (!authorization) {
			res.badRequest('miss authorization')
			return
		}
		var options = {
			method: 'GET',
			url: 'https://' + sails.portalServerHost + '/v2ext/apps/' + appID,
			headers: {
				authorization: authorization
			}
		};

		sails.request(options, function(error, response, body) {
			if (error) {
				res.serverError()
				return
			}

			if (response.statusCode == 200) {
				var returnedBody = JSON.parse(body)
				var siteName = returnedBody.app['site_name']
				var appID = returnedBody.app['app_id']
				var appKey = returnedBody.app['app_key']
				var clientID = returnedBody.app['client_id']
				var clientSecret = returnedBody.app['client_secret']

				var options = {
					method: 'POST',
					url: 'https://' + sails.portalServerHost + '/v2ext/apps/' + appID + '/token',
					headers: {
						'content-type': 'application/json',
						authorization: authorization
					}
				};

				sails.request(options, function(error, response, body) {
					if (error) {
						res.serverError()
						return
					} 
					if (response.statusCode == 200) {
						returnedBody['admin_token'] = JSON.parse(body)['access_token']

						var options = {
							method: 'GET',
							url: 'https://' + sails.portalServerHost + '/v2ext/apps/' + appID + '/secret',
							headers: {
								authorization: authorization
							}
						};

						sails.request(options, function(error, response, body) {
							if (error) {
								res.serverError()
								return
							}
							if (response.statusCode == 200) {
								returnedBody.app['client_id'] = JSON.parse(body)['client_id']
								returnedBody.app['client_secret'] = JSON.parse(body)['client_secret']
								res.ok(returnedBody)
							} else {
								res.unauthorized()
							}
						});
						
					} else {
						res.unauthorized()
					}
				});
			} else {
				res.unauthorized('either the access token is not valid, or the appID does not exist');
			}
		});
	}
}