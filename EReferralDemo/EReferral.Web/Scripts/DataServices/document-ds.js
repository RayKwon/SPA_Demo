/* 
    author: Kwon, Hyojung
    invoke server side ajax service for document data
*/

; ktc.namespace('ktc.data');
ktc.data.documentDataService = (function ($) {
    var documentTemplate = {
        "documents|5-30": [
            {
                "type": "@TYPE",
                "date": "@DATE_YYYY-@DATE_MM-@DATE_DD",
                "documentName": "@DOCUMENT_NAME",
                "clinic": "@CLINIC",
                "from": "@MALE_FIRST_NAME @LAST_NAME",
                "folderId": "@FOLDER_ID",
                "folderDate": "@DATE_YYYY-@DATE_MM-@DATE_DD",
                "folderReferralName": "@DOCUMENT_NAME",
                "folderFrom": "@MALE_FIRST_NAME @LAST_NAME"
            }
        ]
    },

    getDocumentList = function (documentName, dateFrom, dateTo, callback) {

        $.ajax({
            url: "api/documents",
            cache: false,
            type: "GET",
            dataType: "json",
            data: { dateFrom: dateFrom, dateTo: dateTo },
            success: function (result) {
                if (documentName) {
                    result.documents = _.filter(result.documents, function (d) {
                        return d.documentName.toLowerCase().indexOf(documentName.toLowerCase()) > -1;
                    });
                }

                if (dateFrom && dateTo) {
                    dateFrom = dateFrom.replace(/-/g, '');
                    dateTo = dateTo.replace(/-/g, '');

                    result.documents = _.filter(result.documents, function (r) {
                        return parseInt(r.date.replace(/-/g, '')) >= parseInt(dateFrom)
                                &&
                               parseInt(r.date.replace(/-/g, '')) <= parseInt(dateTo);
                    });
                }

                callback(result.documents);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                log(jqXHR.responseText);
            }
        });
    };


    /* create regular expression for request */
    $.mockJSON(/api\/documents/, documentTemplate);

    /* add custom mock keywords */
    $.mockJSON.data.TYPE = ['jpg', 'txt', 'pdf', 'ccd'];
    $.mockJSON.data.DOCUMENT_NAME = ['Discharge Summary', 'Transfer Summary', 'Lab Results', 'CT Image', 'MR Image'];
    $.mockJSON.data.CLINIC = ['Songdo Medical Center', 'Incheon Hospital', 'Bupyoung Care Medical Center'];
    $.mockJSON.data.FOLDER_ID = ['1', '2', '3', '4', ''];


    return {
        getDocumentList: getDocumentList
    };
})(jQuery);