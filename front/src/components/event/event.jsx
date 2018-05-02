import React from 'react';
import PropTypes from 'prop-types';
import { RaisedButton } from 'material-ui';

import './styles.css';

const Event = ({ id, start, end, title, widthDivisor, position, handleRemoveEvent }) => {
    let parentWidth = document.getElementById('calendar__container');
    if (!parentWidth) return null;
    parentWidth = parentWidth ? parentWidth.getBoundingClientRect().width : 100;
    const eventWidth = parentWidth / widthDivisor > 200 ? '200px' : `${100 / widthDivisor}%`;
    const offset = parentWidth / widthDivisor > 200 ? `${200 * position}px` : `${100 / widthDivisor * position}%`;
    const eventStyle = {
        height: `${end - start}px`,
        top: `${start}px`,
        left: offset,
        width: eventWidth,
    };
    return (
        <div style={eventStyle} className="calendar__event">
            <div className="calendar__event__content">
                <div className="calendar__event__content__title">
                    {title || 'Event Title'}
                </div>
                <div className="calendar__event__content__remove">
                    <RaisedButton
                        label="Remove"
                        onClick={() => handleRemoveEvent(id)}
                    />
                </div>
            </div>
        </div>
    );
};

Event.propTypes = {
    id: PropTypes.number.isRequired,
    start: PropTypes.number.isRequired,
    end: PropTypes.number.isRequired,
    handleRemoveEvent: PropTypes.func.isRequired,
    title: PropTypes.string,
    widthDivisor: PropTypes.number,
    position: PropTypes.number,
};

export default Event;
