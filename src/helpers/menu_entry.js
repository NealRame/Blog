const Handlebars = require('handlebars');

const templates = {
    active: Handlebars.compile('<li class="active">{{{content}}}</li>'),
    unactive: Handlebars.compile('<li><a href="{{link}}">{{{content}}}</a></li>')
};

module.exports = function(entries, current_page) {
    const items = entries.map((entry) => {
        const context = entry.page === '/'
            ? {content: '<i class="fa fa-home"></i>', link: '/'}
            : {content: entry.page, link: `/pages/${entry.page}.html`};
        return entry.page === current_page
            ? templates.active(context)
            : templates.unactive(context);
    }).join('');
    return `<ul class="dropdown menu" data-dropdown-menu>${items}</ul>`;
}
