import { createReducer, createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
  sendResetPasswordLinkRequest: ['username'],
  sendResetPasswordLinkSuccess: ['successMessage'],
  sendResetPasswordLinkFailed: ['errorMessage']
});

export const ForgotPasswordTypes = Types;
export default Creators;

/* ------- Initial State --------- */
export const INITIAL_STATE = {
  username: '',
  successMessage: '',
  errorMessage: '',
  status: ''
};

/* ------- Selectors --------- */
export const ForgotPasswordSelectors = {
  selectUsername: state => state.forgotPassword.username,
  selectStatus: state => state.forgotPassword.status
};

/* -------- Reducers ----------0 */
export const sendResetPasswordLinkRequest = (state, { username }) => {
  return {
    ...state,
    errorMessage: '',
    successMessage: '',
    username
  };
};
export const sendResetPasswordLinkSuccess = (state, { successMessage }) => {
  return {
    ...state,
    errorMessage: '',
    successMessage,
    status: 'success'
  };
};

export const sendResetPasswordLinkFailed = (state, { errorMessage }) => {
  return {
    ...INITIAL_STATE,
    errorMessage,
    status: 'warning'
  };
};

/* -------- Hookup Reducers to Types -------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.SEND_RESET_PASSWORD_LINK_REQUEST]: sendResetPasswordLinkRequest,
  [Types.SEND_RESET_PASSWORD_LINK_SUCCESS]: sendResetPasswordLinkSuccess,
  [Types.SEND_RESET_PASSWORD_LINK_FAILED]: sendResetPasswordLinkFailed
});
