import {debounce} from 'underscore';

function stick_footer(footer) {
	footer.style.marginTop = 0;
	const rect = footer.getBoundingClientRect();
	if (rect.bottom < window.innerHeight) {
		footer.style.marginTop = window.innerHeight - rect.bottom + 'px';
	}
}

global.applets = (global.applets || []).concat({
	name: 'sticky-footer',
	start() {
		const footer = $('body > footer').get(0);
		const sticky_footer_debounced = debounce(() => stick_footer(footer), 250);
		$(window)
			.on('stick-footer.nr.trigger', sticky_footer_debounced)
			.on('resize', sticky_footer_debounced)
			.trigger('resize');
	}
});
