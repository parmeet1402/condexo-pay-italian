import { createReducer, createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
  getProfileDetailsRequest: null,
  getProfileDetailsSuccess: ['data'],
  getProfileDetailsFailed: ['errorMessage'],
  updateProfileDetailsRequest: ['data'],
  updateProfileDetailsSuccess: ['successMessage'],
  updateProfileDetailsFailed: ['errorMessage'],
  changePasswordRequest: ['data'],
  changePasswordSuccess: ['successMessage'],
  changePasswordFailed: ['errorMessage'],
  deleteAccountRequest: ['feedback'],
  deleteAccountSuccess: ['successMessage'],
  deleteAccountFailed: ['errorMessage'],
  clearMyProfileMessages: null
});
export const MyProfileTypes = Types;
export default Creators;

/* ------- Initial State --------- */
export const INITIAL_STATE = {
  data: {},
  dataForUpdate: {},
  oldPassword: '',
  newPassword: '',
  confirmNewPassword: '',
  feedback: '',
  isAccountClosed: false,
  successMessage: '',
  errorMessage: '',
  isLoading: false
};

/* ------- Selectors --------- */
export const MyProfileSelectors = {
  selectProfile: state => state.myProfile.data,
  selectIsLoading: state => state.myProfile.isLoading,
  selectErrorMessage: state => state.myProfile.errorMessage,
  selectSuccessMessage: state => state.myProfile.successMessage,
  selectIsAccountClosed: state => state.myProfile.isAccountClosed
};

/* -------- Reducers ---------- */

export const getProfileDetailsRequest = (state, action) => {
  return {
    ...state,
    successMessage: '',
    errorMessage: '',
    isLoading: true
  };
};

export const getProfileDetailsSuccess = (state, { data }) => {
  return {
    ...state,
    data,
    isLoading: false
  };
};
export const getProfileDetailsFailed = (state, { errorMessage }) => {
  return {
    ...state,
    errorMessage,
    isLoading: false
  };
};

export const updateProfileDetailsRequest = (state, { data }) => {
  return {
    ...state,
    dataForUpdate: data,
    successMessage: '',
    errorMessage: '',
    isLoading: true
  };
};

export const updateProfileDetailsSuccess = (state, { successMessage }) => {
  return {
    ...state,
    dataForUpdate: {},
    successMessage,
    errorMessage: '',
    isLoading: false
  };
};

export const updateProfileDetailsFailed = (state, { errorMessage }) => {
  return {
    ...state,
    dataForUpdate: {},
    successMessage: '',
    errorMessage,
    isLoading: false
  };
};

export const changePasswordRequest = (state, { data }) => {
  return {
    ...state,
    ...data,
    successMessage: '',
    errorMessage: '',
    isLoading: true
  };
};

export const changePasswordSuccess = (state, { successMessage }) => {
  return {
    ...state,
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
    successMessage,
    errorMessage: '',
    isLoading: false
  };
};

export const changePasswordFailed = (state, { errorMessage }) => {
  return {
    ...state,
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
    successMessage: '',
    errorMessage,
    isLoading: false
  };
};

export const deleteAccountRequest = (state, { feedback }) => {
  return {
    ...state,
    feedback,
    successMessage: '',
    errorMessage: '',
    isLoading: true
  };
};

export const deleteAccountSuccess = (state, { successMessage }) => {
  return {
    ...state,
    feedback: '',
    successMessage,
    errorMessage: '',
    isLoading: true,
    isAccountClosed: true
  };
};

export const deleteAccountFailed = (state, { errorMessage }) => {
  return {
    ...state,
    feedback: '',
    successMessage: '',
    errorMessage: ''
  };
};

export const clearMyProfileMessages = (state, action) => ({
  ...state,
  successMessage: '',
  errorMessage: ''
});
/* -------- Hookup Reducers to Types -------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_PROFILE_DETAILS_REQUEST]: getProfileDetailsRequest,
  [Types.GET_PROFILE_DETAILS_SUCCESS]: getProfileDetailsSuccess,
  [Types.GET_PROFILE_DETAILS_FAILED]: getProfileDetailsFailed,
  [Types.UPDATE_PROFILE_DETAILS_REQUEST]: updateProfileDetailsRequest,
  [Types.UPDATE_PROFILE_DETAILS_SUCCESS]: updateProfileDetailsSuccess,
  [Types.UPDATE_PROFILE_DETAILS_FAILED]: updateProfileDetailsFailed,
  [Types.CHANGE_PASSWORD_REQUEST]: changePasswordRequest,
  [Types.CHANGE_PASSWORD_SUCCESS]: changePasswordSuccess,
  [Types.CHANGE_PASSWORD_FAILED]: changePasswordFailed,
  [Types.DELETE_ACCOUNT_REQUEST]: deleteAccountRequest,
  [Types.DELETE_ACCOUNT_SUCCESS]: deleteAccountSuccess,
  [Types.DELETE_ACCOUNT_FAILED]: deleteAccountFailed,
  [Types.CLEAR_MY_PROFILE_MESSAGES]: clearMyProfileMessages
});
