Dashboard.controller('Domain_Controller', function($scope, $timeout , ApiService, PopupService, ListManager, StorageService) {
    
    var Domain              = this;
    var Dashboard           = null;
    
    
    Domain.VPS_List         = null;
    Domain.DNS_Config       = null;
    Domain.DNS_Config_Types = ["NS","IN A","MX 10","MX 20","MX 30","MX 40","MX 50","MX 60","MX 70","MX 80","MX 90","A","AAAA","CNAME","PTR","IN TXT","TXT","SRV"];
    Domain.DNS_Configurator = {};
    
    Domain.DomainName       = false;  // If specified domain 
    
    Domain.init             = function(Dashboard) {
        Domain.Dashboard    = Dashboard;
    };
    
    // Chargement de la liste des domaines
    Domain.load     = function() {
        ListManager.init( { endpoint : "Domain"  } ).then(function(response) { StorageService.set("DomainList", response); Domain.Listing = response  });
    };
    
    
    // Chargement de la liste des domaines
    Domain.loadCMS     = function() {
        ListManager.init( { endpoint : "Domain" , action : "GetCMS_List" , } ).then(function(response) { Domain.ListingCMS = response  });
    };
    
    
    // Submit
    Domain.AddSubmit = function(Form) {
        ApiService.post('Domain', 'Add' , Domain).then(function(response) { 
            Form.process(response); 
            
            if(response.valid) {
                $timeout(function() {
                    PopupService.close();
                    Domain.menu(Domain);  
                }, 1500);
            }
        });
    };
    
    
    
    Domain.DNS_Configurator.Add = function() {
        Domain.DNS_Config[Domain.DNS_Config.length] = {ID : 0, Action: "Add"};
    }
    
    Domain.DNS_Configurator.Edit = function(ID) {
        Domain.DNS_Config[ID].Action = (Domain.DNS_Config[ID].Action == "Add" ? "Add" : "Edit");
    }
    
    Domain.DNS_Configurator.Delete = function(ID) {
        Domain.DNS_Config[ID].Action = "Delete";
    }
    
    
    
    Domain.setConfigDNS_Submit = function() {
        
        Domain.count_EntriesToSend = 0;
        Domain.count_EntriesSended = 0;
        
        angular.forEach(Domain.DNS_Config, function(values, key) {

            values.Domain = Domain.DomainName;
            
            if(values.Action) {
                Domain.count_EntriesToSend++;
                
                ApiService.post('Domain', 'SetDNS_Config' , values ).then(function(response) {
                    Domain.count_EntriesSended++;
                    Domain.closeMenuConfigurator();
                });
            }      
        });
    }
    
    
    Domain.closeMenuConfigurator = function() {
        if(Domain.count_EntriesToSend == Domain.count_EntriesSended ) {
            PopupService.close();
        }
    }
    
    
    
    // Menu - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    Domain.menu = function(Domain) {
        PopupService.openNew(  {Endpoint : 'Domain', Action:'Menu', Title:'Gestion du domaine '+Domain.Domain, Domain:Domain.Domain, DomainID : Domain.ID}    );
    };
    
    Domain.menu_setCMS      = function(Domain) { PopupService.openNew(  {Endpoint : 'Domain', Action:'setCMS', Title:'Installer un CMS', Domain:Domain.Domain }    ); };
    Domain.menu_setServer   = function(Domain) { PopupService.openNew(  {Endpoint : 'Domain', Action:'setServer', Title:'Selectioner un serveur', Domain:Domain.Domain }    ); };
    Domain.menu_setConfig   = function(Domain) { PopupService.openNew(  {Endpoint : 'Domain', Action:'setDNS_Config', Title:'Configurer un domaine', Domain:Domain.Domain }    ); };
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    
    
    // Chargement de la liste des VPS
    Domain.getVPS_List = function() {
        ListManager.init( { endpoint : "VPS"  } ).then(function(response) { Domain.VPS_List = response;}); 
    }
    
    // Chargement de la liste des configuration DNS
    Domain.getDNS_Config_List = function(DomainName) {
        Domain.DomainName = DomainName;
        ListManager.init( { endpoint : "Domain" , action : "GetDNS_Config" , data : {Domain: DomainName}  } ).then(function(response) { Domain.DNS_Config = response;}); 
    }
    
    Domain.setServer = function(Domain, ID_CloudDevice) {
        ApiService.post('Domain', 'SetCloudServer' , {Domain: Domain, ID_CloudDevice : ID_CloudDevice} ).then(function(response) {
            $timeout(function() { PopupService.close() } , 2000);  
        });
    };
    
    
    
    
    Domain.InstallCMSSubmit =  function(Form) {
        ApiService.post('Domain', 'SetCMS' , Domain).then(function(response) { 
            Form.process(response); 
            
            if(response.valid) {
                $timeout(function() {
                    PopupService.close();
                    Domain.menu(Domain);  
                }, 1500);
            }
        });
    };
    
    
    
    // Delete - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    Domain.Delete = function(Domain) {
        PopupService.openNew(  {Endpoint : 'Domain', Action:'Delete', Title:'Supprimer un domaine', Domain:Domain.Domain}    );
    };
    

    Domain.DeleteSubmit = function(Form) {
        ApiService.post('Domain', 'Delete' , Domain).then(function(response) {
           Form.process(response);  
           angular.element( $('.Frame') ).scope().Domain.load();
           $timeout(function() { PopupService.close() } , 2000);  
        });
    };
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    
    
    
    
    
    Domain.load();
});