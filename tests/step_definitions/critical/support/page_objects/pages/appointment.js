import DateElement from '../elements/date.js';
import TimeElement from '../elements/time.js';

export default class Appointment {
    constructor() {
        this.selectors = {
            root: '.appointment',
            date: '.appointment__date',
            time: '.appointment__time',
        };
        this.instance = browser.element(this.selectors.root);
        this.instance.date = new DateElement(this.instance.find(this.selectors.date));
        this.instance.time = new TimeElement(this.instance.find(this.selectors.time));
    }
    setDate(date) {
        this.instance.date.set(date);
    }
    setTime(time) {
        this.instance.time.set(time);
    }
}
