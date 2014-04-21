define(function(require){
	
	var Backbone = require('backbone'),
		HomeView = require('views/HomeView'),
		SendMoneyView = require('views/SendMoneyView'),
		SendMoneyDoneView =  require('views/SendMoneyDoneView'),
		TransactionView = require('views/TransactionView'),
		LoginView		= require('views/LoginView'),
		util = require('common/utils')
		;
    // Extends Backbone.Router
	return Backbone.Router.extend( {

        // The Router constructor
        initialize: function() {
        	 $('.back').on('click', function(event) {
                 window.history.back();
                 return false;
             });
            Backbone.history.start();
        },

        // Backbone.js Routes
        routes: {
            // When there is no hash bang on the url, the home method is called
            "": "home",
            "sendmoney":"sendMoney",
            "moneysent":"moneySent",
            "transactions":"transactions",
            "logout":"logout"
        },
        
        
        login: function(){
        	if(util.isUserLoggedIn()){
        		return false;
        	}else{  
        		loginView = new LoginView();
        		this.changePage(loginView );
        		return true;
        	}
        },
        
        logout: function(){
        	util.logout();
        	router.navigate('#'+Math.random());
        	router.navigate('#', {trigger:true});
        },
        
        // Home method
        home: function() {
        	if (this.login())
        		return;
        	
        	homeView = new HomeView();
        	this.changePage(homeView);
        },
        
        sendMoney: function(){
        	if (this.login())
        		return;
        	
        	sendMoneyView = new SendMoneyView();
        	this.changePage(sendMoneyView );
        },
        
        moneySent: function(){
        	if (this.login())
        		return;
        	
        	sendMoneyDoneView = new SendMoneyDoneView();
        	this.changePage(sendMoneyDoneView );
        },
        
        transactions: function(){
        	if (this.login())
        		return;
        	
        	transactionView = new TransactionView();
        	this.changePage(transactionView );
        },
        
        changePage: function (page) {
          $(page.el).attr('data-role', 'page');
          page.render();
          $('body').append($(page.el));
          $.mobile.changePage($(page.el), {
            changeHash: false,
            reverse: false, 
            transition: this.historyCount++ ? 'flip' : 'none',
          });
        },
    } );
} );