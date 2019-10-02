// Routes configuration

Dashboard.value('config_routes', {
    "_not_found"                : {file : "/_commons/not_found.html"    , handler : "empty"         , login : false},
    "_not_logged"               : {file : "/_commons/not_logged.html"   , handler : "empty"         , login : false},
    "/"                         : {file : "/index.html"                 , handler : "contenair"     , login : false},
    
    "/account/popup/login.html" : {file : "/account/popup/login.html"   , handler : "empty"         , login : false,    specific : 'LoginAction'},

    "/domains/"                 : {file : "/domains/index.html"         , handler : "contenair"     , login : true},
    "/vps/"                     : {file : "/vps/index.html"             , handler : "contenair"     , login : true},
    "/vps/popup/add.html"       : {file : "/vps/popup/add.html"         , handler : "contenair"     , login : true},
    "/vps/popup/edit.html"      : {file : "/vps/popup/edit.html"        , handler : "contenair"     , login : true},


    // Internal Endpoints
    Endpoints       : {
        'Account'   : {
            'Login'             : "/account/popup/login.html",
        },
        'VPS'       : {
            'Add'               : "/vps/popup/add.html",
            'Edit'              : "/vps/popup/edit.html"
        }
    }
});
