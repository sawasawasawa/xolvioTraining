import Teacher from './teacher';
import Diary from './diary';

export default class TeacherFactory {
//todo change method name (witohut db)
  static createFromObject({_id: id, diary} = {}) {
    if( !id || !diary) {
      return null;
    }
    const _diary = new Diary(diary);
    return new Teacher({id, diary: _diary});
  }
  static create() {
    const _diary = new Diary();
    return new Teacher({diary: _diary});
  }
}
