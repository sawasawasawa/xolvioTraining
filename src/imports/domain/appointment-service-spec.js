import AppointmentService from './appointment-service';
import StudentFactory from './student-factory';
import TeacherFactory from './teacher-factory';
import expect from 'expect';

describe('Appointment Service', function () {
    describe('book', function () {
        beforeEach(function () {
            this.teacher = TeacherFactory.create();
            this.student = StudentFactory.createStudent({
                studentName: 'Jon',
                parentEmail: 'parent@jon.com'
            });
            this.appointmentTime = new Date(Date.now() + 2000); // works always (current date + 2 seconds
        });
        it('should register the appointment', function () {
            const appointment = AppointmentService.book(this.appointmentTime, this.student, this.teacher);

            expect(appointment.student).toBe(this.student);
            expect(appointment.isValid).toBe(true);
            expect(appointment.time).toBe(this.appointmentTime);
        });
        it('should not register an appointment in the past', function () {
            const appointmentTime = new Date('01/01/2010');

            const appointment = AppointmentService.book(appointmentTime, this.student, this.teacher);

            expect(appointment.isValid).toBe(false);
            expect(appointment.status).toBe('dateInThePast');
        });
        it('should not register an appointment if the parent does not have contact information', function () {
            delete this.student.parent.email;

            const appointment = AppointmentService.book(this.appointmentTime, this.student, this.teacher);

            expect(appointment.isValid).toBe(false);
            expect(appointment.status).toBe('emailDoesNotExist');
        });
        it('should add the appointment in the teachers diary', function () {
            const appointment = AppointmentService.book(this.appointmentTime, this.student, this.teacher);
            
            expect(appointment.isValid).toBe(true);
            expect(appointment.status).toBe('booked');
        });
    });
});
