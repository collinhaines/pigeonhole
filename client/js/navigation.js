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

    $('.navbar-toggle').click();

    event.preventDefault();
  } // 'click nav .nav li': function (event)
});
