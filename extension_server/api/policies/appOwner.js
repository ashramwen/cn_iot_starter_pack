// check whether the incoming request is started by a Kii app admin

module.exports = function isAdmin(req, res, next) {
	var appID = req.headers['x-app-id'];
	var emailConfigID = req.param('emailConfigID') || req.param('appID')

	if (emailConfigID != undefined) {
		if (appID == emailConfigID) {
			next();
		} else {
			res.forbidden('current admin token is not allowed to access target source');
		}
	} else {
		next();
	}
}