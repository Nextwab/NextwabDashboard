// Manage URL handling and provide navigation tools

Dashboard.service("User", function($rootScope , $location, API, Cookies ){
    
	var vm_User = this;
	vm_User.dashboard 		= null; 
	
	vm_User.Login_Mail 		= "";
	vm_User.Login_Password 	= "";
	vm_User.Login_HashKey 	= "";
	vm_User.Logged		= false;
	
	
	vm_User.setDashboard = function(dashboard){
		vm_User.dashboard = dashboard;
		vm_User.isLogged();
	};
    
    
	vm_User.isLogged = function()	{
		var Cookie_Login_Mail = Cookies.get('Login_Mail' );
		var Cookie_Login_HashKey = Cookies.get('Login_HashKey' );

		vm_User.Login_Mail 		= Cookie_Login_Mail;
		vm_User.Login_HashKey 	= Cookie_Login_HashKey;
		
		vm_User.Logged =  (typeof Cookie_Login_Mail !== "undefined" && typeof Cookie_Login_HashKey !== "undefined" && Cookie_Login_Mail != "" && Cookie_Login_HashKey != "");
	};
    
	// Logging handler
	vm_User.Logging = function()	{
		
		API.post('User' , 'Login' , {LOGIN_Mail : vm_User.Login_Mail, LOGIN_Password : vm_User.Login_Password} )
			.then(function(response) { 
			
				if(response.data.State == 1) {
					
					Cookies.set('Login_Mail' , vm_User.Login_Mail);
					Cookies.set('Login_HashKey' , response.data.Key_Hash);
					
					vm_User.Login_HashKey = response.data.Key_Hash;
					vm_User.isLogged();
					vm_User.dashboard.UpdateInterface();
				}
			});
	};
    

		    
});
