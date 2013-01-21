jQuery.fn.single_click = function (single_click_callback) {

    var delay = 300;

    return this.each(function () {

        var clicks = 0, timer = null, self = this;
        jQuery(this).click(function (event) {
            clicks++;

            if (clicks === 1) {
                timer = setTimeout(function () {
                    single_click_callback.call(self, event);
                    clicks = 0;
                }, delay);
            } else {
                clearTimeout(timer);
                clicks = 0;
            }
        });

    });
}