Dashboard.controller('Domain_Controller', function($scope, $timeout , ApiService, PopupService, ListManager) {
    
    var Domain              = this;
    var Dashboard           = null;
    
    
    Domain.VPS_List = null;
    
    Domain.init     = function(Dashboard) {
        Domain.Dashboard = Dashboard;
    };
    
    // Chargement de la liste des domaines
    Domain.load     = function() {
        ListManager.init( { endpoint : "Domain"  } ).then(function(response) { Domain.Listing = response  });
    };
    
    
    // Submit
    Domain.AddSubmit = function(Form) {
        ApiService.post('Domain', 'Add' , Domain).then(function(response) { Form.process(response);  });
    };
    
    
    // Menu - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    Domain.menu = function(Domain) {
        PopupService.openNew(  {Endpoint : 'Domain', Action:'Menu', Title:'Gestion du domaine', Domain:Domain.Domain}    );
    };
    
    Domain.menu_setServer = function(Domain) { PopupService.openNew(  {Endpoint : 'Domain', Action:'setServer', Title:'Selectioner un serveur', Domain:Domain.Domain }    ); };
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    
    
    // Chargement de la liste des VPS
    Domain.getVPS_List = function() {
        ListManager.init( { endpoint : "VPS"  } ).then(function(response) { Domain.VPS_List = response;}); 
    }
    
    
    
    Domain.setServer = function(Domain, ID_CloudDevice) {
        ApiService.post('Domain', 'SetCloudServer' , {Domain: Domain, ID_CloudDevice : ID_CloudDevice} ).then(function(response) {
           
           $timeout(function() { PopupService.close() } , 2000);  
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