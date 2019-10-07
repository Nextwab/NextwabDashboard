
// Inputs 
Dashboard.directive("ngInput", function(){
	
	var Input = {
		restrict        : 'AE',
        transclude      : true,
        replace         : true,
        scope: {
            type        : '@',
            ngmodel     : '=',
            ngicon      : '@',
            placeholder : '@',
        },
        template        : '<div class="input"><i class="{{ngicon}}"></i><input type="{{type}}" ng-model="ngmodel" placeholder="{{placeholder}}"  /></div>',
		link            : function(scope, element, attrs){
		}
	};
	
	return Input;
    });
    
    
// Formulaires 
Dashboard.directive("form", function(){
	
	var Form = {
		restrict        : 'E',
		link            : function(scope, element, attrs){
            scope.Form              = element;
            scope.FormState         = "";
            scope.FormButtonIcon    = "";
            
            // Submit
            scope.Form.send = function() {
                scope.Form.loading();
                scope[attrs.ngHandler].Submit(scope.Form);
            };
            
            // On loading
            scope.Form.loading = function() {
                 scope.FormState = 'form_loading';
            };
            
            // Process handler
            scope.Form.process = function(reply) {
                scope.FormState = 'form_valid';
            }
            
		}
	};
	
	return Form;
    });
    
    
    
// Submits 
Dashboard.directive("buttonSubmit", function(){
	
	var Submit = {
		restrict        : 'C',
        transclude      : true,
        template        : '<p><i class="{{FormButtonIcon}}"></i> <b>Valider</b></p>',
		link            : function(scope, element, attrs){
            
            var FontAwesomeIcons = {form_loading : 'fas fa-spinner fa-spin', form_valid : 'fas fa-check' };
        
            // Submit handler
            element.on('click',  function() {
                scope.Form.send();
            });
            
            
            // When form state change - - - - - - - - - - - - - - - - - - - - - - - -
            scope.$watch('FormState', function(newVal, oldVal) {
                changeClass(newVal);
            });

            
            function changeClass(className)  {
                $(element).removeClass('form_loading form_valid form_error');
                $(element).addClass(className);
                scope.FormButtonIcon = FontAwesomeIcons[className];
            }
            // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
            
		}
	};
	
	return Submit;
    });