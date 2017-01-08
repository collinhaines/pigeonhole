import './resume.html';

import { Template } from 'meteor/templating';
import { Tracker } from 'meteor/tracker';

import { Portfolio } from '/imports/api/portfolio.js';
import { Resume } from '/imports/api/resume.js';

Template.resume.onCreated(function () {
  Tracker.autorun(() => {
    this.subscribe('resume');
    this.subscribe('portfolio');
  });
});

Template.resume.helpers({
  education() {
    return Resume.find({
      type: 'education'
    }, {
      sort: {
        endDate: -1
      }
    });
  },

  languages() {
    return [
      {
        name: 'C++',
        date: '2013 - 2015'
      }, {
        name: 'C#',
        date: '2014 - Present'
      }, {
        name: 'Java',
        date: '2012 - Present'
      }, {
        name: 'JavaScript',
        date: '2008 - Present'
      }, {
        name: 'Objective-C',
        date: '2013 - 2015'
      }, {
        name: 'PHP',
        date: '2011 - Present'
      }, {
        name: 'Swift',
        date: '2016 - Present'
      }
    ];
  },

  experience() {
    return Resume.find({
      type: 'experience'
    }, {
      limit: 3,
      sort: {
        endDate: -1
      }
    });
  },

  projects() {
    return Portfolio.find({}, {
      limit: 3,
      sort: {
        endDate: -1
      }
    });
  },

  renderLanguage(language) {
    return language.split(',')[0];
  },

  renderYear(date) {
    return new Date(date).getFullYear();
  },

  renderDate(date) {
    date = new Date(date).toDateString().split(' ');

    return date[1] + ' ' + date[3];
  }
});
