/* 
    author: Kwon, Hyojung
    define browser level routing rule for ~/Views/Home/Index.cshtml
*/

;ktc.namespace('ktc.router');
ktc.router.referralIndexRouter = (function ($, ktc, ko) {

    // Hook up the events between HTML and ViewModel
    // NOTE : remove event declaration in HTML as much as possible
    var wireEvents = function (referralIndexVM) {
        $('#referral-index-wrapper').on('click', '#btn-refresh', referralIndexVM.loadReferralList);
        $('#referral-index-wrapper').on('click', '#btn-all', referralIndexVM.loadReferralList);
        $('#referral-index-wrapper').on('click', '#btn-new', referralIndexVM.loadReferralList);
        $('#referral-index-wrapper').on('click', '#btn-edit', referralIndexVM.loadReferralList);
        ktc.vm.referralIndexVM.selectedPeriod.subscribe(ktc.vm.referralIndexVM.changeCalendar);
    };

    $(function () {

        /* initialize ViewModel */
        var referralIndexVM = ktc.vm.referralIndexVM;
        wireEvents(referralIndexVM);
        ko.applyBindings(referralIndexVM, document.getElementById('referral-index-wrapper'));
        

        /* define routing events */
        $.sammy(function () {
            this.get('', function () {
                log("default route page");
                referralIndexVM.loadReferralList();
            });

            this.get('#:patientId', function () {
                log('patientId=' + this.params.patientId);
                referralIndexVM.loadReferralList();
            });

        }).run();
    });

})(jQuery, ktc, ko);