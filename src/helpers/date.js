const moment = require('moment');

module.exports = function(page) {
	return moment((new Date(page.date)).getTime()).format('ll');
}
