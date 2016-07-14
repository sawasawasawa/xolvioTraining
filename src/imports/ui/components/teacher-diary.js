import React from 'react';
import AppointmentList from './appointment-list'
export default class TeacherDiary extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return(
      <div className="teacher-diary">
        <h3 className="teacher-diary__header">Teacher Diary</h3>
        <AppointmentList appointments={this.props.appointments} />
      </div>
    );
  }
}