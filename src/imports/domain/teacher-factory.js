import Teacher from './teacher';
import Diary from './diary';

export default class TeacherFactory {

  static create({id, diary}) {
    const _diary = new Diary(diary);
    return new Teacher({id, diary: _diary});
  }
}