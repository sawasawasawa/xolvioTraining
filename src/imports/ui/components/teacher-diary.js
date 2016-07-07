import React from 'react';
import AppointmentList from './appointment-list'
export default class TeacherDiary extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {};
  }
  
  render() {
    return(
      <div>
        <AppointmentList appointments={this.props.appointments} />
      </div>
    );
  }
}