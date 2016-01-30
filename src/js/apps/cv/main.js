const $ = require('jquery');
const foundation = require('foundation');

function equalize_picture() {
    const section = $('#personal_details');
    const picture = $('img', section);
    const picture_margin = picture.outerHeight() - picture.innerHeight();
    const details_height = $('ul', section).height() - picture_margin;
    picture.removeAttr('style');
    if (details_height > picture.height()) {
        picture.height(details_height).width(details_height);
    }
}

function equalize_columns() {
    const elements = $('.left, .right');
    const max_height = Math.max.apply(
        null,
        elements.map((index, elt) => $(elt).height())
    );
    elements.each((index, elt) => {
        const last_child = $('section', elt).last()[0];

        $(elt).add(last_child).removeAttr('style');
        $(elt).height(max_height);

        const parent_bbox = elt.getBoundingClientRect();
        const last_child_bbox = last_child.getBoundingClientRect();
        const d = parent_bbox.bottom - last_child_bbox.bottom;

        $(last_child).height(last_child_bbox.height + d);
    });
}

function equalize() {
    equalize_picture();
    equalize_columns();
}

function before_print() {
    $('.left, .right').each((index, elt) => {
        $(elt).add($('section', elt).last()[0]).removeAttr('style');
    });
    equalize_picture();
}

$(window)
    .load(() => {
        foundation();
        equalize();
    })
    .on('resize', equalize);

if (window.matchMedia) {
    window.matchMedia('print').addListener((mql) => {
        if (mql.matches) {
            before_print();
        } else {
            equalize();
        }
    });
}
