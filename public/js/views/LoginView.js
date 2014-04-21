define(function(require){
	
	var Backbone 		= require('backbone'),
		login_tpl		= require('text!tpl/login.html'),
		appConfig = require('common/app-config'),
		util = require('common/utils')
		;
		

	// Extends Backbone.View
    var loginView = Backbone.View.extend( {

        // The View Constructor
        initialize: function() {
        	 this.template = _.template( login_tpl );
        	 this.render();
        },
        
        events:{
        	"click #btnLogin": "login"
        },
        
        login: function(){
        	var username = $("#userName").val();
        	$.post(appConfig.serverUrl + 'login', 
        		  {
        			'userName': username,
        		  },
        		  function(data){
        			 if(data.status==0){
        				 util.setLoggedInUser( username );
        				 router.navigate("#"+Math.random());
        				 router.navigate("#", {trigger: true});
        			 } 
        		  });
        		  
        	
        },
        
        render: function() {           
            $(this.el).html(this.template());
            return this;
        }
    } );
      
   
    return loginView;
   
} );