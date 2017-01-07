import { Meteor } from 'meteor/meteor';
import { Email } from 'meteor/email';
import { HTTP } from 'meteor/http';

Meteor.methods({
  contact(data) {
    let response;

    const parameters = 'secret=' + Meteor.settings.private.captchaKey + '&remoteip=' + this.connection.clientAddress + '&response=' + data.captcha;

    this.unblock();

    // Validate name.
    if (data.name.trim() === '') {
      throw new Meteor.Error('#name', 'Please fill out the name field.');
    } else if (data.name.trim().length > 50) {
      throw new Meteor.Error('#name', 'Please do not exceed 50 characters for the name field.');
    }

    // Validate email.
    if (data.email.trim() === '') {
      throw new Meteor.Error('#email', 'Please fill out the email field.');
    } else if (data.email.trim().length > 100) {
      throw new Meteor.Error('#email', 'Please do not exceed 100 characters for the email field.');
    }

    // Validate message.
    if (data.message.trim() === '') {
      throw new Meteor.Error('#message', 'Please fill out the message field.');
    } else if (data.message.trim().length > 500) {
      throw new Meteor.Error('#message', 'Please do not exceed 500 characters for the message field.');
    }

    // Validate reCAPTCHA.
    if (data.captcha.trim() === '') {
      throw new Meteor.Error('#this-is-nothing', 'Please complete the CAPTCHA.');
    }

    try {
      response = HTTP.call('post', 'https://www.google.com/recaptcha/api/siteverify', {
        content: parameters.toString('utf8'),
        headers: {
          'Content-Type':   'application/x-www-form-urlencoded',
          'Content-Length': parameters.length
        }
      });
    } catch (error) {
      throw new Meteor.error('reCAPTCHA', error.message);
    }

    if (response.data.success === false) {
      if (response.data['error-codes'][0] === 'missing-input-secret') {
        throw new Meteor.Error('missing-input-secret', 'The secret parameter is missing.');
      } else if (response.data['error-codes'][0] === 'invalid-input-secret') {
        throw new Meteor.Error('invalid-input-secret', 'The secret parameter is invalid or malformed.');
      } else if (response.data['error-codes'][0] === 'missing-input-response') {
        throw new Meteor.Error('missing-input-response', 'The response parameter is missing.');
      } else if (response.data['error-codes'][0] === 'invalid-input-response') {
        throw new Meteor.Error('invalid-input-response', 'The response parameter is invalid or malformed.');
      } else {
        throw new Meteor.Error('???', 'This error should not appear unless Google has redone their error codes.');
      }
    }

    Email.send({
      to:      'collinhaines@me.com',
      from:    data.name + ' <' + data.email + '>',
      text:    data.message,
      subject: 'Contact Form Submission'
    });

    return 'Thank you ' + data.name.trim() + ', your message has been sent!';
  }
});
