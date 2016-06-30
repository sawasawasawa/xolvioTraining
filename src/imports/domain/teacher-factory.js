import Teacher from './teacher';
import Diary from './diary';

export default class TeacherFactory {

  static createFromDbObject({_id: id, diary}) {
    const _diary = new Diary(diary);
    console.log('_diary PINGWIN', _diary.getAppointments);
    return new Teacher({id, diary: _diary});
  }
  static create() {
    const _diary = new Diary();
    return new Teacher({diary: _diary});
  }
}