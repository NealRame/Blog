/*global jQuery:false*/
(function($) {
    function equalize() {
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

    function before_print() {
        $('.left, .right').each(function(index, elt) {
            $(elt).add($('section', elt).last()[0]).removeAttr('style');
        });
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
