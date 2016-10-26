import './portfolio.html';

import { Template } from 'meteor/templating';
import { Tracker } from 'meteor/tracker';
import { $ } from 'meteor/jquery';

import { Portfolio } from '/imports/api/portfolio.js';

Template.portfolio.onCreated(function () {
  Tracker.autorun(() => {
    this.subscribe('portfolio');
  });
});

Template.portfolio.helpers({
  portfolio() {
    return Portfolio.find({}, {
      sort: {
        endDate: -1
      }
    });
  },

  renderLink(link) {
    return link.toLowerCase().replace(new RegExp(' ', 'g'), '-');
  }
});

Template.portfolio.events({
  'click #filter a'(event) {
    event.target.blur();
    event.preventDefault();

    // Switch visual representation of current filter.
    $('#filter a.current').removeClass('current');

    $(event.target).addClass('current');

    const type = $(event.target).data('filter');

    // Fade in and out proper items.
    if (type === 'all') {
      $('.portfolio-content .row .col-sm-4').fadeIn();
    } else {
      $('.portfolio-content .row .col-sm-4')
        .not('[data-type="' + type + '"]')
        .fadeOut();

      $('.portfolio-content .row .col-sm-4[data-type="' + type + '"]').fadeIn();
    }
  }
});
