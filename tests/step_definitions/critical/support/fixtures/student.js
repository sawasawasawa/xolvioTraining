export function createStudent({studentName, parentEmail}) {

    return server.execute(function(studentName, parentEmail) {
        const StudentFactory = require('/imports/domain/student-factory').default;

        const _student = StudentFactory.createStudent({studentName, parentEmail});
        const StudentRepository = require('/imports/domain/student-repository').default;

        StudentRepository.insert(_student);
        return StudentRepository.get(studentName);
    }, studentName, parentEmail);

}