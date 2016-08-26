import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';

import './recaptcha.html';

Template.reCAPTCHA.onCreated(function () {
  $.getScript('https://www.google.com/recaptcha/api.js');
});

Template.reCAPTCHA.helpers({
  key() {
    return Meteor.settings.public.captchaKey;
  }
});
