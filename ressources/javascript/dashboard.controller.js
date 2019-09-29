// Application Dashboard

Dashboard.controller('DashboardController', function($scope, UserService , NavigationService , ApiService,  Cookies, ListManager, Popup, config, config_routes, config_api) {
        
	$scope.User                 = UserService;
	
	
	var dashboard               = $scope.Dashboard;
	
	dashboard.config            = config;
	dashboard.config_routes     = config_routes;
	dashboard.config_api        = config_api;
	dashboard.user              = null;
	dashboard.scope             = $scope;
	
	//Default view settings 
	dashboard.pageViewBase      = "pages";
	dashboard.pageViewHandler   = "_contenair.html";
	dashboard.pageViewFile      = "_commons/loading.html";
	// Build page to be requested
	dashboard.pageHandler       = '/'+dashboard.pageViewBase+'/_commons/'+dashboard.pageViewHandler;
	dashboard.pageRequested     = '/'+dashboard.pageViewBase+'/'+dashboard.pageViewFile;
	
	// User Service
	UserService.setDashboard(dashboard);
	dashboard.ServiceUser       = UserService;
	
	
	// Navigation Service
	NavigationService.setDashboard(dashboard);
	dashboard.ServiceNavigation = NavigationService;
	
	// API Service
	ApiService.setDashboard(dashboard);
	dashboard.ServiceAPI        = ApiService;
	
	
	// Popup Service
	Popup.setDashboard(dashboard);
	dashboard.ServicePopup      = Popup;
	
    
	dashboard.Init              = function() {
        dashboard.UpdateInterface();
        };
	
	dashboard.UpdateInterface = function() {
		var PageViewConfig          = NavigationService.getPageViewConfig();
		dashboard.pageHandler       = '/'+dashboard.pageViewBase+'/_commons/_'+PageViewConfig.handler+'.html';
		dashboard.pageRequested     = '/'+dashboard.pageViewBase+PageViewConfig.file;	
        }
	});

