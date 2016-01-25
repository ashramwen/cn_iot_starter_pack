module.exports = {
	
	/* create a template */	
  create: function (req, res) {
		var emailConfigID = req.headers['x-app-id'];
		var body = req.body;
		body.emailConfigID = emailConfigID;
		body.templateID = sails.uuid.v1();
		Templates.create(body).exec(function createCB(err, created) {
			if (err) {
				res.badRequest(err)
			} else {
				res.created(created)
			}
		});
  },

  /* get all templates */
  find: function(req, res) {
  	var emailConfigID = req.headers['x-app-id'];
  	var templatesQuery = Templates.find({emailConfigID: emailConfigID});
  	if (req.query.limit) {
  		templatesQuery.limit(req.query.limit)
  	}
  	if (req.query.skip) {
  		templatesQuery.skip(req.query.skip)
  	}
  	templatesQuery.exec(function findCB(err, found) {
  		if (err) {
  			res.serverError(err);
  			return;
  		} else {
  			res.ok(found);
  		}
  	})
  },

  /* get one template with specified templateID */
  findOne: function (req, res) {
  	var emailConfigID = req.headers['x-app-id'];
  	var templateID = req.param('templateID');
  	Templates.findOne({emailConfigID: emailConfigID, templateID: templateID})
  		.exec(function findOneCB(err, found){
  		if (err) {
  			res.serverError(err);
  			return;
  		} else {
  			res.ok(found);
  		}
  	})
  },

  /* update a template with templateID */
  update: function(req, res) {
    var emailConfigID = req.headers['x-app-id'];
    var templateID = req.param('templateID');    
    Templates.update({emailConfigID: emailConfigID, templateID: templateID},req.body)
      .exec(function afterwards(err, updated){
      if (err) {
        res.serverError(err);
        return;
      }
      res.ok(updated[0]);
    }); 
  },           

  /* delete one template with specified templateID */
  destroy: function (req, res) {
    var emailConfigID = req.headers['x-app-id'];
    var templateID = req.param('templateID');
    Templates.destroy({emailConfigID: emailConfigID, templateID: templateID})
      .exec(function destroyCB(err) {
      if (err) {
        res.serverError(err);
        return;
      } else {
        res.noContent();
      }  
    })
  }      
};