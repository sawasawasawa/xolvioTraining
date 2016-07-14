import React from 'react';
import { Meteor } from 'meteor/meteor';
import classNames from 'classNames'
import StudentRepository from '../../domain/student-repository';
import getDataFromURL from '../helpers/get-data-from-url';
import TeacherDiary from './teacher-diary';

export default class Appointment extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      date: '',
      time: '',
      confirmation: null,
    };
    // HOMEWORK make this work
    this.elementClassNames = {
      root: 'appointment',
      date: 'appointment__date',
      time: 'appointment__time',
      submit: 'appointment__submit',
    };
    this.submitAppointment = this.submitAppointment.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onChangeTime = this.onChangeTime.bind(this);
  }

  onChangeDate(event) {
    const date = event.target.value;
    this.setState({ date });
  }

  onChangeTime(event) {
    const time = event.target.value;
    this.setState({ time });
  }

  render() {
    return (
      <div className={this.elementClassNames.root}>
        <form onSubmit={this.submitAppointment}>
          <input className="appointment__date" value={this.state.date} onChange={this.onChangeDate}/>
          <input className="appointment__time" value={this.state.time} onChange={this.onChangeTime}/>
          <input type="submit" className="appointment__submit"/>
        </form>
        {this.state.confirmation ?
          <AppointmentConfirmation status={this.state.confirmation}/>
          :
          null
        }
        <TeacherDiary/>
      </div>
    )
  }

  submitAppointment(event) {
    event.preventDefault();
    let confirmation;
    let that = this;
    let {studentName, teacherId} = getDataFromURL();
    // TODO extract handler and unit test
    Meteor.call('bookAppointment', {
      date: new Date(this.state.date + ' ' + this.state.time),
      student: StudentRepository.get(studentName),
      teacherId
    }, function (error, result) {
      if (!error) {
        confirmation = result.isValid ? 'success' : 'failure';
        that.setState({ confirmation });
      } else {
        console.log('error PINGWIN', error);
      }
    });
  }
}

class AppointmentConfirmation extends React.Component {
  render() {
    const statusMap = {
      success: {
        className: 'succeeded',
        message: 'GREAT SUCCESS!',
      },
      failure: {
        className: 'failed',
        message: 'GREAT FAILURE!',
      }
    };

    const status = statusMap[this.props.status];

    const classes = classNames({
      'appointment-confirmation': true,
      [status.className]: true,
    });
    return (
      <div className={classes}>
        <span className="appointment-confirmation__message">{status.message}</span>
      </div>
    );
  }
}
