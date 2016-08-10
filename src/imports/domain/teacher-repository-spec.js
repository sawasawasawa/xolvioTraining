import proxyquire from 'proxyquire';
const proxyquireStrict = proxyquire.noCallThru();
import expect from 'expect';


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
    it('should get the teacher by id', function () {
      expect.spyOn(Teachers, 'findOne').andReturn(this.teacher);

      const actualTeacher = TeacherRepository.get('blah');

      expect(actualTeacher instanceof Teacher).toBe(true);
    });
    it('should convert the diary object into an Diary instance', function () {
      expect.spyOn(Teachers, 'findOne').andReturn(this.teacher);

      const actualTeacher = TeacherRepository.get('blah');

      expect(actualTeacher.diary instanceof Diary).toBe(true);
    });
  });
  describe('insert', function () {
    it('should insert the teacher', function () {
      expect.spyOn(Teachers, 'insert');

      TeacherRepository.insert(this.teacher);

      expect(Teachers.insert).toHaveBeenCalledWith(this.teacher);
    });
  });
  // describe('update', function () {
  //   it('should update the teacher', function () {
  //     expect.spyOn(Teachers, 'update');
  //     this.teacher._id = "doesntMatter";
  //    
  //     TeacherRepository.update(this.teacher);
  //    
  //     expect(Teachers.update).toHaveBeenCalledWith({_id: this.teacher._id}, {$set: {} });
  //   });
  // });
});