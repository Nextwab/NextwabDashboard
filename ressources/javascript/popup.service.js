// Manage URL handling and provide navigation tools

Dashboard.service("Popup", function($compile , $location){
    
	var vm_Popup = this;
	vm_Popup.dashboard = null; 
	vm_Popup.Instances = [];
	
	// Init dashboard
	vm_Popup.setDashboard = function(dashboard){
		vm_Popup.dashboard = dashboard;
	};
    
	// Return page to view
	vm_Popup.openNew = function( Config ){
		angular.element(document.body).append($compile('<popup config=\''+JSON.stringify(Config)+'\'></popup>')(vm_Popup.dashboard.scope));
	};
    
		
});

Dashboard.directive("popup", function(NavigationService){
	
	var PopupConfig = {
		restrict        : 'EA',
		replace         : false,
		transclude      : true,
		require         : '^?',
		scope           : {},
		controllerAs    : "Popup",
		controller      : PopupController,
		templateUrl     : '/pages/_commons/_popup.html',
		link            : function(scope, element, attrs){
		}
	};
	
	return PopupConfig;
    });

    
    
// Popup Controller injected in directive 
var PopupController = function($scope, $element, $window, $document, NavigationService){
			
	var vm_Popup                            = this;
	
    vm_Popup.POPUP_Endpoint_URL             = "_not_found";
    vm_Popup.POPUP_Title                    = "";
    vm_Popup.Drag                           = false;
    
	if(typeof $element[0].attributes.config.nodeValue !== "undefined")
		{
		var config                          = JSON.parse($element[0].attributes.config.nodeValue);
		
        vm_Popup.POPUP_Endpoint_URL         = NavigationService.getEndpointURL(config.Endpoint, config.Action );
        vm_Popup.POPUP_Title                = config.Title;
        
		}
    
    
	vm_Popup.POPUP_PageToInclude            =  '/pages'+NavigationService.getViewConfig(vm_Popup.POPUP_Endpoint_URL).file;
    
    
    vm_Popup.Close  = function(Popup) {
        $($element).fadeOut().remove(); 
    }
    
    
    // Drag popup - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
    $element.find('.Popup_Header').bind("mousedown", function(e) {
        vm_Popup.Drag                       = {origin_x : e.pageX , origin_y : e.pageY, X:  angular.element($element).prop('offsetLeft'), Y:  angular.element($element).prop('offsetTop') };
        return false;
    });
    
    $element.find('.Popup_Header').bind("mouseup", function(e) {
        vm_Popup.Drag                       = false;
        return false;
    });

    $document.mousemove(function(e) {

        if(vm_Popup.Drag){
            var left = (vm_Popup.Drag.X - (vm_Popup.Drag.origin_x - e.pageX) );
            var top = (vm_Popup.Drag.Y - (vm_Popup.Drag.origin_y - e.pageY) );
           
            $($element).css('left' , left +'px');
            $($element).css('top' , top +'px');
            $($element).css('right' , 'auto');
        }

    });
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
    
};



