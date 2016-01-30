const $ = global.$ = global.jQuery = require('jquery');
require('foundation-sites');

module.exports = function() {
    $(document).foundation();
};
