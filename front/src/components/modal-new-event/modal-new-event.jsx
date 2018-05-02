import React from 'react';
import PropTypes from 'prop-types';
import {
    Dialog,
    FlatButton,
    RaisedButton,
    TimePicker,
    TextField
} from 'material-ui';
import moment from 'moment';
import validators from '../../helpers/validate.helper';
import './styles.css'

class ModalNewEvent extends React.Component {
    static propTypes = {
        handleAddEvent: PropTypes.func.isRequired,
        handleCloseModal: PropTypes.func.isRequired,
        isModalOpen: PropTypes.bool,
        isProgress: PropTypes.bool,
    }

    static defaultProps = {
        isModalOpen: false,
        isProgress: false,
    }

    today = new Date();
    
    constructor(props) {
        super(props);

        this.state = {
            dayStart: moment(this.today.setHours(8, 0, 0)),
            dayEnd: moment(this.today.setHours(17, 0, 59)),
        }
    }

    makeTimePicker = (timeName) => {
        return (
            <div className="time-wrapper">
                <TimePicker
                    hintText={`Select ${timeName} event time`}
                    minutesStep={5}
                    onChange={(e, time) => this.handleTimeSelected(time, timeName)}
                />
                <p style={{ color: 'red', margin: 0, fontSize: 12 }}>{this.state[`error${timeName}Time`]}</p>
            </div>
        )
    }

    handleTimeSelected = (time, key) => {
        this.setState({ errorTime: false });        
        const { dayStart, dayEnd } = this.state;
        const selectedTime = moment(time);
        if (!selectedTime.isBetween(dayStart, dayEnd, null, '[]')) {
            return this.setState({ [`error${key}Time`]: 'Event should be between 8am to 5pm'})
        }
        this.setState({ [`error${key}Time`]: false });
        const value = parseInt(moment
            .duration(selectedTime.diff(dayStart))
            .asMinutes());
        this.setState({ [`${key}`]: value }, () => {
            const { start, end } = this.state;
            if (!start || !end) return;
            if (start === end) {
                const msg = 'Start and end time could not be the same time';
                this.setState({ errorTime: msg });
            }
            if (start > end) {
                const msg = 'The start time can not be longer than the end time';
                this.setState({ errorTime: msg });
            }
        });    
    }

    resetState = () => {
        this.setState({
            errorTime: false,
            start: false,
            end: false,
            eventTitle: false,
            errorstartTime: false,
            errorendTime: false,
        })
    }

    handleAddEvent = () => {
        const {
            start,
            end,
            eventTitle,
            errorstartTime,
            errorendTime,
            errorTime
        } = this.state;
        const validateData = { eventTitle };
        let isError = false;

        for (let [key, value] of Object.entries(validateData)) {
            const valid = validators[`${key}Validate`](value);
            if (valid) isError = true;
            this.setState({ [key + 'Error']: valid });
        }

        if (isError || errorendTime || errorstartTime || errorTime) return;
        this.props.handleAddEvent({
            start,
            end,
            title: eventTitle
        });
    }

    handleCloseModal = () => {
        this.resetState();
        this.props.handleCloseModal();
    }

    render() {
        const actions = [
            <RaisedButton
                label="Add Event"
                primary={true}
                onClick={this.handleAddEvent}
                disabled={this.props.isProgress}
            />,
            <FlatButton
                label="Cancel"
                primary={true}
                keyboardFocused={true}
                onClick={this.handleCloseModal}
            />,
        ];
        return (
            <Dialog
                title="Add new event for this day"
                actions={actions}
                modal={false}
                open={this.props.isModalOpen}
                onRequestClose={this.props.handleCloseModal}
            >
                {this.makeTimePicker('start')}
                {this.makeTimePicker('end')}
                <p style={{ color: 'red', margin: 0, fontSize: 12 }}>{this.state.errorTime}</p>

                <TextField
                    errorText={this.state.eventTitleError}
                    floatingLabelText="Event Title"
                    onChange={(e) => this.setState({ eventTitle: e.target.value })}
                />
                <br />
            </Dialog>
        );
    }
}

export default ModalNewEvent;