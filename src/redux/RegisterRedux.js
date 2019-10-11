import { createReducer, createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
  setFormData: ['formData'],
  completeRegistrationRequest: [],
  completeRegistrationSuccess: [],
  completeRegistrationFailed: [],
  uploadDocumentRequest: ['document'],
  uploadDocumentSuccess: ['document'],
  uploadDocumentFailed: ['document'],
  sendOtpRequest: ['otp'],
  sendOtpSuccess: ['otp'],
  sendOtpFailed: ['otp'],
  verifyOtpRequest: ['otp'],
  verifyOtpSuccess: ['otp'],
  verifyOtpFailed: ['otp'],
  clearOtpMessage: ['otp']
});

export const RegisterTypes = Types;
export default Creators;

/* ------- Initial State --------- */
export const INITIAL_STATE = {
  formData: {
    username: 'condexos@mailinator.com',
    password: 'Classic@123',
    confirmPassword: 'Classic@123',
    name: 'test',
    nameOnCard: 'test',
    expiryDate: 'test',
    cardNumber: 'test',
    photoId: '1570607458087.jpg',
    stripeToken: 'test'
  },
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
      status: '',
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
      status: 'success',
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
      status: 'warning',
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
      status: '',
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
      status: 'success',
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
      status: 'warning',
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

export const verifyOtpSuccess = (state, { otp }) => {
  return {
    ...state,
    otp: {
      ...state.otp,
      status: 'success',
      isVerifying: false,
      isVerified: true,
      message: otp.message
    }
  };
};

export const verifyOtpFailed = (state, { otp }) => {
  return {
    ...state,
    otp: {
      ...state.otp,
      status: 'warning',
      isVerifying: false,
      isVerified: false,
      message: otp.errors.message
    }
  };
};

export const completeRegistrationRequest = (state, action) => {
  return {
    ...state,
    isCompleting: true,
    isCompleted: false
  };
};

export const completeRegistrationSuccess = (state, action) => {
  return {
    ...state,
    isCompleting: false,
    isCompleted: true
  };
};

export const completeRegistrationFailed = (state, action) => {
  return {
    ...state,
    isCompleting: false,
    isCompleted: false
  };
};

export const clearOtpMessage = (state, { otp }) => {
  return {
    ...state,
    otp: {
      ...state.otp,
      status: '',
      message: ''
    }
  };
};

/* -------- Hookup Reducers to Types -------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_FORM_DATA]: setFormData,
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
  [Types.CLEAR_OTP_MESSAGE]: clearOtpMessage
});
