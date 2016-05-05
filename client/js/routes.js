/*!
 * routes.js
 *
 * Author:    Collin Haines.
 * Copyright: 2016. All Rights Reserved.
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
