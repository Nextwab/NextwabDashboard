// Manage URL handling and provide navigation tools

Dashboard.service("Navigation", function($location , User){
    
	var vm_Navigation = this;
	vm_Navigation.dashboard = null; 
	
	// Init dashboard
	vm_Navigation.setDashboard = function(dashboard){
		vm_Navigation.dashboard = dashboard;
	};
    
	// Return page to view
	vm_Navigation.getPageViewConfig = function(){
	    
		// Get URL     
		var URL = $location.$$absUrl;
		var RelativeURL = URL.replace(vm_Navigation.dashboard.config.applicationURL, "");

		var PageViewConfig = vm_Navigation.ParseViewConfig(RelativeURL);
		
		// If user is not loggued
		if(!User.Logged && PageViewConfig && PageViewConfig.login) {
			return vm_Navigation.dashboard.config_routes['/account/login/'];
		}
		
		// If route exists in values
		if(PageViewConfig) {
			return PageViewConfig;
		}

		return vm_Navigation.ParseViewConfig("_not_found");
	};
    
    
    vm_Navigation.ParseViewConfig   = function(RelativeURL) {
        
        var route_config = vm_Navigation.dashboard.config_routes[RelativeURL];
        
        if(typeof route_config === "undefined") {
            return false;
        }
           
        return route_config;
        
        
    }
    
    
    
		
});
