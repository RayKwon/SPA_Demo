; ktc.namespace('ktc.vm');
ktc.vm.docIndexVM = (function (ktc, ko) {

    var thumnailSize = 86,
        BackColor = function (id, colorCode) {
            this.id = id;
            this.colorCode = colorCode;
        },
        backgroundColors = [
            new BackColor("white", "#fff"),
            new BackColor("gray55", "#8C8C8C"),
            new BackColor("gray75", "#4B4B4B"),
            new BackColor("black", "#000")
        ];

    //dummy data-------------------------------------------------------------------------
    var
        ReferItem = function (referId, referName, referDoctor, referDate, referDocs) {
            this.referId = referId;
            this.referName = referName;
            this.referDoctor = referDoctor;
            this.referDate = referDate;
            this.referDocs = referDocs;
        },
        FolderItem = function (folderId, folderName, folderDoctor, folderDate) {
            this.folderId = folderId;
            this.folderName = folderName;
            this.folderDoctor = folderDoctor;
            this.folderDate = folderDate;
        },
        DocItem = function (folderId, docId, docType, docName, docDate) {
            this.folderId = folderId;
            this.docId = docId;
            this.docType = docType;
            this.docName = docName;
            this.docDate = docDate;
        },
        DocImage = function (key, docId, thumbImg, viewImg, largeImg) {
            this.key = key;
            this.docId = docId;
            this.thumbImg = thumbImg;
            this.viewImg = viewImg;
            this.largeImg = largeImg;
        },
        firstReferItem = new ReferItem("1", "Discharge Summary", "Han Clinic, Dr. Kang", "2012/07/05", [
            new DocItem("1", "1", "txt", "Discharge Summary", "2012/07/05"),
            new DocItem("1", "2", "jpg", "Lab results", "2012/07/05"),
            new DocItem("1", "3", "pdf", "CT Image", "2012/07/05")
            ]),

        otherReferItems = [
                new ReferItem("2", "Discharge Summary", "Sungnam Clinic, Dr. Cho", "2012/07/05", [
                    new DocItem("2", "4", "txt", "Discharge Summary", "2012/07/05"),
                    new DocItem("2", "5", "jpg", "Lab results", "2012/07/05"),
                    new DocItem("2", "6", "pdf", "CT Image", "2012/07/05"),
                    new DocItem("2", "7", "txt", "Discharge Summary", "2012/07/05"),
                    new DocItem("2", "8", "jpg", "Lab results", "2012/07/05"),
                    new DocItem("2", "9", "pdf", "CT Image", "2012/07/05"),
                    new DocItem("2", "10", "txt", "Discharge Summary", "2012/07/05"),
                    new DocItem("2", "11", "jpg", "Lab results", "2012/07/05"),
                    new DocItem("2", "12", "pdf", "CT Image", "2012/07/05")
                ])
        ],
        folItems = [
            new FolderItem("1", "Discharge Summary", "Sungnam Clinic, Dr. Cho", "2012/07/05"),
            new FolderItem("2", "Discharge Summary", "Ilsan Clinic, Dr. Kwack", "2012/07/05"),
            new FolderItem("3", "Discharge Summary", "Songdo Clinic, Dr. Kwan", "2012/07/05"),
            new FolderItem("", "Without folder", null, null)
        ],
        docItems = [
            new DocItem("1", "1", "txt", "Discharge Summary", "2012/07/05"),
            new DocItem("1", "2", "jpg", "Lab results", "2012/07/05"),
            new DocItem("1", "3", "pdf", "CT Image", "2012/07/05"),
            new DocItem("2", "4", "txt", "Discharge Summary", "2012/07/05"),
            new DocItem("2", "5", "jpg", "Lab results", "2012/07/05"),
            new DocItem("2", "6", "pdf", "CT Image", "2012/07/05"),
            new DocItem("3", "7", "txt", "Discharge Summary", "2012/07/05"),
            new DocItem("3", "8", "jpg", "Lab results", "2012/07/05"),
            new DocItem("3", "9", "pdf", "CT Image", "2012/07/05"),
            new DocItem("", "10", "txt", "Discharge Summary no fol", "2012/07/05"),
            new DocItem("", "11", "jpg", "Lab results no fol", "2012/07/05"),
            new DocItem("", "12", "pdf", "CT Image no fol", "2012/07/05")
        ],
        docImages = [
            new DocImage("0", "1", "../Images/test.png", "../Images/test.png", "../Images/test_large.png"),
            new DocImage("1", "1", "../Images/document.png", "../Images/document.png", "../Images/document.png"),
            new DocImage("2", "1", "../Images/doc_thumb.png", "../Images/doc_thumb.png", "../Images/doc_thumb.png"),
            new DocImage("3", "1", "../Images/test.png", "../Images/test.png", "../Images/test_large.png"),
            new DocImage("4", "1", "../Images/document.png", "../Images/document.png", "../Images/document.png"),
            new DocImage("5", "1", "../Images/doc_thumb.png", "../Images/doc_thumb.png", "../Images/doc_thumb.png"),
            new DocImage("6", "1", "../Images/test.png", "../Images/test.png", "../Images/test_large.png"),
            new DocImage("7", "1", "../Images/document.png", "../Images/document.png", "../Images/document.png"),
            new DocImage("8", "1", "../Images/doc_thumb.png", "../Images/doc_thumb.png", "../Images/doc_thumb.png"),
            new DocImage("9", "1", "../Images/test.png", "../Images/test.png", "../Images/test_large.png"),
            new DocImage("10", "1", "../Images/document.png", "../Images/document.png", "../Images/document.png"),
            new DocImage("11", "1", "../Images/doc_thumb.png", "../Images/doc_thumb.png", "../Images/doc_thumb.png"),
            new DocImage("12", "1", "../Images/test.png", "../Images/test.png", "../Images/test_large.png"),
            new DocImage("13", "1", "../Images/document.png", "../Images/document.png", "../Images/document.png"),
            new DocImage("14", "1", "../Images/doc_thumb.png", "../Images/doc_thumb.png", "../Images/doc_thumb.png"),
            new DocImage("15", "1", "../Images/test.png", "../Images/test.png", "../Images/test_large.png"),
            new DocImage("16", "1", "../Images/document.png", "../Images/document.png", "../Images/document.png"),
            new DocImage("17", "1", "../Images/doc_thumb.png", "../Images/doc_thumb.png", "../Images/doc_thumb.png")
        ],
        docImages3 = [
            new DocImage("18", "3", "../Images/test.png", "../Images/test.png", "../Images/test_large.png"),
            new DocImage("19", "3", "../Images/document.png", "../Images/document.png", "../Images/document.png"),
            new DocImage("20", "3", "../Images/doc_thumb.png", "../Images/doc_thumb.png", "../Images/doc_thumb.png"),
            new DocImage("21", "3", "../Images/test.png", "../Images/test.png", "../Images/test_large.png"),
            new DocImage("22", "3", "../Images/document.png", "../Images/document.png", "../Images/document.png"),
            new DocImage("23", "3", "../Images/doc_thumb.png", "../Images/doc_thumb.png", "../Images/doc_thumb.png")
        ],
        docImages2 = [
            new DocImage("24", "2", "../Images/document.png", "../Images/document.png", "../Images/document.png"),
        ];

    //----------------------------------------------------------------------------------------


    /* DocumentList */
    var
        isReferral = ko.observable(true),
        viewerIdName = "doc-viewer-item-",

        clickDocMore = function () {
            isReferral(!isReferral());
        },
        clickDocRefer = function () {
            isReferral(!isReferral());
        },

        docTypes = ["CCD", "JPEG", "PDF", "TXT"],


        /* Referral Item */
        ReferralItem = function (referId) {
             var self = this;
             self.filterList = ko.observableArray([]);
             self.data = null;

             /* Set dummy data */
             if (referId === "2")
                 self.data = otherReferItems[0];
             else if (referId === "0")
                 self.data = firstReferItem;

             self.openTypeFilter = function (data, event) {
                 commonOpenTypePopup(data, event);
             };

             self.filteredDocs = ko.computed(function () {
                 var list = self.data.referDocs;
                 if (self.filterList().length === 0)
                     return list;

                 return commonFilteredArrayByDocType(list, self.filterList());
             }, this);
         },

        /* Document Item */
        AllDocumentItem = function (patientId) {
            var self = this;
            self.filterList = ko.observableArray([]);
            self.isListView = ko.observable(true);
            self.docDateFrom = ko.observable("2012/07/01");
            self.docDateTo = ko.observable("2012/07/31");
            self.documentSearchInput = ko.observable("");

            self.clickedListView = function (data, event) {
                self.isListView(true);
            };

            self.clickedFolderView = function (data, event) {
                self.isListView(false);
            };

            self.data = docItems;
            self.folders = folItems;

            self.openTypeFilter = function (data, event) {
                commonOpenTypePopup(data, event);
            };

            self.filteredDocs = ko.computed(function () {
                var list = self.data;
                var result = null;
                var searchText = self.documentSearchInput();

                if (self.filterList().length === 0)
                    result = list;
                else
                    result = commonFilteredArrayByDocType(list, self.filterList());

                if (searchText != "") {
                    result = ko.utils.arrayFilter(result, function (item) {
                        return (item.docName.toLowerCase().search(searchText.toLowerCase()) > -1) ? true : false;
                    });
                }

                return result;
            }, self);

            self.filteredDocsByFolder = function (folderId) {
                var list = self.filteredDocs();
                var result = ko.utils.arrayFilter(list, function (item) {
                    return (item.folderId === folderId);
                });
                return result;
            };

        },

        /* Set dummy data */
        otherReferralItems = ko.observableArray([
                new ReferralItem("2")
        ]),
        selectedReferralItem = ko.observable(new ReferralItem("0")),
        allDocumentItems = ko.observable(new AllDocumentItem(0)),

        /* Common functions */
        commonOpenTypePopup = function (data, event) {
            var parent = $(event.target).parent();
            var popup = parent.find('.popup');
            popup.fadeToggle("fast", "linear");

            //hide all popups except selected
            var popups = $('body').find('.popup');
            for (i = 0; i < popups.length; i++) {
                if ($(popups[i]).attr('id') != popup.attr('id'))
                    $(popups[i]).hide();
            }

            popup.click(function (event2) {
                event2.stopPropagation();
            });
            event.stopPropagation();
        },

        commonFilteredArrayByDocType = function (list, selectedTypes) {
            var result = ko.utils.arrayFilter(list, function (item) {
                var compareType = item.docType.toUpperCase();
                compareType = (compareType === "JPG") ? "JPEG" : compareType;
                return (selectedTypes.indexOf(compareType) > -1);
            });
            return result;
        };

    /* Viewer */
    var DocViewerItem = function (viewId) {
        var self = this;
        self.viewId = viewId;
        self.docId = ko.observable("");

        self.thumbnailScrollLeft = ko.observable(0);
        self.thumbnailPreBtnVisible = ko.observable(true);
        self.thumbnailNextBtnVisible = ko.observable(true);
        self.contentPreBtnVisible = ko.observable(false);
        self.contentNextBtnVisible = ko.observable(false);

        self.selectedItemIndex = ko.observable(0);
        self.viewerImage = ko.observable();
        self.largeImage = ko.observable();

        // set thumbnail data - call a service to get images by docId
        self.data = ko.computed(
            function () {
                var array = [];
                if (self.docId() == 3) {
                    array = docImages3;
                } else if (self.docId() == 2) {
                    array = docImages2;
                } else if (self.docId() == 1) {
                    array = docImages;
                }

                self.selectedItemIndex(0);
                return array;
            });

        self.clickedThumb = function (data, event) {
            self.selectedItemIndex(self.data().indexOf(data));
        };

        self.clickedContentPreBtn = function (data, event) {
            if (self.selectedItemIndex() <= 0) {
                return;
            }
            self.selectedItemIndex(self.selectedItemIndex() - 1);
        };

        self.clickedContentNextBtn = function (data, event) {
            if (self.selectedItemIndex() > self.data().length - 1) {
                return;
            }
            self.selectedItemIndex(self.selectedItemIndex() + 1);
        };

        self.clickedThumbnailPreBtn = function (data, event) {
            var thumbnailContent = $(event.target).parent().children('.thumbnail-content'),
                diff = thumbnailContent.width(),
                totalScrollWidth = thumbnailContent.children('ul').width(),
                scrollRight = thumbnailContent.scrollLeft();

            self.thumbnailNextBtnVisible(true);
            scrollRight = scrollRight - diff;
            thumbnailContent.animate({ scrollLeft: scrollRight }, 800);

            if (scrollRight <= 0) {
                self.thumbnailPreBtnVisible(false);
            }
        };

        self.clickedThumbnailNextBtn = function (data, event) {
            var thumbnailContent = $(event.target).parent().children('.thumbnail-content'),
                diff = thumbnailContent.width(),
                totalScrollWidth = thumbnailContent.children('ul').width(),
                scrollLeft = thumbnailContent.scrollLeft();

            self.thumbnailPreBtnVisible(true);
            scrollLeft = scrollLeft + diff;
            thumbnailContent.animate({ scrollLeft: scrollLeft }, 800);

            if (scrollLeft >= totalScrollWidth - diff) {
                self.thumbnailNextBtnVisible(false);
            }
        };

        self.thumbnailContentWidth = ko.computed(function () {
            var liLength = self.data().length;
            var width = (thumnailSize + 15) * (liLength) - 9;
            return width;
        }, self);



    }
    , docViewerItems = ko.observableArray()
    , addDocumentItemToViewer = function (viewer, docId) {

        var selectedViewerId = viewer.attr('id'),
            selectedViewerIndex = selectedViewerId.replace(viewerIdName, "");

        docViewerItems()[selectedViewerIndex].docId(docId);
    };

    docViewerItems.push(new DocViewerItem(0));

    /* Toolbar */
    var
        comparePopupVisible = ko.observable(false),
        contrastPopupVisible = ko.observable(false),
        backgroundPopupVisible = ko.observable(false),
        selectedViewer = ko.observable(),
        magnifyBtnEnable = ko.observable(true),
        effectOff = ko.observable(true),
        clickedZoomOutBtn = function () {
            var contentImg = $(selectedViewer().find('.content-img'));
            $.zoomOut(contentImg, contentImg.height(), contentImg.width());
            magnifyBtnEnable(false);
            $.applyMagnify(false);
            $.setDataForToolbarAndViewer(selectedViewer(), 'zoom', true);
        },
        clickedZoomInBtn = function () {
            var contentImg = $(selectedViewer().find('.content-img'));
            $.zoomIn(contentImg, contentImg.height(), contentImg.width());
            magnifyBtnEnable(false);
            $.applyMagnify(false);
            $.setDataForToolbarAndViewer(selectedViewer(), 'zoom', true);
        },
        clickedRestoreBtn = function () {
            var contentContainer = $(selectedViewer().find('.doc-content-main')),
                contentImg = $(selectedViewer().find('.content-img')),
                newImg = new Image();

            newImg.src = contentImg.attr('src');
            $(newImg).load(function () {
                $.restore(contentContainer, this.height, this.width, '50%', '50%');
            });

            magnifyBtnEnable(true);
            $.setDataForToolbarAndViewer(selectedViewer(), 'zoom', false);
        },
        clickedMagnifyBtn = function () {
            if (!magnifyBtnEnable())
                return;

            var obj = $("#magnify");
            $.applyMove(false);

            if (!obj.hasClass('selected')) {
                $.applyMagnify(true);
            } else {
                $.applyMagnify(false);
            }
        },
        clickedMoveBtn = function () {
            
            var obj = $("#move");
            $.applyMagnify(false);

            if (!obj.hasClass('selected')) {
                $.applyMove(true);
            } else {
                $.applyMove(false);
            }

        },
        clickedContrastBtn = function (data, event) {

            if ($.browser.chrome) {
                contrastPopupVisible(!contrastPopupVisible());

                if (contrastPopupVisible()) {
                    var contentContainer = $(selectedViewer().find('.doc-content-main'));
                    contentContainer.css("cursor", "default");
                    $.calculatePopupPosition($('#toolbar'), $("#contrast"), $("#contrast-slider-container"));
                }
            }
        },
        clickedInvertBtn = function () {
            var isInverted = !($.getDataForToolbarAndViewer(selectedViewer(), 'isInverted')),
                contentContainer = $(selectedViewer().find('.doc-content-main')),
                contentImg = $(selectedViewer().find('.content-img'));

            $.setDataForToolbarAndViewer(selectedViewer(), 'isInverted', isInverted);
            contentContainer.css("cursor", "default");
            $.applyFilter(contentImg);
        },
        clickedEffectBtn = function () {
            var isInverted = false
                , contrastValue = 1
                , contentImg = $(selectedViewer().find('.content-img'));

            $("#contrast-slider").slider("value", contrastValue);
            $("#contrast-value").text(contrastValue);

            /* for toolbar sync */
            $.setDataForToolbarAndViewer(selectedViewer(), 'contrast', contrastValue);
            $.setDataForToolbarAndViewer(selectedViewer(), 'isInverted', isInverted);

            $.applyFilter(contentImg);

            effectOff(true);
        },
        clickedCompareBtn = function () {

            comparePopupVisible(!comparePopupVisible());

            if (comparePopupVisible()) {
                $.calculatePopupPosition($('#toolbar'), $("#compare"), $("#compare-container"));
                $("#compare-container").fadeIn("fast");
            } 
        },
        clickedBackgroundBtn = function () {
            backgroundPopupVisible(!backgroundPopupVisible());

            if (backgroundPopupVisible()) {
                $.calculatePopupPosition($('#toolbar'), $("#background"), $("#background-container"));
                $("#background-container").fadeIn("fast");
            }
        },
        clickedBackgroundColor = function (data, event) {
            var color = data.colorCode;
            backgroundPopupVisible(false);
            $.background($('#background').children('.background'), color);
            $.background(selectedViewer(), color);

            $.setDataForToolbarAndViewer(selectedViewer(), 'background', color);
        },
        isSingleView = ko.observable(true),
        clickedSingleView = function () {
            isSingleView(true);

            if (docViewerItems().length >= 2) {
                docViewerItems.pop();
            }
        },
        clickedMultiView = function () {
            isSingleView(false);

            if (docViewerItems().length < 2) {
                docViewerItems.push(new DocViewerItem(1));
            }
        };

    $(document).mouseup(function () {
        contrastPopupVisible(false);
        comparePopupVisible(false);
        backgroundPopupVisible(false);
    });

    return {
        isReferral: isReferral,
        selectedReferralItem: selectedReferralItem,
        clickDocMore: clickDocMore,
        clickDocRefer: clickDocRefer,
        docTypes: docTypes,
        otherReferralItems: otherReferralItems,
        allDocumentItems: allDocumentItems,
        docViewerItems: docViewerItems,
        viewerIdName: viewerIdName,

        backgroundColors: backgroundColors,
        selectedViewer: selectedViewer,
        clickedZoomOutBtn: clickedZoomOutBtn,
        clickedZoomInBtn: clickedZoomInBtn,
        clickedRestoreBtn: clickedRestoreBtn,
        magnifyBtnEnable: magnifyBtnEnable,
        clickedMagnifyBtn: clickedMagnifyBtn,
        clickedMoveBtn: clickedMoveBtn,
        clickedContrastBtn: clickedContrastBtn,
        contrastPopupVisible: contrastPopupVisible,
        clickedInvertBtn: clickedInvertBtn,
        clickedCompareBtn: clickedCompareBtn,
        effectOff: effectOff,
        clickedEffectBtn: clickedEffectBtn,
        comparePopupVisible: comparePopupVisible,
        clickedBackgroundBtn: clickedBackgroundBtn,
        backgroundPopupVisible: backgroundPopupVisible,
        clickedBackgroundColor: clickedBackgroundColor,
        isSingleView: isSingleView,
        clickedSingleView: clickedSingleView,
        clickedMultiView: clickedMultiView,

        addDocumentItemToViewer: addDocumentItemToViewer,

        docImages: docImages,
        docImages2: docImages2,
        docImages3: docImages3
        
    }

})(ktc, ko);

