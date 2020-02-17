Dashboard.controller('User_Controller', function($scope, UserService, ApiService, PopupService, NavigationService) {
	
    var User                = this;
    var Dashboard           = null; 
    
    User.data               = {};
    User.Birthday_Days      = [];
    User.Birthday_Months    = [];
    User.Birthday_Years     = [];
    
    User.GCU_Approval       = false;
    User.CGU_Data_Approval  = false;
    User.Form_Mode          = "Create";
    
    User.Login              = function(){
        UserService.Login(User);
    };
    
    User.Popup_Login              = function(){
        UserService.LoginForm();
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
        
        User.data.Affiliation_ID    = User.Dashboard.config.userID;
        User.data.User_Type         = "Classic";
    };
    
    User.load = function() {
        ApiService.post('User', 'GetInfos' , {} ).then(function(response) {
            
            if(response.data.State != 1) {
                User.Dashboard.ServiceUser.Logout();
                return false;
            }
            
            User.data                   = response.data.Data; 
            User.data.Affiliation_ID    = User.Dashboard.config.userID;
        });
    };
    
    
    User.Popup_RecoverPassword = function(mail = '', key = '') {
        PopupService.openNew(  {Endpoint : 'Account',   Action:'RecoverPassword', Title:'Ré-initialiser le mot de passe', Styles : {width:"510px", top: "15vh"} });
    };
    
    
    User.Check_PopupAccountRecover = function() {
        if(NavigationService.get('mail') && NavigationService.get('key') ) {
            User.ResetPassword(NavigationService.get('mail'), NavigationService.get('key'));
        }
    }
    
    User.RecoverPassword       = function(){
        
        User._recover_password_process = true;
        User._recover_password_process_text = '<i class="fas fa-spinner fa-spin"></i> Chargement en cours...';
        
        ApiService.post('User', 'Recover_Password_Link', {Mail:User.Mail}).then(function (response) {
            if(response.valid) {
                User._recover_password_process_text = '<i class="fas fa-check-circle color-green"></i> Votre demande a été prise en compte. Si une adresse e-mail correspond à un compte, un mail sera envoyé à l\'adresse indiquée.';
            }
            
        });
    };
    
    User.ResetPassword       = function(mail, key){
        
        $('.Form_RecoverPassword').slideUp();
        
        User._reset_password_process = true;
        User._reset_password_process_text = '<i class="fas fa-spinner fa-spin"></i> Chargement en cours...';
        
        ApiService.post('User', 'Reset_Password', {Mail : mail, Key: key}).then(function (response) {
            
            User._recover_password_reply = response.valid;
            
            if(response.valid) {
                User._reset_password_process_text = '<i class="fas fa-check-circle color-green"></i> Votre nouveau mot de passe est : <b>'+response.data.Data.Password+'</b>. Rendez-vous dans l\'édition de votre compte pour le modifier.';
            }
            else {
                User._reset_password_process_text = '<i class="fas fa-exclamation-triangle color-red"></i> Clé d\'authentification incorrecte.';
            }
            
        });
    };
    
    
    
    // Submit Creation
    User.CreateSubmit = function(Form) {
        
        if(User.GCU_Approval == false || User.GCU_Data_Approval == false) {
            Form.error("Veuillez approuver les conditions d'utilisation");
            return false;
        }
        
        ApiService.post('User', 'Create' ,  User.data).then(function(response) { 
            Form.process(response); 
            
            if(response.valid) {
                window.location = User.Dashboard.config.applicationURL;
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