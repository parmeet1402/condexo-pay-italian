import { createReducer, createActions } from 'reduxsauce';
const { Types, Creators } = createActions({
  getPaymentsRequest: ['data'],
  getPaymentsSuccess: ['successResponse'],
  getPaymentsFailed: ['errorMessage'],
});

export const MyPaymentTypes = Types;
export default Creators;

// Initial state

export const INITIAL_STATE = {
  isLoading: false,
  successMessage: '',
  errorMessage: '',
  data: [],
};

// selectors
export const MyPaymentSelectors = {
  selectLoading: (state) => state.myPayments.isLoading,
  selectSuccessMessage: (state) => state.myPayments.successMessage,
  selectErrorMessage: (state) => state.myPayments.errorMessage,
  selectData: (state) => state.myPayments.data,
};

// reducers
export const getPaymentsRequest = (state) => {
  return {
    ...state,
    isLoading: true,
    successMessage: '',
    errorMessage: '',
    data: [],
  };
};

export const getPaymentsSuccess = (state, { successResponse }) => {
  return {
    ...state,
    isLoading: false,
    data: successResponse.data,
    successMessage: successResponse.message,
    errorMessage: '',
  };
};
export const getPaymentsFailed = (state, { errorMessage }) => {
  return {
    ...state,
    isLoading: false,
    successMessage: '',
    errorMessage,
  };
};

// Hookup Reducer to types
export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_PAYMENTS_REQUEST]: getPaymentsRequest,
  [Types.GET_PAYMENTS_SUCCESS]: getPaymentsSuccess,
  [Types.GET_PAYMENTS_FAILED]: getPaymentsFailed,
});
