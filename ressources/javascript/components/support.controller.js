Dashboard.controller('Support_Controller', function($scope, $timeout, ApiService, PopupService, ListManager) {
	
    var Support                 = this;
    var Dashboard               = null; 

    
    Support.ListStatut          = "loading";
    
    Support.init = function(Dashboard) {
        Support.Dashboard = Dashboard;
        Support.Dashboard.Support_Controller = Support;
    };
        
        
    Support.load     = function() {
        $('.List_Contenair .loader').fadeIn();
        
        // Load Ticket list
        ListManager.init( { endpoint : "Ticket"  } ).then(function(response) { 
        
            $('.List_Contenair .loader').fadeOut();
            
            Support.ListStatut              = "loaded";
            Support.Tickets_Listing         = response;
        });
    };
    
    // Submit
    Support.AddTicketSubmit = function(Form) {
        ApiService.post('Ticket', 'Add' , Support).then(function(response) { 
            Form.process(response); 
        
            if(response.valid) {
                angular.element( $('.Frame') ).scope().Support.load();
                $timeout(function() {
                    PopupService.close();      
                }, 1500);
            }
        });
    };
    
    
    Support.AutoReload = function(Form) {
        Support.load();
        $timeout(function() {Support.AutoReload()}, 30000);
    }
    
    
    Support.AutoReload();
});