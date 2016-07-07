import DateElement from '../elements/date-input.js';
import TimeElement from '../elements/time-input.js';
import AppointmentConfirmation from './appointment-confirmation';

// TODO make sure appintment is renamed to book appointment everwhere so we have a good DSL
export default class Appointment {
    constructor() {
        const root = '.appointment';
        this.selectors = {
            root: root,
            date: `${root}__date`,
            time: `${root}__time`,
            submit: `${root}__submit`,
        };
        this.instance = browser.element(this.selectors.root);
        this.instance.date = new DateElement(this.instance.element(this.selectors.date));
        this.instance.time = new TimeElement(this.instance.element(this.selectors.time));
    }
    setDate(date) {
        this.instance.date.set(date);
    }
    setTime(time) {
        this.instance.time.set(time);
    }

    book() {
        this.instance.click(this.selectors.submit);
        return new AppointmentConfirmation();
    }
}
