// Routes configuration

Dashboard.value('config_routes', {
    "_not_found"                            : {file : "/_commons/not_found.html"                , handler : "empty"         , login : false},
    "_not_logged"                           : {file : "/_commons/not_logged.html"               , handler : "empty"         , login : false},
    "/"                                     : {file : "/account/index.html"                     , handler : "contenair"     , login : true},
    
    "/account/edit/"                        : {file : "/account/edit.html"                      , handler : "contenair"     , login : true},
    "/account/create/"                      : {file : "/account/create.html"                    , handler : "contenair"     , login : false},
    "/account/popup/login.html"             : {file : "/account/popup/login.html"               , handler : "empty"         , login : false,    specific : 'LoginAction'},
    "/account/popup/balance.html"           : {file : "/account/popup/balance.html"             , handler : "empty"         , login : false},
    "/account/popup/account_error.html"     : {file : "/account/popup/account_error.html"       , handler : "empty"         , login : false},

    "/domains/"                             : {file : "/domains/index.html"                     , handler : "contenair"     , login : true},
    "/domains/popup/add.html"               : {file : "/domains/popup/add.html"                 , handler : "contenair"     , login : true},
    "/domains/popup/delete.html"            : {file : "/domains/popup/delete.html"              , handler : "contenair"     , login : true},
    "/domains/popup/menu.html"              : {file : "/domains/popup/menu.html"                , handler : "contenair"     , login : true},
    "/domains/popup/set_cms.html"           : {file : "/domains/popup/set_cms.html"             , handler : "contenair"     , login : true},
    "/domains/popup/set_server.html"        : {file : "/domains/popup/set_server.html"          , handler : "contenair"     , login : true},
    "/domains/popup/set_server_confirmation.html"        : {file : "/domains/popup/set_server_confirmation.html"          , handler : "contenair"     , login : true},
    "/domains/popup/set_dns_config.html"    : {file : "/domains/popup/set_dns_config.html"      , handler : "contenair"     , login : true},
    
    
    "/mysql/"                               : {file : "/mysql/index.html"                       , handler : "contenair"     , login : true},
    "/mysql/popup/add_user.html"            : {file : "/mysql/popup/add_user.html"              , handler : "contenair"     , login : true},
    "/mysql/popup/add_database.html"        : {file : "/mysql/popup/add_database.html"          , handler : "contenair"     , login : true},
    "/mysql/popup/delete_user.html"         : {file : "/mysql/popup/delete_user.html"           , handler : "contenair"     , login : true},
    "/mysql/popup/delete_database.html"     : {file : "/mysql/popup/delete_database.html"       , handler : "contenair"     , login : true},
    
    
    "/vps/"                                 : {file : "/vps/index.html"                         , handler : "contenair"     , login : true},
    "/vps/popup/add.html"                   : {file : "/vps/popup/add.html"                     , handler : "contenair"     , login : true},
    "/vps/popup/edit.html"                  : {file : "/vps/popup/edit.html"                    , handler : "contenair"     , login : true},
    "/vps/popup/delete.html"                : {file : "/vps/popup/delete.html"                  , handler : "contenair"     , login : true},
    "/vps/popup/manage_power.html"          : {file : "/vps/popup/manage_power.html"            , handler : "contenair"     , login : true},

    "/mails/"                               : {file : "/mails/index.html"                       , handler : "contenair"     , login : true},
    "/mails/popup/add.html"                 : {file : "/mails/popup/add.html"                   , handler : "contenair"     , login : true},
    "/mails/popup/add_alias.html"           : {file : "/mails/popup/add_alias.html"             , handler : "contenair"     , login : true},
    "/mails/popup/update_password.html"     : {file : "/mails/popup/update_password.html"       , handler : "contenair"     , login : true},
    "/mails/popup/delete.html"              : {file : "/mails/popup/delete.html"                , handler : "contenair"     , login : true},
    "/mails/popup/delete_alias.html"        : {file : "/mails/popup/delete_alias.html"          , handler : "contenair"     , login : true},
    
    
    "/on-facebook/"                         : {file : "/social/facebook.html"                   , handler : "contenair"     },
    
    
    "/support/"                             : {file : "/support/index.html"                     , handler : "contenair"     , login : true},
    "/support/popup/add-ticket.html"        : {file : "/support/popup/add-ticket.html"          , handler : "contenair"     , login : true},
    
    // Internal Endpoints
    Endpoints       : {
        'Account'   : {
            'Login'             : "/account/popup/login.html",
            'Balance'           : "/account/popup/balance.html",
            'AccountError'      : "/account/popup/account_error.html",
        },
        
        'Database'       : {
            'Add_User'          : "/mysql/popup/add_user.html",
            'Add_Database'      : "/mysql/popup/add_database.html",
            'Delete_User'       : "/mysql/popup/delete_user.html",
            'Delete_Database'   : "/mysql/popup/delete_database.html",
        },
        
        'Domain'       : {
            'Add'               : "/domains/popup/add.html",
            'Delete'            : "/domains/popup/delete.html",
            'Edit'              : "/domains/popup/edit.html",
            'Menu'              : "/domains/popup/menu.html",
            'setServer'         : "/domains/popup/set_server.html",
            'setServer_Confirmation'         : "/domains/popup/set_server_confirmation.html",
            'setCMS'            : "/domains/popup/set_cms.html",
            'setDNS_Config'     : "/domains/popup/set_dns_config.html",
            
        },
        
        'VPS'       : {
            'Add'               : "/vps/popup/add.html",
            'Edit'              : "/vps/popup/edit.html",
            'Delete'            : "/vps/popup/delete.html",
            'ManagePower'       : "/vps/popup/manage_power.html"
        },
        
        'Mail'       : {
            'Add'               : "/mails/popup/add.html",
            'Add_Alias'         : "/mails/popup/add_alias.html",
            'UpdatePassword'    : "/mails/popup/update_password.html",
            'Delete'            : "/mails/popup/delete.html",
            'Delete_Alias'      : "/mails/popup/delete_alias.html",
        },
        
        'Ticket'       : {
            'Add'               : "/support/popup/add-ticket.html",
        }
        
        
    }
});
