/* 
    author: Kwon, Hyojung
    define scripts for ~/Views/Referral/Index.cshtml
*/

;ktc.namespace('ktc.view');

ktc.view.referralIndexView = (function ($, ktc) {
    var pageInitialized = false;    // represents page is loaded by server, to protect from calling server twice when the page is loading for the first time


    $(function () {
        $('#menu-referral').addClass('active-menu');

        // set jquery ui calendar
        var datepickerOption = { 'dateFormat': 'yy-mm-dd' };
        $('#date-from').datepicker(datepickerOption);
        $('#date-to').datepicker(datepickerOption);

        $(window).resize(function () {
            setTableWidth();
            setFakeTable();
        });
    });

    // show popup window around the current mouse position
    function setPopup() {
        $('.body-table:first tbody tr').on('contextmenu', function (e) {
            var x = e.pageX;
            var y = e.pageY;

            $('.popup').fadeOut(1)
                        .css({ left: x - 30, top: y - 90 })
                        .fadeIn();

            return false;
        });

        $('.body-table:first tbody tr').on('mouseover', function (e) {
            $('.popup').hide();
        });

        $('html').click(function () {
            $('.popup').fadeOut();
        });
    }

    // set width of the tables in order to align header-table with body-table 
    function setTableWidth() {
        var heightBodyTableWrapper = $('.body-table-wrapper').height()
        , heightBodyTable = $('.body-table').height()
        , widthReferralIndexWrapper = $('#referral-index-wrapper').width()
        , scrollbarWidth = 15;

        if ($.browser.chrome) {
            scrollbarWidth = 11;
        }

        if (heightBodyTable > heightBodyTableWrapper) {     // in case of vertical scroll appears
            $('.header-table').width(widthReferralIndexWrapper - scrollbarWidth);
            $('.body-table').width(widthReferralIndexWrapper - scrollbarWidth);
        } else {
            $('.header-table').width(widthReferralIndexWrapper);
            $('.body-table').width(widthReferralIndexWrapper - 1);    // minus 1 is because of width of border
            $('.body-table').css('border-right', 'solid 1px #7ea9d0');
        }

        //log('referral-index-wrapper=' + widthReferralIndexWrapper +
        //    ', header table=' + $('.header-table').width() +
        //    ', body table=' + $('.body-table').width());
    }

    // fill blank space at the below of the real table with empty rows
    function setFakeTable() {
        var heightBodyTableWrapper = $('.body-table-wrapper').height()
            , heightRealTable = $('table.body-table:first').height()
            , rows = $('table.body-table:first tbody tr').length;

        $('#fake').height(heightBodyTableWrapper - heightRealTable);
        if (rows % 2 === 1) {
            $('#fake tr').css('background', 'url(../Images/list_line_bg03.png)');
        } else {
            $('#fake tr').css('background', 'url(../Images/list_line_bg02.png)');
        }
    }

    function styleStatus() {
        $('.col1').each(function () {
            if ($(this).text().toLowerCase() == 'new') {
                $(this).addClass('status-new');
            } else if ($(this).text().toLowerCase() == 'edit') {
                $(this).addClass('status-edit');
            }
        });
    }

    return {
        pageInitialized: pageInitialized,
        setTableWidth: setTableWidth,
        setFakeTable: setFakeTable,
        styleStatus: styleStatus,
        setPopup: setPopup
    }


})(jQuery, ktc);