
; ktc.namespace('ktc.router');
ktc.router.docIndexRouter = (function ($, ktc, ko) {
    
    $(function () {

        /* initialize ViewModel */
        var docIndexVM = ktc.vm.docIndexVM;
        ko.applyBindings(docIndexVM, document.getElementById('doc-index-wrapper'));

        /* define routing events */
        
    });

})(jQuery, ktc, ko);