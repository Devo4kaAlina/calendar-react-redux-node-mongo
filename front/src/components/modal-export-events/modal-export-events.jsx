import React from 'react';
import PropTypes from 'prop-types';
import {
    FlatButton,
    Dialog
} from 'material-ui';

class ModalExportEvents extends React.Component {
    static propTypes = {
        handleCloseModal: PropTypes.func.isRequired,
        isModalOpen: PropTypes.bool,
        events: PropTypes.array.isRequired,
    }

    static defaultProps = {
        isModalOpen: false,
    }

    render() {
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                keyboardFocused={true}
                onClick={this.props.handleCloseModal}
            />,
        ];
        return (
            <Dialog
                title="All your events for this day"
                actions={actions}
                modal={false}
                open={this.props.isModalOpen}
                onRequestClose={this.props.handleCloseModal}
            >
                {JSON.stringify(this.props.events, null, 2)}
            </Dialog>
        );
    }
}

export default ModalExportEvents;