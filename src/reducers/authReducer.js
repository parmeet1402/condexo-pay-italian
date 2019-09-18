// import types
import {
    LOGIN_FAILURE,
    LOGIN_SUCCESS,
    LOGIN_REQUEST,
    LOGOUT
} from "../actions/types";

let user = JSON.parse(localStorage.getItem("user"));
const initialState = user
    ? { loggingIn: false, loggedIn: true, user }
    : {
          loggingIn: false,
          loggedIn: false,
          user: {}
      };

export default function(state = initialState, action) {
    switch (action.type) {
        case LOGIN_REQUEST:
            return {
                loggingIn: true,
                loggedIn: false,
                user: {}
            };
        case LOGIN_SUCCESS:
            return {
                loggingIn: false,
                loggedIn: true,
                user: action.payload
            };
        case LOGIN_FAILURE:
        case LOGOUT:
            return {
                loggingIn: false,
                loggedIn: false,
                user: {}
            };
        default:
            return state;
    }
}
