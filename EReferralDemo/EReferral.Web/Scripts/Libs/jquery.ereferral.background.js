(function ($) {
    $.extend($, {
        background: function (element, color) {
            element.css("background-color", color);
        },

        border: function (element, color) {
            element.css("border-color", color);
        }
    })
})(jQuery);