import { put, call, select } from 'redux-saga/effects';
import PayYourBillActions, { PayYourBillSelectors } from './PayYourBillRedux';
import isEmpty from 'lodash/isEmpty';
import AuthActions, { AuthSelectors } from './AuthRedux';
import { mergeAmount } from '../utils/currency';
import {
  getCondexoCommissionAmount,
  getStripeCommissionAmount,
  getPaytipperComissionAmount,
  getTotalInclusiveOfCommissionsAndPaytipper,
} from '../utils/commissions';

export function* reserveBill(api, action) {
  console.log(
    '🚀 ~ file: PayYourBillSaga.js ~ line 14 ~ function*reserveBill ~ api, action',
    api,
    action
  );
  let userId = '';
  const authResponse = yield select(AuthSelectors.selectCurrentUser);
  const isGuest = !(authResponse && authResponse._id);
  console.log(
    '🚀 ~ file: PayYourBillSaga.js ~ line 17 ~ function*reserveBill ~ isGuest',
    isGuest
  );

  if (!isEmpty(authResponse)) {
    userId = authResponse._id;
  }

  const activeVariant = yield select(PayYourBillSelectors.selectActiveVariant);

  let data = {};

  if (activeVariant === 'bollettini' || activeVariant === 'rata__bollettini') {
    const {
      stepOne: {
        type: typeOfBollettini,
        amountToLeftOfDecimal,
        amountToRightOfDecimal,
        accountNo: numero,
        code: billId,
        desc: casuale,
      },
      stepTwo: {
        name: firstName,
        surname,
        email,
        address,
        city,
        district: province,
        postalCode: cap,
      },
    } = yield select(PayYourBillSelectors.selectBollettinoState);

    data = {
      ...(userId && { userId }),
      firstName,
      surname,
      email,
      billType: 'Bollettini',
      typeOfBollettini,
      amount: mergeAmount(amountToLeftOfDecimal, amountToRightOfDecimal),
      billId,
      causale: casuale,
      numero,
      address,
      city,
      province,
      cap,
      ...(activeVariant === 'rata__bollettini' && { isRata: true }),
    };
  } else if (activeVariant === 'mav-rav' || activeVariant === 'rata__mav-rav') {
    const {
      stepOne: {
        mode,
        amountToLeftOfDecimal,
        amountToRightOfDecimal,
        mavCode,
        ravCode,
      },
      stepTwo: { name, surname, email, mobileNo: mobile, secondEmail },
    } = yield select(PayYourBillSelectors.selectMavRavState);

    data = {
      ...(userId && { userId }),
      mobile,
      firstName: name,
      surname,
      email,
      billType: mode === 'mav' ? 'MAV' : 'RAV',
      amount: mergeAmount(amountToLeftOfDecimal, amountToRightOfDecimal),
      billId: mode === 'mav' ? mavCode : ravCode,
      ...(activeVariant === 'rata__mav-rav' && { isRata: true }),
      ...(secondEmail && { secondEmail }),
    };
  }

  const response = yield call(api.reserveBill, data, isGuest);
  console.log(response);
  switch (response.status) {
    case 200:
      yield put(PayYourBillActions.reserveBillSuccess(response.data));
      break;
    case 400:
    case null:
    default:
      yield put(PayYourBillActions.reserveBillFailed(response));
  }
}

/* {"message":"Richiesta di ricarica completata con successo","user":{"reserveTransactionId":"938893841608193325"}} */
// MAV/RAV
/* import { put, call, select } from 'redux-saga/effects';
import PayYourBillActions, { PayYourBillSelectors } from './PayYourBillRedux';
import isEmpty from 'lodash/isEmpty';
import AuthActions, { AuthSelectors } from './AuthRedux';
import { mergeAmount } from '../utils/currency';

export function* reserveBill(api, action) {
  let userId = '';
  const authResponse = yield select(AuthSelectors.selectCurrentUser);
  const isGuest = !(authResponse && authResponse.userId);

  if (!isEmpty(authResponse)) {
    userId = authResponse._id;
  }
  const {
    stepOne: {
      mode,
      amountToLeftOfDecimal,
      amountToRightOfDecimal,
      mavCode,
      ravCode,
    },
    stepTwo: { name, surname, email, mobileNo: mobile },
  } = yield select(PayYourBillSelectors.selectMavRavState);

  const data = {
    ...(userId && { userId }),
    mobile,
    firstName: name,
    surname,
    email,
    billType: mode === 'mav' ? 'MAV' : 'RAV',
    amount: mergeAmount(amountToLeftOfDecimal, amountToRightOfDecimal),
    billId: mode === 'mav' ? mavCode : ravCode,
  };

  const response = yield call(api.reserveBill, data);
  console.log(response);
  switch (response.status) {
    case 200:
      yield put(PayYourBillActions.reserveBillSuccess(response.data));
      break;
    case 400:
    case null:
    default:
      yield put(PayYourBillActions.reserveBillFailed(response));
  }
}

 */

