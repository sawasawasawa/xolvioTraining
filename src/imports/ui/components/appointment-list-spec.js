import AppointmentList from './appointment-list'
require('testdom')('<html><body></body></html>');

import ReactWithAddons from 'react/dist/react-with-addons';
global.React = ReactWithAddons;

import expect from 'expect';
global.expect = expect;

import { mount, shallow } from 'enzyme';
global.mount = mount;
global.shallow = shallow;

describe('Appointment List', function () {
  describe('render', function () {
    // beforeEach(function() {
    //   this.component = mount(<AppointmentList />);
    // });
    // HOMEWORK
    it('should not show anything if there are no appointments', function () {
    });
    it('should show appointments', function () {
      // todo check visibility
      fail('Not implemented');
    });
    it('should show one appointment if it is the only one added', function () {
      // todo check there's only 1 app. visible
      fail('Not implemented');
    });
  });
});