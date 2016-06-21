const _ = require('underscore');

module.exports = function(col, limit) {
	if (_.isArray(col)) {
		return col.slice(0, limit);
	}
	return [];
}
