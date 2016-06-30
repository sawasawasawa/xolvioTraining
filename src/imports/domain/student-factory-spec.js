import expect from 'expect';
import StudentFactory from './student-factory';
import Student from './student';
import Parent from './parent';

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
        beforeEach(function() {
            this.rawStudent = {
                name: 'jonathan',
                parent: {
                    email: 'father@home.com',
                }
            };
            this.student = StudentFactory.createFromDbObject(this.rawStudent);
        });
        it('should create a student based on raw student object', function () {
            expect(this.student instanceof Student).toBe(true);
        });
        it('should create a student with a parent', function() {
            expect(this.student.parent instanceof Parent).toBe(true, "parent was not of a Parent type");
        })
        it('should create a student with a parent emails from the db', function() {
            console.log('this.student.parent PINGWIN', this.student.parent);
            expect(this.student.parent.email).toBe(this.rawStudent.parent.email);
        })
        it('should create a student with the name from the db', function() {
            expect(this.student.name).toBe(this.rawStudent.name);
        })
    });
});