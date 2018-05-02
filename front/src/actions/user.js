import axios from 'axios';
import { API_URL } from '../config/config';
import { setCookie, removeCookie } from '../helpers/cookie.helper';
import { insertAccessToken } from '../helpers/request.helper';
import {
    USER_SING_IN,
    GET_USER_BY_TOKEN,
    SNACKBAR
} from './actionTypes';

export const userLogIn = (data = {}) => (dispatch) => {
    dispatch({ type: `${USER_SING_IN}_PROGRESS`});
    axios
        .post(`${API_URL}/user/singin`, data)
        .then(({ data: user }) => {
            if (user.accessToken) setCookie('accessToken', user.accessToken, 86400 * 30);
            dispatch({ type: `${USER_SING_IN}_SUCCESS`,  payload: user });            
        })
        .catch(err => {
            dispatch({ type: `${USER_SING_IN}_ERROR` });
            dispatch({ type: `${SNACKBAR}_SHOW`, payload: err.response.data.errorMessage });
        })
}

export const loadUserSession = () => (dispatch) => {
    dispatch({ type: `${GET_USER_BY_TOKEN}_PROGRESS` });
    axios
        .get(`${API_URL}/user/me?${insertAccessToken()}`)
        .then(({ data: user }) => {
            dispatch({ type: `${GET_USER_BY_TOKEN}_SUCCESS`, payload: user });

        })
        .catch(err => {
            removeCookie('accessToken');
            dispatch({ type: `${GET_USER_BY_TOKEN}_ERROR` });
        })
}

export const userSingUp = (data) => (dispatch) => {
    dispatch({ type: `${USER_SING_IN}_PROGRESS` });
    axios
        .post(`${API_URL}/user/singup`, data)
        .then(({ data: user }) => {
            if (user.accessToken) setCookie('accessToken', user.accessToken, 86400 * 30);
            dispatch({ type: `${USER_SING_IN}_SUCCESS`, payload: user });
        })
        .catch(err => {
            dispatch({ type: `${USER_SING_IN}_ERROR` });
            dispatch({ type: `${SNACKBAR}_SHOW`, payload: err.response.data.errorMessage });
        })
}

export const userLogOut = () => (dispatch) => {
    dispatch({ type: `${USER_SING_IN}_SUCCESS`, payload: {} });
    removeCookie('accessToken');    
}