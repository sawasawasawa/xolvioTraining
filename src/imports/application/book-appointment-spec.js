import expect from 'expect';
import StudentFactory from '../domain/student-factory';

import proxyquire from 'proxyquire';
const proxyquireStrict = proxyquire.noCallThru();

const stubs = {
  meteor: {
    Meteor: {
      methods: () => {
      }
    },
  },
};

//const meteorCallSpy = expect.spyOn(stubs.meteor.Meteor, 'call');

const bookAppointment = proxyquireStrict(
  './book-appointment', {
    'meteor/meteor': stubs.meteor
  }
);

function validDate() {
  return new Date(new Date().valueOf() + 10000000000);
}

describe('Booking Appointment', function () {
  describe('for valid student', function () {
    let student;
    before(function() {
      student = StudentFactory.createStudent({parentEmail: "bill@microsoft.com", studentName: "Bill Gates"});
    });
    it('should return isValid as true if the date is in the future', function () {
      const _dateInTheFuture = validDate();
      expect(bookAppointment({date: _dateInTheFuture, student}).isValid).toBe(true);
    });
    it('should return isValid as false if the date is in the past', function() {
      const _dateInThePast = new Date(new Date().valueOf() - 10000000000);
      expect(bookAppointment({date: _dateInThePast, student}).isValid).toBe(false);
    });
  });
  describe('for valid date', function() {
    let date;
    before(function() {
      date = validDate();
    });
    it('should return isValid as true if the student has a name and a valid parent email', function() {
      const _validStudent = StudentFactory.createStudent({parentEmail: "bill@microsoft.com", studentName: "Bill Gates"});
      expect(bookAppointment({date, student: _validStudent}).isValid).toBe(true);
    });
    it('should return isValid as false if there is no email for the students parent', function() {
      const _studentWithNoParentsEmail = {
        name: "Bill Gates",
        parent: {}
      };
      expect(bookAppointment({date, student: _studentWithNoParentsEmail}).isValid).toBe(false);
    });
  })
});