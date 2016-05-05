/*!
 * portfolio.js
 *
 * Author:    Collin Haines.
 * Copyright: 2016. All Rights Reserved.
 */

Template.portfolio.helpers({
  items: function () {
    return showcase.find({}, {
      sort: {
        title: 1
      }
    });
  } // items: function ()
});

Template.portfolio.events({
  'click .portfolio-overview-row .portfolio-item-preview img': function (event) {
    var head = $('#portfolio .header').outerHeight(true);
    var item = showcase.findOne({
      _id: $(event.target).parent().attr('data-id')
    });

    // Assign the image source.
    $('.portfolio-detailed-row img').attr({
      src: '/img/' + item.image,
      alt: item.title
    }).one('load', function () {
      $('#portfolio .container').css('height', head + $('.portfolio-detailed-row').outerHeight(true) + 'px');
    });

    // Assign the header.
    $('.portfolio-detailed-row h4').text(item.title);

    // Create and assign the listing.
    var list = '<dl class="dl-horizontal">';
    for (var i = 0; i < item.lists.length; i++) {
      list += '<dt>' + item.lists[i].type + '</dt><dd>' + item.lists[i].data + '</dd>';
    } // for (var i = 0; i < item.lists.length; i++)

    $('.portfolio-detailed-row span').html(list + '</dl>');

    // Animate visuals.
    $('.portfolio-overview-row').removeClass('fadeInLeft').addClass('fadeOutLeft').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
      $(this).css('display', 'none');
    });

    $('.portfolio-detailed-row').css({
      position: 'absolute',
      top:      head,
      display:  ''
    }).removeClass('fadeOutRight').addClass('fadeInRight').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
      $(this).removeAttr('style');
    });
  }, // 'click .portfolio-overview-row .portfolio-item-preview' img: function (event)

  'click .portfolio-detailed-row button': function (event) {
    event.target.blur();

    var head = $('#portfolio .header').outerHeight(true);

    $('#portfolio .container').css('height', head + $('.portfolio-overview-row').outerHeight(true));

    $('.portfolio-detailed-row').css({
      position: 'absolute',
      top:      head
    }).removeClass('fadeInRight').addClass('fadeOutRight').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
      $(this).removeAttr('style').css('display', 'none');
    });

    $('.portfolio-overview-row').removeClass('fadeOutLeft').addClass('fadeInLeft').css('display', '').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
      $(this).removeAttr('style');
    });
  } // 'click .portfolio-detailed-row button': function (event)
});
