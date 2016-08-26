import { Meteor } from 'meteor/meteor';
import { Showcase } from '/imports/api/showcase.js';

Meteor.startup(function () {
  // Insert portfolio items from the JSON file to the database on startup.
  _.each(JSON.parse(Assets.getText('portfolio.json')), function (portfolio) {
    const item = Showcase.findOne({title: portfolio.title});

    if (item) {
      updateDocument(portfolio, item);
    } else {
      console.log('Inserting into showcase: ' + portfolio.title);
      Showcase.insert(portfolio);
    }
  });
});

/**
 * Updates the database in the instance that the local file
 * has a different value.
 *
 * @param file: The local file's JSON object.
 * @param base: The database's JSON object.
 */
function updateDocument(file, base) {
  let setter = {};

  // Iterate through the file.
  // Always assume it is the correct version vs the database.
  for (let key in file) {
    // If the file has an updated value, store temporarily.
    if (file[key] !== base[key]) {
      setter[key] = file[key];
    }
  }

  // If there's something new, update the database.
  if (Object.getOwnPropertyNames(setter).length) {
    // Queue the database once so we don't have to download more RAM.
    Showcase.update({
      _id: base._id
    }, {
      $set: setter
    });
  }
}
