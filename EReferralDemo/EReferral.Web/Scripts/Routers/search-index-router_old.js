/* 
    author: Kwon, Hyojung
    define browser level routing rule for ~/Views/Search/Index.cshtml
*/

;ktc.namespace('ktc.router');
ktc.router.searchIndexRouter = (function ($, ktc, ko) {

    // Hook up the events between HTML and ViewModel
    // NOTE : remove event declaration in HTML as much as possible
    var wireEvents = function (searchIndexVM) {
        $('#search-index-wrapper').on('keyup', '#search-box', searchIndexVM.onSearchValueEntered);
        $('#search-index-wrapper').on('click', '#btn-ok', searchIndexVM.onSearchValueEntered);
        $('#search-index-wrapper').on('click', '.btn-close-tag', searchIndexVM.onCloseTagButtonClicked);
        $('#search-index-wrapper').on('click', '#btn-search', searchIndexVM.onSearchPatientButtonClicked);
        $('#search-index-wrapper').on('dblclick', '#tabs-1 .body-table:not(.fake) tr', searchIndexVM.onRowOfFirstTabDblClicked);
    };

    $(function () {

        /* initialize ViewModel */
        var searchIndexVM = ktc.vm.searchIndexVM;
        wireEvents(searchIndexVM);
        //ko.applyBindings(searchIndexVM, document.getElementById('search-index-wrapper'));
        ko.applyBindings(searchIndexVM, document.getElementById('tabs-1'));
        

        /* define routing events */
        $.sammy(function () {
            this.get('', function () {
                log("default route page");
                searchIndexVM.loadPatientList();
            });


        }).run();
    });

})(jQuery, ktc, ko);