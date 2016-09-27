import { Meteor } from 'meteor/meteor';

import { Portfolio } from '/imports/api/portfolio.js';
import { Showcase } from '/imports/api/showcase.js';

Meteor.startup(function () {
  // TODO: Delete this and its relatives after front-page migration.
  _.each(JSON.parse(Assets.getText('showcase.json')), function (portfolio) {
    const item = Showcase.findOne({title: portfolio.title});

    if (item) {
      updateDocument(portfolio, item, Showcase);
    } else {
      console.log('Inserting into showcase: ' + portfolio.title);
      Showcase.insert(portfolio);
    }
  });

  // Insert portfolio items from the JSON file to the database on startup.
  _.each(JSON.parse(Assets.getText('portfolio.json')), function (portfolio) {
    const item = Portfolio.findOne({ title: portfolio.title });

    if (item) {
      updateDocument(portfolio, item, Portfolio);
    } else {
      console.log('Portfolio Insert Detected. Title: ' + portfolio.title);
      Portfolio.insert(portfolio);
    }
  });
});

/**
 * Updates the database in the instance that the local file
 * has a different value.
 *
 * @param file: The local file's JSON object.
 * @param base: The database's JSON object.
 * @param Collection: The collection being updated.
 */
function updateDocument(file, base, Collection) {
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
    console.log('Collection Update Detected. Object:', setter);

    // Queue the database once so we don't have to download more RAM.
    Collection.update({
      _id: base._id
    }, {
      $set: setter
    });
  }
}
