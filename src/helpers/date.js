module.exports = function(page) {
	const date = new Date(page.stats.mtime);
	return date.toDateString();
}
