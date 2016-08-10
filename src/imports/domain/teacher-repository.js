import { Teachers } from '../infrastructure/collections';
import TeacherFactory from './teacher-factory';
import _ from 'lodash';
// import { Meteor } from 'meteor/meteor';

export default class TeacherRepository {
  static get(teacherId) {
    const rawTeacher = Teachers.findOne(teacherId);
    return TeacherFactory.createFromObject(rawTeacher);
  }

  static insert(teacher) {
    return Teachers.insert(teacher);
  }

  static update(teacher) {
    return Teachers.update({_id: teacher._id}, teacher);
  }
}
