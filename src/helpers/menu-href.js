module.exports = function(page, ref) {
	if (page === 'index') {
		return `href="#${ref}"`;
	}
	return `href="/#${ref}"`;
}
