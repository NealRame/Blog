function equalize_picture() {
	const $section = $('#personal-details');
	const $picture = $('img', $section);
	const picture_margin = $picture.outerHeight() - $picture.innerHeight();
	const details_height = $('ul', $section).height() - picture_margin;
	$picture
		.removeAttr('style')
		.height(details_height)
		.width(details_height);
}

function equalize() {
	equalize_picture();
}

function before_print() {
	equalize_picture();
	$('.print-wrapper')
		.removeClass('small-5 small-7 small-12 medium-6')
		.addClass('small-6');
}

global.applets = (global.applets || []).concat({
	name: 'cv',
	start() {
		equalize();
		$(window).on('resize', equalize);
		if (window.matchMedia) {
			window.matchMedia('print').addListener((mql) => {
				if (mql.matches) {
					before_print();
				} else {
					equalize();
				}
			});
		}
	}
});
