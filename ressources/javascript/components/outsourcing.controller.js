Dashboard.controller('Outsourcing_Controller', function ($scope, $timeout, ApiService, PopupService, ListManager) {

    var Outsourcing = this;
    var Dashboard = null;

    Outsourcing.Price_Listing = false;
    Outsourcing.ListStatut = "loading";
    Outsourcing.datas = {cpu: {}, ram: {}, tx: {}, rx: {}};


    Outsourcing.init = function (Dashboard) {
        Outsourcing.Dashboard = Dashboard;
        Outsourcing.Dashboard.Outsourcing_Controller = Outsourcing;
    };


    Outsourcing.load = function () {
        $('.List_Contenair .loader').fadeIn();

        // Load contract list
        ListManager.init({endpoint: "Outsourcing", action: "GetPricing"}).then(function (response) {
            Outsourcing.Price_Listing = response;
        });


        // Load contract list
        ListManager.init({endpoint: "Outsourcing"}).then(function (response) {

            $('.List_Contenair .loader').fadeOut();

            Outsourcing.ListStatut = "loaded";
            Outsourcing.Outsourcing_Listing = response;



            angular.forEach(Outsourcing.Outsourcing_Listing, function (Server, IndexServer) {
                Outsourcing.datas['cpu'][IndexServer] = [];
                Outsourcing.datas['ram'][IndexServer] = [];
                Outsourcing.datas['tx'][IndexServer] = [];
                Outsourcing.datas['rx'][IndexServer] = [];

                angular.forEach(Server.Metrics, function (Data, IndexData) {
                    Outsourcing.datas['cpu'][IndexServer][IndexData] = Data.CPU_LoadAverage;
                    Outsourcing.datas['ram'][IndexServer][IndexData] = Data.RAM_Usage;
                    Outsourcing.datas['tx'][IndexServer][IndexData] = Data.Network_TX;
                    Outsourcing.datas['rx'][IndexServer][IndexData] = Data.Network_RX;
                });
            });


            $timeout(function () {
                $(".chart-line").peity("line", {height: 40, width: 140, fill: "#ddd", stroke: "#aaa", strokeWidth: 2});
                $(".chart-donuts").peity("donut");

            }, 100);


        });
    };


    Outsourcing.Autoload = function () {

        Outsourcing.load();
        $timeout(function () {
            Outsourcing.Autoload();
        }, 5000);
    };


    // Submit
    Outsourcing.AddSubmit = function (Form) {
        ApiService.post('Outsourcing', 'Create', Outsourcing.Form).then(function (response) {
            Form.process(response);

            if (response.valid) {
                $timeout(function () {
                    PopupService.close();
                }, 2000);
            }
        });
    };


    // Submit port
    Outsourcing.Add_PortSubmit = function (Form) {
        ApiService.post('Outsourcing', 'Add_Port', Outsourcing.Form).then(function (response) {
            Form.process(response);

            if (response.valid) {
                $timeout(function () {
                    PopupService.close();
                }, 2000);
            }
        });
    };





    // Delete - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    Outsourcing.Delete = function (Outsourcing_Data) {
        PopupService.openNew({Endpoint: 'Outsourcing', Action: 'Delete', Title: 'Supprimer un contrat', Contract_ID: Outsourcing_Data.ID});
    };


    Outsourcing.DeleteSubmit = function (Form) {
        ApiService.post('Outsourcing', 'Delete', Outsourcing).then(function (response) {
            Form.process(response);
            $timeout(function () {
                PopupService.close();
            }, 2000);
        });
    };
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -


    // Delete Port - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
    Outsourcing.DeletePort = function (Outsourcing_Data, Port_Data) {
        PopupService.openNew({Endpoint: 'Outsourcing', Action: 'Delete_Port', Title: 'Supprimer un port', Contract_ID: Outsourcing_Data.ID, Port: Port_Data.Port});
    };


    Outsourcing.Delete_PortSubmit = function (Form) {
        ApiService.post('Outsourcing', 'Delete_Port', Outsourcing).then(function (response) {
            Form.process(response);
            $timeout(function () {
                PopupService.close();
            }, 2000);
        });
    };
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -



    Outsourcing.Autoload();
});