import Appointment from './appointment';

export default class AppointmentRepository {
    static createAppointment({studentName, teacherId, date}) {
        return new Appointment(studentName, teacherId, date);
    }
    static createFromDbObject(appointment) {
        if (appointment) {
            return this.createAppointment({
                studentName: appointment.studentName,
                teacherId: appointment.teacherId,
                date: appointment.date
            });
        }
        return [];
    }
}