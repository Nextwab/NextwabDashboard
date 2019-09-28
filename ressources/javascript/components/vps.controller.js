Dashboard.controller('VPS_Controller', function($scope, ListManager) {
	
	var VPS = this;
	var Dashboard = null; 
	
	ListManager.init( { endpoint : "VPS" , return_list : 'VPS_List'  } ).then(function(response) { VPS.Listing = response  });
	
	VPS.init = function(Dashboard) {
		VPS.Dashboard = Dashboard;
	};
	
	
	
});