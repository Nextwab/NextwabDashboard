// Set API Configuration

Dashboard.value('config_api', 
	{
	"api_server" : "https://api.nextwab.com",
	"endpoints" : {
		
		// VPS 
		VPS_Creation		: '/vps/create.php' ,
		VPS_GetPricing		: '/vps/get_pricing.php' ,
		VPS_SetRawData		: '/vps/set_data_raw.php' ,
		VPS_GetList		: '/vps/get_list.php' ,
		VPS_Delete		: '/vps/delete.php',
		VPS_Update		: '/vps/update.php',
		VPS_SetPower		: '/vps/set_power.php',

		//USER
		USER_Creation 		: '/account/create.php',	
		USER_Login 		: '/account/login.php',
		USER_Check_API_Key 	: '/account/check_api_key.php',
		
		// CMS
		CMS_GetList		: '/cms/get_list.php',
		CMS_Install			: '/cms/install.php'
		
		}
	}
);