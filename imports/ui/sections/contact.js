import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';

import './contact.html';

import '../components/recaptcha.js';

Template.contact.onCreated(function contactCreated() {
  this.alertError = (element, text) => {
    // Render the alert and its text.
    $('#contact .alert')
      .removeClass('alert-success alert-danger alert-info')
      .addClass('alert-warning')
      .find('p')
      .text(text);

    // Remove any other warnings.
    $('#contact .form-group').removeClass('has-warning');

    // Add the current field warning.
    $('#contact ' + element)
      .parent()
      .addClass('has-warning');

    // Show the alert.
    if (!$('#contact .alert').hasClass('is-visible')) {
      $('#contact .alert').addClass('is-visible');
    }
  };
});

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
  'submit #contact form'(event, instance) {
    const name    = $('#contact #name').val().trim();
    const email   = $('#contact #email').val().trim();
    const message = $('#contact #message').val().trim();
    let captcha;

    // Validate name.
    if (name === '') {
      instance.alertError('#name', 'Please fill out the name field.');

      event.preventDefault();

      return false;
    } else if (name.length > 50) {
      instance.alertError('#name', 'Please do not exceed 50 characters for the name field.');

      event.preventDefault();

      return false;
    }

    // Validate email.
    if (email === '') {
      instance.alertError('#email', 'Please fill out the email field.');

      event.preventDefault();

      return false;
    } else if (email.length > 100) {
      instance.alertError('#email', 'Please do not exceed 100 characters for the email field.');

      event.preventDefault();

      return false;
    }

    // Validate message.
    if (message === '') {
      instance.alertError('#message', 'Please fill out the message field.');

      event.preventDefault();

      return false;
    } else if (message.length > 500) {
      instance.alertError('#message', 'Please do not exceed 500 characters for the message field.');

      event.preventDefault();

      return false;
    }

    // Validate reCAPTCHA.
    if (captcha === '') {
      instance.alertError('#this-is-nothing', 'Please complete the CAPTCHA.');

      event.preventDefault();

      return false;
    }

    Meteor.call('contact', {
      name:    name,
      email:   email,
      captcha: captcha,
      message: message
    }, (error, result) => {
      // Show the alert.
      if (!$('#contact .alert').hasClass('is-visible')) {
        $('#contact .alert').addClass('is-visible');
      }

      if (error) {
        instance.alertError(error.error, error.reason);

        return;
      }

      // Reset reCAPTCHA.
      grecaptcha.reset();

      // Toggle alert status.
      $('#contact .alert')
        .removeClass('alert-warning')
        .addClass('alert-success');

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
    });

    event.preventDefault();
  }
});
