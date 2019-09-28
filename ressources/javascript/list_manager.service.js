// Manage URL handling and provide navigation tools

Dashboard.service("ListManager", function(  API ){
	
	var vm_ListManager = this;
	
	
	
	vm_ListManager.init = function( config ) {
		
		/*
			- config.endpoint = Name of config_api "Section" 
			- config.return_list = Set the array to return (TODO : Make this part more generic > Evo API Result)
		*/
		
		
		return API.post( config.endpoint , 'List' , {})
			.then(function(response) { 
				if(response.data.State == 1) {
					return response.data[config.return_list];
				}
			});

	};
	

	
});