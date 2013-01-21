/* 
    author: Kwon, Hyojung
    invoke server side ajax service for referral data
*/

;ktc.namespace('ktc.data');
ktc.data.referralDataService = (function () {
    var referralTemplate = {
        "allreferrals|10-300": [
            {
                "state": "@REFERRAL_STATUS",
                "date": "@DATE_YYYY-@DATE_MM-@DATE_DD",
                "patientName": "@MALE_FIRST_NAME @LAST_NAME",
                "id|8-8": "@NUMBER",
                "referral": "@REFERRAL_NAME",
                "clinic": "@CLINIC",
                "from": "@MALE_FIRST_NAME @LAST_NAME"
            }
        ]
    },

    // return server time in yyyy-mm-dd format
    // TODO : use server method in real
    getServerTime = function (daysToAdd) {
        var currentTime = new Date(),   // get server time in yyyy-mm-dd format, e.g. var currentTime = new Date('2012-08-05')
            yyyy, mm, dd;

        if(daysToAdd)
            currentTime = currentTime.addDays(daysToAdd);

        yyyy = currentTime.getFullYear();
        mm = currentTime.getMonth() + 1;
        dd = currentTime.getDate();

        if (mm < 10)
            mm = '0' + mm.toString();

        if (dd < 10)
            dd = '0' + dd.toString();

        return yyyy.toString() + '-' + mm.toString() + '-' + dd.toString();
    },

    getReferralList = function (referralStatus, dateFrom, dateTo, callback) {
        /// <summary>get all referrals</summary>
        /// <param name="referralStatus">status of referral, e.g. 'all', 'new', 'edit'</param>
        /// <param name="callback">callback function to be called after execution</param>

        $.ajax({
            url: "api/referrals/?status=&dateFrom=&dateTo=",
            cache: false,
            type: "GET",
            dataType: "json",
            data: { status: referralStatus, dateFrom: dateFrom, dateTo: dateTo },
            success: function (result) {
                if (referralStatus === 'new' || referralStatus === 'edit') {
                    result.allreferrals = _.filter(result.allreferrals, function (r) {
                        return r.state.toUpperCase() === referralStatus.toUpperCase();
                    });
                }

                if (dateFrom && dateTo) {
                    dateFrom = dateFrom.replace(/-/g, '');
                    dateTo = dateTo.replace(/-/g, '');

                    result.allreferrals = _.filter(result.allreferrals, function (r) {
                        return parseInt(r.date.replace(/-/g, '')) >= parseInt(dateFrom)
                                &&
                               parseInt(r.date.replace(/-/g, '')) <= parseInt(dateTo);
                    });
                }

                callback(result.allreferrals);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                log(jqXHR.responseText);
            }
        });
    },

    getReferralListByStatus = function (referralStatus, callback) {
        $.ajax({
            url: "api/referrals/?status=",
            cache: false,
            type: "GET",
            dataType: "json",
            data: { status: referralStatus },
            success: function (result) {
                result.allreferrals = _.filter(result.allreferrals, function (r) {
                    return r.state.toUpperCase() === referralStatus.toUpperCase();
                });
                callback(result.allpatients);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                log(jqXHR.responseText);
            }
        });
    };

    /* create regular expression for request */
    $.mockJSON(/api\/referrals\/?status=/, referralTemplate);
    $.mockJSON(/api\/referrals/, referralTemplate);
    

    /* add custom mock keywords */
    $.mockJSON.data.REFERRAL_STATUS = ['NEW', 'EDIT'];
    $.mockJSON.data.REFERRAL_NAME = ['Discharge Summary', 'Transfer Summary'];
    $.mockJSON.data.CLINIC = ['Songdo Medical Center','Incheon Hospital','Bupyoung Care Medical Center'];
    

    return {
        getReferralList: getReferralList,
        getReferralListByStatus: getReferralListByStatus,
        getServerTime: getServerTime
    };
})();