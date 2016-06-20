import { Meteor } from 'meteor/meteor';
import AppointmentService from '../domain/appointment-service';


console.log("ran this");

Meteor.methods({ bookAppointment });

// Meteor.methods({
//   bookAppointment: function({date, student}) {
//     return AppointmentService.book(date, student);
//   }
// });


export default function bookAppointment({date, student}) {
  console.log('student PINGWIN', student);
  console.log('AppointmentService.book(date, student) PINGWIN', AppointmentService.book(date, student));
  return AppointmentService.book(date, student);
}