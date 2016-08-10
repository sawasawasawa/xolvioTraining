import { Appointments } from '../infrastructure/collections';
import AppointmentFactory from './appointment-factory';

export default class AppointmentRepository {
    static get(appointment) {
        console.log("PINGWIN: Appointments.find().fetch()",Appointments.find().fetch());
        const rawAppointment = Appointments.findOne(appointment);
        console.log("PINGWIN: rawAppointment",rawAppointment);
        return AppointmentFactory.createFromDbObject(rawAppointment);
    }

    static insert(appointment) {
        return Appointments.insert(appointment);
    }
}