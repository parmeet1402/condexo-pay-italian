import { createReducer, createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
  setFormData: ['formData'],
  /* checkUsernameRequest: ['username'],
  checkUsernameSuccess: ['successMessage'],
  checkUsernameFailed: ['errorMessage'], */
  completeRegistrationRequest: null,
  completeRegistrationSuccess: ['otp'],
  completeRegistrationFailed: ['otp'],
  sendOtpRequest: ['otp'],
  sendOtpSuccess: ['otp'],
  sendOtpFailed: ['otp'],
  verifyOtpRequest: ['otp'],
  verifyOtpSuccess: ['otp'],
  verifyOtpFailed: ['otp'],
  clearOtpMessage: ['otp'],
  clearMessages: null,
  getCountryCodesRequest: null,
  getCountryCodesSuccess: ['countryCodes'],
  getCountryCodesFailed: ['errorMessage']
});

export const RegisterTypes = Types;
export default Creators;

/* ------- Initial State --------- */
export const INITIAL_STATE = {
  formData: {
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    surname: '',
    countryCode: '',
    phoneNumber: '',
    address: '',
    city: '',
    district: '',
    postalCode: ''
    /* email: 'parmeet@mailinator.com',
    password: 'Lolexa123,',
    confirmPassword: 'Lolexa123,',
    name: 'Parmeet',
    surname: 'Asija',
    countryCode: '+91',
    phoneNumber: '7009028471',
    address: '122-B',
    city: 'LDH',
    district: 'LDH',
    postalCode: '65465',
     */
  },
  countryCodes: [],
  otp: {},
  username: '',
  successMessage: '',
  errorMessage: '',
  isLoading: false
};

/* ------- Selectors --------- */
export const RegisterSelectors = {
  selectFormData: state => state.register.formData,
  selectCountryCodes: state => state.register.countryCodes,
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

/* export const checkUsernameRequest = (state, { username }) => ({
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
}); */
export const getCountryCodesRequest = state => ({
  ...state,
  isLoading: true
});
export const getCountryCodesSuccess = (state, { countryCodes }) => ({
  ...state,
  countryCodes
});
export const getCountryCodesFailed = (state, { errorMessage }) => ({
  ...state,
  errorMessage
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
  [Types.CLEAR_OTP_MESSAGE]: clearOtpMessage,
  [Types.CLEAR_MESSAGES]: clearMessages,
  /* [Types.CHECK_USERNAME_REQUEST]: checkUsernameRequest,
  [Types.CHECK_USERNAME_SUCCESS]: checkUsernameSuccess,
  [Types.CHECK_USERNAME_FAILED]: checkUsernameFailed, */
  [Types.GET_COUNTRY_CODES_REQUEST]: getCountryCodesRequest,
  [Types.GET_COUNTRY_CODES_SUCCESS]: getCountryCodesSuccess,
  [Types.GET_COUNTRY_CODES_FAILED]: getCountryCodesFailed,
  [Types.SEND_OTP_REQUEST]: sendOtpRequest,
  [Types.SEND_OTP_SUCCESS]: sendOtpSuccess,
  [Types.SEND_OTP_FAILED]: sendOtpFailed,
  [Types.VERIFY_OTP_REQUEST]: verifyOtpRequest,
  [Types.VERIFY_OTP_SUCCESS]: verifyOtpSuccess,
  [Types.VERIFY_OTP_FAILED]: verifyOtpFailed,
  [Types.COMPLETE_REGISTRATION_REQUEST]: completeRegistrationRequest,
  [Types.COMPLETE_REGISTRATION_SUCCESS]: completeRegistrationSuccess,
  [Types.COMPLETE_REGISTRATION_FAILED]: completeRegistrationFailed
});
