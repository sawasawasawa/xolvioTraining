import ReactWithAddons from 'react/dist/react-with-addons';
global.React = ReactWithAddons;

import expect from 'expect';
global.expect = expect;

import { mount, shallow } from 'enzyme';
global.mount = mount;
global.shallow = shallow;


import proxyquire from 'proxyquire';
const proxyquireStrict = proxyquire.noCallThru();

const stubs = {
  meteor: {
    Meteor: {
      call: () => {}
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
    Component = shallow(<BookAppointment />);
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
  });
  describe('submit', function () {
    it('should book the appointment using the appointment service', function () {
      Component.setState({
        date: '01/02/2003',
        time: '02:10',
      });
      const date = new Date('01/02/2003 02:10');
  
      Component.find('form').simulate('submit');
      expect(meteorCallSpy).toHaveBeenCalledWith('bookAppointment', {
        date: date,
      });
    });
    it('should show a confirmation for successful bookings', function () {
      // mock the meteor.call response
      // simulate click
      // expect response to show dialog
      fail('Not implemented');
    });
    it('should show an error if there was an error booking', function () {
      // check if the date is available (error handling)
      fail('Not implemented');
    });
  });
});
