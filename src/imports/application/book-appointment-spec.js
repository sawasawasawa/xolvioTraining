import expect from 'expect';
import proxyquire from 'proxyquire';
const proxyquireStrict = proxyquire.noCallThru();

const stubs = {
  meteor: {
    Meteor: {
      methods: () => {
      }
    }
  },
};

const teacherRepositorySpy = {
  get: function() {}
};

const appointmentServiceSpy = {
  book: function() {}
};

const bookAppointment = proxyquireStrict(
  './book-appointment', {
    'meteor/meteor': stubs.meteor,
    '../domain/teacher-repository': teacherRepositorySpy,
    '../domain/appointment-service': appointmentServiceSpy,
  }
);

describe('Book Appointment', function () {
  describe('bookAppointment', function() {
    beforeEach(function() {
      teacherRepositorySpy.get = expect.createSpy();
      appointmentServiceSpy.book = expect.createSpy();
    });
    it('should provide the appointment service with the looked up teacher', function () {
      teacherRepositorySpy.get = expect.createSpy().andReturn("someTeacher");

      bookAppointment({});

      expect(appointmentServiceSpy.book).toHaveBeenCalledWith(undefined, undefined, "someTeacher")
    });
    it('should book an appointment through the appointmentService', function () {
      appointmentServiceSpy.book = expect.createSpy();

      bookAppointment({student: "someStudent"});

      expect(appointmentServiceSpy.book).toHaveBeenCalledWith(undefined, "someStudent", undefined)
    });
    it('should return the booking', function () {
      appointmentServiceSpy.book = expect.createSpy().andReturn("someBooking");

      const booking = bookAppointment({});

      expect(booking).toBe("someBooking");
    });
  })
});