import AppointmentList from './appointment-list'
require('testdom')('<html><body></body></html>');

import ReactWithAddons from 'react/dist/react-with-addons';
global.React = ReactWithAddons;

import expect from 'expect';
global.expect = expect;

import { mount, shallow } from 'enzyme';
global.mount = mount;
global.shallow = shallow;

import AppointmentItem from './appointment-item'

describe('Appointment List', function () {
  describe('render', function () {
    it('should render the component with proper class', function() {
      this.component = shallow(<AppointmentList />);
  
      expect(this.component.find('.appointment-list').length).toBe(1);
    });
    it('should not show any appointment items if there are no appointments', function () {
      this.component = shallow(<AppointmentList appointments={[]}/>);

      expect(this.component.find('.appointment-list__appointment-item').length).toBe(0);
    });
    it('should show appointments', function () {
      const props = {
        appointments: ['someAppointment']
      };
      this.component = shallow(<AppointmentList {...props}/>);

      expect(this.component.find(AppointmentItem).length).toBe(1);
    });
    it('should pass a single appointment to each AppointmentItem component', function () {
      const appointment = 'someAppointment';
      const props = {
        appointments: [appointment]
      };
      this.component = shallow(<AppointmentList {...props}/>);

      expect(this.component.find(AppointmentItem).props().appointment).toBe(appointment);
    });
  });
});