exports.login=function(req, res){
	var userName = req.body.userName;
	req.session.userName = userName;
	res.json({status: 0});
};