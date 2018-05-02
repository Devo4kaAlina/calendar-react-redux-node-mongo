import {
    SNACKBAR
} from '../actions/actionTypes';

const initialState = {
    isOpen: false,
    message: false,
}

export default function ( state = initialState, action ) {
    switch (action.type) {
        case `${SNACKBAR}_HIDE`:
            return Object.assign({}, state, {
                isOpen: false,
                message: false,
            })
        case `${SNACKBAR}_SHOW`:
            return Object.assign({}, state, {
                isOpen: true,
                message: action.payload,
            })
        default:
            return state
    }
    
}