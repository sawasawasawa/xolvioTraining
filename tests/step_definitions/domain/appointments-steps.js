import expect from 'expect';
import AppointmentService from '../../../src/imports/domain/appointment-service';
import StudentFactory from '../../../src/imports/domain/student-factory';
import TeacherFactory from '../../../src/imports/domain/teacher-factory';

module.exports = function () {

    this.Given(/^"([^"]*)"'s parents provided the contact email "([^"]*)"$/, function (studentName, email) {
        this.students = this.students || {};
        this.students[studentName] = {parentEmail: email};
    });

    this.Given(/^"([^"]*)" has been registered as a student$/, function (studentName) {
        // TODO rename createStudent to create
        this.students[studentName] = StudentFactory.createStudent({
            studentName,
            parentEmail: this.students[studentName].parentEmail
        });
    });

    this.When(/^I book the appointment for "([^"]*)"'s parents for "([^"]*)" at "([^"]*)"$/,
        function (studentName, date, time) {
            this.teachers = this.teachers || {};
            this.teachers.me = TeacherFactory.create();
            const _appointmentTime = new Date(`${date} ${time}`);
            this.appointment = AppointmentService.book(_appointmentTime, this.students[studentName], this.teachers.me);
        });

    this.Then(/^I receive confirmation of the booking$/, function () {
        expect(this.appointment.isValid).toBe(true);
    });

    this.Then(/^the appointment with "([^"]*)"'s parents is added to my diary$/, function (studentName) {
        expect(this.teachers.me.diary.getAppointment(this.appointment.date)).toEqual({
            student: this.students[studentName]
        });
    });


};