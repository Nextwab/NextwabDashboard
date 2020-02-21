Dashboard.controller('Mail_Controller', function($scope, $timeout, ApiService, PopupService, ListManager) {
	
    var Mail                 = this;
    var Dashboard               = null; 

    
    Mail.ListStatut          = "loading";
    Mail.DomainName          = false;
    Mail.DomainCounters      = [];
    
    
    Mail.init = function(Dashboard) {
        Mail.Dashboard = Dashboard;
        Mail.Dashboard.Mail_Controller = Mail;
    };
        
        
    Mail.load     = function() {
        $('.List_Contenair .loader').fadeIn();
        
        Mail.DomainCounters      = [];
        
        // Load Mailbox list
        ListManager.init( { endpoint : "Mailbox"  } ).then(function(response) { 
        
            $('.List_Contenair .loader').fadeOut();
            
            Mail.ListStatut              = "loaded";
            Mail.Listing_Mail         = response;
            
            angular.forEach(response, function(values, key) {
                
                if(!Mail.DomainCounters[values.Domain]) {
                    Mail.DomainCounters[values.Domain] = 1;
                }
                
                Mail.DomainCounters[values.Domain]++;
            });
            
        });
        
        ListManager.init( { endpoint : "Mailbox" , action : "List_Alias" } ).then(function(response) { 
        
            $('.List_Contenair .loader').fadeOut();
            
            Mail.ListStatut              = "loaded";
            Mail.Listing_Alias         = response;
            
            angular.forEach(response, function(values, key) {
                
                if(!Mail.DomainCounters[values.Domain]) {
                    Mail.DomainCounters[values.Domain] = 1;
                }
                
                Mail.DomainCounters[values.Domain]++;
            });
        });
        
        
        ListManager.init( { endpoint : "Domain"  } ).then(function(response) { 
            if(response){
                Mail.Listing_Domains = response; 
            }
        });
 
    };
    
    
    // Chargement de la liste des domaines
    Mail.getDomain_List = function() {
        ListManager.init( { endpoint : "Domain"  } ).then(function(response) { Mail.Domain_List = response;}); 
    }
    
    
    Mail.ViewDomain = function(Domain) {
        Mail.DomainName = (Mail.DomainName == Domain.Domain ? false : Domain.Domain);
    }
    
    
    
    Mail.AddSubmit = function(Form) {
        Mail.Login = Mail.Username+'@'+Mail.Domain;
        
        ApiService.post('Mailbox', 'Add' , Mail).then(function(response) { 
            Form.process(response); 
        
            if(response.valid) {
                angular.element( $('.Frame') ).scope().Mail.load();
                $timeout(function() {
                    PopupService.close();      
                }, 1500);
            }
        });
    };
    
    
    
    
    Mail.AddAlias_Submit = function(Form) {
        
        Mail.Address_From = Mail.Address_From_Username+'@'+Mail.Domain;
        
        ApiService.post('Mailbox', 'Add_Alias' , Mail).then(function(response) { 
            Form.process(response); 
        
            if(response.valid) {
                angular.element( $('.Frame') ).scope().Mail.load();
                $timeout(function() {
                    PopupService.close();      
                }, 1500);
            }
        });
    };
    
    
    
    // Update Password - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
    Mail.UpdatePassword = function(Mail) {
        PopupService.openNew(  {Endpoint : 'Mail', Action:'UpdatePassword', Title:'Définir un nouveau mot de passe pour '+Mail.Login, Mail_Login:Mail.Login}    );
    };

    Mail.UpdatePasswordSubmit = function(Form) {
        ApiService.post('Mailbox', 'UpdatePassword' , Mail).then(function(response) {
           Form.process(response);  
           angular.element( $('.Frame') ).scope().Mail.load();
           $timeout(function() { PopupService.close() } , 2000);  
        });
    };
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    
    
    
    // Delete Alias - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    Mail.Delete_Alias = function(Alias) {
        PopupService.openNew(  {Endpoint : 'Mail', Action:'Delete_Alias', Title:'Supprimer un alias', Alias_ID:Alias.ID, From: Alias.Address_From, To: Alias.Address_To }    );
    };
    
    Mail.DeleteAlias_Submit = function(Form) {
        ApiService.post('Mailbox', 'Delete_Alias' , Mail).then(function(response) {
           Form.process(response);  
           angular.element( $('.Frame') ).scope().Mail.load();
           $timeout(function() { PopupService.close() } , 2000);  
        });
    };
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    
    
    
    
    // Delete Mail - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    Mail.Delete = function(Mail) {
        PopupService.openNew(  {Endpoint : 'Mail', Action:'Delete', Title:'Supprimer une boite mail', Mail:Mail.Login}    );
    };
    
    Mail.DeleteSubmit = function(Form) {
        ApiService.post('Mailbox', 'Delete' , Mail).then(function(response) {
           Form.process(response);  
           angular.element( $('.Frame') ).scope().Mail.load();
           $timeout(function() { PopupService.close() } , 2000);  
        });
    };
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    
    
    

    Mail.load();
});