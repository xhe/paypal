var fs = require('fs');
var path = require('path');

var rateRefreshPeriod = 10*60; // 10 minutes refresh rate

var cacheFileName = function(){
	return path.join(__dirname+'/../cache/currencies.json');
}

exports.getCurrencyCache=function(cb){
	
	fs.exists( cacheFileName(), function(exist){
		if(exist){
			fs.stat( cacheFileName(), function(err, data){
				//if cache is too old, remove it
				ageOfCache = ((new Date()).getTime()- Date.parse(data.mtime))/1000;
				if( ageOfCache > rateRefreshPeriod ){
					console.log(' remove file ');
					fs.unlink( cacheFileName() );
					cb();
				}else{
					fs.readFile(cacheFileName(), function(err, data){
						if(err){
							throw err;
						}else{
							cb(JSON.parse(data));
						}
					})
				}
			});
		}else{
			cb();
		}
	});
};

exports.setCurrencyCache = function(data){
	fs.writeFile(cacheFileName(), JSON.stringify(data), function(err){
		if(err)
			return false;
		else
			return true;
	});
	
	
}