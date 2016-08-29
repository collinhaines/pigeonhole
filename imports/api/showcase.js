import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Showcase = new Mongo.Collection('showcase');

if (Meteor.isServer) {
  Meteor.publish('showcase', function showcasePublication() {
    return Showcase.find();
  });
}

Showcase.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; }
});
