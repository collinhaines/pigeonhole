/*!
 * recaptcha.js
 *
 * Author:    Collin Haines
 * Copyright: 2016. All Rights Reserved.
 */

Template.reCAPTCHA.onCreated(function () {
  $.getScript('https://www.google.com/recaptcha/api.js');
});

Template.reCAPTCHA.helpers({
  key: function () {
    return Meteor.settings.public.captchaKey;
  } // key: function ()
});
