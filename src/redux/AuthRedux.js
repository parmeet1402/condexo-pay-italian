import { createReducer, createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
  loginRequest: ['username', 'password'],
  loginSuccess: ['token'],
  loginFailed: ['message'],
  setLoggedOut: null,
  setUser: ['user']
});

export const AuthTypes = Types;
export default Creators;

/* ------- Initial State --------- */
export const INITIAL_STATE = {
  token: null,
  me: null,
  message: ''
};

/* ------- Selectors --------- */
export const AuthSelectors = {
  selectIsLoggedIn: state => !!state.auth.token,
  selectCurrentUser: state => state.auth.me,
  selectCredentials: state => ({
    username: state.auth.username,
    password: state.auth.password
  })
};

/* -------- Reducers ----------0 */
export const loginRequest = (state, { username, password }) => {
  return {
    ...state,
    username,
    password
  };
};
export const loginSuccess = (state, { token }) => {
  return {
    ...state,
    token
  };
};

export const loginFailed = (state, { message }) => {
  return {
    ...state,
    message
  };
};

export const setLoggedOut = () => {
  return {
    ...INITIAL_STATE
  };
};

export const setUser = (state, { user }) => ({
  ...state,
  me: user
});

/* -------- Hookup Reducers to Types -------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.LOGIN_REQUEST]: loginRequest,
  [Types.LOGIN_SUCCESS]: loginSuccess,
  [Types.LOGIN_FAILED]: loginFailed,
  [Types.SET_LOGGED_OUT]: setLoggedOut,
  [Types.SET_USER]: setUser
});
