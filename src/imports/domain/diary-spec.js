import expect from 'expect';
import Diary from './diary';
import StudentFactory from './student-factory';

describe('Diary', function () {
  describe('constructor', function() {
    
  })
  describe('addAppointment', function () {
    describe('when the time is available', function () {
      it('should store the time and student', function () {
        const diary = new Diary();
        const student = StudentFactory.createStudent({parentEmail: 'a@b.co', studentName: 'Dude'});
        const date = new Date(1466616931240);

        diary.addAppointment({date, student});

        expect(diary.getAppointment(date)).toEqual({
          student
        });
      });
      it('should return booked status', function () {
        const diary = new Diary();
        const student = StudentFactory.createStudent({parentEmail: 'a@b.co', studentName: 'Dude'});
        const date = new Date(1466616931240);

        const result = diary.addAppointment({date, student});

        expect(result.error).toBeFalsy();
        expect(result.status).toBe('booked');
      });
    });
    describe('when the time is taken', function () {
      it('should not store the time and student', function () {
        const diary = new Diary();
        const student = StudentFactory.createStudent({parentEmail: 'a@b.co', studentName: 'Dude'});
        const strudent = StudentFactory.createStudent({parentEmail: 'z@x.co', studentName: 'Some other Dude'});
        const date = new Date(1466616931240);
        diary.addAppointment({date, student});

        diary.addAppointment({date, student});

        expect(diary.getAppointment(date)).toNotEqual({
          student: strudent
        });
      });

      it('should return failed status', function () {
        const diary = new Diary();
        const student = StudentFactory.createStudent({parentEmail: 'a@b.co', studentName: 'Dude'});
        const date = new Date(1466616931240);
        diary.addAppointment({date, student});

        const result = diary.addAppointment({date, student});

        expect(result.error).toBeTruthy();
        expect(result.status).toBe('conflict');
      });
    });
  });
  describe('getAppointment', function () {
    it('should return the appointment for the provided time', function () {
      const diary = new Diary();
      const date = new Date();
      const student = {name: 'dude'};

      diary.addAppointment({date, student});

      expect(diary.getAppointment(date)).toEqual({student});
    });
  });
  describe('getAppointments', () => {
    it('should return all the appointments ', () => {
      const diary = new Diary();
      const _appointments = [
        {
          date: new Date(),
          student: {name: 'dude'}
        },
        {
          date: new Date('2015/04/04'),
          student: {name: 'second dude'},
        }
      ];
      _appointments.forEach((appointment) => {
        diary.addAppointment({date: appointment.date, student: appointment.student});
      });
      
      const actualAppointments = diary.getAppointments();
      expect(actualAppointments.length).toEqual(2);
      
      expect(actualAppointments[1]).toEqual({student: _appointments[1].student});
    })
  })
});