import StudentFactory from './student-factory';
import Student from './student';
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
    describe('create student from db object', function () {
        it('should create a student based on raw student object', function () {
            const rawStudent = {
                name: 'jonathan',
                parent: {
                    email: 'father@home.com',
                }
            };

            expect(StudentFactory.createFromDbObject(rawStudent) instanceof Student).toBe(true);
        });
    });
});