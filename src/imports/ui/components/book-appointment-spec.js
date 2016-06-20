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

const stubs = {
  meteor: {
    Meteor: {
      call: () => {
      }
    },
  },
};

const meteorCallSpy = expect.spyOn(stubs.meteor.Meteor, 'call');

const BookAppointment = proxyquireStrict(
  './book-appointment', {
    'meteor/meteor': stubs.meteor
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
  });
  describe('submit', function () {
    describe("successful", function () {
      let date, student, bookAppointmentCallback;
      beforeEach(() => {
        Component.setState({
          date: '01/02/2003',
          time: '02:10',
        });
        date = new Date('01/02/2003 02:10');
        student = StudentFactory.createStudent();
        
        // meteorCallSpy.andReturn({isValid: true});
        bookAppointmentCallback = () => ({ isValid: true });
        meteorCallSpy.andCall(bookAppointmentCallback);
        Component.find('form').simulate('submit');
      });
      it('should book the appointment using the appointment service', function () {
        expect(meteorCallSpy.getLastCall().arguments).toInclude('bookAppointment');
        expect(meteorCallSpy.getLastCall().arguments).toInclude({ date, student });
      });
      it('should show a confirmation for successful bookings', function () {
        Component.setState({confirmation: "success"});
        expect(Component.find('.appointment__confirmation .succeeded').length).toEqual(1);
      });
    });
    it('should show an error if there was an error booking', function () {
      Component.setState({confirmation: "failure"});
      expect(Component.find('.appointment__confirmation .failed').length).toEqual(1);
    });
  });
});
