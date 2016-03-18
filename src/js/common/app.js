import {debounce} from 'underscore';
import $ from 'jquery';
import 'foundation';

function stick_footer(footer) {
	const rect = footer.getBoundingClientRect();
	if (rect.bottom < window.innerHeight) {
		footer.style.marginTop = window.innerHeight - rect.bottom + 'px';
	}
}

export default function(run) {
	$(window).load(() => {
		$(document).foundation();
		$(window)
			.on('resize', debounce(() => {
				const footer = $('#site-content-wrapper > footer').get(0);
				footer.style.marginTop = 0;
				stick_footer(footer);
			}, 250))
			.trigger('resize');
		run();
	});
}
