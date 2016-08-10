import AppointmentItem from './appointment-item'
require('testdom')('<html><body></body></html>');

import ReactWithAddons from 'react/dist/react-with-addons';
global.React = ReactWithAddons;

import expect from 'expect';
global.expect = expect;

import { mount, shallow } from 'enzyme';
global.mount = mount;
global.shallow = shallow;

// <div className='.appointment-item'><span className='appointment-item___time'></span>..</div>

// HOMEWORK
describe('Appointment Item', function () {
  describe('render', function () {
    it('should render the component with proper class', function (){
      const props = {};

      this.component = shallow(<AppointmentItem {...props} />);

      expect(this.component.find('.appointment-item').length).toBe(1);
    });
    it('should show the time in correct format', function () {
      const props = {
        appointment: { date: new Date('10/05/2016 14:00').getTime() },
    };

      this.component = shallow(<AppointmentItem {...props} />);

      expect(this.component.find('.appointment-item__date').length).toBe(1);
      expect(this.component.find('.appointment-item__date').text()).toEqual('10/05/2016 14:00');
    });
    it('should show the student name', function () {
      const props = {
        appointment: { student: { name: "Name" } },
      };

      this.component = shallow(<AppointmentItem {...props} />);

      expect(this.component.find('.appointment-item__student-name').length).toBe(1);
      expect(this.component.find('.appointment-item__student-name').text()).toEqual(props.appointment.student.name);

    });
    it('should show the student parent email', function () {
      const props = {
         appointment: { student: { parent: { email: "parent@home.com" } } },
      };

      this.component = shallow(<AppointmentItem {...props} />);

      expect(this.component.find('.appointment-item__parent-email').length).toBe(1);
      expect(this.component.find('.appointment-item__parent-email').text()).toEqual(props.appointment.student.parent.email);
    });
  });
  describe('parseDate', function () {
    it('should show a different time in the correct format', function () {
      const _date = new Date('11/03/2014 08:00').getTime();
      
      expect(new AppointmentItem().parseDate(_date)).toEqual('11/03/2014 08:00');
    });
  });
});