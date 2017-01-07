import './navigation.html';

import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';

import '/imports/library/collapse.js';
import '/imports/library/transition.js';

Template.navigation.onCreated(function () {
  $.getScript('https://cdn.ravenjs.com/3.5.1/raven.min.js').done(function () {
    Raven.config('https://fc1dccaab3d8469c813eb25abd9dfd30@app.getsentry.com/95071').install();
  });
});

Template.navigation.events({
  'click nav .nav li'() {
    if ($('.navbar-collapse').hasClass('in')) {
      $('.navbar-toggle').click();
    }
  },

  'click nav a'(event) {
    event.target.blur();
  }
});
