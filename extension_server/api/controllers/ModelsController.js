module.exports = {
	create: function (req, res) {
		var body = req.body;
		if (!(body.name && body.description && body.initialSchema)) {
			res.badRequest("miss body argument")
			return
		}
		var appID = req.headers['x-app-id'];
		var uuid = sails.uuid.v1();		
		var model = {
			name: body.name,
			description: body.description,
			appID: appID,
			uuid: uuid
		}
		Models.create(model).exec(function createCB(err, createdModel) {
			if (err) {
				res.badRequest(err);
				return
			}
			var schema = {
				appID: appID,
				version: 1,
				properties: body.initialSchema.properties,
				uuid: sails.uuid.v1(),
				bindedWith: createdModel.uuid
			}
			Schemas.create(schema).exec(function createdCB(err, created) {
				if (err) {
					res.badRequest(err)
					return
				}
				res.created(createdModel)
			})
		})
	},

	find: function (req, res) {
		Models.find({appID: req.headers['x-app-id']}).exec(function findCB(err, found) {
			if (err) {
				res.badRequest(err)
				return
			}
			res.ok(found)
		})
	},

	populate: function (req, res) {
		var modelID = req.param('modelID')
		Models.findOne({uuid: modelID}).populate('schemas').exec(function findOneCB(err, found) {
			if (err) {
				res.badRequest(err)
				return
			}
			res.ok(found)
		})
	}
}