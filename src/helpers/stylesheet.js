const stylesheets = [
    'https://cdn.rawgit.com/konpa/devicon/master/devicon.min.css',
    'https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css',
    'https://fonts.googleapis.com/css?family=Oswald:700,400',
    'https://fonts.googleapis.com/css?family=Roboto:400,300',
    'https://fonts.googleapis.com/css?family=Raleway:900',
    '/assets/css/style.css'
];

function custom_page_style(page) {
    return (page.styles || [])
        .map((custom_style) => `/assets/css/${custom_style}/style.css`);
}

module.exports = (page) => {
    return ((page.collection || []).indexOf('posts') < 0
        ? stylesheets
        : stylesheets.concat('/assets/css/articles/style.css')
    )
    .concat(custom_page_style(page))
    .map((url) => `<link rel="stylesheet" href="${url}" type="text/css">`)
    .join('\n');
};
