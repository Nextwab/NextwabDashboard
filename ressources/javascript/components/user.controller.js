Dashboard.controller('User_Controller', function($scope, UserService) {
	
    var User                = this;
    var Dashboard           = null; 
    
    
    User.Login              = function(){
        UserService.Login(User);
    };
    
    
});