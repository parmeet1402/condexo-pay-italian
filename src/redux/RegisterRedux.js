import { createReducer, createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
  setFormData: ['formData'],
  uploadDocumentRequest: ['document'],
  uploadDocumentSuccess: ['document'],
  uploadDocumentFailed: ['document'],
  sendOtpRequest: ['otp'],
  sendOtpSuccess: ['otp'],
  sendOtpFailed: ['otp'],
  verifyOtpRequest: ['otp'],
  verifyOtpSuccess: ['otp'],
  verifyOtpFailed: ['otp']
});

export const RegisterTypes = Types;
export default Creators;

/* ------- Initial State --------- */
export const INITIAL_STATE = {
  formData: { username: 'condexo@mailinator.com' },
  otp: {},
  document: {}
};

/* ------- Selectors --------- */
export const RegisterSelectors = {
  selectFormData: state => state.register.formData,
  selectDocument: state => state.register.document,
  selectOtp: state => state.register.otp
};

/* -------- Reducers ----------0 */
export const setFormData = (state, { formData }) => {
  return {
    ...state,
    formData: { ...state.formData, ...formData }
  };
};

export const uploadDocumentRequest = (state, { document }) => {
  return {
    ...state,
    document: {
      ...state.document,
      isUploading: true,
      isUploaded: false,
      hasErrors: false,
      message: '',
      document: document
    }
  };
};
export const uploadDocumentSuccess = (state, { document }) => {
  return {
    ...state,
    document: {
      ...state.document,
      isUploading: false,
      isUploaded: true,
      hasErrors: false,
      message: document.message,
      filename: document.fileResponse.document,
      document: {}
    }
  };
};

export const uploadDocumentFailed = (state, message) => {
  return {
    ...state,
    document: {
      ...state.document,
      isUploading: false,
      isUploaded: false,
      hasErrors: true,
      message: message.document
    }
  };
};

export const sendOtpRequest = state => {
  return {
    ...state,
    otp: {
      ...state.otp,
      isLoading: true,
      isLoaded: false
    }
  };
};

export const sendOtpSuccess = (state, { otp }) => {
  return {
    ...state,
    otp: {
      ...state.otp,
      isLoading: false,
      isLoaded: true,
      message: otp.message
    }
  };
};

export const sendOtpFailed = (state, { otp }) => {
  return {
    ...state,
    otp: {
      ...state.otp,
      isLoading: false,
      isLoaded: false,
      message: otp.message
    }
  };
};

export const verifyOtpRequest = (state, { inputOtp }) => {
  return {
    ...state,
    otp: {
      ...state.otp,
      isVerifying: true,
      isVerified: false,
      inputOtp
    }
  };
};

export const verifyOtpSuccess = (state, { message }) => {
  return {
    ...state,
    otp: {
      ...state.otp,
      isVerifying: true,
      isVerified: false,
      message: message
    }
  };
};

export const verifyOtpFailed = (state, { message }) => {
  return {
    ...state,
    otp: {
      ...state.otp,
      isVerifying: false,
      isVerified: false,
      message: message
    }
  };
};

/* -------- Hookup Reducers to Types -------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_FORM_DATA]: setFormData,
  [Types.UPLOAD_DOCUMENT_REQUEST]: uploadDocumentRequest,
  [Types.UPLOAD_DOCUMENT_SUCCESS]: uploadDocumentSuccess,
  [Types.UPLOAD_DOCUMENT_FAILED]: uploadDocumentFailed,
  [Types.SEND_OTP_REQUEST]: sendOtpRequest,
  [Types.SEND_OTP_SUCCESS]: sendOtpSuccess,
  [Types.SEND_OTP_FAILED]: sendOtpFailed,
  [Types.VERIFY_OTP_REQUEST]: verifyOtpRequest,
  [Types.VERIFY_OTP_SUCCESS]: verifyOtpSuccess,
  [Types.VERIFY_OTP_FAILED]: verifyOtpFailed
});
