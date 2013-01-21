(function ($) {

    $.fn.docMouseDown = function (docId) {
        this.each(function () {

            var item = $(this);

            item.mousedown(function () {
                $(this).draggable({
                    cursor: "move",
                    cursorAt: { top: -12, left: -20 },
                    helper: "clone",
                    zIndex: 999,
                    appendTo: 'body',
                    scroll: false,
                    containment: docId,
                    start: function (e, ui) {
                        $(ui.helper).addClass("helper");
                    },
                    stop: function (e, ui) {
                        //alert('stop');
                    }
                });

                $('tbody tr').removeClass('selected-tr');
                $('tbody tr td').removeClass('selected-td');
                $(this).addClass('selected-tr');
                $(this).children('td').addClass('selected-td');
            });

        });
    };

    $.fn.docDbClick = function (docId) {
        this.each(function () {
            var item = $(this);
            item.dblclick(function () {

                ktc.vm.docIndexVM.addDocumentItemToViewer(ktc.vm.docIndexVM.selectedViewer(), docId);

                $('tbody tr').removeClass('selected-tr');
                $('tbody tr td').removeClass('selected-td');
                $(this).addClass('selected-tr');
                $(this).children('td').addClass('selected-td');
            });
        });
    };


})(jQuery);