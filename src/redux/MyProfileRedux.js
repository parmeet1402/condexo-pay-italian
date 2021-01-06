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
  clearMyProfileMessages: null,
  getProfileCardsRequest: null,
  getProfileCardsSuccess: ['cards', 'successMessage'],
  getProfileCardsFailed: ['errorMessage'],
  updateProfileCardStatusRequest: ['cardId', 'status'],
  updateProfileCardStatusSuccess: ['successMessage'],
  updateProfileCardStatusFailed: ['errorMessage'],
  updateProfileCardDetailsRequest: ['data'],
  updateProfileCardDetailsSuccess: ['successMessage'],
  updateProfileCardDetailsFailed: ['errorMessage'],
  deleteProfileCardRequest: ['data'],
  deleteProfileCardSuccess: ['successMessage'],
  deleteProfileCardFailed: ['errorMessage'],
  addProfileCardRequest: ['data'],
  addProfileCardSuccess: ['successMessage'],
  addProfileCardFailed: ['errorMessage'],
  setDataForRedirectionAfterLogin: ['email'],
  resetDataForRedirectionAfterLogin: null,
});
export const MyProfileTypes = Types;
export default Creators;

/* ------- Initial State --------- */
export const INITIAL_STATE = {
  data: {},
  dataForUpdate: {},
  cards: [],
  oldPassword: '',
  newPassword: '',
  confirmNewPassword: '',
  feedback: '',
  isAccountClosed: false,
  successMessage: '',
  errorMessage: '',
  isLoading: false,
  isRedirectToPaymentsRequested: false,
  emailUsedForPurchasing: '',
};

/* ------- Selectors --------- */
export const MyProfileSelectors = {
  selectProfile: (state) => state.myProfile.data,
  selectIsLoading: (state) => state.myProfile.isLoading,
  selectErrorMessage: (state) => state.myProfile.errorMessage,
  selectSuccessMessage: (state) => state.myProfile.successMessage,
  selectIsAccountClosed: (state) => state.myProfile.isAccountClosed,
  selectCards: (state) => state.myProfile.cards,
  selectIsRedirectToPaymentsRequested: (state) =>
    state.myProfile.isRedirectToPaymentsRequested,

  selectEmailUsedForPurchasing: (state) =>
    state.myProfile.emailUsedForPurchasing,
};

/* -------- Reducers ---------- */

export const getProfileDetailsRequest = (state, action) => {
  return {
    ...state,
    successMessage: '',
    errorMessage: '',
    isLoading: true,
  };
};

export const getProfileDetailsSuccess = (state, { data }) => {
  return {
    ...state,
    data,
    isLoading: false,
  };
};
export const getProfileDetailsFailed = (state, { errorMessage }) => {
  return {
    ...state,
    errorMessage,
    isLoading: false,
  };
};

export const updateProfileDetailsRequest = (state, { data }) => {
  return {
    ...state,
    dataForUpdate: data,
    successMessage: '',
    errorMessage: '',
    isLoading: true,
  };
};

export const updateProfileDetailsSuccess = (state, { successMessage }) => {
  return {
    ...state,
    dataForUpdate: {},
    successMessage,
    errorMessage: '',
    isLoading: false,
  };
};

export const updateProfileDetailsFailed = (state, { errorMessage }) => {
  return {
    ...state,
    dataForUpdate: {},
    successMessage: '',
    errorMessage,
    isLoading: false,
  };
};

export const changePasswordRequest = (state, { data }) => {
  return {
    ...state,
    ...data,
    successMessage: '',
    errorMessage: '',
    isLoading: true,
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
    isLoading: false,
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
    isLoading: false,
  };
};

export const deleteAccountRequest = (state, { feedback }) => {
  return {
    ...state,
    feedback,
    successMessage: '',
    errorMessage: '',
    isLoading: true,
  };
};

export const deleteAccountSuccess = (state, { successMessage }) => {
  return {
    ...state,
    feedback: '',
    successMessage,
    errorMessage: '',
    isLoading: true,
    isAccountClosed: true,
  };
};

export const deleteAccountFailed = (state, { errorMessage }) => {
  return {
    ...state,
    feedback: '',
    successMessage: '',
    errorMessage: '',
  };
};

export const clearMyProfileMessages = (state, action) => ({
  ...state,
  successMessage: '',
  errorMessage: '',
});

export const getProfileCardsRequest = (state) => ({
  ...state,
  isLoading: true,
  successMessage: '',
  errorMessage: '',
});