export function* makeBill(api, action) {
  let userId = '';
  let stripeCustomerId = '';
  const authResponse = yield select(AuthSelectors.selectCurrentUser);
  const isGuest = !(authResponse && authResponse._id);
  if (!isEmpty(authResponse)) {
    userId = authResponse._id;
    stripeCustomerId = authResponse.stripeCustomerId;
  }
  const { paymentSource } = action.data;

  const activeVariant = yield select(PayYourBillSelectors.selectActiveVariant);

  const reserveTransactionId = yield select(
    PayYourBillSelectors.selectReserveTransactionId
  );
  let data = {};

  if (activeVariant === 'bollettini' || activeVariant === 'rata__bollettini') {
    const billType = 'Bollettini';

    const {
      stepOne: {
        type: typeOfBollettini,
        amountToLeftOfDecimal,
        amountToRightOfDecimal,
        accountNo: numero,
        code: billId,
        desc: causale,
      },
      stepTwo: {
        name: firstName,
        surname,
        email,
        address,
        city,
        district: province,
        postalCode: cap,
      },
    } = yield select(PayYourBillSelectors.selectBollettinoState);

    data = {
      ...(userId && { userId, stripeCustomerId }),
      firstName,
      surname,
      email,
      billType,
      typeOfBollettini,

      amount: +getTotalInclusiveOfCommissionsAndPaytipper(
        mergeAmount(amountToLeftOfDecimal, amountToRightOfDecimal)
      ).toFixed(2), // TOTAL AMOUNT
      // amount: mergeAmount(amountToLeftOfDecimal, amountToRightOfDecimal),
      billAmount: mergeAmount(amountToLeftOfDecimal, amountToRightOfDecimal), // actual amount
      condexoCommissionAmount: getCondexoCommissionAmount(), // condexo commission
      stripeCommissionAmount: getStripeCommissionAmount(
        mergeAmount(amountToLeftOfDecimal, amountToRightOfDecimal)
      ), // stripe commission
      paytipperCommissionAmount: getPaytipperComissionAmount(), // paytipperCommissionAmount

      [userId ? 'paymentSource' : 'stripeToken']: paymentSource,
      reserveTransactionId,
      billId,
      causale,
      numero,
      address,
      city,
      province,
      cap,
      ...(activeVariant === 'rata__bollettini' && { isRata: true }),
    };
  } else if (activeVariant === 'mav-rav' || activeVariant === 'rata__mav-rav') {
    const {
      stepOne: {
        mode,
        mavCode,
        ravCode,
        amountToLeftOfDecimal,
        amountToRightOfDecimal,
      },
      stepTwo: {
        name: firstName,
        surname,
        mobileNo: mobile,
        email,
        secondEmail,
      },
    } = yield select(PayYourBillSelectors.selectMavRavState);

    data = {
      ...(userId && { userId, stripeCustomerId }),
      firstName,
      surname,
      mobile,
      email,
      billType: mode === 'mav' ? 'MAV' : 'RAV',
      billId: mode === 'mav' ? mavCode : ravCode,
      amount: +getTotalInclusiveOfCommissionsAndPaytipper(
        mergeAmount(amountToLeftOfDecimal, amountToRightOfDecimal)
      ),
      billAmount: mergeAmount(amountToLeftOfDecimal, amountToRightOfDecimal),
      condexoCommissionAmount: getCondexoCommissionAmount(),
      stripeCommissionAmount: getStripeCommissionAmount(
        mergeAmount(amountToLeftOfDecimal, amountToRightOfDecimal)
      ),
      paytipperCommissionAmount: getPaytipperComissionAmount(),
      [userId ? 'paymentSource' : 'stripeToken']: paymentSource,
      reserveTransactionId,
      ...(activeVariant === 'rata__mav-rav' && { isRata: true }),
      ...(secondEmail && { secondEmail }),
    };
  }
  // stepThree: { cardToken: paymentSource },

  const response = yield call(api.makeBill, data, isGuest);
  console.log(response);
  switch (response.status) {
    case 200:
      yield put(PayYourBillActions.makeBillSuccess(response.data));
      break;
    case 400:
    case null:
    default:
      yield put(PayYourBillActions.makeBillFailed(response));
  }
}
