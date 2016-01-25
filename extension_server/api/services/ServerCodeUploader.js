module.exports = {
	upload: function(appID, cb) {
		ServerCode.find({
			appID: appID
		}).exec(function findCB(err, found) {
			if (err) {
				cb(err)
				return
			}
			for(var i = 0; i < found.length; i ++) {
				console.log(found[i])
				sails.fs.appendFile('.tmp/' + appID + '.js', found[i].body, function(err) {
					if (err) {
						cb(err)
						return
					}
					if (i == found.length - 1)
						cb()
				});
			}		
		})
	}
}