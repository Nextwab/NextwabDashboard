Dashboard.service("UserService", function($rootScope , $location, ApiService, Cookies, PopupService ){
    
    var vm_User                     = this;
    vm_User.dashboard               = null; 
    
    vm_User.Login_Mail              = "";
    vm_User.Login_Password          = "";
    vm_User.Login_HashKey           = "";
    vm_User.Logged                  = false;
    
    
    vm_User.setDashboard            = function(dashboard)   {
        vm_User.dashboard           = dashboard;
        vm_User.isLogged();
    };
    
    
    vm_User.isLogged                = function()            {
        var Cookie_Login_Mail       = Cookies.get('Login_Mail' );
        var Cookie_Login_HashKey    = Cookies.get('Login_HashKey' );

        vm_User.Login_Mail          = Cookie_Login_Mail;
        vm_User.Login_HashKey       = Cookie_Login_HashKey;
        
        vm_User.Logged              = (typeof Cookie_Login_Mail !== "undefined" && typeof Cookie_Login_HashKey !== "undefined" && Cookie_Login_Mail != "" && Cookie_Login_HashKey != "");
    };
    
    
    vm_User.LoginForm               = function()        {
        PopupService.openNew(  {Endpoint : 'Account',   Action:'Login', Title:'Connexion', Styles : {width:"610px"} }    )
    }
    
    
    // Logging handler
    vm_User.Login                   = function(User)            {
        
        ApiService.post('User' , 'Login' , {LOGIN_Mail : User.Login_Mail, LOGIN_Password : User.Login_Password} )
        .then(function(Exchange) { 
            
            if(Exchange.valid) {
                Cookies.set('Login_Mail' , User.Login_Mail);
                Cookies.set('Login_HashKey' , Exchange.data.Key_Hash);
                
                vm_User.Login_HashKey = Exchange.data.Key_Hash;
                vm_User.isLogged();
                
                if(vm_User.Logged) {
                    vm_User.dashboard.UpdateInterface();
                    PopupService.close();
                }
                
            }
            else {
                User.ErrorMessage = Exchange.errorMessage;
  
            }
        });
    };

    
     // Logging handler
    vm_User.Logout                   = function()            {
        Cookies.set('Login_Mail'        , '');
        Cookies.set('Login_HashKey'     , '');
        vm_User.isLogged();
        vm_User.dashboard.UpdateInterface();
    };
    
    
   
    
});
