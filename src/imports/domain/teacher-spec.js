import Teacher from './teacher'
import expect from 'expect';

describe('Teacher', function () {
  describe('constructor', function () {
    beforeEach(function () {
      this.rawTeacher = {
        diary: {
          appointments: {},
        },
        id: 'blah',
      };
    });
    it('should set the id', function () {
      const expectedId = new Teacher(this.rawTeacher).id;
      expect(expectedId).toBe(this.rawTeacher.id);
    });
    it('should set the diary', function () {
      const expectedDiary = new Teacher(this.rawTeacher).diary;
      expect(expectedDiary).toBe(this.rawTeacher.diary);
    });
  });
});