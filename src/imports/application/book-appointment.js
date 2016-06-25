import { Meteor } from 'meteor/meteor';
import AppointmentService from '../domain/appointment-service';

// const callBookAppointment = ({date, student}) => new Promise((resolve, reject) {
//
// });

Meteor.methods({ bookAppointment });


export default function bookAppointment({date, student}) {
  // HOMEWORK orchestration
  // use the teacher repository to get the teacher + their diary (do we need a diary repo?)
  const teacher = TeacherRepository.get(teacherId);
  // call teh domain servide to create the appintment
  const appointnent = AppointmentService.book(date, student, teacher);
  
  return AppointmentService.book(date, student);
}