import AppointmentsList from './appointment-list';

// HOMEWORK
export default class TeacherDiary {
    constructor() {
        const root = '.teacher-diary';
        this.selectors = {
            root: root,
            appointmentList: `${root} .appointment-list`,
        };
        this.instance = browser.element(this.selectors.root);
        this.instance.appointmentList = new AppointmentsList(this.instance.element(this.selectors.appointmentList));
    }

    hasAppointment(student, date) {
        return this.instance.appointmentList.hasAppointment(student, date);
    }
}
