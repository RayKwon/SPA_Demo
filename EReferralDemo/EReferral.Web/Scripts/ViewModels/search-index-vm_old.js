/* 
    author: Kwon, Hyojung
    ViewModel for ~/Views/Search/Index.cshtml
*/

; ktc.namespace('ktc.vm');
ktc.vm.searchIndexVM = (function (ktc, ko) {
    var self = this;

    // patients to be binded to the grid
    self.patientList = ko.observableArray([]);

    // load patients from server
    self.loadPatientList = function () {
        ktc.data.patientDataService.getPatientList(null, bindPatientList);
    };

    // bind patients to the patientList
    self.bindPatientList = function (patients) {
        self.patientList.removeAll();
        self.patientList(ko.mapping.fromJS(patients));

        // style view again
        ktc.view.searchIndexView.setBodyTableWrapperTop();
        ktc.view.searchIndexView.setTableWidth();
        ktc.view.searchIndexView.setFakeTable();
        ktc.view.searchIndexView.bindGridDoubleClickEvent();
    };

    /* start - search toolbar */
    self.searchCriteria = ko.observable('PATIENT NAME');    // radio button for search criteria
    self.searchValue = ko.observable('');
    self.onSearchValueEntered = function (event) {
        if ((event.type === 'click') || (event.type === 'keyup' && event.keyCode === 13)) {
            if (self.searchValue() !== '') {
                self.tags.push(new Tag(self.searchCriteria(), self.searchValue()));
            }
        }
    };
    self.Tag = function (tagName, tagValue) {
        this.tagName = tagName;
        this.tagValue = tagValue;
    };
    self.tags = ko.observableArray([]);
    self.onCloseTagButtonClicked = function () {
        var el = $(this).parent().parent(), // get parent li tag
            i = $('.tags ul li').index(el);

        self.tags.splice(i, 1);
    };
    self.onSearchPatientButtonClicked = function () {
        ktc.data.patientDataService.getPatientList(self.tags(), self.bindPatientList);
    };
    /* end - search toolbar */

    // table row double click event to add tab
    self.onRowOfFirstTabDblClicked = function (event) {
        //ktc.view.searchIndexView.addTab(function (tabId) {
        //    ko.applyBindings(new ktc.vm.TabItemVM(tabId), document.getElementById(tabId));
        //});
        ktc.view.searchIndexView.addTab();
    }


    // expose only public functions
    return {
        patientList: patientList,
        loadPatientList: loadPatientList,
        searchCriteria: searchCriteria,
        searchValue: searchValue,
        onSearchValueEntered: onSearchValueEntered,
        tags: tags,
        onCloseTagButtonClicked: onCloseTagButtonClicked,
        onSearchPatientButtonClicked: onSearchPatientButtonClicked,
        onRowOfFirstTabDblClicked: onRowOfFirstTabDblClicked
    }

})(ktc, ko);

ktc.vm.TabItemVM = function (tabId) {
    var self = this;

    self.tabId = tabId;

    self.test = function () {
        alert('test');
    };
}
