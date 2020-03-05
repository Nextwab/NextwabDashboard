Dashboard.controller('Domain_Controller', function($scope, $timeout , ApiService, PopupService, ListManager, StorageService) {
    
    var Domain              = this;
    var Dashboard           = null;
    
    
    Domain.VPS_List         = null;
    Domain.DNS_Config       = null;
    Domain.DNS_Config_Types = ["NS","IN A","MX 10","MX 20","MX 30","MX 40","MX 50","MX 60","MX 70","MX 80","MX 90","A","AAAA","CNAME","PTR","IN TXT","TXT","SRV"];
    Domain.DNS_Configurator = {};
    
    Domain.DomainName       = false;  // If specified domain 
    Domain.Extension_Price  = false;
    Domain.BuyProcessState  = "QueryPrice";
    
    Domain.ListStatut       = "loading";
    
    Domain.CheckStatut      = false;
    Domain.CheckMessage     = "";
    
    
    Domain.init             = function(Dashboard) {
        Domain.Dashboard    = Dashboard;
    };
    
    Domain.ControllerRegistration = function(){
        Domain.Dashboard.ControllerRegistration('Domain' , Domain);
    }
    
    // Chargement de la liste des domaines
    Domain.load     = function() {
        $('.List_Contenair .loader').fadeIn();
        
        return ListManager.init( { endpoint : "Domain"  } ).then(function(response) { 
            $('.List_Contenair .loader').fadeOut(); 
            $('.loader_domain').hide(); 
            Domain.ListStatut       = "loaded";
            
            if(response){
                StorageService.set("DomainList", response); 
                Domain.Listing = response; 
            }
            else {
                StorageService.set("DomainList", []);
                Domain.Listing = false;
            }
            
            return response;  
        });
    };
    
    
    // Chargement de la liste des domaines
    Domain.loadCMS     = function() {
        ListManager.init( { endpoint : "Domain" , action : "GetCMS_List" } ).then(function(response) { Domain.ListingCMS = response  });
    };
    
    
    
    // Submit
    Domain.CheckSubmit = function(Form) {
        Form.ForceApply = false;   
        Form.resetState();        
        $('.button_check i').removeClass('fa-search').addClass('fa-sync-alt fa-spin');
        
        ApiService.post('Domain', 'Check' , Domain).then(function(response) { 
            Form.process(response); 
            $('.button_check i').addClass('fa-search').removeClass('fa-sync-alt fa-spin');
            
            if(response.valid) {
                Domain.CheckStatut      = true;
                
                if(!response.data.Domain.Registrar) {
                    Domain.CheckMessage     = "Ce domaine semble disponible. Vous pouvez l'enregistrer pour "+response.data.Domain.Pricing+"€/an";
                    Domain.CheckCssClass    = "color-green";
                }
                else {
                    Domain.CheckMessage     = "Ce domaine semble déjà enregistré. Vous pouvez le transférer pour "+response.data.Domain.Pricing+"€/an si vous en êtes le propriétaire";
                    Domain.CheckCssClass    = "color-orange";
                }
            }
        });
    };
    
    Domain.ResetStatut = function(Form) {
        Form.ForceApply = false;
        Form.resetState();
    }
    
    
    // Submit
    Domain.AddSubmit = function(Form) {
        ApiService.post('Domain', 'Add' , Domain).then(function(response) { 
            Form.process(response); 
            
            if(response.valid) {
                $timeout(function() {
                    PopupService.close();
                    
                    if(Domain.ID_CloudDevice){
                        Domain.setServer(Domain.Domain, Domain.ID_CloudDevice).then(function(response) {$scope.DomainController.Dashboard.VPS_Controller.getDomain_List(); });
                    }
                    else {
                        Domain.menu(response.data.Domain);
                    }
                    
                    Domain.Dashboard.Controllers['Domain'].load();
                }, 1500);
            }
        });
    };
    
    Domain.CheckIfDomainLoaded = function(DomainID) {
        if(!StorageService.DomainList[DomainID]){
            Domain.load().then(function(response) {
                Domain.DomainData = StorageService.DomainList[DomainID];
            });
        }
    }
    
    Domain.Show_PricingPart = function() {
       $('.warning_request_registration').slideUp(); 
       $('.request_registration_pricing').slideDown(); 
       $('.menu_loading').slideDown(); 
       
        Domain.Extension_Action = "Pricing";
        
        ApiService.post('Domain', 'Buy' , Domain).then(function(response) { 

            Domain.Extension_Price = response.data.Price;
            
            if(Domain.DomainData.Date_Expiration != 0){
                Domain.Renewal_Date = parseInt(Domain.DomainData.Date_Expiration) + 31536000;
            }
            else{
                var date = new Date();
                var timestamp = date.getTime();
                Domain.Renewal_Date = parseInt(timestamp/1000) + 31536000;    
            }

            $('.List_Item_Loader_Contenair').slideUp(); 
            $('.List_Item_Loaded').slideDown(); 
            $('.menu_loading').slideUp();
            $('.menu_loaded').slideDown();
        });
    }
    
    Domain.Buy = function() {
        Domain.Extension_Action = "Buy";
        
        $('.List_Item_Loader_Contenair, .menu_loading').slideDown(); 
        $('.List_Item_Loaded, .menu_loaded').slideUp();
        
        ApiService.post('Domain', 'Buy' , Domain).then(function(response) { 
            
            Domain.load();
        
            $('.List_Item_Loader_Contenair, .menu_loading').slideUp(); 
            $('.List_Item_Loaded, .menu_loaded').slideDown();

            Domain.BuyProcessState  = "OrderReply";
            Domain.OrderReply_State = response.data.State;
            Domain.OrderReply_Message = response.data.Message;
            Domain.Extension_Price = response.data.Price;
        });
    }
    
    Domain.DNS_Configurator.ResetForm = function() {
        $('.Reset_DNS_Form').slideDown(); 
    }
    
    Domain.DNS_Configurator.ResetClose = function() {
        $('.Reset_DNS_Form').slideUp(); 
        $('.Reset_DNS_Form .button_submit_form i').addClass('fa-check-circle').removeClass('fa-sync-alt fa-spin');
    }
    
    Domain.DNS_Configurator.ResetSubmit = function() {
        $('.Reset_DNS_Form .button_submit_form i').removeClass('fa-check-circle').addClass('fa-sync-alt fa-spin');
        
        ApiService.post('Domain', 'Reset_Config' , {Domain : Domain.DomainName} ).then(function(response) {
            
            Domain.getDNS_Config_List(Domain.Domain);
            Domain.DNS_Configurator.ResetClose();
        });
    }
    
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
    
    
    Domain.setConfigNS_Submit = function() { 
        ApiService.post('Domain', 'SetNS_Config' , Domain.DomainData ).then(function(response) {
            PopupService.close();
        });
    }
    
    
    Domain.Request_AuthCode = function() { 
        ApiService.post('Domain', 'Request_AuthCode' , Domain ).then(function(response) {
            var DomainID        = Domain.getID_by_Name(Domain.Domain);
            StorageService.DomainList[DomainID].AuthCode_Requested = 1;
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
    
    Domain.menu_setCMS       = function(Domain) { PopupService.openNew(  {Endpoint : 'Domain', Action:'setCMS', Title:'Installer un CMS', Domain:Domain.Domain }    ); };
    Domain.menu_setServer    = function(Domain) { PopupService.openNew(  {Endpoint : 'Domain', Action:'setServer', Title:'Selectioner un serveur', Domain:Domain.Domain, Styles : {width:"960px"} }    ); };
    Domain.menu_setConfig    = function(Domain) { PopupService.openNew(  {Endpoint : 'Domain', Action:'setDNS_Config', Title:'Configurer un domaine', Domain:Domain.Domain }    ); };
    Domain.menu_getSSL_State = function(Domain) { PopupService.openNew(  {Endpoint : 'Domain', Action:'getSSL_State', Title:'Gestion de la certification SSL', Domain_ID:Domain.ID }    ); };
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    
    
    Domain.getID_by_Name    = function(DomainName) {
        var to_return = false;
        
        angular.forEach(StorageService.DomainList, function(Config, ID) {
            if(Config.Domain == DomainName) {
                to_return = Config.ID;
            }
        });
        
        return to_return;
    };
    
    
    Domain.Popup_Set_NS     = function(Domain) { console.log(Domain); PopupService.openNew(  {Endpoint : 'Domain', Action:'setNS_Config', Title:'Configurer les NameServers', Domain:Domain.Domain }    ); };
    
    Domain.loadConfig = function(DomainName) {        
        var DomainID        = Domain.getID_by_Name(DomainName);
        Domain.DomainData   = StorageService.DomainList[DomainID]
    }
    
    
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
        $('.set-server-selection').addClass('bg-grey');
        
        return ApiService.post('Domain', 'SetCloudServer' , {Domain: Domain, ID_CloudDevice : ID_CloudDevice} ).then(function(response) {
            $timeout(function() { PopupService.close(); PopupService.openNew(  {Endpoint : 'Domain', Action:'setServer_Confirmation', Title:'Demande effectuée'}    ); } , 2000);
            return response;
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
    
    

});