// Manage URL handling and provide navigation tools

Dashboard.service("ApiService", function ($rootScope, $q, $http, config_api, ExchangeService) {

    var vm_ApiService = this
    vm_ApiService.dashboard = null;

    vm_ApiService.setDashboard = function (dashboard) {
        vm_ApiService.dashboard = dashboard;
    };


    // Make POST Request 
    vm_ApiService.post = function (Endpoint, Action, data) {
        var deferred = $q.defer();

        var form_data = new FormData();

        for (var key in data) {
            form_data.append(key, data[key]);
        }

        var vm_User = vm_ApiService.dashboard.ServiceUser;

        if (vm_User.Logged) {
            form_data.append('LOGIN_Mail', vm_User.Login_Mail);
            form_data.append('LOGIN_Key_Hash', vm_User.Login_HashKey);
        }


        $http({
            method: 'POST',
            url: config_api.api_server + config_api.endpoints[Endpoint][Action],
            headers: {'Content-Type': undefined},
            data: form_data
        }
        ).then(function (response) {
            var Reply = ExchangeService.create(response.data);

            if (typeof response.data.State !== "undefined" && (response.data.State != 1)) {
                Reply.error(response.data.Message);
            }
            if (typeof response.data.Account_State !== "undefined" && (response.data.Account_State == 2) && (Endpoint != 'User' && Action != 'GetInfos')) {
                vm_User.AccountError();
            }

            deferred.resolve(Reply);
        },
                function (err) {
                    deferred.reject(err);
                });

        return deferred.promise;
    };

});
