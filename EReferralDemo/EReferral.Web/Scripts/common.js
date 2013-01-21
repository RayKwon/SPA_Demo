ktc.namespace('ktc.common');
ktc.common = (function () {

    Date.prototype.addDays = function (days) {
        this.setDate(this.getDate() + days);
        return this;
    };

    // remove elements in array
    // usage : var fruits = ["Banana", "Orange", "Apple", "Mango"];
    //         fruits.remove(2, 3);
    //         fruits => ["Banana", "Orange"]
    Array.prototype.remove = function (from, to) {
        this.splice(from,
          !to ||
          1 + to - from + (!(to < 0 ^ from >= 0) && (to < 0 || -1) * this.length));
        return this.length;
    };

    function showSuccessMessage(msg, timeOut) {
        msg = msg || 'Success !!';
        timeOut = timeOut || 3000;

        toastr.options = { timeOut: timeOut, tapToDismiss: true, positionClass: 'toast-bottom-right' };
        toastr.success(msg, 'eReferral');
    }

    function showWarningMessage(msg, timeOut) {
        msg = msg || 'Warning !!';
        timeOut = timeOut || 3000;

        toastr.options = { timeOut: timeOut, tapToDismiss: true, positionClass: 'toast-bottom-right' };
        toastr.warning(msg, 'eReferral');
    }

    return {
        showSuccessMessage: showSuccessMessage,
        showWarningMessage: showWarningMessage
    };
}());