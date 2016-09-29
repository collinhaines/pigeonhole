import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

// Load components.
import '/imports/ui/components/navigation.js';
import '/imports/ui/components/footer.js';

// Load layout.
import '/imports/ui/layouts/overlord.js';

// Load pages.
import '/imports/ui/pages/main-page.js';
import '/imports/ui/pages/portfolio.js';
import '/imports/ui/pages/resume.js';
import '/imports/ui/pages/viewer.js';

FlowRouter.route('/', {
  action() {
    BlazeLayout.render('overlord', { main: 'main-page' });
  }
});

FlowRouter.route('/portfolio', {
  action() {
    BlazeLayout.render('overlord', { main: 'portfolio' });
  }
});

FlowRouter.route('/portfolio/:title', {
  action() {
    BlazeLayout.render('overlord', { main: 'viewer' });
  }
});

FlowRouter.route('/resume', {
  action() {
    BlazeLayout.render('overlord', { main: 'resume' });
  }
});