//custom binding
ko.bindingHandlers.addDocumentOpenEvent = {
    init: function (element, valueAccessor) {

        var value = ko.utils.unwrapObservable(valueAccessor());

        $(element).docMouseDown(value);
        $(element).docDbClick(value);
    }
};

ko.bindingHandlers.addOtherReferOpenEvent = {
    init: function (element, valueAccessor) {

        var element = $(element),
            openPanel = element.children('.doc-referral-open'),
            closePanel = element.children('.doc-referral-close'),
            btnOpen = closePanel.children('.btn-other-refer-open'),
            btnClose = openPanel.children('.table-header').children('.btn-other-refer-close');

        btnOpen.click(function () {
            closePanel.slideUp(300, function () {
                openPanel.slideDown();
            });
        });

        btnClose.click(function () {
            openPanel.slideUp(300, function () {
                closePanel.slideDown();
            });
        });
    }
};

ko.bindingHandlers.collapsedFolder = {
    init: function (element, valueAccessor) {
        var folderId = ko.utils.unwrapObservable(valueAccessor());
        $(element).click(function () {
            var obj = $(this).parent().find('.folder-' + folderId).is(':visible');
            $(this).parent().find('.folder-' + folderId).toggle();
            $(this).find('.folder-collapse').removeClass((!obj) ? 'down' : 'up');
            $(this).find('.folder-collapse').addClass((!obj) ? 'up' : 'down');
        });

    }
};

