function dateInTheFuture(date) {
    return date.getTime() >= new Date().getTime();
}

// TODO this belongs in the parent object
function parentEmailExistsFor(student) {
    return !!student.parent.email;
}

export default class AppointmentService {
    static book(date, student, teacher) {
        let appointmentResponse = {
            isValid: true,
            // status: [],
        };

        if (!dateInTheFuture(date)) {
            appointmentResponse.status = "dateInThePast";
            appointmentResponse.isValid = false;
            return appointmentResponse;
        }

        if (!parentEmailExistsFor(student)) {
            appointmentResponse.status = "emailDoesNotExist";
            appointmentResponse.isValid = false;
            return appointmentResponse;
        }
        console.log('teacher PINGWIN', teacher);
        const result = teacher.diary.addAppointment({date, student});
        appointmentResponse.status = result.status;
        if (result.error) {
            appointmentResponse.isValid = false;
            return appointmentResponse;
        }

        if (appointmentResponse.isValid) {
            appointmentResponse.date = date;
            appointmentResponse.student = student;
            // HOMEWORK save the teacher using the teacher repository
        }
        console.log('appointmentResponse PINGWIN', appointmentResponse);
        return appointmentResponse;
    }
}
