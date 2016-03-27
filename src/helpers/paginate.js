'use strict';

const _ = require('underscore');
const pagination_link = require('./pagination-link');

function paginate(page) {
	return {
		label: page.pagination.num,
		link: pagination_link(page)
	};
}

module.exports = function(page) {
	const pages = page.pagination.getPages(3);
	const first = paginate(page.pagination.first);
	const last  = paginate(page.pagination.last);
	let page_links  = pages.map(paginate);

	if (first.label !== _.first(page_links).label) {
		if (first.label + 1 < _.first(page_links).label) {
			page_links = [first, null].concat(page_links);
		} else {
			page_links = [first].concat(page_links);
		}
	}

	if (last.label  !== _.last(page_links).label) {
		if (last.label - 1 > _.last(page_links).label) {
			page_links = page_links.concat([null, last]);
		} else {
			page_links = page_links.concat([last]);
		}
	}

	return page_links.map((item) => {
		if (item == null) {
			return '<li class="ellipsis"></li>';
		}
		if (item.label === page.pagination.num) {
			return `<li class="current"><a href="${item.link}">${item.label}</a></li>`;
		}
		return `<li><a href="${item.link}">${item.label}</a></li>`;
	}).join('');
}
