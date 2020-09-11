// Manage URL handling and provide navigation tools

Dashboard.service("NavigationService", function($location , UserService){
    
	var vm_NavigationService = this;
	vm_NavigationService.dashboard = null; 
	
	// Init dashboard
	vm_NavigationService.setDashboard = function(dashboard){
		vm_NavigationService.dashboard = dashboard;
        
        vm_NavigationService.getApplicationType();
	};
    
    
    // Return get var
	vm_NavigationService.getApplicationType = function(){
       
        vm_NavigationService.applicationType    = "Dashboard";
        vm_NavigationService.applicationURL     = vm_NavigationService.dashboard.config.applicationURL;
        vm_NavigationService.applicationRoutes  = vm_NavigationService.dashboard.config_routes;

        // Chat
        if(window.location.hostname == vm_NavigationService.dashboard.config.applicationHostname_Chat) {
            vm_NavigationService.applicationType    = "Chat";
            vm_NavigationService.applicationURL     = vm_NavigationService.dashboard.config.applicationURL_Chat;
            vm_NavigationService.applicationRoutes  = vm_NavigationService.dashboard.config_routes_Chat;
        }
        
        return vm_NavigationService.applicationType;
    }
    
    
    // Return get var
	vm_NavigationService.get = function(name){
        
        var URL             = $location.$$absUrl;
        var RelativeURL     = URL.replace(vm_NavigationService.applicationURL, "").split('?')[0];
		var Arguments       = URL.replace(vm_NavigationService.applicationURL, "").split('?')[1];
        
        try {
        var Argument        = JSON.parse('{"' + decodeURI(Arguments).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}')
        
        return Argument[name];
        }
        catch(error) {
            return false;
        }
    }
    
	// Return page to view
	vm_NavigationService.getPageViewConfig = function(){
        
        vm_NavigationService.getApplicationType();
        
		// Get URL     
		var URL = $location.$$absUrl;
		var RelativeURL = URL.replace(vm_NavigationService.applicationURL, "").split('?')[0];
        
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

		var route_config = vm_NavigationService.applicationRoutes[RelativeURL];

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
