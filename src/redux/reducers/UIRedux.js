import { createReducer, createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
  showNavbar: null,
  hideNavbar: null,
  addRef: ['name', 'ref'],
  showNavbarLinks: null,
  hideNavbarLinks: null,
});

export const AuthTypes = Types;
export default Creators;

/* ------- Initial State --------- */
export const INITIAL_STATE = {
  isNavbarVisible: false,
  refs: {},
  isNavbarLinksVisible: true,
};

/* ------- Selectors --------- */
export const UISelectors = {
  selectIsNavbarVisible: (state) => state.ui.isNavbarVisible,
  selectIsNavbarLinksVisible: (state) => state.ui.isNavbarLinksVisible,
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

export const showNavbarLinks = (state, action) => ({
  ...state,
  isNavbarLinksVisible: true,
});

export const hideNavbarLinks = (state, action) =>
  console.log('HIDE NAVBAR Called', action) || {
    ...state,
    isNavbarLinksVisible: false,
  };

/* -------- Hookup Reducers to Types -------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.SHOW_NAVBAR]: showNavbar,
  [Types.HIDE_NAVBAR]: hideNavbar,
  [Types.ADD_REF]: addRef,
  [Types.SHOW_NAVBAR_LINKS]: showNavbarLinks,
  [Types.HIDE_NAVBAR_LINKS]: hideNavbarLinks,
});