ko.bindingHandlers.bindDocViewerItem = {
    init: function (element, valueAccessor) {
        //init view
        var value = ko.utils.unwrapObservable(valueAccessor()),
            obj = $(element),
            thumbnailWrapper = obj.find('.thumbnail-content');

        thumbnailWrapper.scroll(function () {
            value.thumbnailScrollLeft($(this).scrollLeft());
        });

        $.setThumbnailExpander(obj);
        $.setDroppableViewer(obj);
        $.initViewerData(obj);//for toolbar sync
        
    },

    update: function (element, valueAccessor) {
        var value = ko.utils.unwrapObservable(valueAccessor()),
            obj = $(element),
            thumbnailWrapper = $(obj.find('.thumbnail-wrapper')),
            thumbnailContent = $(thumbnailWrapper.find('.thumbnail-content')),
            thumbnailContentWidth = thumbnailWrapper.width() - 50,
            thumbnailList = $(thumbnailWrapper.find('ul')),
            thumbnailLength = thumbnailList.find('li').length,
            selectedData = value.data()[value.selectedItemIndex()];

        if (selectedData === undefined || selectedData === null)
            return;
        value.viewerImage(selectedData.viewImg);
        value.largeImage(selectedData.largeImg);

        thumbnailList.find('li').removeClass("selected");
        $(thumbnailList.find('li')[value.selectedItemIndex()]).addClass("selected");
        thumbnailContent.scrollTo(
            $(thumbnailList.find('li')[value.selectedItemIndex()]),
            300, {
                axis: 'x',
                offset: { left: -3 }
            });

        /* set content button visible */
        var contentPreBtnVisible = true;
        if (value.selectedItemIndex() <= 0 || thumbnailLength <= 1) {
            contentPreBtnVisible = false;
        }
        value.contentPreBtnVisible(contentPreBtnVisible);

        var contentNextBtnVisible = true;
        if ((value.selectedItemIndex() == thumbnailLength - 1) || thumbnailLength <= 1) {
            contentNextBtnVisible = false;
        }
        value.contentNextBtnVisible(contentNextBtnVisible);
    }
};

