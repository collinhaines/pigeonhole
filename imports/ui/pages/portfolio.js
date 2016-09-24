import './portfolio.html';

import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';

Template.portfolio.events({
  'click #filter a'(event) {
    event.target.blur();
    event.preventDefault();

    $('#filter a.current').removeClass('current');

    $(event.target).addClass('current');
  }
});
