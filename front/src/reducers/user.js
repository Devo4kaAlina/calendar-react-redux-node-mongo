import {
    USER_SING_IN,
    GET_USER_BY_TOKEN
} from '../actions/actionTypes';

const initialState = {
    isProgress: false,
    user: {},
}

export default function ( state = initialState, action ) {
    switch (action.type) {
        case `${USER_SING_IN}_PROGRESS`:
        case `${GET_USER_BY_TOKEN}_PROGRESS`:
            return Object.assign({}, state, {
                isProgress: true
            })
        case `${USER_SING_IN}_ERROR`:
        case `${GET_USER_BY_TOKEN}_ERROR`:
            return Object.assign({}, state, {
                isProgress: false
            })
        case `${USER_SING_IN}_SUCCESS`:
        case `${GET_USER_BY_TOKEN}_SUCCESS`:
            return Object.assign({}, state, {
                user: action.payload,
                isProgress: false                
            })
        default:
            return state
    }
    
}