import './viewer.html';

import { FlowRouter } from 'meteor/kadira:flow-router';
import { Template } from 'meteor/templating';
import { Tracker } from 'meteor/tracker';
import { Meteor } from 'meteor/meteor';

import { Portfolio } from '/imports/api/portfolio.js';

Template.viewer.onCreated(function () {
  Tracker.autorun(function () {
    Meteor.subscribe('portfolio-item', FlowRouter.getParam('title'));
  });
});

Template.viewer.helpers({
  item() {
    return Portfolio.findOne({ title: new RegExp(FlowRouter.getParam('title'), 'i') });
  },

  hasSomething(date, languages, frameworks) {
    return date !== undefined || languages !== undefined || frameworks !== undefined;
  }
});
