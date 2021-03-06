define(function(require){
	
	var appConfig = require('common/app-config');
	var User = require('models/userModel');
	
	var util = {		
			
		isUserLoggedIn: function(){
				
			if(window.user){
				if(window.user.loggedIn && window.user.userName.length>0){
						return true;
				}else{
						return false;
				}
			}else{
				window.user = new User.User();
				return false;
			}	
		},	
		
		setLoggedInUser: function(userName){
			window.user.loggedIn = true;
			window.user.userName = userName;
		},
		getLoggedInUser: function(){
			return window.user;
		},
		logout: function(){
			window.user = new User.User();
			return false;
		},
		showBusy: function(){ 
			$.mobile.loading( 'show', {
				text: 'Loading...',
				textVisible: true,
				theme: 'a',
				html: ""
			});
		},	
		
		hideBudy: function(){
			var interval = setInterval(function () {
	            $.mobile.loading('hide');
	            clearInterval(interval);
	        }, 500);
		},	
		
		getAPIUrl: function(methodName){
			return appConfig.serverUrl + methodName;
		},
			
		detectAndShowError: function(data){
			
			//var atributes =  data.model.models[0].attributes;
			var status = "success";
			if(data.status != undefined){
				status = data.status;
			}
			
			if(status == "failed"){
				var page = new ErrorPageView({model: data});
				app.showDialog(page);
				return false;
			}
			return true;
		},
		
		//used to save static url request
		urlRequstCache: [],
		urlRequest_callback: null,
		urlRequest_url: null,
		//this method is used for retrieving remotely, caching and saving to localDB
		ajax_get: function(url,callback,forceUrlRequest){
			if(forceUrlRequest == null){
				forceUrlRequest = false;
			}
			
			if(forceUrlRequest){
				this.urlRequest_callback = callback;
				this.urlRequest_url = url;
				this.ajax_get_loading();
			}else{
				if(this.urlRequstCache[url]==null || this.urlRequstCache[url]==undefined ){
					this.urlRequest_callback = callback;
					this.urlRequest_url = url;
					this.ajax_get_loading();			
				}else{
					this.hideBudy();
					callback (this.urlRequstCache[url]);
					return;
				}		
			}	
		},	
		
		ajax_get_loading: function(){
			this.showBusy();
			$.ajax({
					  url: util.urlRequest_url,
					  success: 
						  function(data){
							util.hideBudy();
							 if(util.detectAndShowError(data)){
								 util.urlRequstCache[util.urlRequest_url] = data;
								 util.urlRequest_callback (data);
							 }
						},
					  dataType: "json",
					  async: false,
			});
		},	
		
		isEmail:    function(s){
			var isEmail_re       = /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/;
			return String(s).search (isEmail_re) != -1;
		},	
		
		formatMoney : function(number, decPlaces, thouSeparator, decSeparator) {
		    decPlaces = isNaN(decPlaces = Math.abs(decPlaces)) ? 2 : decPlaces,
		    decSeparator = decSeparator == undefined ? "." : decSeparator,
		    thouSeparator = thouSeparator == undefined ? "," : thouSeparator,
		    sign = number < 0 ? "-" : "",
		    i = parseInt(number = Math.abs(+number || 0).toFixed(decPlaces)) + "",
		    j = (j = i.length) > 3 ? j % 3 : 0;
		    return sign + (j ? i.substr(0, j) + thouSeparator : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thouSeparator) + (decPlaces ? decSeparator + Math.abs(number - i).toFixed(decPlaces).slice(2) : "");
		},
		
		detectMobileDevice: function(){
			var userAgent = navigator.userAgent.toLowerCase();
			if(userAgent.indexOf("iphone")!=-1 || userAgent.indexOf("ipod")!=-1 || userAgent.indexOf("ipad")!=-1){
				return "ios";
			}else if(userAgent.indexOf("android")!=-1){
				return "android";
			}else if(userAgent.indexOf("rim tablet")!=-1){
				return "blackberry";
			}else{
				return "";
			}
		}
	};

	return util;
});
