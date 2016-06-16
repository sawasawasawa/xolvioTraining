import { Meteor } from 'meteor/meteor';
import AppointmentService from '../domain/appointment-service';

Meteor.methods({ bookAppointment });

export default function bookAppointment(date, student) {
  return AppointmentService.book(date, student);
}