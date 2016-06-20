import DateElement from '../elements/date.js';
import TimeElement from '../elements/time.js';

// TODO make sure appintment is renamed to book appointment everwhere so we have a good DSL
export default class Appointment {
    constructor() {
        this.selectors = {
            root: '.appointment',
            date: '.appointment__date',
            time: '.appointment__time',
            submit: '.appointment__submit',
            confirmation: '.appointment__confirmation',
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
        browser.waitForExist(this.selectors.confirmation, 2000);
        this.instance.confirmation = this.instance.element(this.selectors.confirmation);
    }
}
