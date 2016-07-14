import { Meteor } from 'meteor/meteor';
import AppointmentService from '../domain/appointment-service';
import TeacherRepository from '../domain/teacher-repository';


Meteor.methods({ bookAppointment });

export default function bookAppointment({date, student, teacherId}) {
  const teacher = TeacherRepository.get(teacherId);
  return AppointmentService.book(date, student, teacher);
}