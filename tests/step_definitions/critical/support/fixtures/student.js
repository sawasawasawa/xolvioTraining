export function createStudent({studentName, parentEmail}) {
    
    return server.execute(function(studentName, parentEmail) {
        const StudentFactory = require('/imports/domain/student-factory').default;
        console.log(StudentFactory)
        //const StudentRepository = require('/imports/domain/student-repository').StudentRepository;

        return StudentFactory.createStudent({studentName, parentEmail});
    }, studentName, parentEmail);
    
}