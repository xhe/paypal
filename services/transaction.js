var transactions = [];

exports.create = function(req, res){

	var record = {};
	record.to =  req.body.to;
	record.amount =  req.body.amount;
	record.currency = req.body.currency;
	record.node =  req.body.note;
	record.purpose = req.body.purpose;
	
	if(!transactions[req.session.userName])
		transactions[req.session.userName] = [];
	
	transactions[req.session.userName].push(record);
	res.json({status: 'success'});
};

exports.getAll = function(req, res){
	res.json(transactions[req.session.userName]);
};
