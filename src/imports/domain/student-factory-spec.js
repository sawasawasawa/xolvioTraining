import StudentFactory from './student-factory';
import expect from 'expect';

describe('Student Factory', function () {
    describe('create student', function () {
        it('should set the student name on the student object', function () {
            const student = StudentFactory.createStudent({
                studentName: 'Simple Dude'
            });
            expect(student.name).toBe('Simple Dude');
        });
        it('should set the parent email on the parent object', function () {
            const student = StudentFactory.createStudent({
                parentEmail: 'blah@example.com'
            });
            expect(student.parent.email).toBe('blah@example.com');
        });
    });
});