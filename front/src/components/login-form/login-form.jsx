import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { RaisedButton, TextField } from 'material-ui';
import validators from '../../helpers/validate.helper';
import { userLogIn } from '../../actions/user';

class LoginForm extends React.Component {
    static propTypes = {
        dispatch: PropTypes.func.isRequired,
        isProgress: PropTypes.bool.isRequired,
    }

    constructor(props) {
        super(props);

        this.state = {
            email: false,
            password: false,
            passwordError: false,
            emailError: false,
        }
    }

    validateData = () => {
        const { email, password } = this.state;
        const validateData = { email, password };
        let isError = false;

        for (let [key, value] of Object.entries(validateData)) {
            const valid = validators[`${key}Validate`](value);
            if (valid) isError = true;
            this.setState({ [key + 'Error']: valid });
        }

        if (isError) return;
        this.props.dispatch(userLogIn(validateData));
    }

    render() {
        const { passwordError, emailError } = this.state;

        return (
            <div style={{ textAlign: 'center' }} >
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
                <RaisedButton
                    label="Log In"
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
})(LoginForm);