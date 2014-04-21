define(function (require) {
	var Backbone 		= require('backbone');
	
	User = Backbone.Model.extend({
		loggedIn: false,
		userName: ""
	});
	return {
		User: User
	}
	
});