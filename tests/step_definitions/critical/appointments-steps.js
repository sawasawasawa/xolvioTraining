import {navigateToAppointmentFor} from './support/helpers/navigation';
import {createStudent} from './support/fixtures/student'

const expect = require('expect');

module.exports = function () {

    this.Given(/^"([^"]*)"'s parents provided the contact email "([^"]*)"$/, function (studentName, email) {
        this.students = this.students || {};
        this.students[studentName] = {parentEmail: email};
    });

    this.Given(/^"([^"]*)" has been registered as a student$/, function (studentName) {
        this.students[studentName] = createStudent({
            studentName,
            parentEmail: this.students[studentName].parentEmail
        });
    });

    this.When(/^I book the appointment for "([^"]*)"'s parents for "([^"]*)" at "([^"]*)"$/,
        function (studentName, date, time) {
            this.appointment = navigateToAppointmentFor(studentName);
            this.appointment.setDate(date);
            this.appointment.setTime(time);
            this.appointment.book();
        });

    this.Then(/^I receive confirmation of the booking$/, function () {
        expect(this.appointment.confirmation.isVisible()).toBe(true);
    });

};