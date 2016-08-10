export default class Diary {
  //TODO HOMEWORK this constructor should accept a rawDiary
  //TODO HOMEWORK create a heklper to map db objects to class cobejces
  constructor(rawDiary) {
    this.appointments = {};
    if(rawDiary) {
      this.appointments = rawDiary.appointments;
    }
  }

  addAppointment({ date, student }) {
    const result = {
    };

    if (!this.appointments[date.getTime()]) {
      this.appointments[date.getTime()] = { student, date };
      result.status = 'booked';
    } else {
      result.status = 'conflict';
      result.error = true;
    }
    return result;
  }

  getAppointment(date) {
    // _.filter(this.appointments, (appointment) => { appointment.date === date});
    return this.appointments[date.getTime()];
  }
  getAppointments() {
    return Object.keys(this.appointments).map((date) => {
      return this.appointments[date];
    });
  }
}