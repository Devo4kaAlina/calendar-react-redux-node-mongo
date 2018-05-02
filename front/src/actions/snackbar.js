import {
    SNACKBAR
} from './actionTypes';

export const hideSnackbar = () => (dispatch) => {
    dispatch({ type: `${SNACKBAR}_HIDE` });
}