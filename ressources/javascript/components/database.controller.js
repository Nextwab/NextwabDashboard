Dashboard.controller('Database_Controller', function($scope, $timeout , ApiService, PopupService, ListManager) {
    
    var Database                = this;
    var Dashboard               = null;    
    
    Database.ListStatut         = "loading";
    
    Database.init               = function(Dashboard) {
        Database.Dashboard      = Dashboard;
    };
    
    
    // Chargement de la liste des databasees
    Database.load     = function() {
        ListManager.init( { endpoint : "Database"  } ).then(function(response) {Database.ListStatut = "loaded"; $('.loader_database').hide(); Database.Listing = response  });
    };
    
    
    // Chargement de la liste des VPS
    Database.getVPS_List = function() {
        ListManager.init( { endpoint : "VPS"  } ).then(function(response) { Database.VPS_List = response;}); 
    }
    
    // Submit User
    Database.Add_UserSubmit = function(Form) {
        ApiService.post('Database', 'Add_User' , Database).then(function(response) { 
            Form.process(response); 
            
            if(response.valid) {
                $timeout(function() {
                    PopupService.close();
                    
                }, 1500);
            }
        });
    };
    
    
    // Submit Database
    Database.Add_DatabaseSubmit = function(Form) {
        ApiService.post('Database', 'Add_Database' , Database).then(function(response) { 
            Form.process(response); 
            
            if(response.valid) {
                Database.ReloadList();
                $timeout(function() {PopupService.close();}, 1500);
            }
        });
    };
    
    
    
    // Delete Database - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    Database.Delete_User = function(Database) {
        PopupService.openNew(  {Endpoint : 'Database', Action:'Delete_User', Title:'Supprimer un utilisateur MySQL', User_Name:Database.User}    );
    };
    

    Database.Delete_UserSubmit = function(Form) {
        ApiService.post('Database', 'Delete_User' , Database).then(function(response) {
           Form.process(response);  
           Database.ReloadList();
           $timeout(function() { PopupService.close() } , 2000);  
        });
    };
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    
    
    // Delete Database - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    Database.Delete_Database = function(Database) {
        PopupService.openNew(  {Endpoint : 'Database', Action:'Delete_Database', Title:'Supprimer une base MySQL', Database:Database.Database_Name}    );
    };
    

    Database.Delete_DatabaseSubmit = function(Form) {
        ApiService.post('Database', 'Delete_Database' , Database).then(function(response) {
           Form.process(response);  
           Database.ReloadList();
           $timeout(function() { PopupService.close() } , 2000);  
        });
    };
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    
    
    
    
    
    Database.ReloadList = function() {
        angular.element( $('.Frame') ).scope().DatabaseUser.load();
    };
    
    
    // Menu - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    Database.Add_Database = function(Database_User) {
        PopupService.openNew(  {Endpoint : 'Database', Action:'Add_Database', Title:'Ajouter une base MySQL', DatabaseUser:Database_User.User}    );
    };
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    
    
    // Database Management - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
    Database.ManageUser = function(Database_User) {
        $('.d-l-w-'+Database_User.ID).slideDown();
    };
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    
    
    
    Database.load();
});