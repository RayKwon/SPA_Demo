/* 
    author: Kwon, Hyojung
    define scripts for ~/Views/Search/Index.cshtml
*/

; ktc.namespace('ktc.view');

ktc.view.searchIndexView = (function ($, ktc) {

    var $tabs = $();

    $(function () {
        var datepickerOption;

        $('#menu-search').addClass('active-menu');

        // initiate tabs
        $tabs = $('#search-index-wrapper').tabs({});

        $(window).resize(function () {
            var tabId = $('.ui-tabs-selected a').attr('href');

            setBodyTableWrapperTop(tabId);
            setTableWidth(tabId);
            setFakeTable(tabId);
        });

    });

    function getSelectedTabId() {
        return $('.ui-tabs-selected a').attr('href').replace('#', '');
    }

    function bindDatePicker() {
        var tabId = '#' + getSelectedTabId() + ' ';

        datepickerOption = { 'dateFormat': 'yy-mm-dd' };
        $(tabId + '.date-from').datepicker(datepickerOption);
        $(tabId + '.date-to').datepicker(datepickerOption);
    }

    function bindFolderRowClickEvent(event) {
        $('.folder-row').off('click');
        $('.folder-row').on('click', headerRowClick);

        function headerRowClick() {
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
        }
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

                bindDatePicker();
                bindFolderRowClickEvent();
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

    function refreshAnimation() {
        var tabId = '#' + getSelectedTabId() + ' '
        currentColor = $(tabId + '.body-table-wrapper .body-table:first tr').css('background');

        $(tabId + '.body-table-wrapper .body-table:first tr').animate({ 'borderColor': '#d7d9d9' }, 1000);

        setTimeout(function () {
            $(tabId + '.body-table-wrapper .body-table:first tr').css({ 'background': currentColor }, 500);
        }, 1000);
    }

    return {
        setBodyTableWrapperTop: setBodyTableWrapperTop,
        setTableWidth: setTableWidth,
        setFakeTable: setFakeTable,
        bindTabSelectEvent: bindTabSelectEvent,
        bindDatePicker: bindDatePicker,
        bindFolderRowClickEvent: bindFolderRowClickEvent,
        refreshAnimation: refreshAnimation,
    };

})(jQuery, ktc);