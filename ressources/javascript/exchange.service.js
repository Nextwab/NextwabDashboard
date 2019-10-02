class Exchange {
    constructor(data) {
        this.data           = data;
        this.valid          = true;
        this.errorMessage   = "";
    }

    error(errorMessage = "") {
        this.valid          = false;
        this.errorMessage   = errorMessage;
    }
    
    is_valid() {
        return valid;
    }
}


// Manage internal extended communications

Dashboard.service("ExchangeService", function(){
    
	var vm_Exchange = this;
	vm_Exchange.dashboard = null; 
	
	// Init dashboard
	vm_Exchange.setDashboard = function(dashboard){
		vm_Exchange.dashboard = dashboard;
	};
    

    // Create exchange interface
	vm_Exchange.create = function( data = {} ){
        return new Exchange(data);
	};		
});


