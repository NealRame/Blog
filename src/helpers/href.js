module.exports = function(page) {
    if (page.path.name === 'index') {
        return 'href="/"';
    }
    return `href="${page.path.href}${page.path.name}.html"`;
}