export const getProfileCardsSuccess = (state, { cards }) => ({
  ...state,
  cards,
  isLoading: false,
  successMessage: '',
  errorMessage: '',
});

export const getProfileCardsFailed = (state, { errorMessage }) => ({
  ...state,
  isLoading: false,
  successMessage: '',
  errorMessage,
});

export const updateProfileCardStatusRequest = (state, action) => ({
  ...state,
  isLoading: true,
  successMessage: '',
  errorMessage: '',
});
export const updateProfileCardStatusSuccess = (state, { successMessage }) => ({
  ...state,
  isLoading: false,
  successMessage,
  errorMessage: '',
});
export const updateProfileCardStatusFailed = (state, { errorMessage }) => ({
  ...state,
  isLoading: false,
  successMessage: '',
  errorMessage,
});

export const updateProfileCardDetailsRequest = (state) => ({
  ...state,
  isLoading: true,
  successMessage: '',
  errorMessage: '',
});

export const updateProfileCardDetailsSuccess = (state, { successMessage }) => ({
  ...state,
  isLoading: false,
  successMessage,
  errorMessage: '',
});

export const updateProfileCardDetailsFailed = (state, { errorMessage }) => ({
  ...state,
  isLoading: false,
  successMessage: '',
  errorMessage,
});

export const deleteProfileCardRequest = (state) => ({
  ...state,
  isLoading: true,
  successMessage: '',
  errorMessage: '',
});

export const deleteProfileCardSuccess = (state, { successMessage }) => ({
  ...state,
  isLoading: false,
  successMessage,
  errorMessage: '',
});

export const deleteProfileCardFailed = (state, { errorMessage }) => ({
  ...state,
  isLoading: false,
  successMessage: '',
  errorMessage,
});

export const addProfileCardRequest = (state) => ({
  ...state,
  isLoading: true,
  successMessage: '',
  errorMessage: '',
});

export const addProfileCardSuccess = (state, { successMessage }) => ({
  ...state,
  isLoading: false,
  successMessage: 'Carta aggiunta',
  errorMessage: '',
});

export const addProfileCardFailed = (state, { errorMessage }) => ({
  ...state,
  isLoading: false,
  successMessage: '',
  errorMessage,
});

export const setDataForRedirectionAfterLogin = (state, { email }) => ({
  ...state,
  isRedirectToPaymentsRequested: true,
  emailUsedForPurchasing: email,
});

export const resetDataForRedirectionAfterLogin = (state) => ({
  ...state,
  isRedirectToPaymentsRequested: false,
  emailUsedForPurchasing: '',
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
  [Types.CLEAR_MY_PROFILE_MESSAGES]: clearMyProfileMessages,
  [Types.GET_PROFILE_CARDS_REQUEST]: getProfileCardsRequest,
  [Types.GET_PROFILE_CARDS_SUCCESS]: getProfileCardsSuccess,
  [Types.GET_PROFILE_CARDS_FAILED]: getProfileCardsFailed,
  [Types.UPDATE_PROFILE_CARD_STATUS_REQUEST]: updateProfileCardStatusRequest,
  [Types.UPDATE_PROFILE_CARD_STATUS_SUCCESS]: updateProfileCardStatusSuccess,
  [Types.UPDATE_PROFILE_CARD_STATUS_FAILED]: updateProfileCardStatusFailed,
  [Types.UPDATE_PROFILE_CARD_DETAILS_REQUEST]: updateProfileCardDetailsRequest,
  [Types.UPDATE_PROFILE_CARD_DETAILS_SUCCESS]: updateProfileCardDetailsSuccess,
  [Types.UPDATE_PROFILE_CARD_DETAILS_FAILED]: updateProfileCardDetailsFailed,
  [Types.DELETE_PROFILE_CARD_REQUEST]: deleteProfileCardRequest,
  [Types.DELETE_PROFILE_CARD_SUCCESS]: deleteProfileCardSuccess,
  [Types.DELETE_PROFILE_CARD_FAILED]: deleteProfileCardFailed,
  [Types.ADD_PROFILE_CARD_REQUEST]: addProfileCardRequest,
  [Types.ADD_PROFILE_CARD_SUCCESS]: addProfileCardSuccess,
  [Types.ADD_PROFILE_CARD_FAILED]: addProfileCardFailed,
  [Types.SET_DATA_FOR_REDIRECTION_AFTER_LOGIN]: setDataForRedirectionAfterLogin,
  [Types.RESET_DATA_FOR_REDIRECTION_AFTER_LOGIN]: resetDataForRedirectionAfterLogin,
});
