import './portfolio.html';

import { Template } from 'meteor/templating';
import { Tracker } from 'meteor/tracker';
import { Meteor } from 'meteor/meteor';
import { $ } from 'meteor/jquery';

import { Portfolio } from '/imports/api/portfolio.js';

Template.portfolio.onCreated(function () {
  Tracker.autorun(function () {
    Meteor.subscribe('portfolio');
  });
});

Template.portfolio.helpers({
  portfolio() {
    return Portfolio.find();
  },

  renderLink(title) {
    return title.toLowerCase().replace(' ', '-');
  }
});

Template.portfolio.events({
  'click #filter a'(event) {
    event.target.blur();
    event.preventDefault();

    $('#filter a.current').removeClass('current');

    $(event.target).addClass('current');
  }
});
