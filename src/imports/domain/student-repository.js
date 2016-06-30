import { Students } from '../infrastructure/collections';
import StudentFactory from './student-factory';

export default class StudentRepository {
  static get(studentName) {
    const rawStudent = Students.findOne({ name: studentName });
    return StudentFactory.createFromDbObject(rawStudent);
  }

  static insert(student) {
    return Students.insert(student);
  }
}