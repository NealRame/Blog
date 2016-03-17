const Handlebars = require('handlebars');
const href = require('./href');

const templates = {
    active: Handlebars.compile('<li class="active"><a>{{{content}}}</a></li>'),
    unactive: Handlebars.compile('<li><a {{{link}}}>{{{content}}}</a></li>')
};

module.exports = function(entries, current_page) {
    return entries
        .filter((entry) => !!entry.menu)
        .sort((a, b) => a['menu-rank'] - b['menu-rank'])
        .map((entry) => Object.assign(
            {
                page: entry.page,
                link: href(entry)
            },
            entry.page === '/'
                ? {content: '<i class="fa fa-home"></i>'}
                : {content: entry.page}
        ))
        .map((entry) => {
            return entry.page === current_page
                ? templates.active(entry)
                : templates.unactive(entry);
        })
        .join('');
}
