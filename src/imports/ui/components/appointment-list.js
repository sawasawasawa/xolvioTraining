import React from 'react';
import AppointmentItem from './appointment-item'

export default class AppointmentList extends React.Component {
  constructor(props) {
    super(props);
    this.renderAppointmentItems = this.renderAppointmentItems.bind(this);
  }
  renderAppointmentItems() {
    return this.props.appointments.map(function(appointment) {
      return <AppointmentItem appointment={appointment} />;
    });
  }
  render() {
    return(
      <div className="appointment-list">
        {this.renderAppointmentItems()}
      </div>
    );
  }
}
AppointmentList.propTypes = { appointments: React.PropTypes.array.isRequired };
AppointmentList.defaultProps = { appointments: [] };