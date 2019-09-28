// Manage URL handling and provide navigation tools

Dashboard.value('config_routes', 
	{
	"_not_found"			: {file : "/_commons/not_found.html"	, handler : "empty" , login : false},
	"/account/login/" 		: {file : "/account/login.html" 		, handler : "empty" , login : false},
	
	"/domains/" 			: {file : "/domains/index.html"		, handler : "contenair"	, login : true},
	"/vps/"				: {file : "/vps/index.html"			, handler : "contenair"	, login : true},
	}
);
