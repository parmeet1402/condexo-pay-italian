import { createReducer, createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
  getGiftCardListRequest: ['searchQuery'],
  getGiftCardListSuccess: ['giftCardList'],
  getGiftCardListFailed: ['errorMessage'],
});

export const GiftCardTypes = Types;
export default Creators;

/* ------- Initial State --------- */
export const INITIAL_STATE = {
  isLoading: false,
  successMessage: '',
  errorMessage: '',
  giftCardList: [],
};

/* ------- Selectors --------- */
export const GiftCardSelectors = {
  selectIsLoading: (state) => state.giftCard.isLoading,
  selectSuccessMessage: (state) => state.giftCard.successMessage,
  selectErrorMessage: (state) => state.giftCard.errorMessage,
  selectData: (state) => state.giftCard.giftCardList,
};

/* -------- Reducers ---------- */
export const getGiftCardListRequest = (state, action) => ({
  ...state,
  isLoading: false,
  successMessage: '',
  errorMessage: '',
});
export const getGiftCardListSuccess = (state, { giftCardList }) => ({
  ...state,
  isLoading: false,
  successMessage: '',
  errorMessage: '',
  giftCardList,
});
export const getGiftCardListFailed = (state, { errorMessage }) => ({
  ...state,
  isLoading: false,
  successMessage: '',
  errorMessage,
});

/* -------- Hookup Reducers to Types -------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_GIFT_CARD_LIST_REQUEST]: getGiftCardListRequest,
  [Types.GET_GIFT_CARD_LIST_SUCCESS]: getGiftCardListSuccess,
  [Types.GET_GIFT_CARD_LIST_FAILED]: getGiftCardListFailed,
});
