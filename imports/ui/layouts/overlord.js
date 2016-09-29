import './overlord.html';

import { FlowRouter } from 'meteor/kadira:flow-router';
import { Template } from 'meteor/templating';
import { Tracker } from 'meteor/tracker';

Template.overlord.onCreated(function () {
  Tracker.autorun(function () {
    FlowRouter.watchPathChange();

    // Detects if the window is scrolled down on a page,
    // then it'll scroll back up if it is scrolled down.
    if ($(window).scrollTop() !== 0) {
      $(window).scrollTop(0);
    }
  });
});
