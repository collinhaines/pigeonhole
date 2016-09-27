import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Portfolio = new Mongo.Collection('portfolio');

if (Meteor.isServer) {
  Meteor.publish('portfolio', function () {
    return Portfolio.find();
  });
}

Portfolio.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; }
});
