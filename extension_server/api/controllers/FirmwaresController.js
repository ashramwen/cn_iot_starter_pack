module.exports = {

	init: function(req, res) {
		var authorization = req.headers['authorization']
		var appID = req.headers['x-app-id']
		var appKey = req.headers['x-app-key']
		var site = req.headers['x-app-site']
		var host = sails.config.kiiSite[site]

		var initBucketACL = function(bucketID, callback){
			var options = {
				method: 'POST',
				url: 'https://' + host + '/api/apps/' +appID+ '/buckets/' + bucketID + '/objects',
				headers: {
					'content-type': 'application/vnd.kii.ObjectCreationResponse+json',
					authorization: authorization,
					'x-kii-appkey': appKey,
					'x-kii-appid': appID
				},
				body: '{}'
			};	

			sails.request(options, function(error, response, body) {
				if (error) {
					res.badRequest(error)
					return
				}
				if (response.statusCode != 201) {
					res.badRequest(body)
					return
				}
				var objectID = JSON.parse(body).objectID	

				var options = {
					method: 'DELETE',
					url: 'https://' + host + '/api/apps/' + appID + '/buckets/' + bucketID + '/objects/' + objectID,
					headers: {
						'content-type': 'application/json',
						authorization: authorization,
						'x-kii-appkey': appKey,
						'x-kii-appid': appID
					}
				};	

				sails.request(options, function(error, response, body) {
					if (error) {
						res.badRequest(error)
						return
					}
					if (response.statusCode != 204) {
						res.badRequest(body)
						return
					}	

					var options = {
						method: 'DELETE',
						url: 'https://' + host + '/api/apps/' + appID + '/buckets/' + bucketID + 
							'/acl/CREATE_OBJECTS_IN_BUCKET/UserID:ANY_AUTHENTICATED_USER',
						headers: {
							'x-kii-appid': appID,
							'x-kii-appkey': appKey,
							authorization: authorization
						}
					};	

					sails.request(options, function(error, response, body) {
						if (error) {
							res.badRequest(error)
							return
						}
						if (response.statusCode != 204) {
							res.badRequest(body)
							return
						}
						var options = {
							method: 'DELETE',
							url: 'https://' + host + '/api/apps/' + appID + '/buckets/' + bucketID + 
								'/acl/DROP_BUCKET_WITH_ALL_CONTENT/UserID:ANY_AUTHENTICATED_USER',
							headers: {
								'x-kii-appid': appID,
								'x-kii-appkey': appKey,
								authorization: authorization
							}
						}
						sails.request(options, function(error, response, body) {
							if (error) {
								res.badRequest(error)
								return
							}
							if (response.statusCode != 204) {
								res.badRequest(body)
								return
							}	
							callback()
						})
					});
				})
			});
		}

		initBucketACL("FIRMWARE_BUCKET", function(){
			initBucketACL("MODEL_BUCKET", function() {
				initBucketACL("TAG_BUCKET", function() {
					initBucketACL("FIRMWARE_NAMESPACE", function () {
						res.ok('app initialisation finished')
					})
				})
			})
		})
	}
}