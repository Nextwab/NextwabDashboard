// Manage URL handling and provide navigation tools

Dashboard.service("Api", function($q , $http, config_api){
    
	this.dashboard 		= null; 
	
	this.setDashboard = function(dashboard){
		this.dashboard = dashboard;
	};
    
    
	// Make POST Request 
	this.post = function(endpoint , data)	{
		var deferred = $q.defer();
		
		var form_data = new FormData();

		for ( var key in data ) {
		    form_data.append(key, data[key]);
		}
		
		$http({
			method: 'POST',
			url: config_api.api_server + config_api.endpoints[endpoint]   ,
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
