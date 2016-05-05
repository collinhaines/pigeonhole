/*!
 * publish.js
 *
 * Author:    Collin Haines.
 * Copyright: 2016. All Rights Reserved.
 */

Meteor.publish('showcase', function () {
  return showcase.find();
});
