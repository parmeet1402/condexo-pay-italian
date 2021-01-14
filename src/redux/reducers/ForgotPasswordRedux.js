import { createReducer, createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
  verifyUsernameAndSendForgotPasswordOtpRequest: ['email'],
  verifyUsernameAndSendForgotPasswordOtpSuccess: ['successResponse'],
  verifyUsernameAndSendForgotPasswordOtpFailed: ['errorMessage'],
  verifyForgotPasswordOtpRequest: ['otp'],
  verifyForgotPasswordOtpSuccess: ['successMessage'],
  verifyForgotPasswordOtpFailed: ['errorMessage'],
  sendResetPasswordLinkRequest: ['username'],
  sendResetPasswordLinkSuccess: ['successMessage'],
  sendResetPasswordLinkFailed: ['errorMessage'],
  sendOtpRequestFP: null,
  sendOtpSuccessFP: ['successMessage'],
  sendOtpFailedFP: ['errorMessage'],
  clearMessages: null,
  updatePasswordRequest: ['password', 'confirmPassword', 'forgotPwdToken'],
  updatePasswordSuccess: ['successMessage'],
  updatePasswordFailed: ['errorMessage'],
  verifyTokenRequest: ['username', 'forgotPwdToken'],
  verifyTokenSuccess: ['successMessage'],
  verifyTokenFailed: ['errorMessage'],
});

export const ForgotPasswordTypes = Types;
export default Creators;

/* ------- Initial State --------- */
export const INITIAL_STATE = {
  email: '',
  successMessage: '',
  errorMessage: '',
  otp: '',
  isLoading: false,
  isOtpVerified: false,
  isUpdated: false,
  isTokenValid: true,
  password: '',
  confirmPassword: '',
  forgotPwdToken: '',
  phoneNumber: '',
  countryCode: '',
};

/* ------- Selectors --------- */
export const ForgotPasswordSelectors = {
  selectUsername: (state) => state.forgotPassword.email,
  selectSuccessMessage: (state) => state.forgotPassword.successMessage,
  selectErrorMessage: (state) => state.forgotPassword.errorMessage,
  selectIsLoading: (state) => state.forgotPassword.isLoading,
  selectIsOtpVerified: (state) => state.forgotPassword.isOtpVerified,
  selectIsUpdated: (state) => state.forgotPassword.isUpdated,
  selectIsTokenValid: (state) => state.forgotPassword.isTokenValid,
  selectPhoneNumber: (state) => state.forgotPassword.phoneNumber,
  selectCountryCode: (state) => state.forgotPassword.countryCode,
};

/* -------- Reducers ----------0 */
export const sendResetPasswordLinkRequest = (state, action) => ({
  ...state,
  errorMessage: '',
  successMessage: '',
  isLoading: true,
});
export const sendResetPasswordLinkSuccess = (state, { successMessage }) => ({
  ...state,
  errorMessage: '',
  successMessage,
  isLoading: false,
});
export const sendResetPasswordLinkFailed = (state, { errorMessage }) => ({
  ...state,
  successMessage: '',
  errorMessage,
  isLoading: false,
});

export const verifyUsernameAndSendForgotPasswordOtpRequest = (
  state,
  { email }
) => ({
  ...state,
  errorMessage: '',
  successMessage: '',
  isLoading: true,
  email,
});

export const verifyUsernameAndSendForgotPasswordOtpSuccess = (
  state,
  { successResponse }
) => ({
  ...state,
  errorMessage: '',
  isLoading: false,
  successMessage: successResponse.message,
  phoneNumber: successResponse.data.phoneNumber,
  countryCode: successResponse.data.countryCode,
});

export const verifyUsernameAndSendForgotPasswordOtpFailed = (
  state,
  { errorMessage }
) => ({
  ...state,
  successMessage: '',
  isLoading: false,
  errorMessage,
});

export const sendForgotPasswordOtpRequest = (state, action) => ({
  ...state,
  errorMessage: '',
  successMessage: '',
  isLoading: true,
  isOtpVerified: false,
});

export const sendForgotPasswordOtpSuccess = (state, { successMessage }) => ({
  ...state,
  errorMessage: '',
  isLoading: false,
  successMessage,
  isOtpVerified: true,
});

export const sendForgotPasswordOtpFailed = (state, { errorMessage }) => ({
  ...state,
  successMessage: '',
  isLoading: false,
  errorMessage,
  isOtpVerified: false,
});

export const verifyForgotPasswordOtpRequest = (state, { otp }) => ({
  ...state,
  errorMessage: '',
  successMessage: '',
  isLoading: true,
  otp,
});

