module.exports = {
	create: function (req, res) {
		var body = req.body;
		if (!(body.modelID && body.initialSchema)) {
			res.badRequest("miss body argument")
			return
		}
		var appID = req.headers['x-app-id'];
		var model = {
			appID: appID,
			modelID: body.modelID
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
				bindedWith: createdModel.modelID
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
		Models.findOne({modelID: modelID}).populate('schemas').exec(function findOneCB(err, found) {
			if (err) {
				res.badRequest(err)
				return
			}
			if (found == undefined) {
				res.ok([])
				return
			}
			res.ok(found)
		})
	},

	add: function (req, res) {
		var modelID = req.param('modelID')
		var properties = req.body.properties
		var appID = req.headers['x-app-id'];
		Models.findOne({modelID: modelID}).populate('schemas').exec(function findOneCB(err, found) {
			if (err) {
				res.badRequest(err)
				return
			}
			if (found == undefined) {
				var newModel = {
					body: {
						modelID: modelID,
						initialSchema: {
							properties: properties
						}
					},
					headers: {
						'x-app-id': appID
					}
				}
				sails.controllers.models.create(newModel, res)
				return
			}
			var version = found.schemas.length + 1
			var schema = {
				appID: appID,
				version: version,
				properties: properties,
				uuid: sails.uuid.v1(),
				bindedWith: modelID
			}
			Schemas.create(schema).exec(function createdCB(err, created) {
				if (err) {
					res.badRequest(err)
					return
				}
				res.created(created)
			})
		})
	},

	findSchema: function (req, res) {
		var modelID = req.param('modelID')
		var version = req.param('versionNumber')
		if (version == 'latest') {
			Schemas.findOne({where: {
				appID: req.headers['x-app-id'], 
				bindedWith: modelID}, sort: 'updatedAt DESC'}).exec(function findOneCB(err, found) {
					if (err) {
						res.badRequest(err)
						return
					}
					res.ok(found)
					return
			})
		}

		Schemas.findOne({
			appID: req.headers['x-app-id'], 
			bindedWith: modelID, 
			version: version}).exec(function findOneCB(err, found) {
				if (err) {
					res.badRequest(err)
					return
				}
				if (found == undefined) {
					res.badRequest('No schema matches given version number')
					return
				}
				res.ok(found)
		})
	}
}