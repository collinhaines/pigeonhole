/*!
 * pigeonhole
 * https://collinhaines.com/
 *
 * Copyright 2016 Collin Haines
 * Licensed under the MIT license.
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
