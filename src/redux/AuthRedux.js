import { createReducer, createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
  loginRequest: ['username', 'password'],
  loginSuccess: ['me'],
  loginFailed: ['error'],
  setLoggedOut: null
});

export const AuthTypes = Types;
export default Creators;

/* ------- Initial State --------- */
export const INITIAL_STATE = {
  me: null,
  error: '',
  username: '',
  password: '',
  isLoading: false
};

/* ------- Selectors --------- */
export const AuthSelectors = {
  selectIsLoggedIn: state => !!state.auth.me.token,
  selectCurrentUser: state => state.auth.me,
  selectCredentials: state => ({
    username: state.auth.username,
    password: state.auth.password
  }),
  selectIsLoading: state => state.auth.isLoading,
  selectError: state => state.auth.error
};

/* -------- Reducers ----------0 */
export const loginRequest = (state, { username, password }) => {
  return {
    ...state,
    error: '',
    username,
    password,
    isLoading: true
  };
};
export const loginSuccess = (state, { me }) => {
  return {
    ...INITIAL_STATE,
    me,
    isLoading: false
  };
};

export const loginFailed = (state, { error }) => {
  return {
    ...INITIAL_STATE,
    error: error.errors.message,
    isLoading: false
  };
};

export const setLoggedOut = () => {
  return {
    ...INITIAL_STATE
  };
};

/* -------- Hookup Reducers to Types -------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.LOGIN_REQUEST]: loginRequest,
  [Types.LOGIN_SUCCESS]: loginSuccess,
  [Types.LOGIN_FAILED]: loginFailed,
  [Types.SET_LOGGED_OUT]: setLoggedOut
});
