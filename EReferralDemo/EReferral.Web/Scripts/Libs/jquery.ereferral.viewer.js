(function ($) {
    
    $.extend($, {
        setDroppableViewer: function (viewer) {
            viewer.droppable({
                accept: 'tbody tr',
                drop: function (e, ui) {
                    var docId = $(ui.draggable).draggable("option", "containment");
                    ktc.vm.docIndexVM.addDocumentItemToViewer(viewer, docId);
                }
            });
        },

        initViewerData: function (viewer) {

            var map = new Object();
            map["background"] = viewer.css("background-color");
            map["contrast"] = 1;
            map["isInverted"] = false;
            map["zoom"] = false;

            viewer.data("toolbar", map);
        },

        setDataForToolbarAndViewer: function (obj, name, data) {
            if (obj == null)
                return;

            var map = obj.data("toolbar");
            map[name] = data;
        },

        getDataForToolbarAndViewer: function (obj, name) {
            if (obj == null) {
                return;
            }

            var map = obj.data("toolbar");
            return map[name];
        },
       
        calculatePopupPosition: function (toolbar, tool, target) {
            var newPosLeft = toolbar.position().left + parseInt(toolbar.css('margin-left').replace("px", "")) + tool.position().left -1
                , newPosTop = toolbar.position().top + parseInt(toolbar.css('margin-top').replace("px", ""))+ tool.height() + 1;
            target.css({ "left": newPosLeft, "top": newPosTop });
        },

        setThumbnailExpander: function (obj) {

            var defaultThumbnailHeight = 109// thumbnail content's height
            , collapsedHeight = 6// slide down except the arrow
            , animationSpeed = 300
            , id = obj.attr('id') //.doc-viewer-item
            , $thumbnailWrapper = obj.children('.thumbnail-wrapper')
            , $thumbnailList = $thumbnailWrapper.children('.thumbnail-content')
            , $btnThumbnail = obj.children('.btn-thumbnail')
            , $docContentWrapper = obj.children('.doc-content-wrapper')
            , $btnThumbnailPre = $thumbnailWrapper.children('.thumbnail-pre')
            , $btnThumbnailNext = $thumbnailWrapper.children('.thumbnail-next');

            $.makeDocViewItemExpandable({
                defaultThumbnailHeight: defaultThumbnailHeight,
                animationSpeed: animationSpeed,
                collapsedHeight: collapsedHeight,
                $thumbnailWrapper: $thumbnailWrapper,
                $thumbnailList: $thumbnailList,
                $btnThumbnail: $btnThumbnail,
                $btnThumbnailPre: $btnThumbnailPre,
                $btnThumbnailNext: $btnThumbnailNext
            });
        },


        /* new function - 20120927 */
        applyMagnify: function (apply) {

            var selectedViewer = ktc.vm.docIndexVM.selectedViewer(),
                obj = $("#magnify"),
                contentContainer = $(selectedViewer.find('.doc-content-main')),
                contentImg = $(selectedViewer.find('.content-img')),
                newImg = new Image();

            if (apply) {
                obj.addClass('selected');
                contentContainer.css("cursor", "url(../Images/cur_mag.png), auto");

                newImg.src = contentImg.attr('src');
                $(newImg).load(function () {
                    $.magnify(
                        contentImg
                        , contentContainer.find(".mag")
                        , contentContainer.find(".mag-bg")
                        , this.height
                        , this.width
                    );
                });

            } else {
                obj.removeClass('selected');
                contentContainer.css("cursor", "default");
                contentImg.unbind("mousemove");
            }
        },

        applyMove: function (apply) {

            var selectedViewer = ktc.vm.docIndexVM.selectedViewer(),
                obj = $("#move"),
                contentContainer = $(selectedViewer.find('.doc-content-main')),
                contentImg = $(selectedViewer.find('.content-img'));

            if (apply) {
                obj.addClass('selected');
                contentContainer.css("cursor", "url(../Images/cur_hand.png), auto");
                $.move(contentContainer);
            } else {
                obj.removeClass('selected');
                contentContainer.css("cursor", "default");
                $.stop(contentContainer);
            }
        },
        applyFilter: function (element) {
            var invert = ($.getDataForToolbarAndViewer(ktc.vm.docIndexVM.selectedViewer(), 'isInverted')) ? "invert(100%)" : ""
                , contrastValue = $.getDataForToolbarAndViewer(ktc.vm.docIndexVM.selectedViewer(), 'contrast')
                , contrastStr = "";

            if (invert.length > 0 || (contrastValue > 1 || contrastValue < 1)) {
                ktc.vm.docIndexVM.effectOff(false);
            } else {
                ktc.vm.docIndexVM.effectOff(true);
            }

            //chrome only
            contrastStr = " contrast(" + contrastValue + ")";

            element.css("-webkit-filter", invert + contrastStr);
            element.css("-moz-filter", invert + contrastStr);
            element.css("-ms-filter", invert + contrastStr);
            element.css("-o-filter", invert + contrastStr);
            element.css("filter", invert + contrastStr);
        }


    });

})(jQuery);