import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Tabs, Tab } from 'material-ui/Tabs';
import LoginForm from '../../components/login-form';
import SingUpForm from '../../components/sing-up-form';


class AuthorizationForm extends React.Component {
    static propTypes = {
        isProgress: PropTypes.bool.isRequired,
    }

    constructor(props) {
        super(props);

        this.state = {
            currentTab: 'singIn',
        }
    }

    render() {

        return (
            <Tabs
                value={this.state.currentTab}
                onChange={(value) => this.setState({ currentTab: value })}
                style={{ maxWidth: 600, margin: 'auto' }}
            >
                <Tab label="Sing In" value="singIn">
                    <LoginForm />
                </Tab>
                <Tab label="Sing Up" value="singUp">
                    <SingUpForm />
                </Tab>
            </Tabs>
        )
    }
}

export default connect((state) => {
    return {
        isProgress: state.user.isProgress,
    };
})(AuthorizationForm);