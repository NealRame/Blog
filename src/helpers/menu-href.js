module.exports = function(page, ref) {
	if (page === 'home') {
		return `href="#${ref}"`;
	}
	return `href="/#${ref}"`;
}
