var service_user = require('../services/user');

exports.login = function(req, res){
	service_user.login(req, res);
};
