import {disqus} from '../../../../config.json'

const post_id = $('meta[itemprop^="post_id:"]').attr('itemprop').split(':')[1];

function trim_trailing_slash(s) {
	return s.endsWith('/') ? s.substr(0, s.length - 1) : s;
}

function post_url() {
	const location = window.location;
	return `http://${location.host}${trim_trailing_slash(location.pathname)}`;
}

global.disqus_config = function () {
	this.page.url = post_url();
	this.page.identifier = post_id;
};

global.applets = (global.applets || []).concat({
	name: 'disqus',
	start: () => {
		const script = document.createElement('script');
		script.src = `//${disqus.shortname}.disqus.com/embed.js`;
		script.setAttribute('data-timestamp', +new Date());
		(document.head || document.body).appendChild(script);
	}
});
