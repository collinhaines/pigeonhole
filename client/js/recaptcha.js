/*!
 * pigeonhole
 * https://collinhaines.com/
 *
 * Copyright 2016 Collin Haines
 * Licensed under the MIT license.
 */

Template.reCAPTCHA.onCreated(function () {
  $.getScript('https://www.google.com/recaptcha/api.js');
});

Template.reCAPTCHA.helpers({
  key: function () {
    return Meteor.settings.public.captchaKey;
  } // key: function ()
});
