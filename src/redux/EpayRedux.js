import { createActions, createReducer } from 'reduxsauce';

const { Types, Creators } = createActions({
  getBrandsRequest: null,
  getBrandsSuccess: ['brands'],
  getBrandsFailed: ['message'],
  clearMessages: null,
  getCardsRequest: null,
  getCardsSuccess: ['cards'],
  getCardsFailed: ['message'],
  mobileTopupRequest: ['data'],
  mobileTopupSuccess: ['user'],
  mobileTopupFailed: ['message'],
  clearReserveTransId: null,
  addCardAndPayRequest: ['data', 'recharge'],
  addCardAndPayFailed: ['message'],
  payRechargeRequest: ['data'],
  payRechargeSuccess: null,
  payRechargeFailed: ['message'],
  deleteCardRequest: ['data'],
  deleteCardFailed: ['message'],
  clearRechargeStatus: null,
});

export const EpayTypes = Types;
export default Creators;

// Initial State
export const INITIAL_STATE = {
  isLoading: false,
  error: null,
  brands: null,
  cards: null,
  reserveTransactionId: null,
  rechargeStatus: null,
  baseAmount: 0,
};

// Selectors
export const EpaySelectors = {
  selectIsLoading: (state) => state.epay.isLoading,
  selectError: (state) => state.epay.error,
  selectBrands: (state) => state.epay.brands,
  selectCards: (state) => state.epay.cards,
  selectReserveTransactionId: (state) => state.epay.reserveTransactionId,
  selectAddCardForm: (state) => state.epay.addCardForm,
  selectRechargeStatus: (state) => state.epay.rechargeStatus,
  selectBaseAmount: (state) => state.epay.baseAmount,
};

// Reducers
export const getBrandsRequest = (state) => ({
  ...state,
  isLoading: true,
  error: null,
});

export const getBrandsSuccess = (state, { brands }) => ({
  ...state,
  brands,
  isLoading: false,
  error: null,
});

export const getBrandsFailed = (state, { message }) => ({
  ...state,
  error: message,
  isLoading: false,
});

export const clearMessages = (state) => ({
  ...state,
  error: null,
});

export const getCardsRequest = (state) => ({
  ...state,
  isLoading: true,
  error: null,
});

export const getCardsSuccess = (state, { cards }) => ({
  ...state,
  cards,
  isLoading: false,
  error: null,
});

export const getCardsFailed = (state, { message }) => ({
  ...state,
  error: message,
  isLoading: false,
});

export const mobileTopupRequest = (state, { data }) => ({
  ...state,
  isLoading: true,
  error: null,
  baseAmount: data.amount,
});

export const mobileTopupSuccess = (state, { user }) => ({
  ...state,
  reserveTransactionId: user.reserveTransactionId,
  isLoading: false,
  error: null,
});

export const mobileTopupFailed = (state, { message }) => ({
  ...state,
  error: message,
  isLoading: false,
});

export const clearReserveTransId = (state) => ({
  ...state,
  reserveTransactionId: null,
});

export const addCardAndPayRequest = (state) => ({
  ...state,
  isLoading: true,
  error: null,
});

export const addCardAndPayFailed = (state, { message }) => ({
  ...state,
  error: message,
  isLoading: false,
});

export const payRechargeRequest = (state) => ({
  ...state,
  isLoading: true,
  error: null,
});

export const payRechargeSuccess = (state) => ({
  ...state,
  isLoading: false,
  rechargeStatus: 'success',
});

export const payRechargeFailed = (state, { message }) => ({
  ...state,
  isLoading: false,
  rechargeStatus: 'failed',
  error: message,
});

export const deleteCardRequest = (state) => ({
  ...state,
  isLoading: true,
  error: null,
});

export const deleteCardFailed = (state, { message }) => ({
  ...state,
  isLoading: false,
  error: message,
});

export const clearRechargeStatus = (state) => ({
  ...state,
  rechargeStatus: null,
});

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_BRANDS_REQUEST]: getBrandsRequest,
  [Types.GET_BRANDS_SUCCESS]: getBrandsSuccess,
  [Types.GET_BRANDS_FAILED]: getBrandsFailed,
  [Types.CLEAR_MESSAGES]: clearMessages,
  [Types.GET_CARDS_REQUEST]: getCardsRequest,
  [Types.GET_CARDS_SUCCESS]: getCardsSuccess,
  [Types.GET_CARDS_FAILED]: getCardsFailed,
  [Types.MOBILE_TOPUP_REQUEST]: mobileTopupRequest,
  [Types.MOBILE_TOPUP_SUCCESS]: mobileTopupSuccess,
  [Types.MOBILE_TOPUP_FAILED]: mobileTopupFailed,
  [Types.CLEAR_RESERVE_TRANS_ID]: clearReserveTransId,
  [Types.ADD_CARD_AND_PAY_REQUEST]: addCardAndPayRequest,
  [Types.ADD_CARD_AND_PAY_FAILED]: addCardAndPayFailed,
  [Types.PAY_RECHARGE_REQUEST]: payRechargeRequest,
  [Types.PAY_RECHARGE_SUCCESS]: payRechargeSuccess,
  [Types.PAY_RECHARGE_FAILED]: payRechargeFailed,
  [Types.DELETE_CARD_REQUEST]: deleteCardRequest,
  [Types.DELETE_CARD_FAILED]: deleteCardFailed,
  [Types.CLEAR_RECHARGE_STATUS]: clearRechargeStatus,
});
