import './viewer.html';

import { FlowRouter } from 'meteor/kadira:flow-router';
import { Template } from 'meteor/templating';
import { Tracker } from 'meteor/tracker';
import { Meteor } from 'meteor/meteor';

import { Portfolio } from '/imports/api/portfolio.js';

Template.viewer.onCreated(function () {
  Tracker.autorun(function () {
    // When the user goes back, `check` runs against an undefined parameter
    // throwing unnecessary errors into the server log. This will stop it.
    if (FlowRouter.getParam('title') !== undefined) {
      Meteor.subscribe('portfolio-item', FlowRouter.getParam('title'));
    }
  });
});

Template.viewer.helpers({
  item() {
    return Portfolio.findOne({ title: new RegExp(FlowRouter.getParam('title'), 'i') });
  },

  isWebType(type) {
    return type === 'web';
  },

  isGraphicType(type) {
    return type === 'graphic';
  },

  isMobileType(type) {
    return type === 'mobile';
  }
});
