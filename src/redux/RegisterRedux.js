import { createReducer, createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
  setFormData: ['formData'],
  uploadDocumentRequest: ['document'],
  uploadDocumentSuccess: ['document'],
  uploadDocumentFailed: ['document']
});

export const RegisterTypes = Types;
export default Creators;

/* ------- Initial State --------- */
export const INITIAL_STATE = {
  formData: {},
  document: {}
};

/* ------- Selectors --------- */
export const RegisterSelectors = {
  selectFormData: state => state.register.formData,
  selectDocument: state => state.register.document
};

/* -------- Reducers ---------- */
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

/* -------- Hookup Reducers to Types -------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_FORM_DATA]: setFormData,
  [Types.UPLOAD_DOCUMENT_REQUEST]: uploadDocumentRequest,
  [Types.UPLOAD_DOCUMENT_SUCCESS]: uploadDocumentSuccess,
  [Types.UPLOAD_DOCUMENT_FAILED]: uploadDocumentFailed
});
