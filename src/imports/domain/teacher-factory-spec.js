import expect from 'expect';
import Teacher from './teacher'
import Diary from './diary'
import TeacherFactory from './teacher-factory'

describe('Teacher Factory', function () {
  before(function () {
    this.rawTeacher = {
      _id: 'foo',
      diary: {
          appointments: {},
      }
    };
  });
  describe('create', function () {
    it('should create a basic teacher', function () {
      expect(TeacherFactory.create() instanceof Teacher).toBe(true);
    });
    it('should create a teacher based on raw teacher object', function () {
      expect(TeacherFactory.createFromDbObject(this.rawTeacher) instanceof Teacher).toBe(true);
    });
    it('should create a diary', function () {
      const teacher = TeacherFactory.create();
      expect(teacher.diary instanceof Diary).toBe(true);
    });
  });
});