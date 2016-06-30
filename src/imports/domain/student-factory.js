import Parent from './parent';
import Student from './student';

export default class StudentFactory {
    static createStudent({parentEmail, studentName}) {
        const parent = new Parent(parentEmail);
        return new Student(studentName, parent);
    }
    static createFromDbObject(student) {
        return this.createStudent({studentName: student.name, parentEmail: student.parent.email});
    }
}