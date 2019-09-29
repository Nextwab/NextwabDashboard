Dashboard.controller('VPS_Controller', function($scope, ListManager) {
	
	var VPS             = this;
	var Dashboard       = null; 
    
    VPS.OS_List         = null;
    
    
	VPS.Settings    = {
        vCores          : {title: "vCores"          , type:"range"  , icon: "fas fa-microchip"          , range_start : 1 , range_end : 8   , value : 1     , unit: "CPU"   },
        Ram             : {title: "RAM"             , type:"range"  , icon: "fas fa-memory"             , range_start : 1 , range_end : 14  , value : 1     , unit: "GB"    , display_step:2},
        Disk            : {title: "Stockage"        , type:"range"  , icon: "fas fa-hdd"                , range_start : 1 , range_end : 300 , value : 50    , unit: "GB"    ,range_step: 10 , display_step:50},
        Bandwidth       : {title: "Bande Passante"  , type:"range"  , icon: "fas fa-tachometer-alt"     , range_start : 1 , range_end : 150 , value : 100   , unit: "Mbps"  ,range_step: 10 , display_step:50},
        IPv4            : {title: "Nombre d'IPv4"   , type:"range"  , icon: "fas fa-server"             , range_start : 1 , range_end : 8   , value : 1     , unit: "IPv4"  },
        Type            : {title: "Architecture"    , type:"option" , icon: "fas fa-server"             , on_change : 'setOS_List' , 
            options : [
                {value : 1 , title : "HDD - Linux"      ,icon: "fab fa-linux"},
                {value : 2 , title : "SSD - Linux"      ,icon: "fab fa-linux"},
                {value : 3 , title : "HDD - Windows"    ,icon: "fab fa-windows"},
                {value : 4 , title : "SSD - Windows"    ,icon: "fab fa-windows"},
            ]
        
        },
        OS              : {title: "OS"              , type:"option" , icon: "fas fa-server"             , options     : [{value : "Debian 6" , title : "test"}]  },
        
    };
    
    // Chargement de la liste des VPS
	ListManager.init( { endpoint : "VPS"  } ).then(function(response) { VPS.Listing = response  });
    
    // Chargement de la liste des OS disponibles
    ListManager.init( { endpoint : "VPS" , action : "List_OS"  } ).then(function(response) { VPS.OS_List = response; VPS.setOS_List(1); });
    
	
	VPS.init = function(Dashboard) {
		VPS.Dashboard = Dashboard;
	};
    
    
    // Set OS List of selected VPS Type
    VPS.setOS_List = function(Type) {
        VPS.Settings.OS.options = [];
        
        angular.forEach(VPS.OS_List[Type], function(value, key) {
            
            var icon =  "fab fa-linux";
            
            if(value.indexOf("Ubuntu") !== -1) {
               icon =  "fab fa-ubuntu";
            }
            
            VPS.Settings.OS.options.push( {value : value , title : value, icon : icon} );
        });

    };
    
        
});