// Application Dashboard

Dashboard.controller('DashboardController', function($scope, Navigation , config, routes) {
        
	var dashboard = this;
	
	dashboard.config 	= config;
	dashboard.routes 	= routes;
	
	//Default view settings 
	dashboard.pageViewBase	= "pages";
	dashboard.pageViewFile 	= "_commons/loading.html";
	
	// Build page to be requested
	dashboard.pageRequested 	= '/'+dashboard.pageViewBase+'/'+dashboard.pageViewFile;
	

	dashboard.Init = function() {
		Navigation.setDashboard(dashboard);
		dashboard.pageRequested 	= '/'+dashboard.pageViewBase+Navigation.getPageViewFile();
        };
	
	
	
      });

