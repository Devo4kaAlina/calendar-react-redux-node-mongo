import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import './styles.css';

const Divisors = ({ totalMinutes, totalMinutesPerDivisor }) => {
    const totalDivisors = totalMinutes / totalMinutesPerDivisor;
    const divisors = [];
    const times = [];

    for (let i = 0; i < totalDivisors + 1; i++) {
        const positionStyle = {
            top: `${i * totalMinutesPerDivisor}px`,
        };

        divisors.push(
            (
                <div key={i} style={positionStyle} className="calendar__divisor" />
            )
        );
    }

    const totalMinutesPerTime = totalMinutesPerDivisor / 2;
    const totalTimes = totalMinutes / totalMinutesPerTime;
    for (let i = 0; i <= totalTimes; i += 1) {
        const positionStyle = {
            top: `${i * totalMinutesPerTime}px`,
            fontWeight: 200,
            fontSize: (i * totalMinutesPerTime) % totalMinutesPerDivisor === 0 ? 16 : 12,
        };

        times.push(
            (
                <div key={i} style={positionStyle} className="calendar__divisor__time" >
                    {moment().set('hour', 8).set('minute', i * totalMinutesPerTime).format('hh:mm')}
                </div>
            )
        );
    }

    return (
        <div>
            {divisors}
            {times}
        </div>
    );
};

Divisors.propTypes = {
    totalMinutes: PropTypes.number,
    totalMinutesPerDivisor: PropTypes.number,
};

export default Divisors;
