import { LOGIN_FAILURE, LOGIN_SUCCESS, LOGIN_REQUEST, LOGOUT } from "./types";

export const setLoginPending = () => ({
    type: LOGIN_REQUEST
});

export const setLoginSuccess = userData => ({
    type: LOGIN_SUCCESS,
    payload: userData
});

export const setLoginFailure = () => ({
    type: LOGIN_FAILURE
});

export const setLoggedOut = () => ({
    type: LOGOUT
});
