import Appointment from '../page_objects/pages/appointment';
import url from 'url';

export function navigateToAppointmentFor(student) {
    // TODO set process.env['chimp.baseUrl'] instead
    browser.url(url.resolve('http://localhost:3000', '/appointments/', student));
    return new Appointment();
}