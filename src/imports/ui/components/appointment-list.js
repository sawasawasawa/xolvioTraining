import React from 'react';
import AppointmentItem from './appointment-item'
export default class AppointmentList extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {};
    this.getAppointments = this.getAppointments.bind(this);
  }
  
  getAppointments() {
    return this.props.appointments;
  }
  
  render() {
    return(
      <div>
        <li>
          
        </li>
      </div>
    );
  }
}