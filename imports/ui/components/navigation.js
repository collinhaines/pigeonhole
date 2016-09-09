import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';

import '/imports/library/collapse.js';
import '/imports/library/transition.js';

import './navigation.html';

Template.navigation.onCreated(function () {
  $.getScript('https://cdn.ravenjs.com/3.5.1/raven.min.js')
    .done(function () {
      Raven.config('https://fc1dccaab3d8469c813eb25abd9dfd30@app.getsentry.com/95071').install();
    });
});

Template.navigation.events({
  // Scroll the user to the specified location.
  'click nav .nav li'(event) {
    $('html, body').animate({
      scrollTop: $(event.target.hash).position().top
    });

    if ($('.navbar-collapse').hasClass('in')) {
      $('.navbar-toggle').click();
    }

    event.target.blur();
    event.preventDefault();
  }
});
