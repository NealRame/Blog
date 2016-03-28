import {debounce} from 'underscore';
import {existy} from 'common/functional';

const MutationObserver = global.MutationObserver || global.WebKitMutationObserver;

const observeDOM = (() => {
	return (obj, cb) => {
		if (existy(MutationObserver)) {
			const observer = new MutationObserver((mutations) => {
				if (mutations.some((mutation) => mutation.type === 'childList')) {
					cb();
				}
			});
			observer.observe(obj, {
				childList: true,
				subtree: true
			});
		} else if (existy(global.addEventListener)) {
			obj.addEventListener('DOMNodeInserted', cb, false);
			obj.addEventListener('DOMNodeRemoved', cb, false);
		}
	}
})();

function stick_footer(footer) {
	footer.style.marginTop = 0;
	const rect = footer.getBoundingClientRect();
	if (rect.bottom < window.innerHeight) {
		footer.style.marginTop = window.innerHeight - rect.bottom + 'px';
	}
}

global.applets = (global.applets || []).concat({
	start: () => {
		const footer = $('body > footer').get(0);
		observeDOM(document, () => $(window).trigger('resize'));
		$(window)
			.on('resize', debounce(() => stick_footer(footer), 250))
			.trigger('resize');
	}
});
