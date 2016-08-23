/*!
 * publish.js
 *
 * Author:    Collin Haines.
 * Copyright: 2016. All Rights Reserved.
 */

Meteor.publish('showcase', function () {
  return showcase.find();
});

showcase.deny({
  update: function () {
    return true;
  }, // update: function ()

  insert: function () {
    return true;
  }, // insert: function ()

  remove: function () {
    return true;
  } // remove: function ()
});
