import $ from 'jquery';
import 'foundation';

export default function(run) {
	$(window).load(() => {
		$(document).foundation();
		run();
	});
}
