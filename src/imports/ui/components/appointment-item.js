import React from 'react';
import moment from 'moment';

export default class AppointmentItem extends React.Component {
  parseDate(date) {
    return moment(date).format("MM/DD/YYYY HH:mm");
  }
  render() {
    return (
      <div className="appointment-item">
        <span className="appointment-item__student-name">{this.props.appointment && this.props.appointment.student ? this.props.appointment.student.name : null}</span>
        <span className="appointment-item__date">{this.props.appointment && this.props.appointment.date ? this.parseDate(this.props.appointment.date) : null}</span>
        <span className="appointment-item__parent-email">{this.props.appointment && this.props.appointment.student && this.props.appointment.student.parent ? this.props.appointment.student.parent.email : null}</span>
      </div>
    );
  }
}