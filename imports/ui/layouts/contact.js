import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';

import './contact.html';

import '../components/recaptcha.js';

Template.contact.events({
  // Toggle material floating label.
  'focus .form-control, blur .form-control'(event) {
    $(event.target).parents('.form-group').toggleClass('focused');
  },

  // Update character count.
  'keyup .form-control'(event) {
    $(event.target).parent().addClass('has-text').find('span').text(event.target.value.trim().length + ' / ' + $(event.target).attr('maxlength'));

    if (event.target.value.trim() === '') {
      $(event.target).parent().removeClass('has-text');
    }
  },

  // Close an alert.
  'click .alert .close'(event) {
    $(event.target).parent().removeClass('is-visible');
  },

  // User has submitted a form - send to server.
  'submit #contact form'(event) {
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
        $('#contact .alert p').text(error.reason);

        // Toggle invalid inputs.
        $('#contact .has-warning').removeClass('has-warning');
        $('#contact ' + error.error).parent().addClass('has-warning');
      } else {
        // Reset reCAPTCHA.
        grecaptcha.reset();

        // Toggle alert status.
        $('#contact .alert').removeClass('alert-warning').addClass('alert-success');

        // Toggle alert message.
        $('#contact .alert p').text(result);

        // Remove any invalid inputs.
        $('#contact .has-warning').removeClass('has-warning');

        // Reset inputs.
        $('#contact .form-control').val('');

        // Reset visuals.
        $('#contact .form-group').removeClass('has-text focused');

        // Reset character count.
        $('#contact .form-group span').each(function () {
          $(this).text('0 / ' + $(this).attr('maxlength'));
        });
      }

      // Show the alert.
      $('#contact .alert').addClass('is-visible');
    });

    event.preventDefault();
  }
});
