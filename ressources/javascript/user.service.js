// Manage URL handling and provide navigation tools

Dashboard.service("User", function($rootScope , $location, Api){
    
	var vm_User = this;
	vm_User.dashboard 		= null; 
	
	vm_User.Login_Mail 		= "";
	vm_User.Login_Password 	= "";
	vm_User.Login_HashKey 	= "";
	vm_User.Logged		= false;
	
	
	vm_User.setDashboard = function(dashboard){
		vm_User.dashboard = dashboard;
	};
    
    
	vm_User.isLogged = function()	{console.log("test");
		vm_User.Logged =  (vm_User.Login_Password != "" && vm_User.Login_Mail != "");
	};
    
	// Logging handler
	vm_User.Logging = function()	{
		
		Api.post('USER_Login' , {LOGIN_Mail : vm_User.Login_Mail, LOGIN_Password : vm_User.Login_Password} )
			.then(function(response) { 
				console.log(response.data);
			
				if(response.data.State == 1) {
					vm_User.Login_HashKey = response.data.State.Key_Hash;
					vm_User.isLogged();
					vm_User.dashboard.Init();
				}
			});
	};
    

		    
});
