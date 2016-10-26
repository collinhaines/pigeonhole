import './recaptcha.html';

import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import { $ } from 'meteor/jquery';

Template.reCAPTCHA.onCreated(function () {
  $.getScript('https://www.google.com/recaptcha/api.js');
});

Template.reCAPTCHA.helpers({
  key() {
    return Meteor.settings.public.captchaKey;
  }
});
