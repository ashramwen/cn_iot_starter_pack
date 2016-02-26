module.exports = {

	init: function(req, res) {
		var authorization = req.headers['authorization']
		var appID = req.headers['x-app-id']
		var appKey = req.headers['x-app-key']
		var site = req.headers['x-app-site']

		var host = sails.config.kiiSite[site]

		var request = require("request");

		var options = {
			method: 'DELETE',
			url: 'https://' + host + '/api/apps/' + appID + '/buckets/FIRMWARE_BUCKET/acl/CREATE_OBJECTS_IN_BUCKET/UserID:ANONYMOUS_USER',
			headers: {
				'x-kii-appid': appID,
				'x-kii-appkey': appKey,
				authorization: authorization
			}
		};

		console.log(options)

		request(options, function(error, response, body) {
			if (error) throw new Error(error);

			console.log(body);
			console.log(response.statusCode)
			res.ok(response.statusCode, body)
		});
	}
}