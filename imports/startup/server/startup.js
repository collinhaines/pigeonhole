import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';

import { Portfolio } from '/imports/api/portfolio.js';
import { Resume } from '/imports/api/resume.js';

Meteor.startup(function () {
  // Insert portfolio items from the JSON file to the database on startup.
  startupFile('resume.json', Resume);
  startupFile('portfolio.json', Portfolio);
});

/**
 * Startup
 *
 * Runs through a given file and detects if the document exists, and/or if it
 * needs to be updated.
 *
 * @param {String} file       -- The file to run through.
 * @param {Object} collection -- The collection to work with.
 */
function startupFile(file, collection) {
  _.each(JSON.parse(Assets.getText(file)), (item) => {
    const search = collection.findOne({ title: item.title });

    if (search) {
      updateDocument(item, search, collection);
    } else {
      console.log('Collection insert detected from ' + file + '. Title: ' + item.title);

      collection.insert(item);
    }
  });
}

/**
 * Update
 *
 * Updates the database in the instance that the local file has a different
 * value.
 *
 * @param {Object} file       -- The local file's JSON object.
 * @param {Object} base       -- The database's JSON object.
 * @param {Object} collection -- The collection to work with.
 */
function updateDocument(file, base, collection) {
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
    collection.update({
      _id: base._id
    }, {
      $set: setter
    });
  }
}
