import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { CircularProgress } from 'material-ui';
import { loadUserSession } from './actions/user';
import AuthorizationScreen from './containers/authorization-screen';
import CalendarScreen from './containers/calendar-screen';
import AppSnackbar from './components/snackbar';

class App extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    isProgress: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired,
  }

  componentDidMount() {
    this.props.dispatch(loadUserSession());
  }

  getContent = () =>  {
    const { accessToken } = this.props.user;
    if (this.props.isProgress) return <div className="loader-container"><CircularProgress size={80} thickness={5} /></div>
    if (!accessToken) return <AuthorizationScreen />;
    return <CalendarScreen />;
  }
  render() {
    return (
      <div className="App">
        {this.getContent()}
        <AppSnackbar />
      </div>
    );
  }
}

export default connect((state) => {
  return {
    user: state.user.user,
    isProgress: state.user.isProgress,
  };
})(App);
