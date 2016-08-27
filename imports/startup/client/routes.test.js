import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

// Load components.
import '/imports/ui/components/navigation.js';
import '/imports/ui/components/footer.js';

// Load template.
import '/imports/ui/pages/main-page.js';

FlowRouter.route('/', {
  name: 'Home',
  action() {
    BlazeLayout.render('main-page', { main: 'root-directory' });
  }
});
