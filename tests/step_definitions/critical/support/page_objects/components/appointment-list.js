import _ from 'underscore';
import AppointmentItem from "./appointment-item";
import moment from 'moment';


export default class AppointmentsList {
    constructor(instance) {
        this.selectors = {
            appointmentItem: '.appointment-item',
        };
        this.instance = instance;
        this.appointmentItems = [];
        this.instance.elements(this.selectors.appointmentItem).value.forEach((appointmentItem) => {
           this.appointmentItems.push(new AppointmentItem(this.instance.element(this.selectors.appointmentItem)));
        });
    }

    hasAppointment(student, date) {
        return _.find(this.appointmentItems, function(appointmentItem){
            return appointmentItem.studentName === student.name && appointmentItem.date === moment(date).format("MM/DD/YYYY HH:mm");
        }) ? true : false;
    }
}