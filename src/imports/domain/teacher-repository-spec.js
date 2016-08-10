import proxyquire from 'proxyquire';
const proxyquireStrict = proxyquire.noCallThru();
import expect from 'expect';
import TeacherFactory from './teacher-factory'

const stubs = {
  meteor: {
    Mongo: {
      Collection: () => {
        return {
          findOne: () => {},
          insert: () => {},
          update: () => {},
        }
      }
    },
  },
};

//const meteorCallSpy = expect.spyOn(stubs.meteor.Meteor, 'call');

const Teachers = proxyquireStrict(
  '../infrastructure/collections', {
    'meteor/mongo': stubs.meteor
  }
).Teachers;

import TeacherRepository from './teacher-repository';
import Teacher from './teacher'
import Diary from './diary'

describe('Teacher Repository', function () {
  beforeEach(function () {
    this.teacher = {
      diary: {
        appointments: {},
      }
    };
  });
  describe('get', function () {
    it('should get the teacher by id from teacher collection', function () {
      const findOneSpy = expect.spyOn(Teachers, 'findOne').andReturn(this.teacher);
      const createFromObjectSpy = expect.spyOn(TeacherFactory, 'createFromObject').andReturn(new Teacher({id: null, diary: null}));

      TeacherRepository.get('someId');
      expect(findOneSpy).toHaveBeenCalledWith('someId');
      expect(createFromObjectSpy).toHaveBeenCalledWith(this.teacher);

    });
    it('should return an object of type Teacher', function () {
      expect.spyOn(Teachers, 'findOne').andReturn(this.teacher);
      expect.spyOn(TeacherFactory, 'createFromObject').andReturn(new Teacher({id: null, diary: null}));

      const actualTeacher = TeacherRepository.get('someId');
      expect(actualTeacher instanceof Teacher).toBe(true);
    });
  });
  describe('insert', function () {
    it('should insert the teacher', function () {
      expect.spyOn(Teachers, 'insert');

      TeacherRepository.insert(this.teacher);

      expect(Teachers.insert).toHaveBeenCalledWith(this.teacher);
    });
  });
  describe('update', function () {
    it('should update the teacher', function () {
      expect.spyOn(Teachers, 'update');
      this.teacher._id = "doesntMatter";

      TeacherRepository.update(this.teacher);

      expect(Teachers.update).toHaveBeenCalledWith({_id: this.teacher._id}, {$set: {} });
    });
  });
});
