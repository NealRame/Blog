const stylesheets = [
    'https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css',
    'https://fonts.googleapis.com/css?family=Oswald:700,400',
    'https://fonts.googleapis.com/css?family=Roboto:400,300',
    '/assets/css/style.css'
];

module.exports = (collection) => {
    return (collection.indexOf('articles') < 0
        ? stylesheets
        : stylesheets.concat('/assets/css/articles/style.css')
    )
    .map((url) => `<link rel="stylesheet" href="${url}" type="text/css">`)
    .join('\n');
};
