import React from 'react';
import { Meteor } from 'meteor/meteor';
import classNames from 'classNames'

export default class Appointment extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      date: '',
      time: '',
      confirmation: null,
    };

    this.submitAppointment = this.submitAppointment.bind(this);
  }

  render() {
    return (
      <div className="appointment">
        <form onSubmit={this.submitAppointment}>
          <input className="appointment__date" value={this.state.date}/>
          <input className="appointment__time" value={this.state.time}/>
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

  submitAppointment() {
    let confirmation = Meteor.call('bookAppointment', {
      date: new Date(this.state.date + ' ' + this.state.time)
    });
    this.setState({ confirmation: confirmation });
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