export const verifyForgotPasswordOtpSuccess = (state, { successMessage }) => ({
  ...state,
  errorMessage: '',
  isLoading: false,
  successMessage,
});

export const verifyForgotPasswordOtpFailed = (state, { errorMessage }) => ({
  ...state,
  successMessage: '',
  isLoading: false,
  errorMessage,
});

export const clearMessages = (state, action) => ({
  ...state,
  successMessage: '',
  errorMessage: '',
});

export const sendOtpRequestFP = (state, action) => ({
  ...state,
  errorMessage: '',
  successMessage: '',
  isLoading: true,
});

export const sendOtpSuccessFP = (state, { successMessage }) => ({
  ...state,
  successMessage,
  errorMessage: '',
  isLoading: false,
});

export const sendOtpFailedFP = (state, { errorMessage }) => ({
  ...state,
  errorMessage: errorMessage,
  successMessage: '',
  isLoading: false,
});

export const updatePasswordRequest = (
  state,
  { password, confirmPassword, forgotPwdToken }
) => ({
  ...state,
  errorMessage: '',
  successMessage: '',
  isLoading: true,
  password,
  isUpdated: false,
  confirmPassword,
  forgotPwdToken,
});

export const updatePasswordSuccess = (state, { successMessage }) => ({
  ...state,
  errorMessage: '',
  successMessage,
  isLoading: false,
  isUpdated: true,
  password: '',
  confirmPassword: '',
  forgotPwdToken: '',
});

export const updatePasswordFailed = (state, { errorMessage }) => ({
  ...state,
  errorMessage,
  successMessage: '',
  isLoading: false,
  isUpdated: false,
  password: '',
  confirmPassword: '',
  forgotPwdToken: '',
});

export const verifyTokenRequest = (state, { forgotPwdToken, username }) => ({
  ...state,
  isLoading: true,
  errorMessage: '',
  successMessage: '',
  forgotPwdToken,
  platform: 'uk',
  email: username,
  isTokenValid: true,
});

export const verifyTokenSuccess = (state, { successMessage }) => ({
  ...state,
  isLoading: false,
  errorMessage: '',
  successMessage,
  isTokenValid: true,
});
export const verifyTokenFailed = (state, { errorMessage }) => ({
  ...state,
  isLoading: false,
  errorMessage,
  successMessage: '',
  isTokenValid: false,
});

/* -------- Hookup Reducers to Types -------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.VERIFY_USERNAME_AND_SEND_FORGOT_PASSWORD_OTP_REQUEST]: verifyUsernameAndSendForgotPasswordOtpRequest,
  [Types.VERIFY_USERNAME_AND_SEND_FORGOT_PASSWORD_OTP_SUCCESS]: verifyUsernameAndSendForgotPasswordOtpSuccess,
  [Types.VERIFY_USERNAME_AND_SEND_FORGOT_PASSWORD_OTP_FAILED]: verifyUsernameAndSendForgotPasswordOtpFailed,
  [Types.VERIFY_FORGOT_PASSWORD_OTP_REQUEST]: verifyForgotPasswordOtpRequest,
  [Types.VERIFY_FORGOT_PASSWORD_OTP_SUCCESS]: verifyForgotPasswordOtpSuccess,
  [Types.VERIFY_FORGOT_PASSWORD_OTP_FAILED]: verifyForgotPasswordOtpFailed,
  [Types.CLEAR_MESSAGES]: clearMessages,
  [Types.SEND_OTP_REQUEST_FP]: sendOtpRequestFP,
  [Types.SEND_OTP_SUCCESS_FP]: sendOtpSuccessFP,
  [Types.SEND_OTP_FAILED_FP]: sendOtpFailedFP,
  [Types.SEND_RESET_PASSWORD_LINK_REQUEST]: sendResetPasswordLinkRequest,
  [Types.SEND_RESET_PASSWORD_LINK_SUCCESS]: sendResetPasswordLinkSuccess,
  [Types.SEND_RESET_PASSWORD_LINK_FAILED]: sendResetPasswordLinkFailed,
  [Types.UPDATE_PASSWORD_REQUEST]: updatePasswordRequest,
  [Types.UPDATE_PASSWORD_SUCCESS]: updatePasswordSuccess,
  [Types.UPDATE_PASSWORD_FAILED]: updatePasswordFailed,
  [Types.VERIFY_TOKEN_REQUEST]: verifyTokenRequest,
  [Types.VERIFY_TOKEN_SUCCESS]: verifyTokenSuccess,
  [Types.VERIFY_TOKEN_FAILED]: verifyTokenFailed,
});
