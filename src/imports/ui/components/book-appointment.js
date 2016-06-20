import React from 'react';
import { Meteor } from 'meteor/meteor';
import classNames from 'classNames'
import StudentFactory from '../../domain/student-factory';

export default class Appointment extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      date: '',
      time: '',
      confirmation: null,
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
      <div className="appointment">
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
      </div>
    )
  }

  submitAppointment(event) {
    event.preventDefault();
    let confirmation;
    let that = this;
    Meteor.call('bookAppointment', {
      date: new Date(this.state.date + ' ' + this.state.time),
      student: StudentFactory.createStudent()
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
      appointment__confirmation: true,
      [status.className]: true,
    });
    return (<div className={classes}>{status.message}</div>);
  }
}