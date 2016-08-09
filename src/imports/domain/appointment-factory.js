import Parent from './parent';
import Student from './student';

export default class AppointmentRepository {
    static createAppointment({parentEmail, studentName}) {
        const parent = new Parent(parentEmail);
        return new Student(studentName, parent);
    }
    static createFromDbObject(appointment) {
        return this.createAppointment({studentName: appointment.studentName, teacherId: appointment.teacherId, date: appointment.date});
    }
}