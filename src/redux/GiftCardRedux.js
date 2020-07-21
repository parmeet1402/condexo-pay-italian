import { createReducer, createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
  getGiftCardListRequest: ['searchQuery'],
  getGiftCardListSuccess: ['giftCardList'],
  getGiftCardListFailed: ['errorMessage'],
  setActiveGiftCard: ['card'],
  setActiveProduct: ['product'],
  appendTopUpGiftCardRequestObj: ['data'],
  topUpGiftCardRequest: ['data'],
  topUpGiftCardSuccess: ['successMessage'],
  topUpGiftCardFailed: ['errorMessage'],
  resetIsCompleted: null,
});

export const GiftCardTypes = Types;
export default Creators;

/* ------- Initial State --------- */
export const INITIAL_STATE = {
  isLoading: false,
  successMessage: '',
  errorMessage: '',
  giftCardList: [],
  isCompleted: false,
  topUpGiftCardRequestObj: {
    userId: '',
    mobile: '',
    type: '',
    eanNo: '',
    amount: 0,
    productName: '',
    supplier: '',
    email: '',
    stripeCustomerId: '',
    paymentSource: '',
  },
  activeGiftCard: {
    /*     _id: 'Amazon',
    supplier: 'Amazon',
    logo: 'amazon.png',
    products: [
      {
        _id: '5f0c10c158da204792b42517',
        product: 'Amazon Pin 10€',
        productType: 'PIN',
        faceValue: 10,
        model: 'B&S',
        eanNo: '4260354156891',
      },
      {
        _id: '5f0c10c258da204792b42518',
        product: 'Amazon Pin 25€',
        productType: 'PIN',
        faceValue: 25,
        model: 'B&S',
        eanNo: '4260354156907',
      },
      {
        _id: '5f0c10c358da204792b42519',
        product: 'Amazon Pin 50€',
        productType: 'PIN',
        faceValue: 50,
        model: 'B&S',
        eanNo: '4260354156914',
      },
      {
        _id: '5f0c10c358da204792b4251a',
        product: 'Amazon Pin 100€',
        productType: 'PIN',
        faceValue: 100,
        model: 'B&S',
        eanNo: '4260354156921',
      },
      {
        _id: '5f0c10c458da204792b4251b',
        product: 'Amazon Ricarica',
        productType: 'Ricarica online',
        faceValue: 0,
        model: 'B&S',
        eanNo: '0085143200707',
      },
    ], */
  },

  activeProduct: {
    /*  _id: '5f0c10c358da204792b4251a',
    product: 'Amazon Pin 100€',
    productType: 'PIN',
    faceValue: 100,
    model: 'B&S',
    eanNo: '4260354156921', */
  },
};

/* ------- Selectors --------- */
export const GiftCardSelectors = {
  selectIsLoading: (state) => state.giftCard.isLoading,
  selectSuccessMessage: (state) => state.giftCard.successMessage,
  selectErrorMessage: (state) => state.giftCard.errorMessage,
  selectData: (state) => state.giftCard.giftCardList,
  selectActiveGiftCard: (state) => state.giftCard.activeGiftCard,
  selectActiveProduct: (state) => state.giftCard.activeProduct,
  selectTopUpGiftCardRequestObj: (state) =>
    state.giftCard.topUpGiftCardRequestObj,
  selectIsCompleted: (state) => state.giftCard.isCompleted,
};

/* -------- Reducers ---------- */
export const getGiftCardListRequest = (state, action) => ({
  ...state,
  isLoading: true,
  successMessage: '',
  errorMessage: '',
  activeGiftCard: {},
  isCompleted: false,
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

export const setActiveGiftCard = (state, { card }) => ({
  ...state,
  activeGiftCard: card,
});

export const setActiveProduct = (state, { product }) => ({
  ...state,
  activeProduct: product,
});

export const appendTopUpGiftCardRequestObj = (state, { data }) => ({
  ...state,
  topUpGiftCardRequestObj: { ...state.topUpGiftCardRequestObj, ...data },
});

export const topUpGiftCardRequest = (state, data) =>
  console.log('REWY', data) || {
    ...state,
    isLoading: true,
    successMessage: '',
    errorMessage: '',
  };
export const topUpGiftCardSuccess = (state, { successMessage }) => ({
  ...state,
  isLoading: false,
  successMessage,
  errorMessage: '',
  isCompleted: true,
});
export const topUpGiftCardFailed = (state, { errorMessage }) => ({
  ...state,
  isLoading: false,
  successMessage: '',
  errorMessage,
  isCompleted: true,
});
export const resetIsCompleted = (state) => ({
  ...state,
  isCompleted: false,
});

/* -------- Hookup Reducers to Types -------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_GIFT_CARD_LIST_REQUEST]: getGiftCardListRequest,
  [Types.GET_GIFT_CARD_LIST_SUCCESS]: getGiftCardListSuccess,
  [Types.GET_GIFT_CARD_LIST_FAILED]: getGiftCardListFailed,
  [Types.SET_ACTIVE_GIFT_CARD]: setActiveGiftCard,
  [Types.SET_ACTIVE_PRODUCT]: setActiveProduct,
  [Types.APPEND_TOP_UP_GIFT_CARD_REQUEST_OBJ]: appendTopUpGiftCardRequestObj,
  [Types.TOP_UP_GIFT_CARD_REQUEST]: topUpGiftCardRequest,
  [Types.TOP_UP_GIFT_CARD_SUCCESS]: topUpGiftCardSuccess,
  [Types.TOP_UP_GIFT_CARD_FAILED]: topUpGiftCardFailed,
  [Types.RESET_IS_COMPLETED]: resetIsCompleted,
});
