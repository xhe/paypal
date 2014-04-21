define(function(require){
	
	var Backbone 		= require('backbone'),
		money_sent_done_tpl		= require('text!tpl/send-money-success.html'),
		util = require('common/utils')
		;
		

	// Extends Backbone.View
    var SendMoneyDoneView = Backbone.View.extend( {

        // The View Constructor
        initialize: function() {
        	 this.template = _.template( money_sent_done_tpl );
        	
        },
        
        render: function() {           
            $(this.el).html(this.template({user: util.getLoggedInUser()}));
            return this;
        }
    } );
      
   
    return SendMoneyDoneView;
   
} );