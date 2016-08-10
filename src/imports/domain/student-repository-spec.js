import proxyquire from 'proxyquire';
const proxyquireStrict = proxyquire.noCallThru();
import expect from 'expect';


const stubs = {
  meteor: {
    Mongo: {
      Collection: () => {
        return {
          findOne: () => {},
          insert: () => {}
        }
      }
    },
  },
};

//const meteorCallSpy = expect.spyOn(stubs.meteor.Meteor, 'call');

const Students = proxyquireStrict(
  '../infrastructure/collections', {
    'meteor/mongo': stubs.meteor
  }
).Students;

import StudentRepository from './student-repository';
import Student from './student'
import Parent from './parent'

describe('Student Repository', function () {
  beforeEach(function () {
    this.student = {
      name: 'jonny',
      parent: { email: 'parent@home.com' },
    };
  });
  describe('get', function () {
    it('should get the student by name', function () {
      expect.spyOn(Students, 'findOne').andReturn(this.student);

      const actualStudent = StudentRepository.get(this.student.name);
      expect(Students.findOne).toHaveBeenCalledWith({name: this.student.name});
      expect(actualStudent instanceof Student).toBe(true);
    });
    it('should convert the parent object into an Parent instance', function () {
      expect.spyOn(Students, 'findOne').andReturn(this.student);

      const actualStudent = StudentRepository.get('blah');

      expect(actualStudent.parent instanceof Parent).toBe(true);
    });
  });
  describe('insert', function () {
    it('should insert the student', function () {
      expect.spyOn(Students, 'insert');

      StudentRepository.insert(this.student);

      expect(Students.insert).toHaveBeenCalledWith(this.student);
    });
  });
});