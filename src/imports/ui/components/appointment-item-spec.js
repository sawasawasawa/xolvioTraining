import AppointmentItem from './appointment-item'
require('testdom')('<html><body></body></html>');

import ReactWithAddons from 'react/dist/react-with-addons';
global.React = ReactWithAddons;

import expect from 'expect';
global.expect = expect;

import { mount, shallow } from 'enzyme';
global.mount = mount;
global.shallow = shallow;

// HOMEWORK
describe('Appointment Item', function () {
  describe('render', function () {
    beforeEach(function() {
      this.component = mount(<AppointmentItem />);
    });
    it('should show the time', function () {
      fail('Not implemented');
    });
    it('should show the student name', function () {
      fail('Not implemented');
    });
    it('should show the student parent email', function () {
      fail('Not implemented');
    });
  });
});