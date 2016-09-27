import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Portfolio = new Mongo.Collection('portfolio');

if (Meteor.isServer) {
  Meteor.publish('portfolio', function () {
    return Portfolio.find();
  });

  Meteor.publish('portfolio-item', function (title) {
    check(title, String);

    return Portfolio.find({ title: new RegExp(title, 'i') });
  });
}

Portfolio.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; }
});