ko.bindingHandlers.setThumbnailPreBtnVisible = {
    init: function (element, valueAccessor) {
    },
    update: function (element, valueAccessor) {
        var value = ko.utils.unwrapObservable(valueAccessor()),
            thumbnailWrapper = $(element).parent(),
            thumbnailWrapperWidth = thumbnailWrapper.width() - 50,
            visible = true,
            thumbnailScrollLeft = value[0],
            thumbnailContentWidth = value[1];

        if (thumbnailScrollLeft <= 0) {
            visible = false;
        };

        if (thumbnailWrapperWidth >= thumbnailContentWidth) {
            visible = false;
        }

        if (visible)
            $(element).show();
        else
            $(element).hide();
    }
};

ko.bindingHandlers.setThumbnailNextBtnVisible = {
    init: function (element, valueAccessor) {
    },
    update: function (element, valueAccessor) {
        var value = ko.utils.unwrapObservable(valueAccessor()),
            thumbnailWrapper = $(element).parent(),
            thumbnailWrapperWidth = thumbnailWrapper.width() - 50,
            visible = true,
            thumbnailScrollLeft = value[0],
            thumbnailContentWidth = value[1];

        if (thumbnailScrollLeft >= (thumbnailContentWidth - thumbnailWrapperWidth)) {
            visible = false;
        };

        if (thumbnailWrapperWidth >= thumbnailContentWidth) {
            visible = false;
        }

        if (visible)
            $(element).show();
        else
            $(element).hide();
    }
};

