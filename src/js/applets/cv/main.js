function equalize_picture() {
    const section = $('#personal-details');
    const picture = $('img', section);
    const picture_margin = picture.outerHeight() - picture.innerHeight();
    const details_height = $('ul', section).height() - picture_margin;
    picture.removeAttr('style');
    if (Foundation.MediaQuery.atLeast('medium')) {
        picture.height(details_height).width(details_height);
    }
}

function equalize() {
    equalize_picture();
}

function before_print() {
    equalize_picture();
}

global.applets = (global.applets || []).concat({
	name: 'cv',
    start() {
        equalize();
        $(window).on('resize', equalize);
        if (window.matchMedia) {
            window.matchMedia('print').addListener((mql) => {
                if (mql.matches) {
                    before_print();
                } else {
                    equalize();
                }
            });
        }
    }
});
