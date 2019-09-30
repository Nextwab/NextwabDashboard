// Manage URL handling and provide navigation tools

Dashboard.service("ListManager", function( ApiService ){
	
	var vm_ListManager      = this;
	
	
	
	vm_ListManager.init     = function( config ) {
		
		/*
			- config.endpoint = Name of config_api "Section" 
			- config.return_list = Set the array to return (TODO : Make this part more generic > Evo API Result)
		*/
		
		
		return ApiService.post( config.endpoint , (config.action ||  'List') , {})
			.then(function(response) { 
				if(response.data.State == 1) {
					return response.data[ (config.return_list ||  'Data') ];
				}
			});

	};
	

    // Return form scheme data of component object
	vm_ListManager.getValuesOf     = function( config ) {
        
        var toReturn    = {};
        
        angular.forEach(config.Settings, function(item, key) {
                toReturn[item.name] = item.value;
            });
        
        return toReturn;
    }
    
    
    
});