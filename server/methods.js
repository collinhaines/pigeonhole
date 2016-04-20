/*!
 * methods.js
 *
 * Author:    Collin Haines
 * Copyright: 2016. All Rights Reserved.
 */

Meteor.methods({
  contact: function (data) {
    // Validate name.
    if (data.name.trim() === '') {
      throw new Meteor.Error('#name', 'Please fill out the name field.');
    } else if (data.name.trim().length > 50) {
      throw new Meteor.Error('#name', 'Please do not exceed 50 characters for the name field.');
    } // if (data.name.trim() === '')

    // Validate email.
    if (data.email.trim() === '') {
      throw new Meteor.Error('#email', 'Please fill out the email field.');
    } else if (data.email.trim().length > 100) {
      throw new Meteor.Error('#email', 'Please do not exceed 100 characters for the email field.');
    } // if (data.email.trim() === '')

    // Validate message.
    if (data.message.trim() === '') {
      throw new Meteor.Error('#message', 'Please fill out the message field.');
    } else if (data.message.trim().length > 500) {
      throw new Meteor.Error('#message', 'Please do not exceed 500 characters for the message field.');
    } // if (data.message.trim() === '')

    // Validate reCAPTCHA.
    if (data.captcha.trim() === '') {
      throw new Meteor.Error('', 'Please complete the CAPTCHA.');
    } // if (data.captcha.trim() === '')

    var response;
    var parameters = 'secret=' + Meteor.settings.private.captchaKey + '&remoteip=' + this.connection.clientAddress + '&response=' + data.captcha;

    try {
      response = Meteor.http.call('post', 'https://www.google.com/recaptcha/api/siteverify', {
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
      } // if (response.data['error-codes'][0] === 'missing-input-secret')
    } // if (response.data.success === false)

    this.unblock();

    Email.send({
      // TODO: Set up info@collinhaines.com
      to:      'collinhaines@me.com',
      from:    data.name + ' <' + data.email + '>',
      subject: 'Contact Form Submission',
      text:    data.message
    });

    return 'Thank you ' + data.name.trim() + ', your message has been sent!';
  } // contact: function (data)
});
