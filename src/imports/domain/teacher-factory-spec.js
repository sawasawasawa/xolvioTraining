import expect from 'expect';
import Teacher from './teacher'
import Diary from './diary'
import TeacherFactory from './teacher-factory'

describe('Teacher Factory', function () {
  before(function () {
    this.rawTeacher = {
      id: 'foo',
      diary: {
          appointments: {},
      }
    };
  });
  describe('create', function () {
    it('should create a teacher', function () {
      expect(TeacherFactory.create(this.rawTeacher) instanceof Teacher).toBe(true);
    });
    it('should create a diary', function () {
      const teacher = TeacherFactory.create(this.rawTeacher);
      expect(teacher.diary instanceof Diary).toBe(true);
    });
  });
});