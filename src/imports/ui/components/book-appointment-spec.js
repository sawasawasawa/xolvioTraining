require('testdom')('<html><body></body></html>');

import ReactWithAddons from 'react/dist/react-with-addons';
global.React = ReactWithAddons;

import expect from 'expect';
global.expect = expect;

import { mount, shallow } from 'enzyme';
global.mount = mount;
global.shallow = shallow;

import proxyquire from 'proxyquire';
const proxyquireStrict = proxyquire.noCallThru();

import StudentFactory from '../../domain/student-factory';
import TeacherFactory from '../../domain/teacher-factory';
// import TeacherRepository from '../../domain/teacher-repository';

const stubs = {
  meteor: {
    Meteor: {
      call: () => {
      }
    },
    Mongo: {
      Collection: () => {}
    },
    '@global': true
  },
};
//todo refactor those tests
const studentRepositoryStub = {
  get: () => StudentFactory.createStudent({ parentEmail: "parent@home.com", studentName: "Jon" })
};

const teacherRepositoryStub = {
  get: () => TeacherFactory.create()
};

const getDataFromURLStub =() => ({teacherId: "doesntMatter", studentName: "id2"});

const meteorCallSpy = expect.spyOn(stubs.meteor.Meteor, 'call');

const BookAppointment = proxyquireStrict(
  './book-appointment', {
    'meteor/meteor': stubs.meteor,
    'meteor/mongo': stubs.meteor,
    '../../domain/student-repository': studentRepositoryStub,
    '../helpers/get-data-from-url': getDataFromURLStub,
      '../../domain/teacher-repository': teacherRepositoryStub,
    }
);

describe('Appointment', function () {
  let Component;
  beforeEach(() => {
    Component = mount(<BookAppointment />);
  });
  describe('render', function () {
    it('should show the date input', function () {
      expect(Component.find('.appointment__date').length).toEqual(1);
    });
    it('should show the time input', function () {
      expect(Component.find('.appointment__time').length).toEqual(1);
    });
    it('should show the submit button', function () {
      expect(Component.find('.appointment__submit').length).toEqual(1);
    });
    it('should not show a confirmation by default', function () {
      expect(Component.find('.appointment__confirmation').length).toEqual(0);
    });
    it('should render the teacher diary', function() {
      expect(Component.find('.teacher-diary').length).toEqual(1);
    })
  });
  describe('submit', function () {
    describe("successful", function () {
      let date, student, bookAppointmentCallback, teacherId;
      beforeEach(() => {
        Component.setState({
          date: '01/02/2003',
          time: '02:10',
        });
        date = new Date('01/02/2003 02:10');
        student = StudentFactory.createStudent({parentEmail: "parent@home.com", studentName: "Jon"});
        teacherId = 'doesntMatter';
        // meteorCallSpy.andReturn({isValid: true});
        bookAppointmentCallback = () => ({ isValid: true });
        meteorCallSpy.andCall(bookAppointmentCallback);
        Component.find('form').simulate('submit');
      });
      it('should book the appointment using the appointment service', function () {
        expect(meteorCallSpy.getLastCall().arguments).toInclude('bookAppointment');
        expect(meteorCallSpy.getLastCall().arguments).toInclude({ date, student, teacherId});
      });
      it('should show a confirmation for successful bookings', function () {
        Component.setState({confirmation: "success"});
        expect(Component.find('.appointment-confirmation .succeeded').length).toEqual(1);
      });
    });
    it('should show an error if there was an error booking', function () {
      Component.setState({confirmation: "failure"});
      expect(Component.find('.appointment-confirmation .failed').length).toEqual(1);
    });
  });
});
