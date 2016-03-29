function push_command(...args) {
	(global.ga.q = global.ga.q || []).push(args);
}

global.applets = (global.applets || []).concat({
	start: () => {
		global.GoogleAnalyticsObject = 'ga';
		global.ga = global.ga || push_command;
		global.ga.l = Date.now();

		const script = document.createElement('script');

		script.async = 1;
		script.src = '//www.google-analytics.com/analytics.js';

		(document.head || document.body).appendChild(script);

		global.ga('create', 'UA-75717439-1', 'auto');
		global.ga('send', 'pageview');
	}
});
