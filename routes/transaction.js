var service_transaction = require('../services/transaction');

exports.create = function(req, res){
	service_transaction.create(req, res);
};

exports.getAll = function(req, res){
	service_transaction.getAll(req, res);
};