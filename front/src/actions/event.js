import axios from 'axios';
import { API_URL } from '../config/config';
import { insertAccessToken } from '../helpers/request.helper';
import {
    GET_USER_EVENTS,
    SNACKBAR,
    ADD_NEW_EVENT,
    REMOVE_NEW_EVENT,
    EXPORT_USER_EVENTS
} from './actionTypes';

export const getUserEvents = (date) => (dispatch) => {
    dispatch({ type: `${GET_USER_EVENTS}_PROGRESS` });
    axios
        .get(`${API_URL}/event?${insertAccessToken()}&date=${date}`,)
        .then(({ data }) => {
            dispatch({ type: `${GET_USER_EVENTS}_SUCCESS`, payload: data });
        })
        .catch(err => {
            dispatch({ type: `${GET_USER_EVENTS}_ERROR` });
            dispatch({ type: `${SNACKBAR}_SHOW`, payload: err.response.data.errorMessage });
        })
}

export const exportUserEvents = (date, cb) => (dispatch) => {
    dispatch({ type: `${EXPORT_USER_EVENTS}_PROGRESS` });
    axios
        .get(`${API_URL}/event/export?${insertAccessToken()}&date=${date}`,)
        .then(({ data }) => {
            dispatch({ type: `${EXPORT_USER_EVENTS}_SUCCESS`, payload: data });
            cb();
        })
        .catch(err => {
            dispatch({ type: `${EXPORT_USER_EVENTS}_ERROR` });
            dispatch({ type: `${SNACKBAR}_SHOW`, payload: err.response.data.errorMessage });
        })
}

export const addNewEvent = (data) => (dispatch) => {
    dispatch({ type: `${ADD_NEW_EVENT}_PROGRESS` });
    axios
        .post(`${API_URL}/event?${insertAccessToken()}`, data)
        .then(({ data }) => {
            dispatch({ type: `${ADD_NEW_EVENT}_SUCCESS`, payload: data });
        })
        .catch(err => {
            dispatch({ type: `${ADD_NEW_EVENT}_ERROR` });
            dispatch({ type: `${SNACKBAR}_SHOW`, payload: err.response.data.errorMessage });
        })
}

export const removeNewEvent = (id) => (dispatch) => {
    dispatch({ type: `${REMOVE_NEW_EVENT}_PROGRESS` });
    axios
        .delete(`${API_URL}/event/${id}?${insertAccessToken()}`)
        .then(({ data }) => {
            dispatch({ type: `${REMOVE_NEW_EVENT}_SUCCESS`, payload: data });
        })
        .catch(err => {
            dispatch({ type: `${REMOVE_NEW_EVENT}_ERROR` });
            dispatch({ type: `${SNACKBAR}_SHOW`, payload: err.response.data.errorMessage });
        })
}
