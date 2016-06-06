export default class TimeElement {
    constructor(instance) {
        this.instance = instance;
    }
    
    set(time) {
        this.instance.setValue(time);
    }
}