Dashboard.controller('User_Controller', function($scope, UserService, ApiService) {
	
    var User                = this;
    var Dashboard           = null; 
    
    User.data               = {};
    
    User.Login              = function(){
        UserService.Login(User);
    };
    
    User.init = function(Dashboard) {
        User.Dashboard = Dashboard;
    };
    
    User.load = function() {
        ApiService.post('User', 'GetInfos' , {} ).then(function(response) {
            User.data   = response.data.Data; 
        });
    };
    
    
});