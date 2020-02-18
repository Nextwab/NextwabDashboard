Dashboard.controller('GiftCard_Controller', function($scope, $timeout, ApiService, PopupService, ListManager) {
	
    var GiftCard                = this;
    var Dashboard               = null; 

    
    GiftCard.ListStatut          = "loading";
    
    GiftCard.init = function(Dashboard) {
        GiftCard.Dashboard = Dashboard;
        GiftCard.Dashboard.GiftCard_Controller = GiftCard;
    };
        
        
    GiftCard.load     = function() {
        $('.List_Contenair .loader').fadeIn();
        
        // Load Card list
        ListManager.init( { endpoint : "Gift_Card"  } ).then(function(response) { 
        
            $('.List_Contenair .loader').fadeOut();
            
            GiftCard.ListStatut              = "loaded";
            GiftCard.GiftCard_Listing         = response;
        });
    };
    
    // Submit
    GiftCard.UseCode = function() {
        
        $('.submit_UseCode').html('<i class="fas fa-sync-alt fa-spin"></i> Chargement...');
        
        ApiService.post('Gift_Card', 'UseCode' , GiftCard).then(function(response) { 
        
             $('.submit_UseCode').html('<i class="fas fa-gift"></i> Ajouter');   
            
            if(response.valid) {
                $('.Reply').slideDown().html('<i class="fas fa-check-circle color-green"></i> Carte valide. '+response.data.Data.Price+'€ ont été ajouté à votre solde !');
            }
            else {
                $('.Reply').slideDown().html('<i class="fas fa-exclamation-circle"></i> '+response.data.Message+'');
            }
            
            
        });
        
    };
    
    

    GiftCard.load();
});