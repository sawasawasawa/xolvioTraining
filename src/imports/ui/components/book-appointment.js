import React from 'react';
import { Meteor } from 'meteor/meteor';

export default class Appointment extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      date: '',
      time: ''
    };

    this.submitAppointment = this.submitAppointment.bind(this);
  }
  render() {
    return (
      <form className="appointment" onSubmit={this.submitAppointment}>
        <input className="appointment__date" value={this.state.date}/>
        <input className="appointment__time" value={this.state.time}/>
        <input type="submit" className="appointment__submit"/>
      </form>
    )
  }
  submitAppointment() {
    Meteor.call('bookAppointment', {
      date: new Date(this.state.date + ' ' + this.state.time)
    });
  }
}

//
// export class Counter extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {count: props.initialCount};
//     this.tick = this.tick.bind(this);
//   }
//   tick() {
//     this.setState({count: this.state.count + 1});
//   }
//   render() {
//     return (
//       <div onClick={this.tick}>
//     Clicks: {this.state.count}
//   </div>
//   );
//   }
// }
// Counter.propTypes = { initialCount: React.PropTypes.number };
// Counter.defaultProps = { initialCount: 0 };