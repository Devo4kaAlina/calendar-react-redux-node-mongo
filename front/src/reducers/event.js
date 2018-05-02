import {
    GET_USER_EVENTS,
    ADD_NEW_EVENT,
    REMOVE_NEW_EVENT,
    EXPORT_USER_EVENTS
} from '../actions/actionTypes';
import computeWidthDivisor from '../helpers/event.helper';

const initialState = {
    isProgress: false,
    events: [],
    exportEvents: [],
    exportEventsIsProgress: false,
}

export default function (state = initialState, action) {
    switch (action.type) {
        case `${GET_USER_EVENTS}_PROGRESS`:
        case `${ADD_NEW_EVENT}_PROGRESS`:
        case `${REMOVE_NEW_EVENT}_PROGRESS`:
            return Object.assign({}, state, {
                isProgress: true
            })
        case `${EXPORT_USER_EVENTS}_PROGRESS`:
            return Object.assign({}, state, {
                exportEventsIsProgress: true
            })
        case `${GET_USER_EVENTS}_ERROR`:
            return Object.assign({}, state, {
                isProgress: false,
                events: [],
            })
        case `${EXPORT_USER_EVENTS}_ERROR`:
            return Object.assign({}, state, {
                exportEventsIsProgress: false,
                exportEvents: [],
            })
        case `${ADD_NEW_EVENT}_ERROR`:
        case `${REMOVE_NEW_EVENT}_ERROR`:
            return Object.assign({}, state, {
                isProgress: false
            })
        case `${GET_USER_EVENTS}_SUCCESS`:
        case `${ADD_NEW_EVENT}_SUCCESS`:
        case `${REMOVE_NEW_EVENT}_SUCCESS`:
            return Object.assign({}, state, {
                events: computeWidthDivisor(action.payload),
                isProgress: false
            })
        case `${EXPORT_USER_EVENTS}_SUCCESS`:
            return Object.assign({}, state, {
                exportEvents: action.payload,
                exportEventsIsProgress: false
            })
        default:
            return state
    }

}