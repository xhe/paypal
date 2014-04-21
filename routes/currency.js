var service_currency = require('../services/currency');

exports.list = function(req, res){
	service_currency.getCurrencies(req, res);
};
