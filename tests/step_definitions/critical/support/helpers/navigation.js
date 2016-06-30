import Appointment from '../page_objects/components/book-appointment';
import url from 'url';

export function navigateToAppointmentFor(studentName, teacherId) {
  // TODO set process.env['chimp.baseUrl'] instead
  const appointmentURL = url.resolve('http://localhost:3000', `/appointments/${studentName}/${teacherId}`);
  browser.url(appointmentURL);
  return new Appointment();
}