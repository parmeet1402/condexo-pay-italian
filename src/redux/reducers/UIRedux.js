import { createReducer, createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
  showNavbar: null,
  hideNavbar: null,
  addRef: ['name', 'ref'],
});

export const AuthTypes = Types;
export default Creators;

/* ------- Initial State --------- */
export const INITIAL_STATE = {
  isNavbarVisible: false,
  refs: {},
};

/* ------- Selectors --------- */
export const UISelectors = {
  selectIsNavbarVisible: (state) => state.ui.isNavbarVisible,
};

/* -------- Reducers ----------0 */
export const showNavbar = (state, action) => {
  return {
    ...state,
    isNavbarVisible: true,
  };
};

export const hideNavbar = (state, action) => {
  return {
    ...state,
    isNavbarVisible: false,
  };
};

export const addRef = (state, action) => {
  return {
    ...state,
    refs: {
      ...state.refs,
      [action.name]: action.ref,
    },
  };
};
/* -------- Hookup Reducers to Types -------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.SHOW_NAVBAR]: showNavbar,
  [Types.HIDE_NAVBAR]: hideNavbar,
  [Types.ADD_REF]: addRef,
});
