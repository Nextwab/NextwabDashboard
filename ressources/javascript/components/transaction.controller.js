Dashboard.controller('Transaction_Controller', function ($sce, $scope, $timeout, ApiService, PopupService, ListManager) {

    var Transaction = this;
    var Dashboard = null;

    Transaction.ListStatut = "loading";
    Transaction.PDF_Bill = false;

    Transaction.init = function (Dashboard) {
        Transaction.Dashboard = Dashboard;
        Transaction.Dashboard.Transaction_Controller = Transaction;
    };

    Transaction.load = function () {
        $('.List_Contenair .loader').fadeIn();

        // Load Ticket list
        ListManager.init({endpoint: "Transaction"}).then(function (response) {

            $('.List_Contenair .loader').fadeOut();

            Transaction.ListStatut = "loaded";
            Transaction.Transactions_Listing = response;
        });
    };


    // Open bill
    Transaction.OpenBill = function (ID) {
        PopupService.openNew({Endpoint: 'Transaction', Action: 'ViewBill', Title: 'Voir une facture', ID_Transaction: ID});
    };

    Transaction.GetBill = function (ID) {
        ApiService.post('Transaction', 'GetBill', {ID: ID}).then(function (response) {
            Transaction.PDF_Bill = $sce.trustAsResourceUrl(response.data.Bill_Link);

        });
    };



    Transaction.load();
});