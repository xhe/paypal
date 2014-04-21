define(function(require){
	
	var Backbone 		= require('backbone'),
		home_tpl		= require('text!tpl/send-money.html'),
		home_success_tpl= require('text!tpl/send-money-success.html'),
		CurrencyCollection	= require('models/currencyModel'),
		Transaction		=  require('models/transactionModel'),
		util = require('common/utils')
		;
    var sendMoneyView = Backbone.View.extend( {
        // The View Constructor
    	selfObj: null,
        initialize: function() {
        	 this.currencyCollection = new CurrencyCollection.CurrencyCollection();
        	 selfObj = this;
        	 setTimeout(function(){  selfObj.currencyCollection.retrieveCurrencies() },1);
        },
        events:{
        	"click #sendMoney": "sendingMoney",
        	"blur #to": "validate",
        	"blur #amount": "validate",
        	"change #currency":"changeCurrency"
        },
        
        changeCurrency: function(){
        	if( $("#currency").val()!='USD'){
        		var amt = parseFloat( $("#amount").val().replace(",",""));
        		var equusd =( amt / this.currencyCollection.models[0].get( $("#currency").val()) ).toFixed(5);
        		var str = $("#amount").val() +" "+  $("#currency").val() +" = " +equusd+" USD";
        		$("#divEquivalentUSD").html( str   );
        		$("#divEquivalentUSD").show();
        	}else{
        		$("#divEquivalentUSD").empty();
        		$("#divEquivalentUSD").hide();
        	}
        	//divEquivalentUSD
        },
        
        validate: function(){
        	var to = $("#to").val();
        	var amount = $("#amount").val().replace(",","");
        	var valid = true;
        	if(to.length>0 && !util.isEmail(to)){
        		$("#errorTo").show();
        		valid = false;
        	}else{
        		$("#errorTo").hide();
        	}
        	if(amount.length>0 && isNaN(amount) ){
        		$("#errorAmount").show();
        		valid = false;
        	}else{
        		$("#amount").val( util.formatMoney(amount));
        		$("#errorAmount").hide();
        	}
        	
        	if(to.length==0 && amount.length==0){
        		valid = false;
        		$("#errorAll").show();
        	}else{
        		$("#errorAll").hide();
        	}
        	
        	return valid;
        },
        
        sendingMoney: function(){
        	
        	if(!this.validate()){
        		return;
        	}
        	
        	var transaction = new Transaction.Transaction(   
        			{
        				to : $("#to").val(),
        				amount: $("#amount").val(),
        				currency: $("#currency").val(),
        				note: $("#note").val(),
        				purpose: $("#radio-purpose-0").is(':checked')?0:1
        			}		
        	);
        	
        	transaction.save( null,
        			{success :
        				function(data, response){
        					if(response.status=='success'){
        						router.navigate('#moneysent', {trigger: true});
        					}
        				}
        			});
        },
       
        render: function() {  
           var tpl = _.template(home_tpl);	
           $(this.el).html(tpl({user: util.getLoggedInUser()}));
           this.currencyListView = new CurrencyListView({el: $('#selCurrency', this.el), model: this.currencyCollection});
           return this;
        }
    } );
      
    
    var CurrencyListView = Backbone.View.extend( {
    	initialize:function () {
	        this.model.bind("reset", this.render, this);
	   },
       render:function (eventName) {
	    	$("#currency").find('option').remove().end(); 
	    	_.each(this.model.models[0].attributes, function (rate, currency) {
	    		var selected = currency=='USD'?'selected':'';
	    		$("#currency").append("<option value='"+currency+"' "+selected+">"+ currency+"</option>");
	        }, this);
	    	$("#currency").selectmenu();
	    	$("#currency").selectmenu("refresh");
	    	
	    	return this;
	    }
    });
    
    return sendMoneyView;
   
} );