Dashboard.controller('Event_Controller', function($scope, $timeout, ApiService, PopupService, ListManager) {
	
    var Event                = this;
    var Dashboard            = null; 

    
    Event.init = function(Dashboard) {
        Event.Dashboard = Dashboard;
        Event.Dashboard.Event_Controller = Event;
    };
        
        
    Event.load     = function() {
        
        // Load Card list
        ListManager.init( { endpoint : "Event"  } ).then(function(response) { 
            Event.Listing         = response;
            
            $timeout(function() {
                Event.Next();
            }, 500);
        });
    };
    
    
    Event.Next     = function() {
        var div_next = $('.Events .Event_Content:visible').next();
        $(".Events ").slideDown();
        
        if(div_next.length) {
            $(".Events .Event_Content").slideUp();
            $(div_next).slideDown();
        }

        if($('.Events .Event_Content:visible').next().length < 2) {
            $(".Events .Event_Content:first-child").slideDown();
        }
       
    };
    
    
});