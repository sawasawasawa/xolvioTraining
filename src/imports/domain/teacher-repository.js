import { Teachers } from '../infrastructure/collections';
import TeacherFactory from './teacher-factory';

export default class TeacherRepository {
  static get(teacherId) {
    const rawTeacher = Teachers.findOne(teacherId);
    return TeacherFactory.create(rawTeacher);
  }

  static insert(teacher) {
    Teachers.insert(teacher);
  }
}