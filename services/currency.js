var exchangeRateUrl= 'openexchangerates.org';
var https = require('https');
var cache = require('./fileCache');

exports.getCurrencies=function(req, res){
	
	
	cache.getCurrencyCache(function(rates){
		
		if(rates){
			res.json( rates );
		}else{
			var opts = {
					  host: exchangeRateUrl,
					  port: 443,
					  path: '/api/latest.json?app_id=a72236a0a2f64c599353678a7f5edd85',
					  method: 'GET',
					  headers: {
					        'Content-Type': 'application/json'
					    }
					};
			
			var req = https.get(opts, function(result) {
				result.setEncoding('utf8');
				result.on('data', function(data) {
					  var jsonResult = JSON.parse(data);
					  cache.setCurrencyCache(jsonResult.rates);
					  return res.json(jsonResult.rates);
				  });
				});
		}
	});
	
};