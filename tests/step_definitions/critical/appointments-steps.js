import { navigateToAppointmentFor } from './support/helpers/navigation';
import { createStudent } from './support/fixtures/student'
import { createTeacher } from './support/fixtures/teacher'
import Diary from '../../../src/imports/domain/diary'
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
    console.log('this.teacher.diary PINGWIN', this.teacher.diary);
    const teacherDiary = new Diary(this.teacher.diary);
    console.log('teacherDiary PINGWIN', teacherDiary.getAppointments);
    const appointmentItems = teacherDiary.getAppointments();
    expect(appointmentItems.length).toBe(1);
    const appointmentItem  = appointmentItems[0];
    expect(appointmentItem.getDate()).toBe(this.date);
    expect(appointmentItem.getStudentName()).toBe(studentName);
    expect(appointmentItem.getParentEmail()).toBe(this.students[studentName].parentEmail);
  });
};