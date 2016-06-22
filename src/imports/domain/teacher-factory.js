import Teacher from './teacher';
import Diary from './diary';

export default class TeacherFactory {
  
  static create() {
    const teacher = new Teacher();
    teacher.diary = new Diary();
    return teacher;
  }
}