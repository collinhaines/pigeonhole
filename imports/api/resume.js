import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Resume = new Mongo.Collection('resume');

if (Meteor.isServer) {
  Meteor.publish('resume', function () {
    return Resume.find();
  });
}

Resume.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; }
});
