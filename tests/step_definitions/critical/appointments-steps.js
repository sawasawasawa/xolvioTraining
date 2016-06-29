import { navigateToAppointmentFor } from './support/helpers/navigation';
import { createStudent } from './support/fixtures/student'
import { createTeacher } from './support/fixtures/teacher'
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
      const teacher = createTeacher();
      login(teacher);
      this.date = new Date(date + ' ' + time);
      const appointment = navigateToAppointmentFor(studentName);
      appointment.setDate(date);
      appointment.setTime(time);
      this.appointmentConfirmation = this.appointment.book();
    });

  this.Then(/^I receive confirmation of the booking$/, function () {
    expect(this.appointmentConfirmation.getMessage()).toBe("GREAT SUCCESS!");
  });

  this.Then(/^the appointment with "([^"]*)"'s parents is added to my diary$/, function (studentName) {
    const teacherDiary = new TeacherDiary();
    const appointmentItems = teacherDiary.getAppointmentItems();
    expect(appointmentItems.length).toBe(1);
    const appointmentItem  = appointmentItems[0];
    expect(appointmentItem.getDate()).toBe(this.date);
    expect(appointmentItem.getStudentName()).toBe(studentName);
    expect(appointmentItem.getParentEmail()).toBe(this.students[studentName].parentEmail);
  });
};