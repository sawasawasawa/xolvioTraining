import React from "react";
import {Meteor} from "meteor/meteor";
import classNames from "classnames";
import TeacherDiary from "./teacher-diary";

export default class Appointment extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            date: '',
            time: '',
            confirmation: null,
        };
        this.elementClassNames = {
            root: 'appointment',
            date: 'appointment__date',
            time: 'appointment__time',
            submit: 'appointment__submit',
        };
        this.submitAppointment = this.submitAppointment.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onChangeTime = this.onChangeTime.bind(this);
    }

    onChangeDate(event) {
        const date = event.target.value;
        this.setState({date});
    }

    onChangeTime(event) {
        const time = event.target.value;
        this.setState({time});
    }

    render() {
        return (
            <div className={this.elementClassNames.root}>
                <form onSubmit={this.submitAppointment}>
                    <input className="appointment__date" value={this.state.date} onChange={this.onChangeDate}/>
                    <input className="appointment__time" value={this.state.time} onChange={this.onChangeTime}/>
                    <input type="submit" className="appointment__submit"/>
                </form>
                {this.state.confirmation ?
                    <AppointmentConfirmation status={this.state.confirmation}/>
                    :
                    null
                }
                { this.props.teacher ?
                    <TeacherDiary appointments={this.props.teacher.diary.getAppointments()}/>
                    :
                    null
                }

            </div>
        )
    }

    handleResponse(error, result) {
        if (!error) {
            confirmation = result.isValid ? 'success' : 'failure';
            this.setState({confirmation});
        }
    }

    submitAppointment(event) {
        console.log(this.state);

        Meteor.call('bookAppointment', {
                date: new Date(this.state.date + ' ' + this.state.time),
                studentId: this.props.student._id,
                teacherId: this.props.teacher._id
            }, this.handleResponse
        );


        /*    event.preventDefault();
         let confirmation;
         let that = this;
         let {studentName, teacherId} = getDataFromURL();
         // TODO extract handler and unit test
         const insertDate = new Date(this.state.date + ' ' + this.state.time);
         Meteor.call('bookAppointment', {
         date: insertDate,
         student: StudentRepository.get(studentName),
         teacherId
         }, function (error, result) {
         if (!error) {
         confirmation = result.isValid ? 'success' : 'failure';

         if (confirmation === 'success') {
         const teacher = TeacherRepository.get(teacherId);
         teacher.diary.addAppointment({ date: insertDate, student: StudentRepository.get(studentName) });
         TeacherRepository.update(teacher);
         }
         that.setState({ confirmation });
         } else {
         console.log('error PINGWIN', error);
         }
         })*/
    }
}

class AppointmentConfirmation extends React.Component {
    render() {
        const statusMap = {
            success: {
                className: 'succeeded',
                message: 'GREAT SUCCESS!',
            },
            failure: {
                className: 'failed',
                message: 'GREAT FAILURE!',
            }
        };

        const status = statusMap[this.props.status];

        const classes = classNames({
            'appointment__confirmation': true,
            [status.className]: true,
        });
        return (
            <div className={classes}>
                <span className="appointment-confirmation__message">{status.message}</span>
            </div>
        );
    }
}
