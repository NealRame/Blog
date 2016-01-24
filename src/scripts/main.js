/*global jQuery:false*/
(function($) {
    function equalize_picture() {
        var section = $('#personal_details');
        var picture = $('img', section);
        var picture_margin = picture.outerHeight() - picture.innerHeight();
        var details_height = $('ul', section).height() - picture_margin;

        picture.removeAttr('style');
        if (details_height > picture.height()) {
            picture.height(details_height).width(details_height);
        }
    }

    function equalize_columns() {
        var elements = $('.left, .right');
        var max_height = Math.max.apply(
            null,
            elements.map(function(index, elt) {
                return $(elt).height();
            })
        );
        elements.each(function(index, elt) {
            var last_child = $('section', elt).last()[0];

            $(last_child).css({});
            $(elt).height(max_height);

            var parent_bbox = elt.getBoundingClientRect();
            var last_child_bbox = last_child.getBoundingClientRect();
            var d = parent_bbox.bottom - last_child_bbox.bottom;

            $(last_child).height(last_child_bbox.height + d);
        });
    }

    function equalize() {
        equalize_picture();
        equalize_columns();
    }

    function before_print() {
        $('.left, .right').each(function(index, elt) {
            $(elt).add($('section', elt).last()[0]).removeAttr('style');
        });
        equalize_picture();
    }

    $(window)
        .load(equalize)
        .on('resize', equalize);

    if (window.matchMedia) {
        window.matchMedia('print').addListener(function(mql) {
            if (mql.matches) {
                before_print();
            } else {
                equalize();
            }
        });
    }
})(jQuery);
