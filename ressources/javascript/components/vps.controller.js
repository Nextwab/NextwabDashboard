Dashboard.controller('VPS_Controller', function($scope, $timeout, NavigationService, ApiService, PopupService, ListManager) {
	
    var VPS                 = this;
    var Dashboard           = null; 

    VPS.OS_List             = [];
    VPS.Price               = null;
    VPS.Calculated_Price    = 0;
    VPS.Calculated_Days     = 31;
    VPS.FormState           = 1;
    VPS.FormError           = '';

    VPS.ID                  = false;    // VPS Edition / Focus
    VPS.Rack                = [];
    
    VPS.ListStatut          = "loading";
    VPS.Country_Mapping     = {FR : "France", CA: "Canada"};
    
    
    // VPS Creation & Edition settings
    VPS.Settings    = {
        vCores          : {title: "vCores"          , name : "vCores"       , type:"range"  , icon: "fas fa-microchip"          , range_start   : 1 , range_end : 8   , value : 1     , unit: "CPU"   },
        Ram             : {title: "RAM"             , name : "Ram"          , type:"range"  , icon: "fas fa-memory"             , range_start   : 1 , range_end : 12  , value : 1     , unit: "GB"    , display_step:2},
        Disk            : {title: "Stockage"        , name : "Disk"         , type:"range"  , icon: "fas fa-hdd"                , range_start   : 1 , range_end : 400 , value : 50    , unit: "GB"    ,range_step: 10 , display_step:50},
        Bandwidth       : {title: "Bande Passante"  , name : "Bandwidth"    , type:"range"  , icon: "fas fa-tachometer-alt"     , range_start   : 1 , range_end : 150 , value : 100   , unit: "Mbps"  ,range_step: 10 , display_step:50},
        IPv4            : {title: "Nombre d'IPv4"   , name : "IPv4"         , type:"range"  , icon: "fas fa-server"             , range_start   : 1 , range_end : 8   , value : 1     , unit: "IPv4"  },
        IPv6            : {title: "Nombre d'IPv6"   , name : "IPv6"         , value: 0      , visibility : "hidden"            },
        Type            : {title: "Architecture"    , name : "Type"         , type:"option" , icon: "fas fa-server"             , on_change     : 'setOS_List'        , value : 1     ,
            options :   [
                {value : 1 , title : "HDD - Linux"      ,icon: "fab fa-linux"},
                {value : 2 , title : "SSD - Linux"      ,icon: "fab fa-linux"},
                {value : 3 , title : "HDD - Windows"    ,icon: "fab fa-windows"},
                {value : 4 , title : "SSD - Windows"    ,icon: "fab fa-windows"},
            ]
        },
        OS              : {title: "OS"              , name : "OS"          , type:"option" , icon: "fas fa-server"             , options        : [] , value  : "Debian 9"  },
        Country         : {title: "Pays"            , name : "Country"     , type:"option" , icon: "fas fa-globe-americas"     , options        : [] , value  : "FR"  },
    };
    
    
    VPS.Calculator    = {
        Days            : {title: "Jours"           , name : "Day"          , type:"range"  , icon: "far fa-calendar-alt"      , on_change      : 'update_CalculatedPrice', range_start : 0 , range_end : 31   , value : 31     , unit: "Jours", display_step: 7},
    };
    
    VPS.init = function(Dashboard) {
            VPS.Dashboard = Dashboard;
            VPS.Dashboard.VPS_Controller = VPS;
            
            if(NavigationService.get('create')) {
                VPS.ValidateSubmit(NavigationService.get('create'));    
            }
            
        };
        
        
    VPS.load     = function(ID_VPS = false) {
        $('.List_Contenair .loader').fadeIn();
        // Load VPS list
        ListManager.init( { endpoint : "VPS"  } ).then(function(response) { 
        
            $('.List_Contenair .loader').fadeOut();
            
            VPS.ListStatut      = "loaded";
            VPS.Listing         = response;
            
            // VPS Edition
            if(ID_VPS) {
                VPS.ID  = ID_VPS;
                
                // Fill settings values
                ListManager.setValuesOf(VPS , VPS.Listing[ID_VPS] );
                
                VPS.Settings.Type.visibility    = "hidden";
                VPS.Settings.Country.visibility    = "hidden";
                VPS.Settings.OS.visibility      = "hidden";
                
            }
        });
        
        // Load OS List
        ListManager.init( { endpoint : "VPS" , action : "List_OS"  } ).then(function(response) {  VPS.OS_List = response; VPS.setOS_List(1); });
    };
    
    
    // Chargement de la liste des domaines
    VPS.getDomain_List = function() {
        ListManager.init( { endpoint : "Domain"  } ).then(function(response) { VPS.Domain_List = response;}); 
    }
    
    
    VPS.LoadRacks = function() {
        
        var Serveurs = [];
        var NB_Server = 15;
        
        for (var Serveur = 0; Serveur < NB_Server; Serveur++) {
            Serveurs[Serveur] = {State:'_loading'};
        }
        
        VPS.Rack[0] = Serveurs;
        
        // Load VPS list
        ListManager.init( { endpoint : "VPS"  } ).then(function(response) { 

            Serveur         = 0;
            ServeurTimer    = 0;
            
            angular.forEach(response, function(value, key) {
                 $timeout(function() {
                     
                        
                      VPS.Rack[0][Serveur] = value;
                      VPS.Rack[0][Serveur]['State'] = '_loaded';
                        Serveur++;
                    }, (80 * ServeurTimer) );
                ServeurTimer++;
            });
            
             for (var Serveur2 = ServeurTimer; Serveur2 < NB_Server; Serveur2++) {
                 $timeout(function() {
                      VPS.Rack[0][Serveur] = {State:'_empty'};
                        Serveur++;
                    }, (80 * ServeurTimer) );
                ServeurTimer++;
            }

        });
    }
    
    
    VPS.ServerOver = function(VPS_Data) {
        
        VPS.Dashboard.VPS_Focused                   = VPS_Data;
        VPS.Dashboard.VPS_Focused_DomainsHosted     = $('.Domains .ID_CloudDevice_'+VPS_Data.ID).length;
        VPS.Dashboard.VPS_Focused_DatabasesHosted   = $('.Databases .ID_CloudDevice_'+VPS_Data.ID).length;
        
        $('.server_'+VPS_Data.ID).addClass("server_hover");
        $('.IndexItemContenair .List_Item').addClass("Domain_Blur");
        $('.ID_CloudDevice_'+VPS_Data.ID).addClass("Domain_Scale");
    };
    
    VPS.ServerLeave = function(VPS_Data) {
        VPS.Dashboard.VPS_Focused = null;
        $('.server_'+VPS_Data.ID).removeClass("server_hover");
        $('.IndexItemContenair .List_Item').removeClass("Domain_Scale Domain_Blur");
    };
    
    
    
    VPS.ReloadList = function() {
        angular.element( $('.Frame') ).scope().VPS.load();
    };
    
    
    // Set Country List
    VPS.setCountry_List = function(countries) {
      
        VPS.Settings.Country.options = [];
        
        angular.forEach(countries, function(value, key) {
            
            let icon = '/ressources/images/Flag-Round/Flag-'+value;
        
            VPS.Settings.Country.options.push( {value : value , title : VPS.Country_Mapping[value], icon_image : icon} );
        });
    };
    
    
    // Set OS List of selected VPS Type
    VPS.setOS_List = function(Type) {
        
        VPS.Settings.Disk.range_end = (VPS.Settings.Type.value == 2 || VPS.Settings.Type.value == 4 ? 80 : 400) ;
        
        VPS.Settings.OS.options = [];
        
        angular.forEach(VPS.OS_List[Type], function(value, key) {
            
            var icon =  "fab fa-linux";
            
            if(value.indexOf("Ubuntu") !== -1) {
               icon =  "fab fa-ubuntu";
            }
            
            VPS.Settings.OS.options.push( {value : value , title : value, icon : icon} );
        });
    };
    
    
    $scope.$watch('VPS.Settings', function(newValue, oldValue, scope){
        VPS.GetPricing();
        }, true);
        
    
    VPS.GetPricing = function() {
        let settings = ListManager.getValuesOf(this);
        
        if(VPS.ID) {
                settings.Mode = "Update";
            }
        
        ApiService.post('VPS', 'Pricing' , settings).then(function(response) {
            VPS.FormError   = response.errorMessage;
            VPS.FormState   = response.valid;
            VPS.Price       = response.data.Price_Per_Month; 
            VPS.update_CalculatedPrice();
            VPS.setCountry_List(response.data.Data.Countries);
        });
    };
    
    
    
    // Submit from website
    VPS.ValidateSubmit = function(ID_VPS) {
        ApiService.post('VPS', 'Validate', {ID:ID_VPS} ).then(function(response) { 
            if(response.valid) {
                VPS.ReloadList();
            }
        });
    };
    
    // Submit
    VPS.AddSubmit = function(Form) {
        if(VPS.Price) {
            let settings = ListManager.getValuesOf(this);
            
            if(VPS.ID) {
                settings.ID_VPS = VPS.ID;
            }
            
            ApiService.post('VPS', (VPS.ID ? 'Update' : 'Add') , settings).then(function(response) { 
                Form.process(response); 
            
                if(response.valid) {
                    VPS.ReloadList();
                    $timeout(function() {
                        PopupService.close();      
                    }, 1500);
                }
            });
        }
        else {
            Form.error(VPS.FormError);
        }
    };
    
    
    
    
    // Calculate the estimated price
    VPS.update_CalculatedPrice  = function(Days = false) {
        
        if(Days) {
            VPS.Calculated_Days     = Days;
        }
        
        VPS.Calculated_Price    = Math.round( ((VPS.Price * (VPS.Calculated_Days / 31 )) + ((1+(2.4* VPS.Settings.IPv4.value )) * ( (31 - VPS.Calculated_Days) / 31 )) ) * 100) / 100    ;
    };
    
    
    VPS.Edit = function(VPS) {
        PopupService.openNew(  {Endpoint : 'VPS', Action:'Edit', Title:'Editer un VPS', ID_VPS:VPS.ID , ClassName : 'VPS_Popup'}    );
    };
    
    VPS.ManagePower = function(VPS) {
        PopupService.openNew(  {Endpoint : 'VPS', Action:'ManagePower', Title:'Gestion Alimentation', ID_VPS:VPS.ID }    );
    };
    
    
    VPS.PowerSubmit = function(Form) {
        ApiService.post('VPS', 'SetPower' , VPS).then(function(response) {
           Form.process(response);  
           VPS.ReloadList();
           $timeout(function() { PopupService.close() } , 1500);  
        });
    };
    
    // Delete - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    VPS.Delete = function(VPS) {
        PopupService.openNew(  {Endpoint : 'VPS', Action:'Delete', Title:'Supprimer un VPS', ID_VPS:VPS.ID, VPS_Hostname : VPS.Hostname }    );
    };
    

    VPS.DeleteSubmit = function(Form) {
        ApiService.post('VPS', 'Delete' , VPS).then(function(response) {
           Form.process(response);  
           VPS.ReloadList();
           $timeout(function() { PopupService.close() } , 1500);  
        });
    };
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    
    
    VPS.load();
});