define(function(require){
	
	var Backbone 		= require('backbone'),
		transaction_list_tpl		= require('text!tpl/transactions.html'),
		transactions_tpl		= require('text!tpl/transaction_list.html'),
		TransactionCollection		=  require('models/transactionModel'),
		util = require('common/utils')
		;
    var TransactionListView = Backbone.View.extend( {
       
    	selfObj: null,
        initialize: function() {
        	 this.transactionCollection = new TransactionCollection.TransactionCollection();
        	 selfObj = this;
        	 setTimeout(function(){  selfObj.transactionCollection.fetch() },1);
        },
       
        render: function() {  
           var tpl = _.template(transaction_list_tpl);	
           $(this.el).html(tpl({user: util.getLoggedInUser()}));
           this.transactionItemListView = new TransactionItemListView({el: $('#divTransactions', this.el), model: this.transactionCollection});
           return this;
        }
    } );
      
    
    var TransactionItemListView = Backbone.View.extend( {
       initialize:function () {
	        this.model.bind("reset", this.render, this);
	   },
	   
       render:function (eventName) {
    	   
	      var tpl = _.template(transactions_tpl);	
    	  $(this.el).html(tpl( { transactions: this.model.models } ));
    	 // $( "#tbl_transactions" ).table({ defaults: false });
    	  
    	  return this;
	    }
    });
    
    return TransactionListView;
   
} );