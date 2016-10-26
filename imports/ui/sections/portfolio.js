import './portfolio.html';

import { Template } from 'meteor/templating';
import { Tracker } from 'meteor/tracker';

import { Portfolio } from '/imports/api/portfolio.js';

Template.portfolioSection.onCreated(function () {
  Tracker.autorun(() => {
    this.subscribe('portfolio');
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
