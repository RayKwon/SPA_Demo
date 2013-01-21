(function ($) {

    $.extend($, {

        /* Document list expander */
        makeListPanelExpandable: function (options) {
            var defaults;

            defaults = {
                defaultDocListWidth: 342,
                animationSpeed: 300,
                collapsedWidth: 20,
                $docViewerWrapper: undefined,
                $docListWrapper: undefined,
                $docListContent: undefined,
                $btnDocList: undefined
            }

            $.extend(defaults, options);

            if (!defaults.$docViewerWrapper) {
                throw new Error('The $docViewerWrapper in options object must have value');
                return;
            }

            if (!defaults.$docListWrapper) {
                throw new Error('The $docListWrapper in options object must have value');
                return;
            }

            if (!defaults.$docListContent) {
                throw new Error('The $docListContent in options object must have value');
                return;
            }

            if (!defaults.$btnDocList) {
                throw new Error('The $btnDocList in options object must have value');
                return;
            }

            defaults.$btnDocList.click(function () {

                var docListWrapperWidth = 0
                    , docViewerWrapperLeft = 0;

                defaults.$btnDocList.empty();
                
                if (isExpandWidth(defaults.$docListWrapper)) {
                    defaults.$btnDocList.append('<img src="../Images/arrow_black_open.png" />');
                    docListWrapperWidth = defaults.collapsedWidth;
                    docViewerWrapperLeft = defaults.collapsedWidth;
                } else {
                    defaults.$btnDocList.append('<img src="../Images/arrow_black.png" />');
                    docListWrapperWidth = defaults.defaultDocListWidth;
                    docViewerWrapperLeft = defaults.defaultDocListWidth;
                    
                }

                defaults.$docListWrapper.animate({ width: docListWrapperWidth }, defaults.animationSpeed);
                defaults.$docViewerWrapper.animate({ left: docViewerWrapperLeft }, defaults.animationSpeed, function () {
                    $(window).resize(); //for thumbnail viewer's pre and next buttons
                });

                defaults.$docListContent.fadeToggle();

            });

            function isExpandWidth(obj) {
                if (obj.width() > defaults.collapsedWidth) {
                    return true;
                }
                return false;
            }
        },

        /* Thumbnail expander */
        makeDocViewItemExpandable: function (options) {

            var defaults;

            defaults = {
                defaultThumbnailHeight: 109,
                animationSpeed: 300,
                collapsedHeight: 6,
                $thumbnailWrapper: undefined,
                $thumbnailList: undefined,
                $btnThumbnail: undefined,
                $btnThumbnailPre: undefined,
                $btnThumbnailNext: undefined
            }

            $.extend(defaults, options);

            if (!defaults.$thumbnailWrapper) {
                throw new Error('The $thumbnailWrapper in options object must have value');
                return;
            }

            if (!defaults.$thumbnailList) {
                throw new Error('The $thumbnailList in options object must have value');
                return;
            }

            if (!defaults.$btnThumbnail) {
                throw new Error('The $btnThumbnail in options object must have value');
                return;
            }
            
            defaults.$btnThumbnail.click(function () {
                if (isExpandHeight(defaults.$thumbnailWrapper)) {
                    defaults.$btnThumbnail.css('background-image', 'url(\'../Images/arrow_white_open.png\')');
                    defaults.$btnThumbnail.animate({ bottom: defaults.collapsedHeight }, defaults.animationSpeed);
                    defaults.$thumbnailWrapper.animate({ height: defaults.collapsedHeight }, defaults.animationSpeed);
                } else {
                    defaults.$btnThumbnail.css('background-image', 'url(\'../Images/arrow_white.png\')');
                    defaults.$btnThumbnail.animate({ bottom: defaults.defaultThumbnailHeight }, defaults.animationSpeed);
                    defaults.$thumbnailWrapper.animate({ height: defaults.defaultThumbnailHeight }, defaults.animationSpeed);

                }
            });

            function isExpandHeight(obj) {
                if (obj.height() > defaults.collapsedHeight) {
                    return true;
                }
                return false;
            }
        }

    });
})(jQuery);