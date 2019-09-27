// Manage URL handling and provide navigation tools

Dashboard.value('config_routes', 
	{
	"/account/login/" 	: {file : "/account/login.html" 	, handler : "contenair" , login : true},
	"/vps/" 			: {file : "/vps/index.html"		, handler : "contenair"	, login : false},
	}
);
