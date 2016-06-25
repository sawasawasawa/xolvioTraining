import TeacherDiary from './teacher-diary'
require('testdom')('<html><body></body></html>');

import ReactWithAddons from 'react/dist/react-with-addons';
global.React = ReactWithAddons;

import expect from 'expect';
global.expect = expect;

import { mount, shallow } from 'enzyme';
global.mount = mount;
global.shallow = shallow;

describe('Teacher Diary', function () {
  describe('render', function () {
    beforeEach(function() {
      this.component = mount(<TeacherDiary />);
    });
    // HOMEWORK
    it('should show list of appointment items', function () {
      fail('Not implemented');
      // expect(Component.find('.appointment__date').length).toEqual(1);
    });
  });
});