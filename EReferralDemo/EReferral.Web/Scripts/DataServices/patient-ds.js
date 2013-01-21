/* 
    author: Kwon, Hyojung
    invoke server side ajax service for patient data
*/

;ktc.namespace('ktc.data');
ktc.data.patientDataService = (function () {
    var patientTemplate = {
        "patients|5-30": [
            {
                "patientName": "@MALE_FIRST_NAME @LAST_NAME",
                "id|8-8": "@NUMBER",
                "age|1-2": "@NUMBER",
                "gender": "@GENDER",
                "dateOfBirth": "@DATE_YYYY-@DATE_MM-@DATE_DD"
            }
        ]
    },    

    getPatientList = function (searchValue, callback) {
        /// <summary>get all patients</summary>
        /// <param name="searchValue"></param>
        /// <param name="callback">callback function to be called after execution</param>

        $.ajax({
            url: "api/patients",
            cache: false,
            type: "GET",
            dataType: "json",
            data: searchValue,
            success: function (result) {

                _.each(searchValue, function (tag) {
                    result.patients = _.filter(result.patients, function (r) {
                        if (tag.tagName === 'PATIENT NAME') {
                            return r.patientName === tag.tagValue;
                        } else if (tag.tagName === 'ID') {
                            return r.Id === tag.tagValue;
                        } else if (tag.tagName === 'DATE OF BIRTH') {
                            return r.dateOfBirth === tag.tagValue;
                        }
                    });

                });

                callback(result.patients);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                log(jqXHR.responseText);
            }
        });
    };


    /* create regular expression for request */
    $.mockJSON(/api\/patients/, patientTemplate);

    /* add custom mock keywords */
    $.mockJSON.data.GENDER = ['M', 'F'];
    

    return {
        getPatientList: getPatientList
    };
})();