// Manage URL handling and provide navigation tools

Dashboard.service("API", function($rootScope, $q , $http, config_api){
	
	var vm_API = this
	vm_API.dashboard 		= null; 
	
	vm_API.setDashboard = function(dashboard){
		vm_API.dashboard = dashboard;
	};
    
    
	// Make POST Request 
	vm_API.post = function(Endpoint, Action , data)	{
		var deferred = $q.defer();
		
		var form_data = new FormData();

		for ( var key in data ) {
		    form_data.append(key, data[key]);
		}
		
		var vm_User = vm_API.dashboard.ServiceUser;
		
		if(vm_User.Logged) {
			form_data.append('LOGIN_Mail' , vm_User.Login_Mail );
			form_data.append('LOGIN_Key_Hash' , vm_User.Login_HashKey);
		}
		

		$http({
			method: 'POST',
			url: config_api.api_server + config_api.endpoints[Endpoint][Action]  ,
			headers: {'Content-Type': undefined},
			data : form_data
		}
		).then(function(response) {
			deferred.resolve(response);
		},
		function(err){
			deferred.reject(err);
		});
		
		return deferred.promise;
	};
    
});
