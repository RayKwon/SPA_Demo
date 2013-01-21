/* 
    author: Kwon, Hyojung
    ViewModel for ~/Views/Search/Index.cshtml
*/

; ktc.namespace('ktc.vm');
ktc.vm.searchIndexVM = (function (ktc, ko) {
    var

        // represent all tabs, array of TabItem
        tabItems = ko.observableArray([]),


        // represent each tab item except for the first tab
        TabItem = function (tabId, tabTitle, patientId) {
            var self = this;

            self.tabId = ko.observable(tabId);
            self.tabTitle = ko.observable(tabTitle);
            self.patientId = ko.observable(patientId);

            self.isListView = ko.observable(true);  // list view or folder view
            self.listClicked = function () {
                self.isListView(true);
            };
            self.folderClicked = function () {
                self.isListView(false);
            };
            self.isListView.subscribe(function (newValue) {
                if (newValue) {     // list view mode
                    self.documents.remove(function (item) {     // remove all header rows
                        return item.templateName() === 'header';
                    });
                } else {            // folder view mode
                    var plain = ko.mapping.toJS(self.documents());
                    var observableDocs = ko.mapping.fromJS(self.getFolderedDocuments(plain));

                    self.documents.removeAll();
                    self.documents(observableDocs());
                }

                // style view again
                setTimeout(function () {
                    styleViewAgain();
                }, 0);
            });

            self.documentFilters = ko.observableArray(['ALL', 'DISCHARGE SUMMARY', 'TRANSFER SUMMARY']);
            self.selectedDocumentFilter = ko.observable('ALL');
            self.selectedDocumentFilter.subscribe(function (newValue) {
                setTimeout(function () {
                    styleViewAgain();
                }, 0);
            });
            self.isRowVisible = function (doc) {
                if (doc.templateName() === 'header')
                    return true;
                if (self.selectedDocumentFilter() === 'ALL')
                    return true;
                if (self.selectedDocumentFilter().toLowerCase() === doc.documentName().toLowerCase())
                    return true;
                return false;
            };

            self.dateFrom = ko.observable();
            self.dateTo = ko.observable();
            self.documentNameToSearch = ko.observable();

            self.documents = ko.observableArray([]);
            self.getDocumentList = function () {
                ktc.data.documentDataService.getDocumentList(
                    self.documentNameToSearch(),
                    self.dateFrom(),
                    self.dateTo(),
                    function (docs) {
                        self.documents.removeAll();

                        if (self.isListView()) {    // list view mode
                            _.each(docs, function (doc) {
                                doc.templateName = 'content';
                            });
                            var observableDocs = ko.mapping.fromJS(docs);
                            self.documents(observableDocs());
                        } else {                    // folder view mode
                            var observableDocs = ko.mapping.fromJS(self.getFolderedDocuments(docs));
                            self.documents(observableDocs());
                        }

                        // style view again
                        styleViewAgain();
                    });
            };

            // group by folderid and insert new row for folder header 
            // parameter 'documents' should be plain object, not observable object
            // function also return plain object
            self.getFolderedDocuments = function (docs) {
                var i,
                    pluck,
                    folderIds,
                    newDocs = [],
                    tempDocs = [],
                    filteredDocs = [],
                    fid,
                    len,
                    FolderHeaderRow = function (folderId, folderDate, folderReferralName, folderFrom) {
                        this.templateName = 'header';
                        this.folderId = folderId;
                        this.folderDate = folderDate;
                        this.folderReferralName = folderReferralName;
                        this.folderFrom = folderFrom;
                    };

                pluck = _.pluck(docs, 'folderId');
                folderIds = _.uniq(pluck).sort().reverse();

                for (i = 0; i < folderIds.length; i++) {
                    fid = folderIds[i];

                    filteredDocs = _.filter(docs, function (d) {
                        return d.folderId === fid;
                    });

                    newDocs.push(new FolderHeaderRow(fid, filteredDocs[0].folderDate, filteredDocs[0].folderReferralName, filteredDocs[0].folderFrom));  // create new object for the header row

                    _.each(filteredDocs, function (c) {
                        newDocs.push(c);
                    });
                }

                len = newDocs.length;

                for (i = 0; i < len; i++) {
                    var newDoc = newDocs[i];
                    newDoc.templateName = newDoc.templateName || 'content';
                    tempDocs.push(newDoc);
                }

                return tempDocs;
            };

            self.convertTypeToImage = function (document) {
                var image;

                if (document.templateName() !== 'content')
                    return;

                var docType = document.type();
                switch (docType) {
                    case 'jpg':
                        image = '/Images/icn_jpg.png';
                        break;
                    case 'txt':
                        image = '/Images/icn_txt.png';
                        break;
                    case 'pdf':
                        image = '/Images/icn_pdf.png';
                        break;
                    case 'ccd':
                        image = '/Images/icn_ccd.png';
                        break;
                    default:
                        image = '';
                        break;
                }

                return image;
            };

            //templateName = 'listview-template';
        },


        // add tab
        addTab = function (patient) {
            var len = tabItems().length,
                tabItem = tabItems()[len - 1],
                t,
                lastTabId;

            // check if the patient has been already showing in tabs
            var samePatientTab = _.find(tabItems(), function (tabItem) {
                return tabItem.patientId() === patient.id();
            });
            if (samePatientTab) {
                ktc.common.showWarningMessage(patient.patientName() + ' has been already showing in the tabs', 5000);
                return;
            }

            if (tabItem) {
                lastTabId = tabItem.tabId();
                lastTabId = lastTabId.substring(lastTabId.lastIndexOf('-') + 1, lastTabId.length);
                lastTabId = parseInt(lastTabId, 10) + 1;
                t = new TabItem('tabs-' + lastTabId, patient.patientName(), patient.id());
                t.getDocumentList();
                tabItems.push(t);
            } else {
                t = new TabItem('tabs-2', patient.patientName(), patient.id());
                t.getDocumentList();
                tabItems.push(t);
            }
        },


        // remove tab
        removeTab = function (tabItem) {
            var tabId = tabItem.tabId();

            tabItems.remove(function (item) {
                return item.tabId() === tabId;
            });
        },



        /* start - first tab */
        // patients to be binded to the grid
        patientList = ko.observableArray([]),

        // load patients from server
        loadPatientList = function () {
            ktc.data.patientDataService.getPatientList(null, bindPatientList);
        },

        // bind patients to the patientList
        bindPatientList = function (patients) {
            patientList.removeAll();
            patientList(ko.mapping.fromJS(patients));

            // style view again
            ktc.view.searchIndexView.setBodyTableWrapperTop();
            ktc.view.searchIndexView.setTableWidth();
            ktc.view.searchIndexView.setFakeTable();
        },

        /* start - search toolbar */
        searchCriteria = ko.observable('PATIENT NAME'),    // radio button for search criteria
        searchValue = ko.observable(''),
        onSearchValueEntered = function (event) {
            if ((event.type === 'click') || (event.type === 'keyup' && event.keyCode === 13)) {
                if (searchValue() !== '') {
                    tags.push(new Tag(searchCriteria(), searchValue()));
                }
            }
        },
        Tag = function (tagName, tagValue) {
            var self = this;
            self.tagName = tagName;
            self.tagValue = tagValue;
        },
        tags = ko.observableArray([]),
        onCloseTagButtonClicked = function () {
            var el = $(this).parent().parent(), // get parent li tag
                i = $('.tags ul li').index(el);

            tags.splice(i, 1);
        },
        onSearchPatientButtonClicked = function () {
            ktc.data.patientDataService.getPatientList(tags(), bindPatientList);
        },
        /* end - search toolbar */
        /* end - first tab */

        styleViewAgain = function () {
            ktc.view.searchIndexView.setBodyTableWrapperTop();
            ktc.view.searchIndexView.setTableWidth();
            ktc.view.searchIndexView.setFakeTable();
            ktc.view.searchIndexView.bindFolderRowClickEvent();
        };


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
        tabItems: tabItems,
        removeTab: removeTab,
        addTab: addTab,
    };

})(ktc, ko);


// custom tabBinding for jqueryui tab widget
; ko.bindingHandlers.tabBinding = {
    init: function (element, valueAccessor) {

        //handle disposal (if KO removes by the template binding)
        ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
            log("Remove Element", element);
            $(element).tabs("destroy");
        });
    },
    update: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {

        var options = valueAccessor() || {};
        var tabItems = viewModel.tabItems;

        log('tabItems length=' + tabItems().length);


        setTimeout(function () {
            $(element).tabs('destroy');
            $(element).tabs(options);

            ktc.view.searchIndexView.setBodyTableWrapperTop('#tabs-1');
            ktc.view.searchIndexView.setTableWidth('#tabs-1');
            ktc.view.searchIndexView.setFakeTable('#tabs-1');

            ktc.view.searchIndexView.bindTabSelectEvent();
        }, 0);
    }
};

