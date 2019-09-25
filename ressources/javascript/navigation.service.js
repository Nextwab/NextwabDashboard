// Manage URL handling and provide navigation tools

Dashboard.service("Navigation", function($location){
    
	this.dashboard = null; 

	this.setDashboard = function(dashboard){
		this.dashboard = dashboard;
	};
    
    
	this.getPageViewFile = function(){
	    
	    
	var URL = $location.$$absUrl;
	var RelativeURL = URL.replace(this.dashboard.config.applicationURL, "");

	if(this.dashboard.routes[RelativeURL]) {
		return this.dashboard.routes[RelativeURL];
	}

	return "/_commons/not_found.html";
	};
    

    
});
