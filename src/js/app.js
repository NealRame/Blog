import {debounce} from 'underscore';

window.applets = window.applets || [];

function stick_footer(footer) {
	const rect = footer.getBoundingClientRect();
	if (rect.bottom < window.innerHeight) {
		footer.style.marginTop = window.innerHeight - rect.bottom + 'px';
	}
}

$(document).foundation();
$(window).load(() => {
	$(window)
		.on('resize', debounce(() => {
			const footer = $('body > footer').get(0);
			footer.style.marginTop = 0;
			stick_footer(footer);
		}, 250))
		.trigger('resize');
	for (let applet of window.applets) {
		applet.start();
	}
});
