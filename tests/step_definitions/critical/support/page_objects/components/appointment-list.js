import _ from 'underscore';

export default class AppointmentsList {
    constructor(instance) {
        this.selectors = {
            appointmentItem: '.appointment-item',
        };
        this.instance = instance;
        this.appointmentItems = [];
        this.instance.elements(this.selectors.appointmentItem).value.forEach(function(appointmentItem) {
           this.appointmentItems.push(new AppointmentItem(appointmentItem));
        });
    }

    hasAppointment(student, date) {
        return _.find(this.appointmentItems, function(appointmentItem){
            return appointmentItem.studentName === student.name && appointmentItem.date === date;
        }) ? true : false;
    }
}