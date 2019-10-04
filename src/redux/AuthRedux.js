import { createReducer, createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
  setFormData: ['formData']

  /* setLoggedIn: ['token'],
  setLoggedOut: null,
  setUser: ['user'] */
});

export const AuthTypes = Types;
export default Creators;

/* ------- Initial State --------- */
export const INITIAL_STATE = {
  formData: null
  /* token: null, // null
  me: null */
};

/* ------- Selectors --------- */
export const AuthSelectors = {
  selectFormData: state => state.auth.formData
  /* selectIsLoggedIn: state => !!state.auth.token,
  selectCurrentUser: state => state.auth.me */
};

/* -------- Reducers ---------- */
export const setFormData = (state, { formData }) => {
  return {
    ...state,
    formData: { ...state.formData, ...formData }
  };
};
/* export const setLoggedIn = (state, { token }) => {
  return {
    ...state,
    token
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
 */
/* -------- Hookup Reducers to Types -------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_FORM_DATA]: setFormData
  /*   [Types.SET_LOGGED_IN]: setLoggedIn,
  [Types.SET_LOGGED_OUT]: setLoggedOut,
  [Types.SET_USER]: setUser */
});
