// Routes configuration

Dashboard.value('config_routes', {
    "_not_found"                            : {file : "/_commons/not_found.html"                , handler : "empty"         , login : false},
    "_not_logged"                           : {file : "/_commons/not_logged.html"               , handler : "empty"         , login : false},
    "/"                                     : {file : "/index.html"                             , handler : "contenair"     , login : false},
    
    "/account/popup/login.html"             : {file : "/account/popup/login.html"               , handler : "empty"         , login : false,    specific : 'LoginAction'},

    "/domains/"                             : {file : "/domains/index.html"                     , handler : "contenair"     , login : true},
    "/domains/popup/add.html"               : {file : "/domains/popup/add.html"                 , handler : "contenair"     , login : true},
    "/domains/popup/delete.html"            : {file : "/domains/popup/delete.html"              , handler : "contenair"     , login : true},
    "/domains/popup/menu.html"              : {file : "/domains/popup/menu.html"                , handler : "contenair"     , login : true},
    "/domains/popup/set_server.html"        : {file : "/domains/popup/set_server.html"          , handler : "contenair"     , login : true},
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


    
    // Internal Endpoints
    Endpoints       : {
        'Account'   : {
            'Login'             : "/account/popup/login.html",
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
            'setDNS_Config'     : "/domains/popup/set_dns_config.html",
            
        },
        
        'VPS'       : {
            'Add'               : "/vps/popup/add.html",
            'Edit'              : "/vps/popup/edit.html",
            'Delete'            : "/vps/popup/delete.html"
        }
    }
});
