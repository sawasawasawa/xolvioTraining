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

describe('Booking Appointment', function () {
  describe('should return', function () {
    it('true if the date is in the future', function () {
      const _dateInTheFuture = new Date(new Date().valueOf() + 10000000000);
      const _fakeStudent = StudentFactory.createStudent();
      expect(bookAppointment({date: _dateInTheFuture, student: _fakeStudent}).isValid).toBe(true);
    });
    // test for isValid false
  });
});