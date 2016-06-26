export default class Teacher {
  constructor({id, diary}) {
    if (id) {
      this.id = id;
    }
    this.diary = diary;
  }
}