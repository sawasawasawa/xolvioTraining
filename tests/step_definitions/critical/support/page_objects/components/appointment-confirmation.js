export default class AppointmentConfirmation {
  constructor() {
    this.selectors = {
      root: '.appointment-confirmation',
      message: '.appointment-confirmation__message',
    };
    browser.waitForExist(this.selectors.root, 2000);
    this.instance = browser.element(this.selectors.root);
    this.instance.message = this.instance.element(this.selectors.message);
  }

  getMessage() {
    return this.instance.message.getText();
  }
}