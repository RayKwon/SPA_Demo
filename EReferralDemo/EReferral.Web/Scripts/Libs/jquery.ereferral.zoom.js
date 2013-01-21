(function ($) {
    $.extend($, {
        zoomIn: function (element, height, width) {
            var priorWidth = width
                , priorHeight = height
                , marginTop = 0
                , marginLeft = 0;

            height += parseInt(height * 0.2);
            width += parseInt(width * 0.2);
            element.css({ "height": height, "width": width });

            marginTop = -(height / 2);
            marginLeft = -(width / 2);
            element.parent().css({ "margin-left": marginLeft, "margin-top": marginTop });
            
        },
        zoomOut: function (element, height, width) {
            var priorWidth = width
                , priorHeight = height
                , marginTop = 0
                , marginLeft = 0;

            if ( height < 100 ) {
                return;
            }

            height -= parseInt(height * 0.2);
            width -= parseInt(width * 0.2);
            element.css({ "height": height, "width": width });

            marginTop = -(height / 2);
            marginLeft = -(width / 2);
            element.parent().css({ "margin-left": marginLeft, "margin-top": marginTop });
        }
    });
})(jQuery);