import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';
import { userLogOut } from '../../actions/user';
import './styles.css';

class AppToolbar extends React.Component {

    static propTypes = {
        dispatch: PropTypes.func.isRequired,
        handleOpenNewEventModal: PropTypes.func.isRequired,
        isProgress: PropTypes.bool.isRequired,
        user: PropTypes.object.isRequired,
    }

    render() {
        const { user } = this.props;

        return (
            <Toolbar>
                <ToolbarGroup firstChild={true}>
                    <i className="material-icons" style={{ margin: 10 }}>face</i>
                    <ToolbarTitle className="user-name" text={`${user.firstName} ${user.lastName}`} />
                </ToolbarGroup>
                <ToolbarGroup className="header-right">
                    <ToolbarSeparator />
                    <RaisedButton
                        label="Create Event"
                        primary={true}
                        onClick={this.props.handleOpenNewEventModal}
                    />
                    <IconMenu
                        iconButtonElement={
                            <IconButton touch={true}>
                                <NavigationExpandMoreIcon />
                            </IconButton>
                        }
                    >
                        <MenuItem
                            primaryText="Export events"
                            onClick={this.props.exportUserEvents}                            
                        />
                        <MenuItem
                            primaryText="Log Out"
                            onClick={() => this.props.dispatch(userLogOut())}
                        />
                    </IconMenu>
                </ToolbarGroup>
            </Toolbar>
        );
    }
}


export default connect((state) => {
    return {
        isProgress: state.user.isProgress,
        user: state.user.user,
    };
})(AppToolbar);