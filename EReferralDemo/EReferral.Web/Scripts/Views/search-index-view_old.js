/* 
    author: Kwon, Hyojung
    define scripts for ~/Views/Search/Index.cshtml
*/

;ktc.namespace('ktc.view');

ktc.view.searchIndexView = (function ($, ktc) {

    var $tabs = $();

    $(function () {
        var datepickerOption;

        $('#menu-search').addClass('active-menu');

        // initiate tabs
        $tabs = $('#search-index-wrapper').tabs({
            spinner: "Retrieving data...",
            tabTemplate: '<li><a href="#{href}">#{label}</a><img class="close-tab" src="/Images/icn_sear_ptbanner_close.png" /></li>',
            add: function (event, ui) {
                log('add tab ');
                //$(ui.panel).append("<p data-bind='click:test'>Hello</p>");
            }
        });

        setBodyTableWrapperTop('#tabs-1');
        setTableWidth('#tabs-1');
        setFakeTable('#tabs-1');

        $(window).resize(function () {
            var tabId = $('.ui-tabs-selected a').attr('href');

            setBodyTableWrapperTop(tabId);
            setTableWidth(tabId);
            setFakeTable(tabId);
        });

        // bind datepicker
        bindDatePicker();

        // select tab event
        bindTabSelectEvent();

        // close tab
        bindTabCloseEvent();

        // add tab
        bindGridDoubleClickEvent();

        // list all or folder view 
        bindListFolderButtonEvent();

        // filters by document type
        bindFilterClickEvent();

        // expand & collapse group of rows
        bindFolderRowClickedEvent();        
    });

    function getSelectedTabId() {
        return $('.ui-tabs-selected a').attr('href').replace('#', '');
    }

    function bindDatePicker() {
        datepickerOption = { 'dateFormat': 'yy-mm-dd' };
        $('.date-from').datepicker(datepickerOption);
        $('.date-to').datepicker(datepickerOption);
    }

    function bindFilterClickEvent() {
        $('.filters label').click(function () {
            var tabId = '#' + getSelectedTabId() + ' ';
            $(tabId + '.filters label').removeClass('active-filter');
            $(this).addClass('active-filter');
        });
    }

    function bindFolderRowClickedEvent() {
        $('.folder-row').on('click', function () {
            var dataFolder = $(this).attr('data-folder'),
                tabId = '#' + getSelectedTabId();  

            if (dataFolder) {
                $(this).siblings('tr[data-folder=' + dataFolder + ']').toggle(0, function () {
                    setTableWidth(tabId);
                    setFakeTable(tabId);
                    changeButtonImage(true, tabId, dataFolder);
                });

            } else {
                // hide all tr those are next of current tr
                $(this).nextAll('tr').toggle(0, function () {
                    setTableWidth(tabId);
                    setFakeTable(tabId);
                    changeButtonImage(false, tabId);
                });
            }
        });
    }

    function bindListFolderButtonEvent() {
        var tabId;
        $('.view-choice-listall').click(function () {
            tabId = '#' + getSelectedTabId() + ' ';
            $(this).attr('src', '/Images/icn_list_press.png');
            $(tabId + '.view-choice-folder').attr('src', '/Images/icn_fol_nor.png');
        });

        $('.view-choice-folder').click(function () {
            tabId = '#' + getSelectedTabId() + ' ';
            $(this).attr('src', '/Images/icn_fol_press.png');
            $(tabId + '.view-choice-listall').attr('src', '/Images/icn_list_nor.png');
        });
    }

    // change expand/collapse button image
    function changeButtonImage(isUnderFolder, tabId, dataFolder) {
        var isVisibleNow,
            tabId = 'div' + tabId + ' ';

        if (isUnderFolder) {
            isVisibleNow = $(tabId + 'tr[data-folder=' + dataFolder + ']:not(.folder-row)').css('display');

            if (isVisibleNow === 'none') {
                $(tabId + 'tr[data-folder=' + dataFolder + '] img.folder-collapse').attr('src', '/Images/img_group_arr_dn.png');
            } else {
                $(tabId + 'tr[data-folder=' + dataFolder + '] img.folder-collapse').attr('src', '/Images/img_group_arr_up.png');
            }
        } else {
            isVisibleNow = $(tabId + 'tr.no-folder + tr').css('display');

            if (isVisibleNow === 'none') {
                $(tabId + 'img.no-folder-collapse').attr('src', '/Images/img_nogroup_arr_dn.png');
            } else {
                $(tabId + 'img.no-folder-collapse').attr('src', '/Images/img_nogroup_arr_up.png');
            }
        }

    }

    // bind GridDoubleClickEvent
    function bindGridDoubleClickEvent() {
        //$('#tabs-1 .body-table:not(.fake) tr').dblclick(function () {
        //    // prevent text selection after double click
        //    if (document.selection && document.selection.empty) {
        //        document.selection.empty();
        //    } else if (window.getSelection) {
        //        var sel = window.getSelection();
        //        sel.removeAllRanges();
        //    }

        //    addTab();
        //});
    }

    // add tab
    function addTab(callback) {
        var lastTabId = $('#tabs li:last a').attr('href'),
            nextTabNumber = parseInt(lastTabId.substring(lastTabId.indexOf('-') + 1)) + 1;

        $tabs.tabs("add", "#tabs-" + nextTabNumber, 'tabs-' + nextTabNumber);
        //$tabs.tabs("add", '/Templates/tabItem.html', 'tab-' + nextTabNumber);

        // add several events to the newly added tab
        bindTabCloseEvent("#tabs-" + nextTabNumber);
        bindTabSelectEvent("#tabs-" + nextTabNumber);

        callback('tabs-' + nextTabNumber);
    }

    // close tab 
    function bindTabCloseEvent(tabId) {
        var selectedTabId, tabIdToClose;

        if (tabId) {
            tabId = 'a[href=' + tabId + '] + img.close-tab';
        } else {
            tabId = 'img.close-tab';
        }

        $(tabId).on('click', function () {
            selectedTabId = $('ul#tabs li.ui-tabs-selected a').attr('href');
            tabIdToClose = $(this).parent().children('a').attr('href');

            $tabs.tabs('remove', tabIdToClose);

            if (selectedTabId === tabIdToClose) {
                $tabs.tabs('select', 0);
            }
        });
    }

    // tab select 
    function bindTabSelectEvent(tabId) {
        if (tabId) {
            tabId = '#tabs li a[href=' + tabId + ']';
        } else {
            tabId = '#tabs li a';
        }

        // use click event of 'li a' rather than 'tabsselect' event in jQueryUI tab api,
        // 'tabsselect' event's callback function is not proper to manipulate ui-tab-panel
        // because ui-tab-panel is still display:none even though users click tab header in 'tabsselect' event 
        // in addition, executing two functions with time interval will secure expecting result
        $(tabId).on('click', function () {
            var tabIdToSelect = $(this).attr('href');

            setTimeout(function () {
                setBodyTableWrapperTop(tabIdToSelect);
                setTableWidth(tabIdToSelect);
                setFakeTable(tabIdToSelect);
            }, 1);
        });
    }

    // set width of the tables in order to align header-table with body-table 
    function setTableWidth(tabId) {
        if (tabId) {
            tabId = tabId + ' ';
        } else {
            tabId = '#' + getSelectedTabId() + ' ';
        }

        var heightBodyTableWrapper = $(tabId + '.body-table-wrapper').height()
        , heightBodyTable = $(tabId + '.body-table').height()
        , widthSearchlIndexWrapper = $('#search-index-wrapper').width()
        , scrollbarWidth = 15;

        if ($.browser.chrome) {
            scrollbarWidth = 11;
        }

        if (heightBodyTable > heightBodyTableWrapper) {     // in case of vertical scroll appears
            $(tabId + '.header-table').width(widthSearchlIndexWrapper - scrollbarWidth);
            $(tabId + '.body-table').width(widthSearchlIndexWrapper - scrollbarWidth);
        } else {
            $(tabId + '.header-table').width(widthSearchlIndexWrapper);
            $(tabId + '.body-table').width(widthSearchlIndexWrapper);
        }
    }

    // fill blank space at the below of the real table with empty rows
    function setFakeTable(tabId) {
        if (tabId) {
            tabId = tabId + ' ';
        } else {
            tabId = '#' + getSelectedTabId() + ' ';
        }

        var heightBodyTableWrapper = $(tabId + '.body-table-wrapper').height()
            , heightBodyTable = $(tabId + 'table.body-table:first').height()
            , rows = $(tabId + 'table.body-table:first tbody tr').length;

        $(tabId + 'table.fake').height(heightBodyTableWrapper - heightBodyTable);
        if (rows % 2 === 1) {
            $(tabId + '.fake tr').css('background', 'url(../Images/list_line_bg03.png)');
        } else {
            $(tabId + '.fake tr').css('background', 'url(../Images/list_line_bg02.png)');
        }
    }

    // change position of the body-table-wrapper
    function setBodyTableWrapperTop(tabId) {
        if (tabId) {
            tabId = tabId + ' ';
        } else {
            tabId = '#' + getSelectedTabId() + ' ';
        }

        var tabHeaderHeight = $('#tabs').height(),
            toolbarHeight = $(tabId + '.patient-search-toolbar').height(),
            headerTableHeight = $(tabId + '.header-table').height();

        if (!toolbarHeight)
            toolbarHeight = $(tabId + '.document-search-toolbar').height();

        $(tabId + '.body-table-wrapper').css('top', tabHeaderHeight + toolbarHeight + headerTableHeight);
    }

    return {
        setBodyTableWrapperTop: setBodyTableWrapperTop,
        setTableWidth: setTableWidth,
        setFakeTable: setFakeTable,
        bindGridDoubleClickEvent: bindGridDoubleClickEvent,
        addTab: addTab
    }

})(jQuery, ktc);