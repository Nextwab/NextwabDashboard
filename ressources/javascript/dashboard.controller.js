// Application Dashboard

Dashboard.controller('DashboardController', function($scope, User , Navigation , Api,  config, config_routes, config_api) {
        
	$scope.User = User;
	
	var dashboard = this;
	
	dashboard.config 		= config;
	dashboard.config_routes 	= config_routes;
	dashboard.config_api		= config_api;
	dashboard.user		= null;
	
	//Default view settings 
	dashboard.pageViewBase	= "pages";
	dashboard.pageViewHandler	= "_contenair.html";
	dashboard.pageViewFile 	= "_commons/loading.html";
	
	// Build page to be requested
	dashboard.pageHandler 	= '/'+dashboard.pageViewBase+'/_commons/'+dashboard.pageViewHandler;
	dashboard.pageRequested 	= '/'+dashboard.pageViewBase+'/'+dashboard.pageViewFile;
	

	dashboard.Init = function() {
		
		// User Service
		User.setDashboard(dashboard);
		
		// Navigation Service
		Navigation.setDashboard(dashboard);
		var PageViewConfig = Navigation.getPageViewConfig();
		
		dashboard.pageHandler 	= '/'+dashboard.pageViewBase+'/_commons/_'+PageViewConfig.handler+'.html';
		dashboard.pageRequested 	= '/'+dashboard.pageViewBase+PageViewConfig.file;
		
        };
	
	
	
      });

