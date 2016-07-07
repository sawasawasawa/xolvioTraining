import { navigateToAppointmentFor } from './support/helpers/navigation';
import { createStudent } from './support/fixtures/student'
import { createTeacher } from './support/fixtures/teacher'
import TeacherDiary from './support/page_objects/components/teacher-diary';
// import Diary from '../../../src/imports/domain/diary'
// import { login } from './support/fixtures/accounts'

const expect = require('expect');

module.exports = function () {

  this.Given(/^"([^"]*)"'s parents provided the contact email "([^"]*)"$/, function (studentName, email) {
    this.students = this.students || {};
    this.students[studentName] = { parentEmail: email };
  });

  this.Given(/^"([^"]*)" has been registered as a student$/, function (studentName) {
    this.students[studentName] = createStudent({
      studentName,
      parentEmail: this.students[studentName].parentEmail
    });
  });

  this.When(/^I book the appointment for "([^"]*)"'s parents for "([^"]*)" at "([^"]*)"$/,
    function (studentName, date, time) {
      //TODO: move this outside to a Given step? for future (low priority)
      this.teacher = createTeacher();
      //login(teacher);
      this.date = new Date(date + ' ' + time);
      const appointment = navigateToAppointmentFor(studentName, this.teacher.id);
      appointment.setDate(date);
      appointment.setTime(time);
      this.appointmentConfirmation = appointment.book();

    });

  this.Then(/^I receive confirmation of the booking$/, function () {
    expect(this.appointmentConfirmation.getMessage()).toBe("GREAT SUCCESS!");
  });

  this.Then(/^the appointment with "([^"]*)"'s parents is added to my diary$/, function (studentName) {
    const teacherDiary = new TeacherDiary();

    const hasAppointment = teacherDiary.hasAppointment(this.students[studentName], this.date);

    expect(hasAppointment).toBeTruthy();
  });
};