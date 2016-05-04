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

  action: function () {
    this.render('home');
  } // action: function ()
});
