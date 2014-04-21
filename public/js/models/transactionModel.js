define(function (require) {
	var Backbone 		= require('backbone');
	var util = require('common/utils');
	var appConfig = require('common/app-config');
	
	Transaction = Backbone.Model.extend({
		urlRoot: appConfig.serverUrl + 'transaction'
		
	});
	
	TransactionCollection = Backbone.Collection.extend({
		model: Transaction,
		url: appConfig.serverUrl + 'transaction'
	});	
	
	return {
		Transaction: Transaction,
		TransactionCollection: TransactionCollection
	}
});