import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { RaisedButton, TextField } from 'material-ui';
import validators from '../../helpers/validate.helper';
import { userSingUp } from '../../actions/user';

class SingUpForm extends React.Component {
    static propTypes = {
        dispatch: PropTypes.func.isRequired,
        isProgress: PropTypes.bool.isRequired,
    }

    constructor(props) {
        super(props);

        this.state = {
            firstName: false,
            lastName: false,
            email: false,
            password: false,
            confirmPassword: false,
            firstNameError: false,
            lastNameError: false,
            emailError: false,
            passwordError: false,
            confirmPasswordError: false,
        }
    }

    validateData = () => {
        const {
            firstName,
            lastName,
            email,
            password,
            confirmPassword
        } = this.state;
        const validateData = {
            firstName,
            lastName,
            email,
            password,
            confirmPassword
        };
        let isError = false;

        for (let [key, value] of Object.entries(validateData,)) {
            const valid = validators[`${key}Validate`](value, password);
            if (valid) isError = true;
            this.setState({ [key + 'Error']: valid });
        }

        if (isError) return;
        this.props.dispatch(userSingUp(validateData));
    }

    render() {
        const {
            firstNameError,
            lastNameError,
            passwordError,
            emailError,
            confirmPasswordError
        } = this.state;

        return (
            <div style={{ textAlign: 'center' }} >
                <TextField
                    errorText={firstNameError}
                    floatingLabelText="First Name"
                    onChange={(e) => this.setState({ firstName: e.target.value })}
                />
                <br />
                <TextField
                    errorText={lastNameError}
                    floatingLabelText="Last Name"
                    onChange={(e) => this.setState({ lastName: e.target.value })}
                />
                <br />
                <TextField
                    errorText={emailError}
                    floatingLabelText="Email"
                    onChange={(e) => this.setState({ email: e.target.value })}
                />
                <br />
                <TextField
                    errorText={passwordError}
                    floatingLabelText="Password"
                    type="password"
                    onChange={(e) => this.setState({ password: e.target.value })}
                />
                <br />
                <TextField
                    errorText={confirmPasswordError}
                    floatingLabelText="Confirm Password"
                    type="password"
                    onChange={(e) => this.setState({ confirmPassword: e.target.value })}
                />
                <br />            
                <RaisedButton
                    label="Sing Up"
                    primary={true}
                    disabled={this.props.isProgress}
                    onClick={this.validateData}
                    style={{ marginTop: 15 }} />

            </div>
        )
    }
}

export default connect((state) => {
    return {
        isProgress: state.user.isProgress,
    };
})(SingUpForm);