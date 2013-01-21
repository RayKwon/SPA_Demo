/* 
    author: Kwon, Hyojung
    ViewModel for ~/Views/Referral/Index.cshtml
*/

; ktc.namespace('ktc.vm');
ktc.vm.referralIndexVM = (function (ktc, ko) {
    var
        // referrals to be bound to the grid
        referralList = ko.observableArray([]),

        // load referrals from server
        loadReferralList = function () {
            ktc.data.referralDataService.getReferralList(referralStatus(),
                                                        dateFrom(),
                                                        dateTo(),
                                                        bindReferralList);
        },

        // bind referrals to the referralList
        bindReferralList = function (referrals) {
            //referralList.removeAll();
            referralList(ko.mapping.fromJS(referrals));

            // style view again
            //ktc.view.referralIndexView.setTableWidth();
            //ktc.view.referralIndexView.setFakeTable();
            //ktc.view.referralIndexView.styleStatus();
            //ktc.view.referralIndexView.setPopup();
        },

        // filter by status
        referralStatus = ko.observable('all'),

        /* start - filter by period */
        Period = function (optionValue, optionText) {
            var self = this;
            self.optionValue = optionValue;
            self.optionText = optionText;
        },

        periodOption = ko.observableArray([
            new Period('1', 'TODAY'),
            new Period('2', 'Last 7 days'),
            new Period('3', 'Last 30 days'),
            new Period('0', 'Choose calendar')
        ]),

        selectedPeriod = ko.observable(new Period()),
        dateFrom = ko.observable(),
        dateTo = ko.observable(),

        // will be called whenever combobox changes
        changeCalendar = function () {
            if (selectedPeriod() !== undefined) {

                switch (selectedPeriod().optionValue) {
                    case '0':
                        dateFrom('');
                        dateTo('');
                        break;
                    case '1':
                        dateFrom(ktc.data.referralDataService.getServerTime());
                        dateTo(ktc.data.referralDataService.getServerTime());
                        break;
                    case '2':
                        dateFrom(ktc.data.referralDataService.getServerTime(-7));
                        dateTo(ktc.data.referralDataService.getServerTime());
                        break;
                    case '3':
                        dateFrom(ktc.data.referralDataService.getServerTime(-30));
                        dateTo(ktc.data.referralDataService.getServerTime());
                        break;
                    default:
                        dateFrom('');
                        dateTo('');
                        break;
                }

            } else {
                dateFrom('');
                dateTo('');
            }

            if (ktc.view.referralIndexView.pageInitialized) {
                loadReferralList();
            } else {
                ktc.view.referralIndexView.pageInitialized = true;
            }
        };
    /* end - filter by period */



    // expose only public functions
    return {
        referralList: referralList,
        referralStatus: referralStatus,
        loadReferralList: loadReferralList,
        periodOption: periodOption,
        selectedPeriod: selectedPeriod,
        dateFrom: dateFrom,
        dateTo: dateTo,
        changeCalendar: changeCalendar,
    }

})(ktc, ko);

; ko.bindingHandlers.resize = {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        var referralList = ko.utils.unwrapObservable(valueAccessor());
        setTimeout(function () {
            ktc.view.referralIndexView.setTableWidth();
            ktc.view.referralIndexView.setFakeTable();
            ktc.view.referralIndexView.styleStatus();
            ktc.view.referralIndexView.setPopup();
        }, 0);
    },

    update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        var referralList = ko.utils.unwrapObservable(valueAccessor());
        setTimeout(function () {
            ktc.view.referralIndexView.setTableWidth();
            ktc.view.referralIndexView.setFakeTable();
            ktc.view.referralIndexView.styleStatus();
            ktc.view.referralIndexView.setPopup();
        }, 0);
    }
};