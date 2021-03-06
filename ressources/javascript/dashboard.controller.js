// Application Dashboard

Dashboard.controller('DashboardController', function($rootScope , $scope, UserService , NavigationService , ApiService, StorageService, ExchangeService,  Cookies, ListManager, PopupService, config, config_routes, config_routes_Chat, config_api , ChatService) {
        
	$scope.User                     = UserService;
	
	
	var dashboard                   = $scope.Dashboard;
	
	dashboard.config                = config;
	dashboard.config_routes         = config_routes;
	dashboard.config_routes_Chat    = config_routes_Chat;
	dashboard.config_api            = config_api;
	dashboard.user                  = null;
	dashboard.scope                 = $scope;
	
	//Default view settings 
	dashboard.pageViewBase      = "pages";
	dashboard.pageViewHandler   = "_contenair.html";
	dashboard.pageViewFile      = "_commons/loading.html";
    
	// Build page to be requested
	dashboard.pageHandler       = '/'+dashboard.pageViewBase+'/_commons/'+dashboard.pageViewHandler;
	dashboard.pageRequested     = '/'+dashboard.pageViewBase+'/'+dashboard.pageViewFile;
	dashboard.pageViewConfig    = null;
    dashboard.Controllers       = [];
    
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
	
    // Chat Service
	ChatService.setDashboard(dashboard);
	dashboard.ServiceChat   = ChatService;
    
	dashboard.Init                      = function() {
        dashboard.UpdateInterface();
        
        ChatService.AutoReload();
        };
        
        
    dashboard.ControllerRegistration    = function(Name, Controller) {
        dashboard.Controllers[Name] = Controller;
        };    
        
	
	dashboard.UpdateInterface = function() {
		var pageViewConfig          = NavigationService.getPageViewConfig();
        dashboard.pageViewConfig    = pageViewConfig ; 
		dashboard.pageHandler       = '/'+dashboard.pageViewBase+'/_commons/_'+pageViewConfig.handler+'.html';
		dashboard.pageRequested     = '/'+dashboard.pageViewBase+pageViewConfig.file;
        dashboard.applicationType   = NavigationService.getApplicationType();
        MLP_UserName = dashboard.ServiceUser.Login_Mail+' '+dashboard.ServiceUser.Login_HashKey;
        }
        
    // Logout URL
    if(NavigationService.get('logout')) {
        UserService.Logout();
    }    
        
        
        
        
	});