ko.bindingHandlers.setViewerPosition = {
    init: function (element, valueAccessor) {
    },
    update: function (element, valueAccessor) {
        var value = ko.utils.unwrapObservable(valueAccessor()),
            obj = $(element),
            newImg = new Image();

        if (value === undefined) {
            value = "../Images/nothing.png";
        }

        newImg.src = value;
        $(newImg).load(function () {
            var leftMargin = -parseInt(this.width / 2),
                topMargin = -parseInt(this.height / 2);
            $(obj.find('img')).css({
                width: this.width,
                height: this.height
            });
            obj.css({
                'margin-left': leftMargin,
                'margin-top': topMargin
            });
        });
    }
};

ko.bindingHandlers.displayMultiView = {
    init: function (element, valueAccessor) {
        var value = ko.utils.unwrapObservable(valueAccessor()),
            obj = $(element).children('li'),
            length = obj.length;

        $.initViewerData(obj.eq(0));
        ktc.vm.docIndexVM.selectedViewer(obj.eq(0));
    },
    update: function (element, valueAccessor) {
        var value = ko.utils.unwrapObservable(valueAccessor()),
            obj = $(element).children('li'),
            length = obj.length;

        // true: single, false: multi
        if (value) {
            if (length === 2) {
                obj.eq(length - 1).animate({ left: '100%', opacity: '0' }, 300, function () {
                    $(this).remove();
                });
            }

            obj.eq(0)
                .off('click')
                .removeClass('doc-viewer-item-first doc-viewer-item-selected')
                .animate({ right: '0' }, 300, function () {
                });

            ktc.vm.docIndexVM.selectedViewer(obj.eq(0));

        } else {
            if (length === 2) {

                obj.eq(0)
                    .on('click', function () {
                        obj.removeClass('doc-viewer-item-selected');
                        $(this).addClass('doc-viewer-item-selected');

                        if (ktc.vm.docIndexVM.selectedViewer().attr('id') === $(this).attr('id'))
                            return;

                        $.applyMagnify(false);
                        $.applyMove(false);

                        ktc.vm.docIndexVM.selectedViewer($(this));
                    })
                    .addClass('doc-viewer-item-first doc-viewer-item-selected')
                    .animate({ right: '50%' }, 300, function () {
                        //to-do : when resize the viewer, scroll to selected item of the thumbnail list
                    });

                obj.eq(1)
                    .on('click', function () {
                        obj.removeClass('doc-viewer-item-selected');
                        $(this).addClass('doc-viewer-item-selected');

                        if (ktc.vm.docIndexVM.selectedViewer().attr('id') === $(this).attr('id'))
                            return;

                        $.applyMagnify(false);
                        $.applyMove(false);

                        ktc.vm.docIndexVM.selectedViewer($(this));
                    })
                    .addClass('doc-viewer-item-second')
                    .animate({ left: '50%' }, 300);

                $.initViewerData(obj.eq(1));//for toolbar sync
            }

        }
    }
};

