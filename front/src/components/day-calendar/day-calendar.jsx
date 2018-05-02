import React from 'react';
import PropTypes from 'prop-types';
import Event from '../event';
import Divisors from '../divisors';
import './styles.css';

class DayCalendar extends React.Component {
    events = (totalMinutes) => {
        if (!this.props.events) {
            return false;
        }

        return this.props.events.map((event, key) => {
            return (
                <Event
                    id={event._id}
                    start={event.start}
                    end={event.end}
                    title={event.title}
                    widthDivisor={event.widthDivisor}
                    position={event.position}
                    key={key}
                    handleRemoveEvent={this.props.handleRemoveEvent}
                />
            );
        });
    };

    render = () => {
        const totalMinutesPerDivisor = 60;
        const totalMinutes = (this.props.to - this.props.from) * totalMinutesPerDivisor;
        const calendarStyle = {
            height: `${totalMinutes}px`,
        };

        return (
            <div style={calendarStyle} className="calendar__container" id="calendar__container">
                {this.events(totalMinutes)}
                <Divisors
                    totalMinutes={totalMinutes}
                    totalMinutesPerDivisor={totalMinutesPerDivisor}
                />
            </div>
        );
    }
}

DayCalendar.propTypes = {
    events: PropTypes.array,
    from: PropTypes.number,
    to: PropTypes.number,
    handleRemoveEvent: PropTypes.func,
};

export default DayCalendar;
