(function ($) {
    $.extend($, {
        restore: function (element, height, width, top, left) {
            var marginTop = -(height / 2)
                , marginLeft = -(width / 2);

            $("#magnify").find("img").attr("src", "../Images/icn_mag.png");

            if (element.find("img") !== null) {
                element.find('img').animate({
                    "width": width,
                    "height": height
                }, { duration: 400, queue: false });
                
                element.animate({
                    "top": "50%",
                    "left": "50%",
                    "margin-left": marginLeft,
                    "margin-top": marginTop
                }, { duration: 400, queue: false });
                
                //element.find("img").animate({ "width": width, "height": height }, { duration: 400, queue: false });
            } else {
                element.animate({ "top": top, "left": left, "margin-left": marginLeft, "margin-top": marginTop });
            }
        }
    });
})(jQuery);