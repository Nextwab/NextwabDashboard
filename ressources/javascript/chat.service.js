Dashboard.service("ChatService", function($compile , $location, $timeout, ApiService, PopupService ){
    
	var vm_Chat = this;
	vm_Chat.dashboard = null; 
	
    vm_Chat.Channel                 = "Nextwab";
    vm_Chat.Users                   = {};
    vm_Chat.Conversations           = {};
    vm_Chat.Profil                  = {};
    vm_Chat.Conversation            = {};
    vm_Chat.Conversation_Selected   = "";
    vm_Chat.MessageToSend           = "";
    vm_Chat.Writing                 = false;
    vm_Chat.lastWrite               = 0;
    vm_Chat.lastCursor              = 0;
    vm_Chat.date_LimitShowUsers     = 0;
    
    vm_Chat.States     = {
        1 : {text:'En ligne', class:"state_online" },
        2 : {text:'Occupé'  , class:"state_busy" },
        3 : {text:'Absent', class:"state_away" },
        4 : {text:'Hors ligne', class:"state_offline" },
    };
    
    
	// Init dashboard
	vm_Chat.setDashboard = function(dashboard){
		vm_Chat.dashboard = dashboard;
	};
    
    
    vm_Chat.update_DateLimit = function() {
        vm_Chat.date_LimitShowUsers = (new Date().getTime() / 1000 ) - 20;
    }
    
    // Load data tree
    vm_Chat.load     = function() {
        
        if(vm_Chat.dashboard != "Chat") {
            return false;
        }
        
        ApiService.post('Account', 'Ping', vm_Chat).then(function(response) { 
            if(response.valid) {
                vm_Chat.Users = response.data.Users_In_Channel;
                vm_Chat.Conversations = response.data.Conversations;
                vm_Chat.Profil = response.data.Profil;
            }
        });
        
        ApiService.post('Messages', 'GetMessages',  {Channel : vm_Chat.Channel, Conversation: vm_Chat.Conversation_Selected, Writing: vm_Chat.Im_Writing() }).then(function(response) { 
            vm_Chat.Conversation = response.data;
            vm_Chat.update_DateLimit();
            $('.chat_message_loading').fadeOut();
            
            
            // If new message incoming
                if (response.data.Last_Sync_Cursor > vm_Chat.lastCursor) {
                    vm_Chat.ScrollBottom();
                }

                vm_Chat.lastCursor = response.data.Last_Sync_Cursor;

                if (response.data.Cursors) {

                    // Curseurs des utilisateurs
                    $.each(response.data.Cursors, function (i, m) {

                        Messages_Readed = $('.chat_message').filter(function () {
                            return $(this).data("id") <= m;
                        });

                        console.log(Messages_Readed);
                        
                        $(Messages_Readed).each(function (i, r) {
                            $(r).addClass('readed');
                        });

                    });
                }
            
        });
    };
    
     // Conversation creation
    vm_Chat.createConversation     = function() {
       vm_Chat.ClearZone();
       $('.chb_create_conversation .fa-plus').hide();
       $('.chb_create_conversation .fa-spinner').css("display", "inline-block");
       
       ApiService.post('Messages', 'CreateConversation', {Create_Group:true, Channel:vm_Chat.Channel }).then(function(response) { 
            if(response.valid) {
                
                $('.chb_create_conversation .fa-plus').show();
                 $('.chb_create_conversation .fa-spinner').css("display", "none");
                
                vm_Chat.Conversation_Selected = response.data.Conversation_Created.Token;
                
                vm_Chat.load();
            }
        });
    };

    
    // Quit conversation
    vm_Chat.open_AccountEdition = function() {
        PopupService.openNew(  {Endpoint : 'Chat', Action:'Account_Edition', Title:'Edition de votre profil'});
    }
    
    vm_Chat.editAccount = function(Chat , Form) {

        let data = Chat;
        data.Updated_Pseudo  = Chat.Profil_Data.Pseudo;
        data.Updated_State   = Chat.Profil_Data.State;
        
        ApiService.post('Account', 'Ping', data).then(function(response) { 
        
            if(Form) {
                Form.process(response);
            }
            
            if(response.valid) {
                vm_Chat.load();
            }
            
            PopupService.close();
        });
    }
    
    
    // Quit conversation
    vm_Chat.quitConversation_Confirmation = function(Token) {
        PopupService.openNew(  {Endpoint : 'Chat', Action:'Quit_Conversation', Title:'Quitter cette conversation', Token:Token});
    }
    
    vm_Chat.quitConversation = function(Token , Form = false) {
        ApiService.post('Messages', 'QuitConversation', {Token:Token}).then(function(response) { 
        
            if(Form) {
                Form.process(response);
            }
            
            if(response.valid) {
                vm_Chat.load();
            }
            
            PopupService.close();
        });
    }
    
    
    // Invite in conversation
    vm_Chat.inviteUser_Confirmation = function(ID_Public) {
        PopupService.openNew(  {Endpoint : 'Chat', Action:'Invite_User', Title:'Confirmer cet ajout', ID_Public:ID_Public});
    }
    
    vm_Chat.inviteUser = function(ID_User, Form) {
       ApiService.post('Messages', 'InviteUser', {Token : vm_Chat.Conversation_Selected, ID_Public:ID_User}).then(function(response) { 
        
            if(Form) {
                Form.process(response);
            }
            
            if(response.valid) {
                vm_Chat.load();
            }
            
            PopupService.close();
        });
    }
    
    
    // Remove user in conversation
    vm_Chat.removeUser_Confirmation = function(ID_Public) {
        PopupService.openNew(  {Endpoint : 'Chat', Action:'Remove_User', Title:'Confirmer cette suppression', ID_Public:ID_Public});
    }
    
    
    vm_Chat.ScrollBottom = function () {

        $('.chat_message_list').animate({scrollTop: $('.chat_message_list')[0].scrollHeight}, 300);
    };
    
    vm_Chat.removeUser = function(ID_User, Form) {
       ApiService.post('Messages', 'RemoveUser', {Token : vm_Chat.Conversation_Selected,  ID_Public:ID_User}).then(function(response) { 
        
            if(Form) {
                Form.process(response);
            }
            
            if(response.valid) {
                vm_Chat.load();
            }
            
            PopupService.close();
        });
    }
    
    
    
    vm_Chat.ClearZone = function() {
        $('.chat_message_loading').fadeIn();
        vm_Chat.Conversation = {};
    }
    
    vm_Chat.AutoReload = function(Form) {
        vm_Chat.load();
        $timeout(function() {vm_Chat.AutoReload()}, 2000);
    }
    
    vm_Chat.Im_Writing = function() {
        return ((Math.round(+new Date() / 1000) - vm_Chat.lastWrite) < 5);
    }
    
    
    vm_Chat.keyPressMessageForm = function(e) {
        vm_Chat.lastWrite = Math.round(+new Date() / 1000);
        
        keyPress = e.originalEvent.keyCode;
        
        if(keyPress == 13) {
            let message = vm_Chat.MessageToSend;
            
            $timeout(function() { Message:vm_Chat.MessageToSend = ""; }, 100);
            
            ApiService.post('Messages', 'SendMessage', {Conversation: vm_Chat.Conversation_Selected, Message:message }).then(function(response) { 
                if(response.valid) {
                
                }
            });
            
            return false;
        }
    }
    
});
