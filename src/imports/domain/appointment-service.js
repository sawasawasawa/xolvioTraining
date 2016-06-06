function dateInTheFuture(date) {
    return date.getTime() >= new Date().getTime();
}

// TODO this belongs in the parent object
function parentEmailExistsFor(student) {
    return !!student.parent.email;
}

export default class AppointmentService {
    static book(date, student) {
        let appointmentResponse = {
            isValid: true,
            // status: [],
        };

        if (!dateInTheFuture(date)) {
            appointmentResponse.status = "dateInThePast";
            appointmentResponse.isValid = false;
        }

        if (!parentEmailExistsFor(student)) {
            appointmentResponse.status = "emailDoesNotExist";
            appointmentResponse.isValid = false;
        }

        if (appointmentResponse.isValid) {
            appointmentResponse.email = student.parent.email;
            appointmentResponse.time = date;
        }
        
        return appointmentResponse;

    }
}
