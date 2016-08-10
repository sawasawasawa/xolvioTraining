require('testdom')('<html><body></body></html>');

import ReactWithAddons from 'react/dist/react-with-addons';
global.React = ReactWithAddons;

import expect from 'expect';
global.expect = expect;

import {mount, shallow} from 'enzyme';
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
            Collection: () => {
            }
        },
        '@global': true
    },
};
//todo refactor those tests
// const studentRepositoryStub = {
//   get: () => StudentFactory.createStudent({ parentEmail: "parent@home.com", studentName: "Jon" })
// };
//
// const teacherRepositoryStub = {
//   get: () => TeacherFactory.create()
// };
//
//const getDataFromURLStub =() => ({teacherId: "doesntMatter", studentName: "id2"});

const BookAppointment = proxyquireStrict(
    './book-appointment', {
        'meteor/meteor': stubs.meteor,
        'meteor/mongo': stubs.meteor,

        // '../../domain/student-repository': studentRepositoryStub,
        //'../helpers/get-data-from-url': getDataFromURLStub,
        //   '../../domain/teacher-repository': teacherRepositoryStub,
    }
);

describe('Appointment', function () {
    let Component;
    describe('render', function () {
        it('should show the date input', function () {
            Component = mount(<BookAppointment />);

            expect(Component.find('.appointment__date').length).toEqual(1);
        });
        it('should show the time input', function () {
            Component = mount(<BookAppointment />);

            expect(Component.find('.appointment__time').length).toEqual(1);
        });
        it('should show the submit button', function () {
            Component = mount(<BookAppointment />);

            expect(Component.find('.appointment__submit').length).toEqual(1);
        });
        it('should show a confirmation when the confirmation state is set', function () {
            Component = mount(<BookAppointment />);
            Component.setState({confirmation: 'success'});

            expect(Component.find('.appointment__confirmation').length).toEqual(1);
        });
        it('should not show a confirmation by default', function () {
            Component = mount(<BookAppointment />);

            expect(Component.find('.appointment__confirmation').length).toEqual(0);
        });
        it('should render the teacher diary when a teacher is provided', function () {
            const diary = {
                getAppointments: expect.createSpy()
            };
            Component = mount(<BookAppointment teacher={{_id: 'doesntMatter', diary}}/>);

            expect(Component.find('.teacher-diary').length).toEqual(1);
        });
        it('should not render the teacher diary when a teacher is not provided', function () {
            Component = mount(<BookAppointment />);

            expect(Component.find('.teacher-diary').length).toEqual(0);
        });
    });
    describe('submit', function () {
        it('should call the book appointment endpoint with appointment date and teacher and student identities', function () {
            const diary = {
                getAppointments: expect.createSpy()
            };
            const meteorCallSpy = expect.spyOn(stubs.meteor.Meteor, 'call');
            Component = mount(<BookAppointment student={{_id: 'theStudentId'}}
                                               teacher={{_id: 'theTeacherId', diary}}/>);
            Component.setState({
                date: '01/02/2003',
                time: '02:10',
            });

            Component.find('form').simulate('submit');

            expect(meteorCallSpy.getLastCall().arguments).toInclude('bookAppointment');
            expect(meteorCallSpy.getLastCall().arguments).toInclude({
                date: new Date('01/02/2003 02:10'), studentId: 'theStudentId', teacherId: 'theTeacherId'
            });
        });
        it('should use the handleResponse method with the appointment endpoint callback', function () {
            const diary = {
                getAppointments: function () {
                }
            };
            const meteorCallSpy = expect.spyOn(stubs.meteor.Meteor, 'call');
            Component = mount(<BookAppointment student={{}} teacher={{diary}}/>);

            Component.find('form').simulate('submit');

            expect(meteorCallSpy.getLastCall().arguments[2]).toBe(Component.instance().handleResponse);
        });
        it('should ', function () {
        });
    });
    describe('handleResponse', function () {
        it('should set the confirmation state to success upon a successful response', function () {
            Component = mount(<BookAppointment />);
            const result = {isValid: true};

            Component.instance().handleResponse(null, result);

            expect(Component.state('confirmation')).toBe('success');
        });
        it('should set the confirmation state to failure upon an invalid response', function () {
            Component = mount(<BookAppointment />);
            const result = {isValid: false};

            Component.instance().handleResponse(null, result);

            expect(Component.state('confirmation')).toBe('failure');
        });
        it('should not set the state upon receiving na error', function () {
            Component = mount(<BookAppointment />);

            Component.instance().handleResponse(true);

            expect(Component.state('confirmation')).toBe(null);
        });
    });


    /* describe('submit', function () {
     beforeEach(() => {
     /!*Component.setState({
     date: '01/02/2003',
     time: '02:10',
     });
     date = new Date('01/02/2003 02:10');
     student = StudentFactory.createStudent({parentEmail: "parent@home.com", studentName: "Jon"});
     teacherId = 'doesntMatter';
     // meteorCallSpy.andReturn({isValid: true});
     bookAppointmentCallback = () => ({ isValid: true });
     meteorCallSpy.andCall(bookAppointmentCallback);
     Component.find('form').simulate('submit');*!/
     });
     it('should book the appointment using the appointment service', function () {
     Component = mount(<BookAppointment />);
     Component.setState({
     date: '01/02/2003',
     time: '02:10',
     teacherId: 'someId',
     studentId: 'anotherId'
     });
     const meteorCallSpy = expect.spyOn(stubs.meteor.Meteor, 'call');

     Component.find('form').simulate('submit');

     expect(meteorCallSpy.getLastCall().arguments).toInclude('bookAppointment');
     expect(meteorCallSpy.getLastCall().arguments).toInclude({
     date: new Date('01/02/2003 02:10'), studentId: 'anotherId', teacherId: 'someId'});
     });
     /!*it('should show a confirmation for successful bookings', function () {
     Component.setState({confirmation: "success"});
     expect(Component.find('.appointment-confirmation .succeeded').length).toEqual(1);
     });
     });
     it('should show an error if there was an error booking', function () {
     Component.setState({confirmation: "failure"});
     expect(Component.find('.appointment-confirmation .failed').length).toEqual(1);
     *!/
     });*/
});
