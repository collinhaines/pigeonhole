/*!
 * contact.js
 *
 * Author:    Collin Haines
 * Copyright: 2016. All Rights Reserved.
 */

Template.contact.events({
  // Toggle material floating label.
  'focus .form-control, blur .form-control': function (event) {
    $(event.target).parents('.form-group').toggleClass('focused');
  }, // 'focus .form-control, blur .form-control': function (event)

  // Update character count.
  'keyup .form-control': function (event) {
    $(event.target).parent().addClass('has-text').find('span').text(event.target.value.trim().length + ' / ' + $(event.target).attr('maxlength'));

    if (event.target.value.trim() === '') {
      $(event.target).parent().removeClass('has-text');
    } // if (event.target.value.trim() === '')
  }, // 'keyup .form-control': function (event)

  // Close an alert.
  'click .alert .close': function (event) {
    $(event.target).parent().removeClass('is-visible');
  }, // 'click .alert .close': function (event)

  // User has submitted a form - send to server.
  'submit #contact form': function (event) {
    Meteor.call('contact', {
      name:    $('#contact #name').val().trim(),
      email:   $('#contact #email').val().trim(),
      message: $('#contact #message').val().trim(),
      captcha: grecaptcha.getResponse()
    }, function (error, result) {
      if (error) {
        console.error(error);

        // Toggle alert status.
        $('#contact .alert').removeClass('alert-success').addClass('alert-warning');

        // Toggle alert message.
        if ($('#contact .alert p').length) {
          $('#contact .alert p').text(error.reason);
        } else {
          $('<p>' + error.reason + '</p>').insertAfter($('#contact .alert button'));
        } // if ($('#contact .alert p'))

        // Toggle invalid inputs.
        $('#contact .has-warning').removeClass('has-warning');
        $('#contact ' + error.error).parent().addClass('has-warning');
      } else {
        // Reset reCAPTCHA.
        grecaptcha.reset();

        // Toggle alert status.
        $('#contact .alert').removeClass('alert-warning').addClass('alert-success');

        // toggle alert message.
        if ($('#contact .alert p').length) {
          $('#contact .alert p').text(result);
        } else {
          $('<p>' + result + '</p>').insertAfter($('#contact .alert button'));
        } // if ($('#contact .alert p').length)

        // Remove any invalid inputs.
        $('#contact .has-warning').removeClass('has-warning');

        // Reset inputs.
        $('#contact .form-control').val('');
      } // if (error)

      // Show the alert.
      $('#contact .alert').addClass('is-visible');
    });

    event.preventDefault();
  } // 'submit #contact form': function (event)
});
