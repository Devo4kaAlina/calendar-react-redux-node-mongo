import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import { LinearProgress } from 'material-ui';
import AppToolbar from '../../components/toolbar';
import DayCalendar from '../../components/day-calendar';
import ModalNewEvent from '../../components/modal-new-event';
import ModalExportEvents from '../../components/modal-export-events';
import { getUserEvents, addNewEvent, removeNewEvent, exportUserEvents } from '../../actions/event';
import { AGENDA_CALENDAR_WIDTH } from '../../constants';

class CalendarScreen extends React.Component {
    static propTypes = {
        dispatch: PropTypes.func.isRequired,
        isProgress: PropTypes.bool.isRequired,
        exportEventsIsProgress: PropTypes.bool.isRequired,
        events: PropTypes.array.isRequired,
        exportEvents: PropTypes.array.isRequired,
    }

    constructor(props) {
        super(props);

        this.state = {
            selectedDate: moment().format('YYYY-MM-DD'),
        }
    }

    componentDidMount() {
        this.props.dispatch(getUserEvents(this.state.selectedDate));
    }

    handleAddEvent = ({ title, end, start }) => {
        this.props.dispatch(addNewEvent({
            title,
            start,
            end,
            eventDate: this.state.selectedDate
        }));
        this.setState({ isModalOpen: false });
    }

    handleRemoveEvent = (id) => {
        this.props.dispatch(removeNewEvent(id));
    }

    makeLoader = () => {
        const { isProgress, exportEventsIsProgress } = this.props;
        if (isProgress || exportEventsIsProgress) return <div className="event-loader"><LinearProgress mode="indeterminate" /></div>;
        return null;
    }

    render() {
        return (
            <div style={{ textAlign: 'center' }} >
                {this.makeLoader()}
                <AppToolbar
                    handleOpenNewEventModal={() => this.setState({ isModalOpen: true })}
                    exportUserEvents={() => this.props.dispatch(exportUserEvents(this.state.selectedDate, () => {
                        this.setState({ isExportModalOpen: true })
                    }))}
                />
                <div className="agenda">
                    <h1 className="agenda__header">Day Calendar</h1>
                    <div className="agenda__calendar" style={{ width: '80%', maxWidth: AGENDA_CALENDAR_WIDTH }}>
                        <DayCalendar
                            from={8}
                            to={17}
                            events={this.props.events}
                            handleRemoveEvent={this.handleRemoveEvent}
                        />
                    </div>
                </div>
                <ModalNewEvent
                    handleAddEvent={this.handleAddEvent}
                    handleCloseModal={() => this.setState({ isModalOpen: false })}
                    isModalOpen={this.state.isModalOpen}
                    isProgress={this.props.isProgress}
                />
                <ModalExportEvents
                    handleCloseModal={() => this.setState({ isExportModalOpen: false })}
                    isModalOpen={this.state.isExportModalOpen}
                    events={this.props.exportEvents}
                />
            </div>
        )
    }
}

export default connect((state) => {
    return {
        isProgress: state.event.isProgress,
        exportEventsIsProgress: state.event.exportEventsIsProgress,
        events: state.event.events,
        exportEvents: state.event.exportEvents,
    };
})(CalendarScreen);