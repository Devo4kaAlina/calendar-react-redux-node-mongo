import thunk from 'redux-thunk';
import { applyMiddleware, combineReducers, createStore, compose } from 'redux';
import promiseMiddleware from 'redux-promise';
import userReducer from './user';
import eventReducer from './event';
import snackbarReducer from './snackbar';

const reducer = combineReducers({
        user: userReducer,
        event: eventReducer,
        snackbar: snackbarReducer,
    });
export default compose(applyMiddleware(thunk, promiseMiddleware))(createStore)(reducer);
