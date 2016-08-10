import ReactDOM from 'react-dom';
import React from 'react';
import BookAppointment from '../imports/ui/components/book-appointment';
import getDataFromURL from "../imports/ui/helpers/get-data-from-url";

Meteor.startup(function () {
  const {teacherId} = getDataFromURL();
  // Use Meteor.startup to render the component after the page is ready
  ReactDOM.render(<BookAppointment teacherId={teacherId} />, document.getElementById('render-target'));
});