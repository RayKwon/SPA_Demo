ktc.namespace('ktc.view');

ktc.view.docIndexView = (function ($, ktc) {

    /* expandable panel & clickable viewer */
    var defaultDocListWidth = 342
        , animationSpeed = 300
        , collapsedWidth = 20 // slide left
        , thumnailSize = 86
        , thumbMaxWidth = 86 // Max width for the thumb
        , thumbMaxHeight = 86    // Max height for the thumb

    /* ready */
    $(function () {

        /* top menu */
        $('#menu-document').addClass('active-menu');

        /* list - left */
        $.makeListPanelExpandable({
            defaultDocListWidth: defaultDocListWidth,
            animationSpeed: animationSpeed,
            collapsedWidth: collapsedWidth,
            $docViewerWrapper: $('#doc-viewer-wrapper'),
            $docListWrapper: $('#doc-list-wrapper'),
            $docListContent: $('#doc-list-content'),
            $btnDocList: $('#btn-doc-list')
        });

        /* add note */
        $('#add-note').click(function () {
            $('#add-note-panel').fadeIn();
        });

        $('#add-note-panel-close').click(function () {
            $('#add-note-panel').fadeOut();
            $('#add-note-panel').find('textarea').val('');
        });

        $('#add-note-panel-save').click(function () {
            $('#add-note-panel').fadeOut();
        });

        /* Common */
        $(window).resize(function () {
            /* toolbar position */
            $.calculatePopupPosition($('#toolbar'), $("#contrast"), $("#contrast-slider-container"));
            $.calculatePopupPosition($('#toolbar'), $("#compare"), $("#compare-container"));
            $.calculatePopupPosition($('#toolbar'), $("#background"), $("#background-container"));
        });

        $("body").click(function () {
            $('.popup').fadeOut('fast');
        });

    });

    return {
        
    }

})(jQuery, ktc);

