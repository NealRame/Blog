import $ from 'jquery';
import foundation from 'foundation';
import {dispatch, existy} from 'common/functional';

function input_focus_in() {
    $(this).parent().addClass('focus');
}

function input_focus_out() {
    $(this).parent().removeClass('focus');
}

const validate_input = dispatch(
    (name, value) => {
        if (name === 'name' && value.length === 0) {
            return 'Your name is required.';
        }
    }
);

function validate_form($form) {
    return new Promise(function(resolve, reject) {
        const errors = $('.input', $form)
            .find('input, textarea')
            .map((index, elt) => {
                const $elt = $(elt);
                return {
                    error: validate_input($elt.attr('name'), $elt.val()),
                    $input: $elt.parent()
                };
            })
            .filter((index, validation) => {
                return existy(validation.error);
            });
        if (errors.length > 0) {
            reject(errors);
        } else {
            resolve();
        }
    });
}

$(window).load(() => {
    foundation();
    const $form = $('form');
    $('.input', $form)
        .find('input, textarea')
        .on('focus', input_focus_in)
        .on('blur', input_focus_out);
    $('#submit', $form)
        .on('click', () => {
            validate_form($form)
                .then(() => $form.get(0).submit())
                .catch(console.error.bind(console));
        });
});
