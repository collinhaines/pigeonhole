import { Random } from 'meteor/random';
import { chai } from 'meteor/practicalmeteor:chai';
import { $ } from 'meteor/jquery';

import '../contact.js';

describe('Contact Form', function () {
  it('Spawn Alert: Name Empty', function () {
    $('#contact form').submit();

    chai.assert.equal('Please fill out the name field.', $('#contact .alert p').text());
  });

  it('Spawn Alert: Name Maximum', function () {
    $('#contact #name').val(Random.hexString(51));

    $('#contact form').submit();

    chai.assert.equal('Please do not exceed 50 characters for the name field.', $('#contact .alert p').text());
  });

  it('Spawn Alert: Email Empty', function () {
    $('#contact #name').val('John Doe');

    $('#contact form').submit();

    chai.assert.equal('Please fill out the email field.', $('#contact .alert p').text());
  });

  it('Spawn Alert: Email Maximum', function () {
    $('#contact #email').val(Random.hexString(90) + '@' + Random.hexString(10) + '.com');

    $('#contact form').submit();

    chai.assert.equal('Please do not exceed 100 characters for the email field.', $('#contact .alert p').text());
  });

  it('Spawn Alert: Message Empty', function () {
    $('#contact #email').val('test@example.com');

    $('#contact form').submit();

    chai.assert.equal('Please fill out the message field.', $('#contact .alert p').text());
  });

  it('Spawn Alert: Message Maximum', function () {
    $('#contact #message').val(Random.hexString(501));

    $('#contact form').submit();

    chai.assert.equal('Please do not exceed 500 characters for the message field.', $('#contact .alert p').text());
  });
});
