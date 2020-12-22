import { createReducer, createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
  setBollettinoKey: ['stepCount', 'key', 'value'],
  setRataKey: ['stepCount', 'key', 'value'],
  setMavRavKey: ['stepCount', 'key', 'value'],

  setActiveVariant: ['variant'],

  reserveBillRequest: null,
  reserveBillSuccess: ['response'],
  reserveBillFailed: ['response'],

  makeBillRequest: ['data'],
  makeBillSuccess: ['response'],
  makeBillFailed: ['response'],

  resetState: null,
});

export const PayYourBillTypes = Types;
export default Creators;

/* --------- INITIAL STATE ----------- */
export const INITIAL_STATE = {
  bollettino: {
    stepOne: {
      type: '',
      amountToLeftOfDecimal: '',
      amountToRightOfDecimal: '',
      accountNo: '',
      code: '',
      desc: '',
    },
    stepTwo: {
      name: '',
      surname: '',
      email: '',
      address: '',
      city: '',
      district: '',
      postalCode: '',
    },
    stepThree: {
      cardToken: '',
      last4Digits: '',
    },
  },
  rata: {
    stepOne: {
      mavCode: '',
      ravCode: '',
      amountToLeftOfDecimal: '',
      amountToRightOfDecimal: '',
    },
    stepTwo: {
      name: '',
      surname: '',
      mobileNo: '',
      email: '',
    },
    stepThree: {
      selectedCard: '',
    },
  },
  mavRav: {
    stepOne: {
      mavCode: '',
      ravCode: '',
      amountToLeftOfDecimal: '',
      amountToRightOfDecimal: '',
      mode: '',
    },
    stepTwo: {
      name: '',
      surname: '',
      mobileNo: '',
      email: '',
    },
    stepThree: {
      selectedCard: '',
    },
  },
  reserveTransactionId: '',
  activeVariant: '',
  isLoading: false,
  successMessage: '',
  errorMessage: '',
};

/* ---------- Selectors ---------------------------- */
export const PayYourBillSelectors = {
  selectIsLoading: (state) => state.payYourBill.isLoading,
  selectSuccessMessage: (state) => state.payYourBill.successMessage,
  selectErrorMessage: (state) => state.payYourBill.errorMessage,
  selectBollettinoState: (state) => state.payYourBill.bollettino,
  selectRataState: (state) => state.payYourBill.rata,
  selectMavRavState: (state) => state.payYourBill.mavRav,
  selectReserveTransactionId: (state) => state.payYourBill.reserveTransactionId,
  selectActiveVariant: (state) => state.payYourBill.activeVariant,
};

/* --------- Reducers ----------------- */
const checkUndefined = (key) => {
  throw new Error('missing argument ' + key);
};
export const setBollettinoKey = (
  state,
  {
    stepCount = checkUndefined('bollettino'),
    key = checkUndefined('bollettino'),
    value = checkUndefined('bollettino'),
  }
) => ({
  ...state,
  bollettino: {
    ...state.bollettino,
    [stepCount]: {
      ...state.bollettino[stepCount],
      [key]: value,
    },
  },
});

export const setRataKey = (
  state,
  {
    stepCount = checkUndefined('rata'),
    key = checkUndefined('rata'),
    value = checkUndefined('rata'),
  }
) => ({
  ...state,
  rata: {
    ...state.rata,
    [stepCount]: {
      ...state.rata[stepCount],
      [key]: value,
    },
  },
});

export const setMavRavKey = (
  state,
  {
    stepCount = checkUndefined('mavRav'),
    key = checkUndefined('mavRav'),
    value = checkUndefined('mavRav'),
  }
) => ({
  ...state,
  mavRav: {
    ...state.mavRav,
    [stepCount]: {
      ...state.mavRav[stepCount],
      [key]: value,
    },
  },
});

export const setActiveVariant = (state, action) => ({
  ...state,
  activeVariant: action.variant,
});

export const reserveBillRequest = (state, {}) => ({
  ...state,
  isLoading: true,
  errorMessage: '',
});
export const reserveBillSuccess = (state, action) =>
  console.log(action) || {
    ...state,
    isLoading: false,
    reserveTransactionId: action.response.user.reserveTransactionId || '',
    errorMessage: '',
  };
export const reserveBillFailed = (state, action) => ({
  ...state,
  isLoading: false,
  errorMessage: action.response.message,
});

export const makeBillRequest = (state, action) => ({
  ...state,
  isLoading: false,
  successMessage: '',
  errorMessage: '',
});
export const makeBillSuccess = (state, action) =>
  console.log(action) || {
    ...state,
    isLoading: false,
    successMessage: '',
    errorMessage: '',
  };
export const makeBillFailed = (state, action) =>
  console.log(action) || {
    ...state,
    isLoading: false,
    successMessage: '',
    errorMessage: '',
  };

/* -------- Hook reducers to Types -------*/
export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_BOLLETTINO_KEY]: setBollettinoKey,
  [Types.SET_RATA_KEY]: setRataKey,
  [Types.SET_MAV_RAV_KEY]: setMavRavKey,
  [Types.SET_ACTIVE_VARIANT]: setActiveVariant,
  [Types.RESERVE_BILL_REQUEST]: reserveBillRequest,
  [Types.RESERVE_BILL_SUCCESS]: reserveBillSuccess,
  [Types.RESERVE_BILL_FAILED]: reserveBillFailed,
  [Types.MAKE_BILL_REQUEST]: makeBillRequest,
  [Types.MAKE_BILL_SUCCESS]: makeBillSuccess,
  [Types.MAKE_BILL_FAILED]: makeBillFailed,
});
