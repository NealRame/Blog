module.exports = function(page) {
	return (new Date(page.date)).toDateString();
}
