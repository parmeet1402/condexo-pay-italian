import { createReducer, createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
  getLatestPaymentRequest: null,
  getLatestPaymentSuccess: ['data'],
  getLatestPaymentFailed: ['errorMessage'],
});

export const DashboardTypes = Types;
export default Creators;

/* ------- Initial State --------- */
export const INITIAL_STATE = {
  isLoading: false,
  successMessage: '',
  errorMessage: '',
  data: [],
};

/* ------- Selectors --------- */
export const DashboardSelectors = {
  selectIsLoading: (state) => state.dashboard.isLoading,
  selectSuccessMessage: (state) => state.dashboard.successMessage,
  selectErrorMessage: (state) => state.dashboard.errorMessage,
  selectData: (state) => state.dashboard.data,
};

/* ------- Reducers --------- */
export const getLatestPaymentRequest = (state, action) => {
  return {
    ...state,
    isLoading: true,
    successMessage: '',
    errorMessage: '',
  };
};

export const getLatestPaymentSuccess = (state, { data }) => ({
  ...state,
  isLoading: false,
  errorMessage: '',
  data: data.data,
});

export const getLatestPaymentFailed = (state, { errorMessage }) => ({
  ...state,
  isLoading: false,
  successMessage: '',
  errorMessage,
});

/* -------- Hookup Reducers to Types -------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_LATEST_PAYMENT_REQUEST]: getLatestPaymentRequest,
  [Types.GET_LATEST_PAYMENT_SUCCESS]: getLatestPaymentSuccess,
  [Types.GET_LATEST_PAYMENT_FAILED]: getLatestPaymentFailed,
});
