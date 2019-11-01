// Application Dashboard

Dashboard.controller('DashboardController', function($rootScope , $scope, UserService , NavigationService , ApiService, StorageService, ExchangeService,  Cookies, ListManager, PopupService, config, config_routes, config_api) {
        
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
	dashboard.pageViewConfig    = null;
    
    
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
	PopupService.setDashboard(dashboard);
	dashboard.ServicePopup      = PopupService;
    
    // Exchange Service
	ExchangeService.setDashboard(dashboard);
	dashboard.ServiceExchange   = ExchangeService;
    
    // Storage Service
	StorageService.setDashboard(dashboard);
	dashboard.ServiceStorage   = StorageService;
	
    
	dashboard.Init              = function() {
        dashboard.UpdateInterface();
        };
	
	dashboard.UpdateInterface = function() {
		var pageViewConfig          = NavigationService.getPageViewConfig();
        dashboard.pageViewConfig    = pageViewConfig ; 
		dashboard.pageHandler       = '/'+dashboard.pageViewBase+'/_commons/_'+pageViewConfig.handler+'.html';
		dashboard.pageRequested     = '/'+dashboard.pageViewBase+pageViewConfig.file;
        }
	});

