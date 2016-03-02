import $ from 'jquery';
import _ from 'underscore';
import foundation from 'foundation';
import {dispatch, existy} from 'common/functional';
import {check_mail_address} from 'common/utils';

const get_simple_form_API_token = '7489a07ba6b67c76099174e8b28a2d55';
const callout_template = _.template(
`
<div class="callout <%= level %>">
    <p><%= message %></p>
</div>
`
);

function ValidationError(reason, msg) {
    this.stack = (new Error).stack;
    this.message = msg;
    this.reason = reason || {};
}
ValidationError.prototype = Object.create(Error.prototype);
ValidationError.prototype.name = 'ValidationError';

const validate_data = dispatch(
    ({attr, value}) => {
        if (attr === 'email') {
            return (check_mail_address(value)
                ? {attr, value}
                : {attr, error: 'Your email address is not valid.'}
            );
        }
    },
    ({attr, value}) => {
        if (attr === 'name') {
            return (value.length > 0
                ? {attr, value}
                : {attr, error: 'Your name is required.'}
            );
        }
    },
    ({attr, value}) => {
        if (attr === 'message') {
            return (value.length > 0
                ? {attr, value}
                : {attr, error: 'Your message is empty.'}
            );
        }
    }
);

function validate_form_data(form_data) {
    return new Promise(function(resolve, reject) {
        const [errors, values] = form_data
            .map(validate_data)
            .filter(existy)
            .reduce(([errors, values], {attr, error, value}) => {
                return (existy(error)
                    ? [Object.assign(errors || {}, _.object([[attr, error]])), values]
                    : [errors, Object.assign(values || {}, _.object([[attr, value]]))]
                );
            }, []);
        if (existy(errors)) {
            return reject(new ValidationError(errors, 'Validation error'));
        }
        resolve(values);
    });
}

function get_form_data($form) {
    return Promise.resolve($('.input', $form).map((index, elt) => {
        return {
            attr: elt.id,
            value: $('input, textarea', $(elt)).val()
        };
    }).get());
}

function send_form_data(values) {
    return new Promise(function(resolve, reject) {
        $.ajax({
            dataType: 'jsonp',
            type: 'POST',
            url: `https://getsimpleform.com/messages/ajax?form_api_token=${get_simple_form_API_token}`,
            data: values
        })
        .done(resolve)
        .fail((jq_XHR, texts_status, error) => reject(error));
    });
}

function handle_form_data_success() {
    $('.input', this).find('input, textarea').val('');
    $('#form-message-wrapper', this)
        .html(callout_template({
            level: 'success',
            message: 'Your message has been sent. Thank you.'
        }))
        .delay(5000)
        .fadeOut();
}

function handle_form_data_errors(err) {
    if (err instanceof ValidationError) {
        for (let attr of Object.keys(err.reason)) {
            $(`#${attr}`, this)
                .addClass('error')
                .append(`<span>${err.reason[attr]}</span>`);
        }
    }
    $('#form-message-wrapper', this).html(callout_template({
        level: 'alert',
        message: err.message
    }));
}

function input_focus_in() {
    $(this).parent().addClass('focus');
}

function input_focus_out() {
    $(this).parent().removeClass('focus');
}

function clear_form($form) {
    $('.input', $form).removeClass('error');
    $('span', $form).remove();
    $('#form-message-wrapper', $form).empty();
    return Promise.resolve($form);
}

function submit_form() {
    clear_form(this)
        .then(get_form_data)
        .then(validate_form_data)
        .then(send_form_data)
        .then(handle_form_data_success.bind(this))
        .catch(handle_form_data_errors.bind(this));
}

$(window).load(() => {
    foundation();
    const $form = $('form');
    $('.input', $form)
        .find('input, textarea')
        .on('focus', input_focus_in)
        .on('blur', input_focus_out);
    $('#submit', $form)
        .on('click', () => submit_form.call($form));
});
