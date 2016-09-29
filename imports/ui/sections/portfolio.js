import './portfolio.html';

import { Template } from 'meteor/templating';
import { Tracker } from 'meteor/tracker';
import { Meteor } from 'meteor/meteor';
import { $ } from 'meteor/jquery';

import { Portfolio } from '/imports/api/portfolio.js';

Template.portfolioSection.onCreated(function () {
  Tracker.autorun(function () {
    Meteor.subscribe('portfolio');
  });
});

Template.portfolioSection.helpers({
  portfolio() {
    return Portfolio.find({}, {
      limit: 2,
      sort: {
        endDate: -1
      }
    });
  },

  renderLink(link) {
    return link.toLowerCase().replace(new RegExp(' ', 'g'), '-');
  }
});
