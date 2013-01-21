(function ($) {
    $.extend($, {
        magnify: function (element, mag, magBg, height, width) {
            /// <param name="element">element to be maginified</param>

            var largeWidth = parseInt(width * 2)
                , largeHeight = parseInt(height * 2);

            element.bind("mousemove", function () {
                $(document).mousemove(function (e) {
                    var xs = e.pageX - element.offset().left
                        , ys = e.pageY - element.offset().top
                        , bx = magBg.width() / 2 - xs * largeWidth / width
                        , by = magBg.height() / 2 - ys * largeHeight / height;

                    mag.css("left", xs - 100 + "px").css("top", ys - 100 + "px");
                    magBg.css("background-position", bx + "px " + by + "px");

                    if (bx < -largeWidth || by < -largeHeight || bx > 150 || by > 150) {
                        mag.fadeOut("fast");
                    }
                });

                mag.fadeIn("fast");
            });

            element.parent().draggable({
                disabled: true
            });

            element.parent().removeClass("ui-state-disabled");
        }
    });
})(jQuery);