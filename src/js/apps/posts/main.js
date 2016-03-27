import {site} from '../../../../config.json';

const post_id = $('meta[itemprop^="post_identifier"]').attr('itemprop').split(':')[1];
const page_url = `${site.url}/${post_id}`;

global.disqus_config = function () {
	this.page.url = page_url;
	this.page.identifier = post_id;
};

function disqus() {
	const script = document.createElement('script');
	script.src = '//nealrame.disqus.com/embed.js';
	script.setAttribute('data-timestamp', +new Date());
	(document.head || document.body).appendChild(script);
}

disqus();
