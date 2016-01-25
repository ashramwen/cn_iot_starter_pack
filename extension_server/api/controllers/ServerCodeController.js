module.exports = {

	create: function(req, res) {
		var type = req.body.type		
		var body = req.body.body
		var appID = req.headers['x-app-id']
		var name = appID + '-' + req.body.name
		var record = {
			appID: appID,
			type: type,
			body: body,
			name: name
		}

		if (!(type && name && body)) {
			res.badRequest('miss body components')
			return
		}

		ServerCode.findOne({name: name}).exec(function findOneCB(err, found) {
			if (err) {
				res.serverError()
				return
			}
			if (!found) {
				ServerCode.create(record).exec(function createCB(err, created) {
					if (err) {
						res.serverError()
						return
					}					

					res.created(created)					
				})
			} else {
				res.badRequest('the function name has already been created')
				ServerCodeUploader.upload(appID, function (err) {
					if (err) {
						console.log(err)
					}
					console.log('success')
				})
			}
		})
	}
}