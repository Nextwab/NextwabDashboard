Dashboard.controller('Domain_Controller', function($scope, ApiService, ListManager) {
    
    var Domain              = this;
    var Dashboard           = null;
    
    
    // Chargement de la liste des Domain
    ListManager.init( { endpoint : "Domain"  } ).then(function(response) { Domain.Listing = response  });

    
    Domain.init = function(Dashboard) {
        Domain.Dashboard = Dashboard;
    };
    

    // Submit
    Domain.Submit = function(Form) {
        ApiService.post('Domain', 'Add' , Domain).then(function(response) { Form.process(response);  });
    };
        
});