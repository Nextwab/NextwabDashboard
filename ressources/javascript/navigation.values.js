// Routes configuration

Dashboard.value('config_routes', 
	{
	"_not_found"              : {file : "/_commons/not_found.html"	, handler : "empty" 	, login : false},
	"/account/login/"         : {file : "/account/login.html" 	, handler : "empty" 	, login : false},
	
	"/domains/"               : {file : "/domains/index.html"		, handler : "contenair"	, login : true},
	"/vps/"                   : {file : "/vps/index.html"		, handler : "contenair"	, login : true},
	"/vps/popup/add.html"     : {file : "/vps/popup/add.html"		, handler : "contenair"	, login : true},
	"/vps/popup/edit.html"    : {file : "/vps/popup/edit.html"	, handler : "contenair"	, login : true},
	
	
	// Internal Endpoints
	Endpoints  : {
		'VPS'   : {
			'Add'               : "/vps/popup/add.html",
			'Edit'              : "/vps/popup/edit.html"
		}
	}
	
	}
);
