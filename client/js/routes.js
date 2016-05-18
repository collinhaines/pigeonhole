/*!
 * pigeonhole
 * https://collinhaines.com/
 *
 * Copyright 2016 Collin Haines
 * Licensed under the MIT license.
 */

Router.configure({
  layoutTemplate: 'layout'
});

Router.route('/', {
  name: 'root',

  action: function () {
    this.render('home');
  } // action: function ()
});
