import { createReducer, createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
  loginRequest: ['email', 'password'],
  loginSuccess: ['me'],
  loginFailed: ['error'],
  setLoggedOut: null,
  /*   setDataForRedirectionAfterLogin: ['email'],
  resetDataForRedirectionAfterLogin: null, */
});

export const AuthTypes = Types;
export default Creators;

/* ------- Initial State --------- */
export const INITIAL_STATE = {
  /* me: null, */
  me: null,
  error: '',
  email: '',
  password: '',
  isLoading: false,
  /*   isRedirectToPaymentsRequested: false,
  emailUsedForPurchasing: '', */
};

/* ------- Selectors --------- */
export const AuthSelectors = {
  selectIsLoggedIn: (state) => !!state.auth.me.token,
  selectCurrentUser: (state) => state.auth.me,
  selectCredentials: (state) => ({
    email: state.auth.email,
    password: state.auth.password,
  }),
  selectIsLoading: (state) => state.auth.isLoading,
  selectError: (state) => state.auth.error,

  /* selectIsRedirectToPaymentsRequested: (state) =>
    state.auth.isRedirectToPaymentsRequested,

  selectEmailUsedForPurchasing: (state) => state.auth.emailUsedForPurchasing, */
};

/* -------- Reducers ----------0 */
export const loginRequest = (state, { email, password }) => {
  return {
    ...state,
    error: '',
    email,
    password,
    isLoading: true,
  };
};
export const loginSuccess = (state, { me }) => {
  return {
    ...INITIAL_STATE,
    me,
    isLoading: false,
  };
};

export const loginFailed = (state, { error }) => {
  return {
    ...INITIAL_STATE,
    error: error.errors.message,
    isLoading: false,
  };
};

export const setLoggedOut = () => {
  return {
    ...INITIAL_STATE,
  };
};

/* export const setDataForRedirectionAfterLogin = (state, { email }) => ({
  ...state,
  isRedirectToPaymentsRequested: true,
  emailUsedForPurchasing: email,
});

export const resetDataForRedirectionAfterLogin = (state) => ({
  ...state,
  isRedirectToPaymentsRequested: false,
  emailUsedForPurchasing: '',
}); */

/* -------- Hookup Reducers to Types -------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.LOGIN_REQUEST]: loginRequest,
  [Types.LOGIN_SUCCESS]: loginSuccess,
  [Types.LOGIN_FAILED]: loginFailed,
  [Types.SET_LOGGED_OUT]: setLoggedOut,
  /* [Types.SET_DATA_FOR_REDIRECTION_AFTER_LOGIN]: setDataForRedirectionAfterLogin,
  [Types.RESET_DATA_FOR_REDIRECTION_AFTER_LOGIN]: resetDataForRedirectionAfterLogin, */
});
