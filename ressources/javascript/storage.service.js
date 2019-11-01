Dashboard.service("StorageService", function(){
	
	var vm_StorageService = this;
	
    vm_StorageService.setDashboard      = function(dashboard){
		vm_StorageService.dashboard     = dashboard;
	};
    
	vm_StorageService.set = function(name , value) {
		vm_StorageService[name] = value;
	};
	
	vm_StorageService.get = function(name) {
		return vm_StorageService[name];
	};
	
});