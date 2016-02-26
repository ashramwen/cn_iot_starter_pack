module.exports = {

	create: function(req, res) {
		var authorization = req.headers['authorization']
		var name = req.body.name
		var server = req.body.server
		var platforms = req.body.platforms

		var options = {
			method: 'POST',
			url: 'https://' + sails.portalServerHost + '/v2ext/apps',
			headers: {
				'content-type': 'application/json',
				authorization: authorization
			},
			body: {
				name: name,
				server: server,
				platforms: platforms
			},
			json: true
		};

		sails.request(options, function(error, response, body) {
			if (error) {
				res.badRequest(error)
				return
			}
			if (response.statusCode != 200) {
				res.send(response.statusCode, body);
				return
			} 

			var appID = body['app_id']

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
					res.badRequest(error)
					return
				}

				var authorization = 'Bearer ' + body['access_token']

				//TODO
			});
		});
	}
}