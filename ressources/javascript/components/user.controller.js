Dashboard.controller('User_Controller', function($scope, UserService, ApiService, PopupService) {
	
    var User                = this;
    var Dashboard           = null; 
    
    User.data               = {};
    User.Birthday_Days      = [];
    User.Birthday_Months    = [];
    User.Birthday_Years     = [];
    
    User.Login              = function(){
        UserService.Login(User);
    };
    
    User.init = function(Dashboard) {
        User.Dashboard = Dashboard;
        
        
        // Init Birthday values
        var date = new Date();
        var months_name = ["", "Janvier" , "Février", "Mars","Avril","Mai","Juin","Juillet","Aout","Septembre","Octobre","Novembre","Décembre"];

        for(day = 1; day < 30; day ++) {
            User.Birthday_Days.push({name : day, value: day});
        }

        for(month = 1; month < 12; month ++) {
            User.Birthday_Months.push({name : months_name[month], value: month});
        }
        
        for(year = date.getFullYear() - 15; year > date.getFullYear() - 100; year = year-1) {
            User.Birthday_Years.push({name : year, value: year});
        }
    };
    
    User.load = function() {
        ApiService.post('User', 'GetInfos' , {} ).then(function(response) {
            User.data   = response.data.Data; 
        });
    };
    
    
    
    // Submit Creation
    User.CreateSubmit = function(Form) {
        ApiService.post('User', 'Create' ,  User.data).then(function(response) { 
            Form.process(response); 
            
            if(response.valid) {
                PopupService.openNew(  {Endpoint : 'Account',   Action:'Login', Title:'Connexion', Styles : {width:"610px"} }    )
            }
        });
    };
    
    // Submit Update
    User.UpdateSubmit = function(Form) {
        ApiService.post('User', 'Update' ,  User.data).then(function(response) { 
            Form.process(response); 
            
            if(response.valid) {
                
            }
        });
    };
    
    
    User.Manage_Balance = function() {
        PopupService.openNew(  {Endpoint : 'Account', Action:'Balance', Title:'Gestion du solde'}    );
    };
    
});