ko.bindingHandlers.changeToolbarStatus = {

    init: function (element, valueAccessor) {
        var value = ko.utils.unwrapObservable(valueAccessor()), //selectedViewer
            obj = $(element);

        $("#contrast-slider").slider({
            value: 1,
            step: 0.2,
            min: 0,
            max: 10,
            orientation: "vertical",
            slide: function (event, ui) {
                var contrastValue = ui.value,
                    selectedViewer = ktc.vm.docIndexVM.selectedViewer(),
                    contentImg = $(selectedViewer.find('.content-img'));
                $("#contrast-value").text(contrastValue);

                /* for toolbar reset */
                $.setDataForToolbarAndViewer(selectedViewer, 'contrast', contrastValue);
                $.applyFilter(contentImg);
            }
        });

        obj.mouseenter(function () {
            $(".mag").fadeOut("fast");
        });

        obj.parent().find(".tools-popup").mouseenter(function () {
            $(".mag").fadeOut("fast");
        });

    },
    update: function (element, valueAccessor) {
        var value = ko.utils.unwrapObservable(valueAccessor()),
            obj = $(element);

        if (value != undefined && $(value).length != 0) {
            ktc.vm.docIndexVM.magnifyBtnEnable(!($.getDataForToolbarAndViewer($(value), "zoom")));
            $.background($('#background').children('.background'), $.getDataForToolbarAndViewer($(value), 'background'));
            $("#contrast-slider").slider("value", $.getDataForToolbarAndViewer($(value), 'contrast'));
            $("#contrast-value").text($.getDataForToolbarAndViewer($(value), 'contrast'));
            $.applyFilter($($(value).find('.content-img')));
        }
    }
};

