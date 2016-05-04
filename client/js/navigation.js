/*!
 * navigation.js
 *
 * Author:    Collin Haines
 * Copyright: 2016. All Rights Reserved.
 */

Template.nav.events({
  // Scroll the user to the specified location.
  'click nav .nav li': function (event) {
    $('html, body').animate({
      scrollTop: $(event.target.hash).position().top
    });

    if ($('.navbar-collapse').hasClass('in')) {
      $('.navbar-toggle').click();
    } // if ($('.navbar-collapse').hasClass('in'))

    event.target.blur();
    event.preventDefault();
  } // 'click nav .nav li': function (event)
});
