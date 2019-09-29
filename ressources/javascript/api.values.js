// Set API Configuration

Dashboard.value('config_api', 
	{
	"api_server"    : "https://api.nextwab.com",
	"endpoints"     : {
		
		// Section VPS
		VPS : 
			{
			Add             :   '/vps/create.php' ,
			List            :   '/vps/get_list.php',
            List_OS         :   '/vps/get_list_os.php',
			Delete          :   '/vps/delete.php',
			Update          :   '/vps/update.php',
			}
		,
		
		// Section User
		User : 
			{
			Login           :   '/account/login.php',
			},
			
		
		// VPS 
		VPS_GetPricing      :   '/vps/get_pricing.php' ,
		VPS_SetRawData      :   '/vps/set_data_raw.php' ,
		
		
		VPS_SetPower        :   '/vps/set_power.php',

		//USER
		USER_Creation       :   '/account/create.php',
		USER_Check_API_Key  :   '/account/check_api_key.php',
		
		// CMS
		CMS_GetList         :   '/cms/get_list.php',
		CMS_Install         :   '/cms/install.php'
		
		}
	}
);