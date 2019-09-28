// Application Dashboard

Dashboard.controller('DashboardController', function($scope, User , Navigation , API,  Cookies, ListManager, config, config_routes, config_api) {
        
	$scope.User = User;
	
	
	var dashboard = $scope.Dashboard;
	
	dashboard.config 		= config;
	dashboard.config_routes 	= config_routes;
	dashboard.config_api		= config_api;
	dashboard.user			= null;

	
	//Default view settings 
	dashboard.pageViewBase	= "pages";
	dashboard.pageViewHandler	= "_contenair.html";
	dashboard.pageViewFile 	= "_commons/loading.html";
	// Build page to be requested
	dashboard.pageHandler 	= '/'+dashboard.pageViewBase+'/_commons/'+dashboard.pageViewHandler;
	dashboard.pageRequested 	= '/'+dashboard.pageViewBase+'/'+dashboard.pageViewFile;
	
	// User Service
	User.setDashboard(dashboard);
	dashboard.ServiceUser	= User;
	
	
	// Navigation Service
	Navigation.setDashboard(dashboard);

	// API Service
	API.setDashboard(dashboard);
	dashboard.ServiceAPI		= API;
	
	dashboard.Init = function() {
		dashboard.UpdateInterface();
        };
	
	dashboard.UpdateInterface = function() {
		var PageViewConfig		= Navigation.getPageViewConfig();
		dashboard.pageHandler 	= '/'+dashboard.pageViewBase+'/_commons/_'+PageViewConfig.handler+'.html';
		dashboard.pageRequested 	= '/'+dashboard.pageViewBase+PageViewConfig.file;	
	}
	
	});

