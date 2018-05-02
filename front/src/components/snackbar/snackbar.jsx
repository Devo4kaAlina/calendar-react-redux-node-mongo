import React from 'react';
import { connect } from 'react-redux';
import { Snackbar } from 'material-ui';
import { hideSnackbar } from '../../actions/snackbar'

class AppSnackbar extends React.Component {

  handleRequestClose = () => {
    this.props.dispatch(hideSnackbar());
  };

  render() {
    const { isOpen, message } = this.props;
    if (!message) return null;

    return (
        <Snackbar
          open={isOpen}
          message={message}
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose}
        />
    );
  }
}

export default connect((state) => {
  return {
    isOpen: state.snackbar.isOpen,
    message: state.snackbar.message,
  };
})(AppSnackbar);