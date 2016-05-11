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

  waitOn: function () {
    return Meteor.subscribe('showcase');
  }, // waitOn: function ()

  action: function () {
    if (this.ready()) {
      this.render('home');
    } // if (this.ready())
  } // action: function ()
});
