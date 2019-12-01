Dashboard.service("UserService", function ($rootScope, $location, $timeout, ApiService, Cookies, PopupService) {

    var vm_User = this;
    vm_User.dashboard = null;

    vm_User.Login_Mail = "";
    vm_User.Login_Password = "";
    vm_User.Login_HashKey = "";
    vm_User.Logged = false;
    vm_User.Account_Error_Opened = false;


    vm_User.setDashboard = function (dashboard) {
        vm_User.dashboard = dashboard;
        vm_User.isLogged();
    };


    vm_User.isLogged = function () {
        var Cookie_Login_Mail = Cookies.get('Login_Mail');
        var Cookie_Login_HashKey = Cookies.get('Login_HashKey');

        vm_User.Login_Mail = Cookie_Login_Mail;
        vm_User.Login_HashKey = Cookie_Login_HashKey;

        vm_User.Logged = (typeof Cookie_Login_Mail !== "undefined" && typeof Cookie_Login_HashKey !== "undefined" && Cookie_Login_Mail !== "" && Cookie_Login_HashKey !== "");
    };


    vm_User.LoginForm = function () {
        PopupService.openNew({Endpoint: 'Account', Action: 'Login', Title: 'Connexion', Styles: {width: "610px"}});
    };

    vm_User.AccountError = function () {
        if (!vm_User.Account_Error_Opened) {
            PopupService.openNew({Endpoint: 'Account', Action: 'AccountError', Title: 'Erreur sur le compte', Styles: {width: "610px"}});
            vm_User.Account_Error_Opened = true;
        }
    };


    // Logging handler
    vm_User.Login = function (User) {

        $('.button_login').val("Chargement...").addClass('bg-grey');

        ApiService.post('User', 'Login', {LOGIN_Mail: User.Login_Mail, LOGIN_Password: User.Login_Password})
                .then(function (Exchange) {

                    $('.button_login').val("Se connecter").removeClass('bg-grey');

                    if (Exchange.valid) {
                        Cookies.set('Login_Mail', User.Login_Mail);
                        Cookies.set('Login_HashKey', Exchange.data.Key_Hash);

                        vm_User.Login_HashKey = Exchange.data.Key_Hash;

                        $timeout(function () {

                            vm_User.isLogged();

                            if (vm_User.Logged) {
                                vm_User.dashboard.UpdateInterface();
                                PopupService.close();
                            }

                        }, 500);

                    } else {
                        User.ErrorMessage = Exchange.errorMessage;

                    }
                });
    };


    // Logging handler
    vm_User.Logout = function () {
        Cookies.set('Login_Mail', '');
        Cookies.set('Login_HashKey', '');
        vm_User.isLogged();
        vm_User.dashboard.UpdateInterface();
    };




});
