import { createReducer, createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
  setFormData: ['formData'],
  checkUsernameRequest: ['username'],
  checkUsernameSuccess: ['successMessage'],
  checkUsernameFailed: ['errorMessage'],
  completeRegistrationRequest: null,
  completeRegistrationSuccess: ['otp'],
  completeRegistrationFailed: ['otp'],
  uploadDocumentRequest: ['document'],
  uploadDocumentSuccess: ['successResponse'],
  uploadDocumentFailed: ['errorMessage'],
  sendOtpRequest: ['otp'],
  sendOtpSuccess: ['otp'],
  sendOtpFailed: ['otp'],
  verifyOtpRequest: ['otp'],
  verifyOtpSuccess: ['otp'],
  verifyOtpFailed: ['otp'],
  clearOtpMessage: ['otp'],
  clearMessages: null
});

export const RegisterTypes = Types;
export default Creators;

/* ------- Initial State --------- */
export const INITIAL_STATE = {
  formData: {
    username: 'condex@mailinator.com',
    password: 'Classic@123',
    confirmPassword: 'Classic@123',
    name: 'test',
    nameOnCard: 'test',
    expiryDate: 'test',
    cardNumber: 'test',
    stripeToken: 'test',
    photoId: 'adsf.jpg'
  },
  otp: {},
  document: null,
  username: '',
  successMessage: '',
  errorMessage: '',
  isLoading: false
};

/* ------- Selectors --------- */
export const RegisterSelectors = {
  selectFormData: state => state.register.formData,
  selectDocument: state => state.register.document,
  selectOtp: state => state.register.otp,
  selectIsLoading: state => state.register.isLoading,
  selectFileName: state => state.register.filename,
  selectSuccessMessage: state => state.register.successMessage,
  selectErrorMessage: state => state.register.ErrorMessage,
  selectIsCompleting: state => state.register.isCompleting,
  selectIsCompleted: state => state.register.isCompleted
};

/* -------- Reducers ----------0 */
export const setFormData = (state, { formData }) => ({
  ...state,
  formData: { ...state.formData, ...formData }
});

export const clearMessages = (state, action) => ({
  ...state,
  errorMessage: '',
  successMessage: ''
});

export const checkUsernameRequest = (state, { username }) => ({
  ...state,
  username,
  errorMessage: '',
  successMessage: '',
  isLoading: true
});

export const checkUsernameSuccess = (state, { successMessage }) => ({
  ...state,
  errorMessage: '',
  successMessage,
  isLoading: false
});

export const checkUsernameFailed = (state, { errorMessage }) => ({
  ...state,
  successMessage: '',
  errorMessage,
  isLoading: false
});

export const uploadDocumentRequest = (state, { document }) => ({
  ...state,
  document,
  successMessage: '',
  errorMessage: '',
  filename: '',
  isLoading: true
});
export const uploadDocumentSuccess = (state, { successResponse }) => ({
  ...state,
  document: null,
  filename: successResponse.filename,
  successMessage: successResponse.message,
  errorMessage: '',
  isLoading: false
});

export const uploadDocumentFailed = (state, { errorMessage }) => ({
  ...state,
  document: {},
  successMessage: '',
  errorMessage,
  isLoading: false
});

export const sendOtpRequest = state => ({
  ...state,
  otp: {
    ...state.otp,
    status: '',
    isLoading: true,
    isLoaded: false
  }
});

export const sendOtpSuccess = (state, { otp }) => ({
  ...state,
  otp: {
    ...state.otp,
    status: 'success',
    isLoading: false,
    isLoaded: true,
    message: otp.message
  }
});

export const sendOtpFailed = (state, { otp }) => ({
  ...state,
  otp: {
    ...state.otp,
    status: 'warning',
    isLoading: false,
    isLoaded: false,
    message: otp.message
  }
});

export const verifyOtpRequest = (state, { inputOtp }) => ({
  ...state,
  otp: {
    ...state.otp,
    isVerifying: true,
    isVerified: false,
    inputOtp
  }
});

export const verifyOtpSuccess = (state, { otp }) => ({
  ...state,
  otp: {
    ...state.otp,
    status: 'success',
    isVerifying: false,
    isVerified: true,
    message: otp.message
  }
});

export const verifyOtpFailed = (state, { otp }) => ({
  ...state,
  otp: {
    ...state.otp,
    status: 'warning',
    isVerifying: false,
    isVerified: false,
    message: otp.message
  }
});

export const completeRegistrationRequest = (state, action) => ({
  ...state,
  isCompleting: true,
  isCompleted: false
});

export const completeRegistrationSuccess = (state, action) => ({
  ...state,
  isCompleting: false,
  isCompleted: true,
  otp: {
    ...state.otp,
    status: 'success'
  }
});

export const completeRegistrationFailed = (state, { otp }) => ({
  ...state,
  isCompleting: false,
  isCompleted: false,
  otp: {
    ...state.otp,
    status: 'warning',
    message: otp
  }
});

export const clearOtpMessage = (state, { otp }) => ({
  ...state,
  otp: {
    ...state.otp,
    status: '',
    message: ''
  }
});

/* -------- Hookup Reducers to Types -------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_FORM_DATA]: setFormData,
  [Types.CHECK_USERNAME_REQUEST]: checkUsernameRequest,
  [Types.CHECK_USERNAME_SUCCESS]: checkUsernameSuccess,
  [Types.CHECK_USERNAME_FAILED]: checkUsernameFailed,
  [Types.COMPLETE_REGISTRATION_REQUEST]: completeRegistrationRequest,
  [Types.COMPLETE_REGISTRATION_SUCCESS]: completeRegistrationSuccess,
  [Types.COMPLETE_REGISTRATION_FAILED]: completeRegistrationFailed,
  [Types.UPLOAD_DOCUMENT_REQUEST]: uploadDocumentRequest,
  [Types.UPLOAD_DOCUMENT_SUCCESS]: uploadDocumentSuccess,
  [Types.UPLOAD_DOCUMENT_FAILED]: uploadDocumentFailed,
  [Types.SEND_OTP_REQUEST]: sendOtpRequest,
  [Types.SEND_OTP_SUCCESS]: sendOtpSuccess,
  [Types.SEND_OTP_FAILED]: sendOtpFailed,
  [Types.VERIFY_OTP_REQUEST]: verifyOtpRequest,
  [Types.VERIFY_OTP_SUCCESS]: verifyOtpSuccess,
  [Types.VERIFY_OTP_FAILED]: verifyOtpFailed,
  [Types.CLEAR_OTP_MESSAGE]: clearOtpMessage,
  [Types.CLEAR_MESSAGES]: clearMessages
});
