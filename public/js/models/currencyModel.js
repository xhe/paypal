define(function (require) {
	var Backbone 		= require('backbone');
	var util = require('common/utils');
	Currency = Backbone.Model.extend({
				});
	
	CurrencyCollection = Backbone.Collection.extend({
		model: Currency,
		referObj: null,
		retrieveCurrencies: function(){
			referObj = this;
	    	util.ajax_get( util.getAPIUrl('currencies'),this.retrieveCurrencieskHandler); 
		},		
		retrieveCurrencieskHandler: function(data){
			referObj.reset(data);
		}
	});	
	return {
		Currency: Currency,
		CurrencyCollection: CurrencyCollection
	}
	
});
