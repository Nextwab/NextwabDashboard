// Manage URL handling and provide navigation tools

Dashboard.service("NavigationService", function($location , UserService){
    
	var vm_NavigationService = this;
	vm_NavigationService.dashboard = null; 
	
	// Init dashboard
	vm_NavigationService.setDashboard = function(dashboard){
		vm_NavigationService.dashboard = dashboard;
	};
    
	// Return page to view
	vm_NavigationService.getPageViewConfig = function(){
	    
		// Get URL     
		var URL = $location.$$absUrl;
		var RelativeURL = URL.replace(vm_NavigationService.dashboard.config.applicationURL, "");

		var PageViewConfig = vm_NavigationService.getViewConfig(RelativeURL);
		
		// If user is not loggued
		if(!UserService.Logged && PageViewConfig && PageViewConfig.login && PageViewConfig.specific != "LoginAction") {
            UserService.LoginForm();
		}
		
		// If route exists in values
		if(PageViewConfig) {
			return PageViewConfig;
		}

		return vm_NavigationService.getViewConfig("_not_found");
	};
    
    
	vm_NavigationService.getViewConfig   = function(RelativeURL) {

		var route_config = vm_NavigationService.dashboard.config_routes[RelativeURL];

		if(typeof route_config === "undefined") {
			return false;
			}

		return route_config;
		}
    
	vm_NavigationService.getEndpointURL   = function(Endpoint , Action) {

		var endpointURL = vm_NavigationService.dashboard.config_routes.Endpoints[Endpoint][Action];

		if(typeof endpointURL === "undefined") {
			return false;
			}

		return endpointURL;
	}
});
