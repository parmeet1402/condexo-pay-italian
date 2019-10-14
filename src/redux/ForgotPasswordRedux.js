import { createReducer, createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
  verifyUsernameAndSendForgotPasswordOtpRequest: ['username'],
  verifyUsernameAndSendForgotPasswordOtpSuccess: ['successMessage'],
  verifyUsernameAndSendForgotPasswordOtpFailed: ['errorMessage'],
  verifyForgotPasswordOtpRequest: ['otp'],
  verifyForgotPasswordOtpSuccess: ['successMessage'],
  verifyForgotPasswordOtpFailed: ['errorMessage']
  /* sendResetPasswordLinkRequest: ['username'],
  sendResetPasswordLinkSuccess: ['successMessage'],
  sendResetPasswordLinkFailed: ['errorMessage'], */
  /* sendOtpRequestFP: ["username"],
  sendOtpSuccessFP: ["successMessage"],
  sendOtpFailedFP: ["errorMessage"] */
});

export const ForgotPasswordTypes = Types;
export default Creators;

/* ------- Initial State --------- */
export const INITIAL_STATE = {
  username: 'condexos@mailinator.com',
  successMessage: '',
  errorMessage: '',
  otp: '',
  loading: false
};

/* ------- Selectors --------- */
export const ForgotPasswordSelectors = {
  selectUsername: state => state.forgotPassword.username,
  selectSuccessMessage: state => state.forgotPassword.successMessage,
  selectErrorMessage: state => state.forgotPassword.errorMessage,
  selectLoading: state => state.forgotPassword.loading
};

/* -------- Reducers ----------0 */
/* export const sendResetPasswordLinkRequest = (state, { username }) => {
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
  };
};
export const sendResetPasswordLinkFailed = (state, { errorMessage }) => {
  return {
    ...INITIAL_STATE,
    errorMessage,
  };
};
 */
export const verifyUsernameAndSendForgotPasswordOtpRequest = (
  state,
  { username }
) => ({
  ...state,
  errorMessage: '',
  successMessage: '',
  loading: true,
  username
});

export const verifyUsernameAndSendForgotPasswordOtpSuccess = (
  state,
  { successMessage }
) => ({
  ...state,
  errorMessage: '',
  loading: false,
  successMessage
});

export const verifyUsernameAndSendForgotPasswordOtpFailed = (
  state,
  { errorMessage }
) => ({
  ...state,
  successMessage: '',
  loading: false,
  errorMessage
});

export const sendForgotPasswordOtpRequest = (state, action) => ({
  ...state,
  errorMessage: '',
  successMessage: '',
  loading: true
});

export const sendForgotPasswordOtpSuccess = (state, { successMessage }) => ({
  ...state,
  errorMessage: '',
  loading: false,
  successMessage
});

export const sendForgotPasswordOtpFailed = (state, { errorMessage }) => ({
  ...state,
  successMessage: '',
  loading: false,
  errorMessage
});

export const verifyForgotPasswordOtpRequest = (state, { otp }) => ({
  ...state,
  errorMessage: '',
  successMessage: '',
  loading: true,
  otp
});

export const verifyForgotPasswordOtpSuccess = (state, { successMessage }) => ({
  ...state,
  errorMessage: '',
  loading: false,
  successMessage
});

export const verifyForgotPasswordOtpFailed = (state, { errorMessage }) => ({
  ...state,
  successMessage: '',
  loading: false,
  errorMessage
});

/* export const sendOtpRequestFP = (state, {username}) => ({
  ...state,
  errorMessage: '',
  successMessage: '',
  username
})

export const sendOtpSuccessFP = (state, {successMessage}) => ({
  ...state,
  successMessage,
})

export const sendOtpFailedFP = (state,{errorMessage}) => ({
  ...state,
  errorMessage
}) */

/* -------- Hookup Reducers to Types -------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.VERIFY_USERNAME_AND_SEND_FORGOT_PASSWORD_OTP_REQUEST]: verifyUsernameAndSendForgotPasswordOtpRequest,
  [Types.VERIFY_USERNAME_AND_SEND_FORGOT_PASSWORD_OTP_SUCCESS]: verifyUsernameAndSendForgotPasswordOtpSuccess,
  [Types.VERIFY_USERNAME_AND_SEND_FORGOT_PASSWORD_OTP_FAILED]: verifyUsernameAndSendForgotPasswordOtpFailed,
  [Types.VERIFY_FORGOT_PASSWORD_OTP_REQUEST]: verifyForgotPasswordOtpRequest,
  [Types.VERIFY_FORGOT_PASSWORD_OTP_SUCCESS]: verifyForgotPasswordOtpSuccess,
  [Types.VERIFY_FORGOT_PASSWORD_OTP_FAILED]: verifyForgotPasswordOtpFailed /*  [Types.SEND_OTP_REQUEST_FP]: sendOtpRequestFP,
  [Types.SEND_OTP_SUCCESS_FP]: sendOtpSuccessFP,
  [Types.SEND_OTP_FAILED_FP]: sendOtpFailedFP, */
  /* [Types.SEND_RESET_PASSWORD_LINK_REQUEST]: sendResetPasswordLinkRequest,
  [Types.SEND_RESET_PASSWORD_LINK_SUCCESS]: sendResetPasswordLinkSuccess,
  [Types.SEND_RESET_PASSWORD_LINK_FAILED]: sendResetPasswordLinkFailed,
 */
});
