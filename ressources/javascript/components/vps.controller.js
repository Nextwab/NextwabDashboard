Dashboard.controller('VPS_Controller', function($scope, ListManager) {
	
	var VPS             = this;
	var Dashboard       = null; 
    
	VPS.Settings    = {
        vCores          : {title: "vCores"          , icon: "fas fa-microchip"          , range_start : 1 , range_end : 8   , value : 1     , unit: "CPU"      },
        Ram             : {title: "RAM"             , icon: "fas fa-memory"             , range_start : 1 , range_end : 14  , value : 1     , unit: "GB"    , display_step:2},
        Disk            : {title: "Stockage"        , icon: "fas fa-hdd"                , range_start : 1 , range_end : 300 , value : 50    , unit: "GB"    ,range_step: 10 , display_step:50},
        Bandwidth       : {title: "Bande Passante"  , icon: "fas fa-tachometer-alt"     , range_start : 1 , range_end : 150 , value : 100   , unit: "Mbps"  ,range_step: 10 , display_step:50},
        IPv4            : {title: "Nombre d'IPv4"   , icon: "fas fa-server"             , range_start : 1 , range_end : 8   , value : 1     , unit: "IPv4"  ,},
    };
    
    
	ListManager.init( { endpoint : "VPS" , return_list : 'VPS_List'  } ).then(function(response) { VPS.Listing = response  });
	
	VPS.init = function(Dashboard) {
		VPS.Dashboard = Dashboard;
	};
	
	
	
});