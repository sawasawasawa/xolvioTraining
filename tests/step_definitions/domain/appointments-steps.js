import expect from 'expect';
import AppointmentService from '../../../src/imports/domain/appointment-service';
import StudentFactory from '../../../src/imports/domain/student-factory';

module.exports = function () {

    this.Given(/^"([^"]*)"'s parents provided the contact email "([^"]*)"$/, function (studentName, email) {
        this.students = this.students || {};
        this.students[studentName] = {parentEmail: email};
    });

    this.Given(/^"([^"]*)" has been registered as a student$/, function (studentName) {
        this.students[studentName] = StudentFactory.createStudent({
            studentName,
            parentEmail: this.students[studentName].parentEmail
        });
    });

    this.When(/^I book the appointment for "([^"]*)"'s parents for "([^"]*)" at "([^"]*)"$/,
        function (studentName, date, time) {
            const _appointmentTime = new Date(`${date} ${time}`);
            this.appointment = AppointmentService.book(_appointmentTime, this.students[studentName]);
        });

    this.Then(/^I receive confirmation of the booking$/, function () {
        expect(this.appointment.isValid).toBe(true);
    });

};