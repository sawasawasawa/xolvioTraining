import { Appointments } from '../infrastructure/collections';
import AppointmentFactory from './appointment-factory';

export default class AppointmentRepository {
    static get(appointment) {
        const rawAppointment = Appointments.findOne(appointment);
        return AppointmentFactory.createFromDbObject(rawAppointment);
    }

    static insert(appointment) {
        return Appointments.insert(appointment);
    }
}