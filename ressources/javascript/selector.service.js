// Manage URL handling and provide navigation tools


Dashboard.directive("selector", function(NavigationService){
	
	var SelectorConfig = {
		restrict        : 'E',
		replace         : false,
		require         : '^?',
		controllerAs    : "SelectorController",
		controller      : SelectorController,
		templateUrl     : '/pages/_commons/_selector.html',
		link            : function(scope, element, attrs){  }
	};
	
	return SelectorConfig;
    });

    
    
// Selector Controller injected in directive 
var SelectorController = function( $scope, $element){
 
    var vm_Selector = this;
    var Selector_Settings = $scope.Selector_Settings;
    
    
    vm_Selector.icon                    = Selector_Settings.icon                    || false ;
    vm_Selector.show_value              = Selector_Settings.show_value              || true ;
    vm_Selector.type                    = Selector_Settings.type                    || "range" ;
    vm_Selector.unit                    = Selector_Settings.unit                    || "" ;
    vm_Selector.value                   = Selector_Settings.value                   || null;
    vm_Selector.value_displayed         = Selector_Settings.value ;
    vm_Selector.Selectors               = {};
    vm_Selector.on_change               = Selector_Settings.on_change               || false;
    
    // Range Selector
    if(Selector_Settings.type == "range") {
        vm_Selector.display_only_selected   = Selector_Settings.display_only_selected   || false ;
        vm_Selector.range_start             = Selector_Settings.range_start             || 0  ;
        vm_Selector.range_end               = Selector_Settings.range_end               || 10 ;
        vm_Selector.range_step              = Selector_Settings.range_step              || 1 ;
        vm_Selector.display_step            = Selector_Settings.display_step            || 1 ;
        vm_Selector.drag                    = false;
        vm_Selector.value_over              = null;
        vm_Selector.show_max_values         = 15;
      
        
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
            
            vm_Selector.Selectors[config.value] = config;
        }
        
        
        vm_Selector.select = function(selector){
            vm_Selector.value                     = selector.value;
            Selector_Settings.value               = selector.value;
            Selector_Settings.value_displayed     = selector.value;
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
        }
    
    
    // Option Selector
    if(Selector_Settings.type == "option") {
        
        vm_Selector.options     = Selector_Settings.options    ;
        
        // Generate new selector list
        vm_Selector.generateOptions = function() {
            vm_Selector.Selectors = {};     // Flush old list
            
            angular.forEach(vm_Selector.options, function(value, key) {
                vm_Selector.Selectors[value.value] = value;
            });
            
        };
        
        vm_Selector.generateOptions();
        
        
        
        
        // Handling click action
        vm_Selector.select = function(selector){
            vm_Selector.value                   = selector.value;
            Selector_Settings.value               = selector.value;
            Selector_Settings.value_displayed     = vm_Selector.Selectors[selector.value].title;
            
            // If onchange handler is defined, we must have a rootdriver defined in attributs
            if(vm_Selector.on_change) {
                
                
                var rootDriver      = getElementAttribute($element , 'rootdriver');     // Fetch rootDriver name in attribut of component
                var rootController  = $scope.$parent[rootDriver];                       // Get controller of root manager scope
                   
                // Call handler callback function
                rootController[vm_Selector.on_change](selector.value);
            }
        }
        
        // if options are changed, we must generate selectors
        $scope.$watch('Selector_Settings.options', function(newValue, oldValue, scope){
            vm_Selector.options = newValue;
            vm_Selector.generateOptions();
        }, true);
        

        
        
        
    }
    
};