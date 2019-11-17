
// Inputs 
Dashboard.directive("ngInput", function($rootScope , $timeout){
	
	var Input = {
		restrict        : 'AE',
        require         : "^ngModel",
        scope: {
            type        : '@',
            ngModel     : '=',
            ngBlur      : '@?',
            ngChange    : '@?',
            ngicon      : '@',
            placeholder : '@?',
        },
        template        : '<div class="input"><i class="{{ngicon}}"></i><input type="{{type}}" ng-change="ngChange" ng-model="ngModel" placeholder="{{placeholder}}" /></div>',
		link            : function(scope, element, attrs){
            $timeout(scope.ngChange, 0); 
		}
	};
	
	return Input;
    });
    
// Inputs 
Dashboard.directive("select", function(){
	
	var Input = {
		restrict        : 'AE',
		link            : function(scope, element, attrs){      
            $(element).select2();
		}
	};
	
	return Input;
    });    
    
// Formulaires 
Dashboard.directive("form", function($sanitize, $rootScope, $timeout){
	
	var Form = {
        restrict        : 'E',
        link            : function(scope, element, attrs){
            scope.Form              = element;
            scope.FormState         = "";
            scope.FormButtonIcon    = "";
            scope.FormError         = "";
            scope.Form.ForceApply        = true;
            
            
            // Submit
            scope.Form.send = function() {
                scope.Form.loading();
                scope[attrs.ngHandler][attrs.ngHandlerAction+'Submit'](scope.Form);
            };
            
            // On loading
            scope.Form.loading = function() {
                scope.FormState     = 'form_loading';
                scope.FormError     = "";
            };
            
            // On error
            scope.Form.error = function(errorMessage ) {
                scope.FormState     = 'form_error';
                scope.FormError     = '<i class="fas fa-exclamation-circle"></i> '+errorMessage;
                
                if(scope.Form.ForceApply) {
                    $rootScope.$apply();
                }
                
                $timeout(function() { scope.Form.resetState() } , 4000);
            };
            
            // Process handler
            scope.Form.process = function(reply) {
                
                if(reply.valid) {
                    scope.FormState = 'form_valid';
                }
                else {
                    scope.Form.error(reply.errorMessage);
                }
            }
            
            
           // Reset state handler
            scope.Form.resetState = function() {
                scope.FormState     = ''; 
                scope.FormError     = '';
                
                if(scope.Form.ForceApply) {
                    $rootScope.$apply();
                }
            } 
		}
	};
	
	return Form;
    });
    
    
    
// Submits 
Dashboard.directive("buttonSubmit", function($timeout, $rootScope){
	
	let Submit = {
		restrict        : 'C',
        transclude      : true,
        template        : '<p><i class="{{FormButtonIcon}}"></i> <b>Valider</b></p>',
		link            : function(scope, element, attrs){
            
            var FontAwesomeIcons = {form_loading : 'fas fa-spinner fa-spin', form_valid : 'fas fa-check', form_error : 'fas fa-exclamation-circle' };
        
            // Submit handler
            element.on('click',  function() {
                scope.Form.send();
            });
            
            
            // When form state change - - - - - - - - - - - - - - - - - - - - - - - -
            scope.$watch('FormState', function(newVal, oldVal) {
                changeClass(newVal);
            });

            
            function changeClass(className)  {
                ResetButton();
                $(element).addClass(className);
                scope.FormButtonIcon = FontAwesomeIcons[className];
                $timeout(function() { ResetButton() } , 4000);
            }
            
            function ResetButton() {
                $(element).removeClass('form_loading form_valid form_error');
                scope.FormButtonIcon = "";
            }
            // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
            
		}
	};
	
	return Submit;
    });    
    
// Submits 
Dashboard.directive("buttonCancel", function($rootScope, $timeout , PopupService){
	
	let Cancel = {
		restrict        : 'C',
        transclude      : true,
        template        : '<p><b>Annuler</b></p>',
		link            : function(scope, element, attrs){
            
            // Submit handler
            element.on('click',  function() {
                scope.FormState     = 'form_error';
                scope.$apply();
                $timeout(function() { PopupService.close() } , 1000);
            });
            
		}
	};
	
	return Cancel;
    });
    
Dashboard.directive('checkbox', function(){
    return {
    restrict: 'C',
    require: 'ngModel',
    replace: true,
    template: '<span><i class="far {{ngModel ? \'fa-check-square\' : \'fa-square\'}}"></i> <input id="{{id}}" type="checkbox" style="display: none" ng-checked="ngModel"/></span>',
    scope: {
        id: '@',
        ngModel: '='
    },
    link: function(scope, element, attrs){
            element.removeAttr('id');
            element.bind('click', function(){
                element.toggleClass('checked');
                scope.ngModel = !scope.ngModel;
                scope.$apply();
            })
        }
    };
});