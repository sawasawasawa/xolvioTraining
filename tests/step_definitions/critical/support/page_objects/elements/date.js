export default class DateElement {
    constructor(instance) {
        this.instance = instance;
    }
    
    set(date) {
        this.instance.setValue(date);
    }
}