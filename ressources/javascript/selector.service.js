// Manage URL handling and provide navigation tools


Dashboard.directive("selector", function(NavigationService){
	
	var SelectorConfig = {
		restrict        : 'EA',
		replace         : false,
		transclude      : true,
		require         : '^?',
		scope           : { 'driver': '&' },
		controllerAs    : "SelectorController",
		controller      : SelectorController,
		templateUrl     : '/pages/_commons/_selector.html',
		link            : function(scope, element, attrs){
		}
	};
	
	return SelectorConfig;
    });

    
    
// Selector Controller injected in directive 
var SelectorController = function($scope, $element){
			  
	var vm_Selector               = this;
    
    
    vm_Selector.range_start             = $scope.driver().range_start             || 0  ;
    vm_Selector.range_end               = $scope.driver().range_end               || 10 ;
    vm_Selector.range_step              = $scope.driver().range_step              || 1 ;
    vm_Selector.display_step            = $scope.driver().display_step            || 1 ;
    vm_Selector.icon                    = $scope.driver().icon                    || false ;
    vm_Selector.show_value              = $scope.driver().show_value              || true ;
    vm_Selector.display_only_selected   = $scope.driver().display_only_selected   || false ;
    vm_Selector.unit                    = $scope.driver().unit                    || "" ;
    vm_Selector.value                   = $scope.driver().value                   || null;
    
    vm_Selector.drag                    = false;
    vm_Selector.value_over              = null;
    vm_Selector.show_max_values         = 15;
  
    vm_Selector.Selectors               = [];
    
    _default_config                     = {
        enabled         : false,
        enabled_tmp     : false,
        display_value   : false
    }
    
    
    
    var last_step_displayed = 0;
    
    for (var i=vm_Selector.range_start ; i <= (vm_Selector.range_end / vm_Selector.range_step) ; i++) {
        var config              = angular.copy(_default_config);
        
        config.value            = i*vm_Selector.range_step;
        
        if( (last_step_displayed + vm_Selector.display_step) == config.value ) 
            {
            config.display_value    = true;    
            last_step_displayed     = config.value;
            }
        
        vm_Selector.Selectors.push(config);
    }
    
    
    vm_Selector.select = function(selector){
        vm_Selector.value        = selector.value;
        $scope.driver().value    = selector.value;
    }
    
    vm_Selector.over = function(selector){
        vm_Selector.value_over = selector.value;

        if(vm_Selector.drag) {
            vm_Selector.select(selector);
        }
    }
    
    vm_Selector.leave = function(selector){
        vm_Selector.value_over = null;
    }
    

    $element.bind("mousedown", function(e) {
      vm_Selector.drag = true;
      return false;
    });
    
    $element.bind("mouseup mouseleave", function(e) {
      vm_Selector.drag = false;
      return false;
    });
    
    
};