import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';

import { Showcase } from '/imports/api/showcase.js';

import './portfolio.html';

Template.portfolioSection.onCreated(function () {
  this.subscribe('showcase');

  this.renderDetail = () => {
    const head = $('#portfolio .header').outerHeight(true);
    const item = Showcase.findOne({ _id: $(event.target).parent().attr('data-id') });

    // Assign the image source.
    $('.portfolio-detailed-row img')
      .attr({
        src: '/img/' + item.image,
        alt: item.title
      })
      .one('load', function () {
        $('#portfolio .container').css('height', head + $('.portfolio-detailed-row').outerHeight(true));
      });

    // Assign the header.
    $('.portfolio-detailed-row h4').text(item.title);

    // Assign the types.
    const types = ['description', 'improvement', 'date', 'languages', 'frameworks'];
    for (let i = 0; i < types.length; i++) {
      $('#portfolio-detailed-' + types[i]).text(item[types[i]]);
    }

    // Assign the URL.
    $('#portfolio-detailed-url a')
      .attr('href', 'http://' + item.url)
      .text(item.url);

    // Animate visuals.
    $('.portfolio-overview-row')
      .removeClass('fadeInLeft')
      .addClass('fadeOutLeft')
      .one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
        $(this).css('display', 'none');
      });

    $('.portfolio-detailed-row')
      .css({
        position: 'absolute',
        top:      head,
        display:  ''
      })
      .removeClass('fadeOutRight')
      .addClass('fadeInRight')
      .one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
        $(this).removeAttr('style');
      });
  };

  this.renderOverview = () => {
    // Make the visual look good.
    event.target.blur();

    const head = $('#portfolio .header').outerHeight(true);

    // Adjust container height.
    $('#portfolio .container').css('height', head + $('.portfolio-overview-row').outerHeight(true));

    // Animate visuals.
    $('.portfolio-detailed-row')
      .css({
        position: 'absolute',
        top:      head
      })
      .removeClass('fadeInRight')
      .addClass('fadeOutRight')
      .one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
        $(this).removeAttr('style').css('display', 'none');
      });

    $('.portfolio-overview-row')
      .removeClass('fadeOutLeft')
      .addClass('fadeInLeft')
      .css('display', '')
      .one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
        $(this).removeAttr('style');
      });
  };
});

Template.portfolioSection.helpers({
  items() {
    return Showcase.find({}, { sort: { title: 1 } });;
  }
});

Template.portfolioSection.events({
  // User has clicked an image, show the details.
  'click .portfolio-overview-row .portfolio-item-preview img'(event, instance) {
    instance.renderDetail();
  },

  // User is ready to leave the detailed view.
  'click .portfolio-detailed-row button'(event, instance) {
    instance.renderOverview();
  }
});
