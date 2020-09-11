Dashboard.controller('Chat_Controller', function($scope, $timeout, ApiService, PopupService, ListManager, ChatService) {
	
    var Chat                 = this;
    var Dashboard            = null; 
    
    Chat.init = function(Dashboard) {
        Chat.Dashboard = Dashboard;
        Chat.Dashboard.Chat_Controller = Chat;
    };
    
    Chat.quitConversationSubmit = function(Form) {
        ChatService.quitConversation(Chat.Token , Form);       
    }
    
    Chat.inviteUserSubmit = function(Form) {
        ChatService.inviteUser(Chat.ID_Public , Form);       
    }
    
    Chat.removeUserSubmit = function(Form) {
        ChatService.removeUser(Chat.ID_Public , Form);       
    }
    
    Chat.editAccountSubmit = function(Form) {
        ChatService.editAccount(Chat, Form);       
    }

});