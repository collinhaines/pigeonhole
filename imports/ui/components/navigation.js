import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';

import './navigation.html';

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
