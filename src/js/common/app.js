import $ from 'jquery';
import foundation from 'foundation';

export default function(run) {
	$(window).load(() => {
		foundation();
		run();
	});
}
