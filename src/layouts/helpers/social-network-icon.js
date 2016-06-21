const _ = require('underscore');

const template = _.template('<i class="fa fa-<%= icon %>"></i>');
const icon_map = {
	'facebook': 'facebook-square',
	'github':   'github-square',
	'twitter':  'twitter-square'
};

module.exports = function(network) {
	return template({
		icon: icon_map[network.toLowerCase()]
	});
}
