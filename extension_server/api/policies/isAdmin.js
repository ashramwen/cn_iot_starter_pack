// check whether the incoming request is started by a Kii app admin

module.exports = function isAdmin(req, res, next) {
	var appID = req.headers['x-app-id'];
	var appKey = req.headers['x-app-key'];
	var site = req.headers['x-app-site'];
	var authorization = req.headers['authorization'];

	if (appID && appKey && site && authorization) {
		var host = sails.config.kiiSite[site];
		var options = {
			method: 'GET',
			url: 'https://' + host + '/api/apps/' + appID + '/configuration/parameters/isMasterApp',
			headers: {
				authorization: authorization,
				'x-kii-appkey': appKey,
				'x-kii-appid': appID
			}
		};

		sails.request(options, function(error, response, body) {
			if (error) throw new Error(error);

			if (response.statusCode == 200)
				next();
			else
				res.unauthorized('The provided access token can not be authorized');
		});
	} else {
		res.badRequest('One or more headers are not provided');
	}
}