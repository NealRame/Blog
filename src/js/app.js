window.applets = window.applets || [];

$(document).foundation();
$(window).load(() => {
	for (let applet of window.applets) {
		applet.start();
	}
});
