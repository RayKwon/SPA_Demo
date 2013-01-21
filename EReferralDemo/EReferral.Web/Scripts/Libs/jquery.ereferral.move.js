(function ($) {
	$.extend($, {
		move: function (element) {
			$(element).draggable({
				disabled: false
			});

			$(element).mousedown(function () {
				$(this).css("cursor", "url(../Images/cur_grab.png), auto");
			});

			$(element).mouseup(function () {
				$(this).css("cursor", "url(../Images/cur_hand.png), auto");
			});

			$(element).find("img").unbind("mousemove");
		},
		stop: function (element) {
		    $(element).draggable({
		        disabled: true
		    });

		    $(element).mousedown(function () {
		        $(this).css("cursor", 'default');
		    });

		    $(element).mouseup(function () {
		        $(this).css("cursor", 'default');
		    });

		    $(element).css('cursor', 'default');

		    $(element).removeClass('ui-state-disabled');
		}

	});
})(jQuery);