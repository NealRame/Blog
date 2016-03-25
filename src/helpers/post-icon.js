const _ = require('underscore');

const template = _.template('<i class="<%= icon %>"></i>');

const category_icon_map = {
	'c':          'devicon-c-plain',
	'c++':        'devicon-cplusplus-plain',
	'docker':     'devicon-docker-plain',
	'foundation': 'devicon-foundation-plain',
	'grunt':      'devicon-grunt-plain',
	'gulp':       'devicon-gulp-plain',
	'html5':      'devicon-html5-plain',
	'js':         'devicon-javascript-plain',
	'nodejs':     'devicon-nodejs-plain',
	'mongodb':    'devicon-mongodb-plain',
	'sass':       'devicon-sass-plain'
};

function category_to_icon(category) {
	return {
		icon: category_icon_map[category || ''] || 'fallback-icon'
	};
}

module.exports = function(post) {
	return template(category_to_icon(post.category))
}