ko.bindingHandlers.setThumbnailImage = {
    init: function (element, valueAccessor) {
        var value = ko.utils.unwrapObservable(valueAccessor()), 
            obj = $(element);
    },
    update: function (element, valueAccessor) {
        var value = ko.utils.unwrapObservable(valueAccessor()), 
            obj = $(element),
            image = new Image(),
            maxWidth = 86,
            maxHeight = 86;

        image.src = value;
        $(image).load(function () {

            var width = maxWidth
                , height = maxHeight
                , imgWidth = this.width
                , imgHeight = this.height
                , ratio = 0;

            if (imgWidth > maxWidth) {
                ratio = maxWidth / imgWidth;
                width = maxWidth;

                var temp = parseInt(imgHeight * ratio);
                if (temp === maxHeight) {
                    temp = maxHeight;
                }
                height = temp;

                imgWidth = imgWidth * ratio;
                imgHeight = imgHeight * ratio;
            }

            if (imgHeight > maxHeight) {
                ratio = maxHeight / height;
                height = maxHeight;

                var temp = parseInt(imgWidth * ratio);
                if (temp == maxWidth) {
                    temp = maxWidth;
                }
                width = temp;
                imgWidth = imgWidth * ratio;
            }

            obj.attr("style", "width:" + width + "px;height:" + height + "px");
        });

    }
};