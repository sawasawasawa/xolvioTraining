import ReactDOM from 'react-dom';
import React from 'react';
import BookAppointment from '../imports/ui/components/book-appointment';

Meteor.startup(function () {
  // Use Meteor.startup to render the component after the page is ready
  ReactDOM.render(<BookAppointment />, document.getElementById('render-target'));
});