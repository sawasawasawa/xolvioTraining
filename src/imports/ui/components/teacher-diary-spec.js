require('testdom')('<html><body></body></html>');

import ReactWithAddons from 'react/dist/react-with-addons';
global.React = ReactWithAddons;

import expect from 'expect';
global.expect = expect;

import { mount, shallow } from 'enzyme';
global.mount = mount;
global.shallow = shallow;

import TeacherDiary from './teacher-diary'
import AppointmentList from './appointment-list'

describe('Teacher Diary', function () {
  describe('render', function () {
    it('should show the list of appointment items', function () {
      this.component = shallow(<TeacherDiary/>);

      expect(this.component.find(AppointmentList).length).toBe(1);
    });
    it('should pass the appointments to the AppointmentList', function () {
      const _appointments = [{some: "thing"}];

      this.component = shallow(<TeacherDiary appointments={_appointments}/>);

      expect(this.component.find(AppointmentList).props().appointments).toBe(_appointments);
    });
    it('should render the component with proper root class', function() {
      this.component = shallow(<TeacherDiary/>);

      expect(this.component.find('.teacher-diary').length).toBe(1);
    });
    it('should show the welcoming header for the teacher', function() {
      this.component = shallow(<TeacherDiary/>);
  
      expect(this.component.find('.teacher-diary__header').length).toBe(1);
      expect(this.component.find('.teacher-diary__header').first().text()).toBe('Teacher Diary');
    })
  });
});