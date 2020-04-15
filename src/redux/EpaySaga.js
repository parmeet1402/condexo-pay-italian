import { put, call, select } from 'redux-saga/effects';
import { isEmpty } from 'lodash';
import EpayActions, { EpaySelectors } from './EpayRedux';
import { AuthSelectors } from './AuthRedux';

export function* getBrands(api, action) {
  const response = yield call(api.getBrands);
  switch (response.status) {
    case 200:
      yield put(EpayActions.getBrandsSuccess(response.data));
      break;
    case 400:
    default:
      yield put(EpayActions.getBrandsFailed(getErrorMessage(response)));
  }
}

export function* getCards(api, action) {
  const { _id: userId } = yield select(AuthSelectors.selectCurrentUser);
  const response = yield call(api.getCards, { userId });
  switch (response.status) {
    case 200:
      yield put(EpayActions.getCardsSuccess(response.data));
      break;
    case 400:
    default:
      yield put(EpayActions.getCardsFailed(getErrorMessage(response)));
  }
}

export function* mobileTopup(api, action) {
  const { _id: userId, email } = yield select(AuthSelectors.selectCurrentUser);
  const response = yield call(api.mobileTopup, {
    ...action.data,
    userId,
    email: action.data.email || email
  });

  switch (response.status) {
    case 200:
      yield put(EpayActions.mobileTopupSuccess(response.data.user));
      break;
    case 400:
    default:
      yield put(EpayActions.mobileTopupFailed(getErrorMessage(response)));
  }
}

export function* addCard(api, action) {
  const { stripeCustomerId, _id } = yield select(
    AuthSelectors.selectCurrentUser
  );
  const response = yield call(api.addCardDetails, {
    ...action.data,
    stripeCustomerId,
    userId: _id
  });

  switch (response.status) {
    case 200:
      yield put(
        EpayActions.payRechargeRequest({
          ...action.recharge,
          paymentSource: action.data.cardId
        })
      );
      break;
    case 400:
    default:
      yield put(EpayActions.addCardAndPayFailed(getErrorMessage(response)));
  }
}

export function* payRecharge(api, action) {
  const { stripeCustomerId, _id, email } = yield select(
    AuthSelectors.selectCurrentUser
  );
  const reserveTransactionId = yield select(
    EpaySelectors.selectReserveTransactionId
  );
  const response = yield call(api.payRecharge, {
    ...action.data,
    stripeCustomerId,
    email: action.data.email || email,
    reserveTransactionId,
    userId: _id
  });

  switch (response.status) {
    case 200:
      yield put(EpayActions.payRechargeSuccess());
      break;
    case 400:
    default:
      yield put(EpayActions.payRechargeFailed(getErrorMessage(response)));
  }
}

export function* deleteCard(api, action) {
  const { stripeCustomerId } = yield select(AuthSelectors.selectCurrentUser);
  const response = yield call(api.deleteCard, {
    ...action.data,
    stripeCustomerId
  });

  switch (response.status) {
    case 200:
      yield put(EpayActions.getCardsRequest());
      break;
    case 400:
    default:
      yield put(EpayActions.deleteCardFailed(getErrorMessage(response)));
  }
}

const getErrorMessage = response =>
  !isEmpty(response.data) && !isEmpty(response.data.errors)
    ? response.data.errors.message
    : 'Something went wrong.';
